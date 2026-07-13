import { Sequelize, QueryTypes } from "sequelize";
import GlobalSetting from "../models/GlobalSetting";
import { Searcher } from "./Searcher";
import sequelize from "../config/database";
import "../models/ApiToken";

// 全局设置默认值
const DEFAULT_GLOBAL_SETTINGS = {
  httpProxyHost: "127.0.0.1",
  httpProxyPort: 7890,
  isProxyEnabled: false,
  CommonUserCode: 9527,
  AdminUserCode: 230713,
};

export class DatabaseService {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = sequelize;
  }

  async initialize(): Promise<void> {
    try {
      await this.sequelize.query("PRAGMA foreign_keys = OFF");
      await this.cleanupBackupTables();
      await this.sequelize.sync({ alter: true });
      await this.sequelize.query("PRAGMA foreign_keys = ON");
      await this.initializeGlobalSettings();
    } catch (error) {
      throw new Error(`数据库初始化失败: ${(error as Error).message}`);
    }
  }

  private async initializeGlobalSettings(): Promise<void> {
    try {
      const settings = await GlobalSetting.findOne();
      if (!settings) {
        await GlobalSetting.create(DEFAULT_GLOBAL_SETTINGS);
        console.log("✅ Global settings initialized with default values.");
      }
      await Searcher.updateAxiosInstance();
    } catch (error) {
      console.error("❌ Failed to initialize global settings:", error);
      throw error;
    }
  }

  private async cleanupBackupTables(): Promise<void> {
    const backupTables = await this.sequelize.query<{ name: string }>(
      "SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%\\_backup%' ESCAPE '\\'",
      { type: QueryTypes.SELECT }
    );

    for (const table of backupTables) {
      if (table?.name) {
        await this.sequelize.query(`DROP TABLE IF EXISTS ${table.name}`);
      }
    }
  }

  // ... 其他数据库相关方法
}

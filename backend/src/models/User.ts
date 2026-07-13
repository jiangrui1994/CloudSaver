import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface UserAttributes {
  id: number;
  userId?: string;
  username: string;
  password: string;
  role: number; // 修改为数字类型
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public userId!: string;
  public username!: string;
  public password!: string;
  public role!: number; // 实现数字类型的角色属性
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false, // 显式设置为不可为空
    },
    userId: {
      type: DataTypes.UUID, // 对外暴露的不可预测ID
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false, // 显式设置为不可为空
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER, // 修改为数字类型
      allowNull: false,
      defaultValue: 0, // 默认值为普通用户
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

// 角色映射
// 0: 普通用户
// 1: 管理员

export default User;

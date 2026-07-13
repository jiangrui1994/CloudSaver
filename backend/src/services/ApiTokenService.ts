import { createHash, randomBytes } from "crypto";
import { Op } from "sequelize";
import { injectable } from "inversify";
import ApiToken from "../models/ApiToken";

const MAX_ACTIVE_TOKENS = 10;
const VALID_EXPIRY_DAYS = new Set([30, 90, 365]);

export const hashApiToken = (token: string): string =>
  createHash("sha256").update(token).digest("hex");

@injectable()
export class ApiTokenService {
  async list(userId: string) {
    const tokens = await ApiToken.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    return {
      data: tokens.map((token) => this.toPublicToken(token)),
    };
  }

  async create(userId: string, name: string, expiresInDays?: number | null) {
    const normalizedName = name?.trim();
    if (!normalizedName || normalizedName.length > 50) {
      throw new Error("Token 名称长度必须为 1 到 50 个字符");
    }

    if (
      expiresInDays !== undefined &&
      expiresInDays !== null &&
      !VALID_EXPIRY_DAYS.has(Number(expiresInDays))
    ) {
      throw new Error("Token 有效期仅支持 30、90、365 天或永不过期");
    }

    const activeCount = await ApiToken.count({
      where: {
        userId,
        revokedAt: null,
        [Op.or]: [{ expiresAt: null }, { expiresAt: { [Op.gt]: new Date() } }],
      },
    });
    if (activeCount >= MAX_ACTIVE_TOKENS) {
      throw new Error(`每个用户最多创建 ${MAX_ACTIVE_TOKENS} 个有效 Token`);
    }

    const plainToken = `cs_${randomBytes(32).toString("base64url")}`;
    const expiresAt = expiresInDays
      ? new Date(Date.now() + Number(expiresInDays) * 24 * 60 * 60 * 1000)
      : null;
    const token = await ApiToken.create({
      userId,
      name: normalizedName,
      tokenHash: hashApiToken(plainToken),
      tokenPrefix: plainToken.slice(0, 11),
      expiresAt,
      lastUsedAt: null,
      revokedAt: null,
    });

    return {
      data: {
        ...this.toPublicToken(token),
        token: plainToken,
      },
      message: "API Token 创建成功，请立即复制保存",
    };
  }

  async revoke(userId: string, tokenId: string) {
    const token = await ApiToken.findOne({ where: { userId, tokenId } });
    if (!token) throw new Error("API Token 不存在");
    if (!token.revokedAt) {
      token.revokedAt = new Date();
      await token.save();
    }
    return { message: "API Token 已撤销" };
  }

  private toPublicToken(token: ApiToken) {
    return {
      tokenId: token.tokenId,
      name: token.name,
      tokenPrefix: `${token.tokenPrefix}...`,
      expiresAt: token.expiresAt,
      lastUsedAt: token.lastUsedAt,
      revokedAt: token.revokedAt,
      createdAt: token.createdAt,
    };
  }
}

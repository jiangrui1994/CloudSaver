import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

export interface ApiTokenAttributes {
  id: number;
  tokenId: string;
  userId: string;
  name: string;
  tokenHash: string;
  tokenPrefix: string;
  expiresAt: Date | null;
  lastUsedAt: Date | null;
  revokedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ApiTokenCreationAttributes
  extends Optional<
    ApiTokenAttributes,
    "id" | "tokenId" | "expiresAt" | "lastUsedAt" | "revokedAt" | "createdAt" | "updatedAt"
  > {}

class ApiToken
  extends Model<ApiTokenAttributes, ApiTokenCreationAttributes>
  implements ApiTokenAttributes
{
  public id!: number;
  public tokenId!: string;
  public userId!: string;
  public name!: string;
  public tokenHash!: string;
  public tokenPrefix!: string;
  public expiresAt!: Date | null;
  public lastUsedAt!: Date | null;
  public revokedAt!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ApiToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tokenId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    tokenHash: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    tokenPrefix: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lastUsedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    revokedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "ApiToken",
    tableName: "api_tokens",
    indexes: [{ fields: ["userId"] }, { fields: ["tokenHash"], unique: true }],
  }
);

User.hasMany(ApiToken, {
  foreignKey: "userId",
  as: "apiTokens",
});
ApiToken.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default ApiToken;

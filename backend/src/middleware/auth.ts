// filepath: /D:/code/CloudDiskDown/backend/src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { config } from "../config";
import ApiToken from "../models/ApiToken";
import { hashApiToken } from "../services/ApiTokenService";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: number;
    authType?: "jwt" | "apiToken";
  };
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  if (req.path === "/user/login" || req.path === "/user/register" || req.path === "/tele-images/") {
    return next();
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "未提供 token" });
  }

  try {
    if (token.startsWith("cs_")) {
      const apiToken = await ApiToken.findOne({
        where: { tokenHash: hashApiToken(token) },
      });
      if (
        !apiToken ||
        apiToken.revokedAt ||
        (apiToken.expiresAt && apiToken.expiresAt.getTime() <= Date.now())
      ) {
        return res.status(401).json({ message: "无效或已过期的 API Token" });
      }

      const user = await User.findOne({ where: { userId: apiToken.userId } });
      if (!user) return res.status(401).json({ message: "无效的 API Token" });

      req.user = {
        userId: user.userId,
        role: user.role,
        authType: "apiToken",
      };
      apiToken.lastUsedAt = new Date();
      await apiToken.save();
      return next();
    }

    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      authType: "jwt",
    };
    const user = await User.findOne({ where: { userId: decoded.userId } });
    if (!user) {
      return res.status(401).json({ message: "无效的 token" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "无效的 token" });
  }
};

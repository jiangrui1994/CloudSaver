import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../core/types";
import { UserService } from "../services/UserService";
import { ApiTokenService } from "../services/ApiTokenService";
import { BaseController } from "./BaseController";

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.ApiTokenService) private apiTokenService: ApiTokenService
  ) {
    super();
  }

  async register(req: Request, res: Response): Promise<void> {
    await this.handleRequest(req, res, async () => {
      const { username, password, registerCode } = req.body;
      return await this.userService.register(username, password, registerCode);
    });
  }

  async login(req: Request, res: Response): Promise<void> {
    await this.handleRequest(req, res, async () => {
      const { username, password } = req.body;
      return await this.userService.login(username, password);
    });
  }

  async listApiTokens(req: Request, res: Response): Promise<void> {
    await this.handleRequest(req, res, async () => {
      this.requireBrowserLogin(req);
      return await this.apiTokenService.list(req.user!.userId);
    });
  }

  async createApiToken(req: Request, res: Response): Promise<void> {
    await this.handleRequest(req, res, async () => {
      this.requireBrowserLogin(req);
      const { name, expiresInDays = null } = req.body;
      return await this.apiTokenService.create(req.user!.userId, name, expiresInDays);
    });
  }

  async revokeApiToken(req: Request, res: Response): Promise<void> {
    await this.handleRequest(req, res, async () => {
      this.requireBrowserLogin(req);
      return await this.apiTokenService.revoke(req.user!.userId, req.params.tokenId);
    });
  }

  private requireBrowserLogin(req: Request): void {
    if (req.user?.authType !== "jwt") {
      throw new Error("API Token 管理仅支持网页登录认证");
    }
  }
}

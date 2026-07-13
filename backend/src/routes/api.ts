import { Router } from "express";
import { container } from "../inversify.config";
import { TYPES } from "../core/types";
import { Cloud115Controller } from "../controllers/cloud115";
import { QuarkController } from "../controllers/quark";
import { ResourceController } from "../controllers/resource";
import { DoubanController } from "../controllers/douban";
import { ImageController } from "../controllers/teleImages";
import { SettingController } from "../controllers/setting";
import { UserController } from "../controllers/user";
import { SponsorsController } from "../controllers/sponsors";

const router = Router();

// 获取控制器实例
const cloud115Controller = container.get<Cloud115Controller>(TYPES.Cloud115Controller);
const quarkController = container.get<QuarkController>(TYPES.QuarkController);
const resourceController = container.get<ResourceController>(TYPES.ResourceController);
const doubanController = container.get<DoubanController>(TYPES.DoubanController);
const imageController = container.get<ImageController>(TYPES.ImageController);
const settingController = container.get<SettingController>(TYPES.SettingController);
const userController = container.get<UserController>(TYPES.UserController);
const sponsorsController = container.get<SponsorsController>(TYPES.SponsorsController);

// 用户相关路由
router.post("/user/login", (req, res) => userController.login(req, res));
router.post("/user/register", (req, res) => userController.register(req, res));
router.get("/user/api-tokens", (req, res) => userController.listApiTokens(req, res));
router.post("/user/api-tokens", (req, res) => userController.createApiToken(req, res));
router.delete("/user/api-tokens/:tokenId", (req, res) => userController.revokeApiToken(req, res));

// 图片相关路由
router.get("/tele-images", (req, res) => imageController.getImages(req, res));

// 设置相关路由
router.get("/setting/get", (req, res) => settingController.get(req, res));
router.post("/setting/save", (req, res) => settingController.save(req, res));

// 资源搜索
router.get("/search", (req, res) => resourceController.search(req, res));

// 获取赞助者列表
router.get("/sponsors", (req, res) => sponsorsController.get(req, res));

// 115网盘相关
router.get("/cloud115/share-info", (req, res) => cloud115Controller.getShareInfo(req, res));
router.get("/cloud115/folders", (req, res) => cloud115Controller.getFolderList(req, res));
router.post("/cloud115/save", (req, res) => cloud115Controller.saveFile(req, res));

// 夸克网盘相关
router.get("/quark/share-info", (req, res) => quarkController.getShareInfo(req, res));
router.get("/quark/folders", (req, res) => quarkController.getFolderList(req, res));
router.post("/quark/save", (req, res) => quarkController.saveFile(req, res));

// 获取豆瓣热门列表
router.get("/douban/hot", (req, res) => doubanController.getDoubanHotList(req, res));

export default router;

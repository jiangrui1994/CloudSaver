import { Container } from "inversify";
import { TYPES } from "./core/types";

// Services
import { DatabaseService } from "./services/DatabaseService";
import { Cloud115Service } from "./services/Cloud115Service";
import { QuarkService } from "./services/QuarkService";
import { Searcher } from "./services/Searcher";
import { DoubanService } from "./services/DoubanService";
import { UserService } from "./services/UserService";
import { ApiTokenService } from "./services/ApiTokenService";
import { ImageService } from "./services/ImageService";
import { SettingService } from "./services/SettingService";
import { SponsorsService } from "./services/SponsorsService";
// Controllers
import { Cloud115Controller } from "./controllers/cloud115";
import { QuarkController } from "./controllers/quark";
import { ResourceController } from "./controllers/resource";
import { DoubanController } from "./controllers/douban";
import { ImageController } from "./controllers/teleImages";
import { SettingController } from "./controllers/setting";
import { UserController } from "./controllers/user";
import { SponsorsController } from "./controllers/sponsors";
const container = new Container();

// Services
container.bind<DatabaseService>(TYPES.DatabaseService).to(DatabaseService).inSingletonScope();
container.bind<Cloud115Service>(TYPES.Cloud115Service).to(Cloud115Service).inSingletonScope();
container.bind<QuarkService>(TYPES.QuarkService).to(QuarkService).inSingletonScope();
container.bind<Searcher>(TYPES.Searcher).to(Searcher).inSingletonScope();
container.bind<ImageService>(TYPES.ImageService).to(ImageService).inSingletonScope();
container.bind<SettingService>(TYPES.SettingService).to(SettingService).inSingletonScope();
container.bind<DoubanService>(TYPES.DoubanService).to(DoubanService).inSingletonScope();
container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
container.bind<ApiTokenService>(TYPES.ApiTokenService).to(ApiTokenService).inSingletonScope();
container.bind<SponsorsService>(TYPES.SponsorsService).to(SponsorsService).inSingletonScope();
// Controllers
container.bind<Cloud115Controller>(TYPES.Cloud115Controller).to(Cloud115Controller);
container.bind<QuarkController>(TYPES.QuarkController).to(QuarkController);
container.bind<ResourceController>(TYPES.ResourceController).to(ResourceController);
container.bind<DoubanController>(TYPES.DoubanController).to(DoubanController);
container.bind<ImageController>(TYPES.ImageController).to(ImageController);
container.bind<SettingController>(TYPES.SettingController).to(SettingController);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<SponsorsController>(TYPES.SponsorsController).to(SponsorsController);

export { container };

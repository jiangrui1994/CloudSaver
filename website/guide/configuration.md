# 配置说明

后端主要环境变量位于 `backend/.env`（Docker 部署时在 `/app/config/env`，可参考 [backend/.env.example](https://github.com/jiangrui1994/CloudSaver/blob/main/backend/.env.example)）。

## 环境变量

| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| `PORT` | `8009` | 后端服务端口 |
| `JWT_SECRET` | 开发默认值 | 生产环境必须显式设置，且满足强密钥要求 |
| `JWT_EXPIRES_IN` | `6h` | Token 过期时间，如 `30m` / `7d` |
| `DOUBAN_CREDENTIAL_KEY` | 无 | 可选的豆瓣 Cookie 加密密钥（Base64 编码的 32 字节随机值）；未配置时 Cookie 直接保存到独立数据库字段 |
| `TELEGRAM_BASE_URL` | `https://telegram.me/s` | Telegram 链接基址 |
| `TELE_CHANNELS` | `[]` | 频道列表（JSON 字符串） |
| `PLUGIN_ALLOWED_HOSTS` | 空 | 插件/外部搜索源外呼主机白名单，逗号分隔；**默认空 = 允许全部主机**（局域网部署无需配置），配置后仅放行列表内主机，适合公网部署加固 |
| `PLUGIN_BLOCK_PRIVATE_NETWORK` | `false` | 是否阻止插件/外部搜索源访问内网地址；**默认关闭（内网直通）**，仅公网部署建议开启 |
| `LOG_LEVEL` | `debug`(dev) / `info`(prod) | 日志等级 |
| `LOG_SAMPLE_RATE` | `1` | 日志采样率（0~1） |
| `LOG_MAX_MESSAGE_LENGTH` | `1000` | 单条日志最大长度 |
| `ADMIN_USER_CODE` | `230713` | 管理员邀请码（可覆盖默认） |

## 豆瓣个性化列表

1. 在设置中心粘贴豆瓣移动端完整 Cookie，保存并验证后会出现"为你推荐"。
2. 在"想看清单"中添加一个或多个公开豆瓣用户 ID，可填写备注（例如"媳妇"）。
3. 在豆瓣分类中选择对应用户，点击"搜资源"即可沿用现有资源搜索与入库流程。

Cookie 保存在服务端独立数据表中，不会通过设置接口返回原文；配置 `DOUBAN_CREDENTIAL_KEY` 后会使用 AES-256-GCM 加密，否则直接保存 Cookie 原文。推荐列表默认缓存 10 分钟，想看列表默认缓存 30 秒；豆瓣用户 ID 列表按当前 CloudSaver 账号隔离。

## 外部搜索源

管理员可在「配置管理 → 外部搜索源」接入自部署的搜索后端（如 [pansou](https://github.com/fish2018/pansou)）或其他 JSON 搜索 API。详细的配置教程、字段速查表与排错方案见 [外部搜索源功能专题](/guide/features/external-source)。

安全说明：服务端发起外部请求会经过 SSRF 校验，默认仅限制 http/https 协议——**局域网/NAS 部署无需任何配置，内网与公网地址均可直接使用**。若实例暴露在公网（尤其是开放注册的多用户实例），建议按需开启加固：配置 `PLUGIN_ALLOWED_HOSTS` 主机白名单，或开启 `PLUGIN_BLOCK_PRIVATE_NETWORK=true` 阻断内网目标（内网部署请勿开启）。

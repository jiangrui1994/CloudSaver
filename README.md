<div align="center">
  <img src="./docs/logo.svg" width="112" alt="CloudSaver Logo" />
  <h1>CloudSaver</h1>
  <p><strong>一个可自行部署的网盘资源搜索与转存工具</strong></p>
  <p>整合资源搜索、链接解析与网盘转存，提供适配桌面和移动设备的 Web 界面。</p>
  <p>
    <a href="https://github.com/jiangrui1994/CloudSaver/stargazers"><img src="https://img.shields.io/github/stars/jiangrui1994/CloudSaver?style=flat-square&logo=github" alt="GitHub Stars" /></a>
    <a href="https://hub.docker.com/r/jiangrui1994/cloudsaver"><img src="https://img.shields.io/docker/pulls/jiangrui1994/cloudsaver?style=flat-square&logo=docker" alt="Docker Pulls" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="MIT License" /></a>
    <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/Vue-3-42b883?style=flat-square&logo=vuedotjs&logoColor=white" alt="Vue 3" /></a>
  </p>
  <p>
    <a href="#快速部署">快速部署</a> ·
    <a href="#功能特性">功能特性</a> ·
    <a href="https://www.yuque.com/xiaoruihenbangde/ggogn3/ga6gaaiy5fsyw62l"><strong>📖 使用文档</strong></a> ·
    <a href="https://www.yuque.com/xiaoruihenbangde/ggogn3/vxoqxkx4rkcz3g94">更新日志</a> ·
    <a href="#交流与反馈">交流反馈</a>
  </p>
  <a href="https://hellogithub.com/repository/d13663fb959345e7923ecaccc3387571"><img src="https://abroad.hellogithub.com/v1/widgets/recommend.svg?rid=d13663fb959345e7923ecaccc3387571&claim_uid=xP1MT4mSvN6wn5K&theme=small" alt="HelloGitHub 推荐" /></a>
</div>

> [!TIP]
> **📖 [查看 CloudSaver 使用文档 →](https://www.yuque.com/xiaoruihenbangde/ggogn3/ga6gaaiy5fsyw62l)**  
> 包含 **部署教程、使用说明、常见问题及更多搜索频道**，建议首次使用前阅读。  
> 🔑 **文档访问密码：`me16`**（如语雀提示输入访问密码，请填写此密码）。

> [!IMPORTANT]
> **版本说明：**本仓库公开的源码版本为 **v0.2.5**，较新版本的功能并未同步到这里。希望使用较新版本的用户，请优先选择下方提供的 Docker 镜像。**Docker 镜像与本仓库源码不一定一一对应**；不同版本的功能、配置方式请以对应版本文档为准。

> [!CAUTION]
> **请自行部署，不要在陌生网站填写网盘 Cookie。** CloudSaver 项目方不提供官方在线 Demo 或托管服务。网盘 Cookie 等凭据可能赋予第三方访问账号及文件的能力，请仅在自己信任的环境中使用，并妥善保护配置及数据。

## 功能特性

| 能力 | 说明 |
| --- | --- |
| **多源资源搜索** | 聚合订阅源，支持关键词搜索、分享链接解析及豆瓣热门榜单展示 |
| **网盘快捷转存** | 支持 115 网盘、夸克网盘、天翼网盘、123 云盘等平台的转存操作，以及目标文件夹选择 |
| **多用户管理** | 提供注册、登录及管理员与普通用户的权限区分 |
| **多端适配** | 基于响应式 Web 界面，在 PC 与移动设备上使用 |

> 上述能力来自项目现有介绍；**不同源码版本和 Docker 镜像版本支持的功能可能存在差异**。

## 界面预览

> **说明：**以下截图仅供参考，可能与当前版本存在差异，实际界面请以最新发布版本为准。

<div align="center">
  <img src="./docs/images/pc/search.png" width="48%" alt="CloudSaver PC 端资源搜索页面" />
  <img src="./docs/images/pc/save.png" width="48%" alt="CloudSaver PC 端资源转存页面" />
  <p><sub>PC 端 · 资源搜索 / 转存</sub></p>
</div>

<details>
<summary><b>查看更多界面截图（PC / 移动端）</b></summary>

### PC 端

<div align="center">
  <img src="./docs/images/pc/login.png" width="48%" alt="PC 端登录页面" />
  <img src="./docs/images/pc/douban.png" width="48%" alt="PC 端豆瓣榜单" />
  <img src="./docs/images/pc/detail.png" width="48%" alt="PC 端资源详情" />
  <img src="./docs/images/pc/save1.png" width="48%" alt="PC 端转存目录选择" />
</div>

### 移动端

<div align="center">
  <img src="./docs/images/mobile/login.png" width="23%" alt="移动端登录页面" />
  <img src="./docs/images/mobile/search.png" width="23%" alt="移动端资源搜索" />
  <img src="./docs/images/mobile/save.png" width="23%" alt="移动端转存" />
  <img src="./docs/images/mobile/save1.png" width="23%" alt="移动端转存目录选择" />
</div>

</details>

## 快速部署

推荐使用 **Docker Compose** 部署。无需在宿主机安装 Node.js，也方便维护数据与配置目录。

### 1. 创建配置目录

```bash
mkdir -p cloudsaver/{data,config}
cd cloudsaver
```

创建 `config/env` 文件，并将 `JWT_SECRET` 修改为自己生成的、足够长的随机字符串：

```dotenv
JWT_SECRET=replace_with_your_own_long_random_secret
TELEGRAM_BASE_URL=https://t.me/s
```

> 请勿直接使用示例密钥。较新镜像所需的配置项可能发生变化，遇到差异时请参阅[部署与常见问题文档](https://www.yuque.com/xiaoruihenbangde/ggogn3/ga6gaaiy5fsyw62l)。

### 2. 创建 Compose 文件

在当前目录新建 `compose.yaml`：

```yaml
services:
  cloudsaver:
    image: jiangrui1994/cloudsaver:latest
    container_name: cloudsaver
    ports:
      - "8008:8008"
    volumes:
      - ./data:/app/data
      - ./config:/app/config
    restart: unless-stopped
```

### 3. 启动服务

```bash
docker compose up -d
```

启动后，访问 `http://localhost:8008`；如果部署在局域网服务器上，请将 `localhost` 替换为对应设备的 IP 地址。

查看服务日志：

```bash
docker compose logs -f cloudsaver
```

升级镜像（升级前建议备份 `data` 和 `config` 目录）：

```bash
docker compose pull
docker compose up -d
```

### 其他部署选择

| 镜像来源 | 稳定版 | 测试版 |
| --- | --- | --- |
| Docker Hub | `jiangrui1994/cloudsaver:latest` | `jiangrui1994/cloudsaver:test` |
| GitHub Container Registry | `ghcr.io/jiangrui1994/cloudsaver:latest` | `ghcr.io/jiangrui1994/cloudsaver:test` |

- **稳定版 `latest`：**适合日常使用。
- **测试版 `test`：**用于体验新功能与修复，可能存在不稳定情况；将 Compose 中的 `image` 替换成对应标签即可。
- **镜像来源切换：**只需替换 `image` 地址，不需要同时运行两份服务。

<details>
<summary><b>使用 docker run 部署</b></summary>

在预先创建好 `data`、`config` 目录以及 `config/env` 文件后执行：

```bash
docker run -d \
  --name cloudsaver \
  -p 8008:8008 \
  -v "$(pwd)/data:/app/data" \
  -v "$(pwd)/config:/app/config" \
  --restart unless-stopped \
  jiangrui1994/cloudsaver:latest
```

</details>

## 首次使用与配置

### 注册码

本仓库 **v0.2.5 源码**定义的初始注册码如下：

| 用户类型 | 初始注册码 |
| --- | --- |
| 管理员 | `230713` |
| 普通用户 | `9527` |

**安全建议：**初次部署后，请尽快在管理设置中修改默认注册码，并设置强密码。不要未经访问控制就把管理界面直接暴露到公网。新版本的注册与管理方式请以对应版本的实际界面为准。

### Telegram 资源搜索

资源搜索依赖频道 / 订阅源以及访问 Telegram 相关页面所需的网络条件。部分网络环境需要配置 HTTP 代理；可在项目的管理设置中检查代理地址、端口和启用状态。

> 使用 Docker 时，容器内的 `127.0.0.1` 指向**容器自身**，不是你的宿主机。若代理运行在宿主机上，请填写容器能够访问的主机地址，并确认代理允许来自容器的连接。

在 **v0.2.5 源码**中，`backend/.env` 还支持 `TELE_CHANNELS` 配置；原项目文档注明该配置在 **v0.3.0 及之后版本无效**。较新版本的频道配置方式请查看[使用说明](https://www.yuque.com/xiaoruihenbangde/ggogn3/ga6gaaiy5fsyw62l)。

### 数据持久化

| 容器目录 | 用途 |
| --- | --- |
| `/app/data` | 保存应用持久化数据（包括 SQLite 数据库） |
| `/app/config` | 保存运行配置，例如 `env` 文件 |

请定期备份这两个目录，且不要公开其中的凭据、数据库或备份文件。

## 本地开发

> 本节面向希望阅读、调试或参与开发 **v0.2.5 开源源码**的开发者，不代表当前较新 Docker 镜像的全部实现。

**环境要求：**Node.js 18 或更高版本、pnpm（建议 8 或更高版本）。

```bash
# 1. 获取源码
git clone https://github.com/jiangrui1994/CloudSaver.git
cd CloudSaver

# 2. 安装依赖
pnpm install

# 3. 创建后端环境配置
cp backend/.env.example backend/.env

# 4. 启动前后端开发服务
pnpm dev
```

启动前修改 `backend/.env` 中的 `JWT_SECRET`。默认情况下，前端开发服务使用 `http://localhost:8008`，后端使用 `http://localhost:8009`。

构建项目：

```bash
pnpm build
```

源码项目使用 Vue 3、TypeScript、Vite、Pinia、Vue Router、Element Plus、Vant、Node.js、Express 与 SQLite。仓库中 `frontend/` 和 `backend/` 分别存放前、后端代码。

## 常见问题

<details>
<summary><b>是否有官方在线 Demo？</b></summary>

没有。CloudSaver 项目方不提供在线 Demo 或托管平台。请通过自己信任的环境部署，不要在不明网站中提交网盘 Cookie 等敏感凭据。

</details>

<details>
<summary><b>为什么搜索结果为空或图片无法加载？</b></summary>

先检查资源订阅源是否可用，以及 Telegram 相关地址能否从**应用运行环境**正常访问；如使用代理，确认代理的主机、端口和容器网络配置均正确。第三方来源变动也可能影响搜索结果。

</details>

<details>
<summary><b>为什么我从源码构建的功能与 Docker 镜像不同？</b></summary>

公开仓库的源码停留在 v0.2.5，较新版本并未全部公开到本仓库，因此从源码构建的版本不等同于 `latest` 镜像。

</details>

<details>
<summary><b>在哪里查看更新日志、更多频道和使用问题？</b></summary>

- [版本更新日志](https://www.yuque.com/xiaoruihenbangde/ggogn3/vxoqxkx4rkcz3g94)
- [部署与使用常见问题（含更多搜索频道）](https://www.yuque.com/xiaoruihenbangde/ggogn3/ga6gaaiy5fsyw62l)
- [项目更新与需求处理说明](https://www.yuque.com/xiaoruihenbangde/ggogn3/gt9cgqn2n3vergxx)

部分语雀页面若提示访问密码，可尝试原文档提供的 `me16`。

</details>

## 安全与使用须知

- **自行部署：**建议仅在个人或可信环境中使用。如果需要远程访问，请自行配置 HTTPS、身份验证和必要的网络访问控制。
- **保护凭据：**网盘 Cookie、JWT 密钥、数据库以及配置文件均应按敏感数据处理，不要提交到公开仓库或分享给他人。
- **自行评估版本：**使用 Docker 镜像前，请确认其来源并评估信任风险。自行部署也不意味着绝对安全。
- **合法使用：**搜索内容和分享链接来自第三方，请遵守适用法律、平台条款和相关权利人的合法权益。项目不对第三方资源的准确性、可用性和合法性作出保证。

## 交流与反馈

- [Telegram 交流群](https://t.me/+4fWSSbQn5rMxYjM1)
- [QQ 交流群与使用帮助](https://www.yuque.com/xiaoruihenbangde/ggogn3/ga6gaaiy5fsyw62l#lsPla)
- [GitHub Issues](https://github.com/jiangrui1994/CloudSaver/issues)：提交可复现的问题与建议
- [项目维护及需求处理说明](https://www.yuque.com/xiaoruihenbangde/ggogn3/gt9cgqn2n3vergxx)

反馈问题时，建议注明镜像标签或源码版本、部署方式、问题复现步骤及必要日志（**务必先删除 Cookie、令牌等敏感信息**）。

## 贡献与开源协议

欢迎通过 Issue 或 Pull Request 参与开源仓库现有源码的改进。贡献前建议先确认问题是否已经被反馈，并在 PR 中说明改动目的和验证方式。

本仓库代码根据 [MIT License](LICENSE) 授权。请注意：**MIT 许可证允许商业使用**；具体使用行为仍需遵守适用法律、第三方平台条款及第三方内容的权利要求。本仓库的 MIT 许可不应被理解为对未公开发布的镜像版本或第三方内容的额外授权。

## 支持项目

如果 CloudSaver 对你有帮助，欢迎给仓库点一个 [Star](https://github.com/jiangrui1994/CloudSaver/stargazers)、分享项目，或通过以下方式支持维护工作。

<summary><b>赞赏作者</b></summary>

<div align="center">
  <img src="https://oss.jiangmuxin.cn/cloudsaver/wechat_pay.jpg" width="220" alt="微信赞赏二维码" />
  <img src="https://oss.jiangmuxin.cn/cloudsaver/alipay.png" width="220" alt="支付宝赞赏二维码" />
</div>

如需联系作者确认赞赏，可使用[联系表单](https://wj.qq.com/s2/26394114/3f81/)。


感谢贡献代码、提出反馈以及持续支持项目的朋友们。

### 赞助支持

感谢 [Tencent EdgeOne](https://edgeone.ai/?from=github) 为项目提供 CDN 加速及安全防护支持。

<a href="https://edgeone.ai/?from=github"><img src="https://edgeone.ai/media/34fe3a45-492d-4ea4-ae1087ca7b4b.png" width="260" alt="Tencent EdgeOne" /></a>

### Star History

[![Star History Chart](https://api.star-history.com/svg?repos=jiangrui1994/CloudSaver&type=Date)](https://www.star-history.com/#jiangrui1994/CloudSaver&Date)

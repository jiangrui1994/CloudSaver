# 快速开始

推荐使用 Docker 部署，一条命令即可启动完整的前后端服务。

## 方式一：docker run

```bash
docker run -d \
  --name cloud-saver \
  -p 8008:8008 \
  -v /your/local/path/data:/app/data \
  -v /your/local/path/config:/app/config \
  --restart unless-stopped \
  jiangrui1994/cloudsaver:latest
```

测试版可将镜像替换为 `jiangrui1994/cloudsaver:test`。

## 方式二：docker compose

创建 `docker-compose.yml`：

```yaml
services:
  cloudsaver:
    image: jiangrui1994/cloudsaver:latest
    container_name: cloud-saver
    ports:
      - "8008:8008"
    volumes:
      - /your/local/path/data:/app/data
      - /your/local/path/config:/app/config
    environment:
      - RELEASE_CONTENT_SYNC_MODE=auto
    restart: unless-stopped
```

启动：

```bash
docker compose up -d
```

## 首次启动后

- 访问：`http://<你的服务器IP>:8008`
- 配置文件会自动初始化到 `/app/config/env`
- 默认邀请码：
  - 管理员：`230713`
  - 普通用户：`9527`

![首次访问的登录与注册页](/screenshots/login.png)

::: tip 建议
生产环境部署后请尽快在配置中修改默认邀请码，并设置强密码的 `JWT_SECRET`（见 [配置说明](/guide/configuration)）。
:::

## 本地开发

环境要求：

- Node.js >= 18
- pnpm >= 8（推荐）

```bash
git clone https://github.com/jiangrui1994/CloudSaver.git
cd CloudSaver
pnpm install
cp backend/.env.example backend/.env
pnpm dev
```

启动后：

- 前端：`http://127.0.0.1:8008`
- 后端：`http://127.0.0.1:8009`

可选：按需调整 `frontend/.env` 中的 API 地址配置。

## 下一步

- 了解 [外部搜索源](/guide/features/external-source)：接入 pansou 等自部署搜索后端
- 查看 [配置说明](/guide/configuration)：环境变量与各功能配置
- 遇到问题先看 [常见问题](/guide/faq)

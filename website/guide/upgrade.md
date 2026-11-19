# 升级指南（Docker 容器）

升级 CloudSaver 非常安全：**数据全部在挂载目录里，数据库结构重启时自动迁移**，拉新镜像重建容器即可。先讲清数据在哪，再按部署方式对号入座。

## 持久化目录（升级前必读）

- `/app/data`：数据库与运行数据（SQLite 数据库默认位于 `backend/data/database.sqlite`）
- `/app/config`：环境配置、版本文案等

请务必通过 Docker 卷挂载保留这两个目录，容器重建后数据不丢失。

[![容器与持久化目录：CloudSaver 容器的 /app/data 与 /app/config 分别挂载到宿主机 data、config 目录，升级时继续使用原有挂载目录](/diagrams/persistent-upgrade.webp)](/diagrams/persistent-upgrade.png)

图中展示容器目录与宿主机目录的挂载关系。更新镜像、重建容器时，继续挂载原有目录即可保留数据与配置。点击图片可查看高清原图。

可选但推荐的保险动作：升级前备份挂载目录——

```bash
cp -r /your/path/data /your/path/data.bak.$(date +%m%d)
cp -r /your/path/config /your/path/config.bak.$(date +%m%d)
```

升级后出现 **Bad Gateway** 属正常：后端服务启动需要 1-2 分钟（含数据库迁移），等日志出现启动成功再刷新页面。

## 方式一：docker compose（推荐）

在 `docker-compose.yml` 所在目录执行：

```bash
docker compose pull      # 拉取最新镜像
docker compose up -d     # 重建容器（数据不丢）
```

旧镜像会残留，可以定期清理：`docker image prune -a`。

## 方式二：docker run

docker run 创建的容器升级需要"停掉旧容器 → 拉新镜像 → 用**完全相同的参数**重建"：

```bash
# 1. 停止并删除旧容器（只删容器，数据在挂载目录不受影响）
docker stop cloud-saver && docker rm cloud-saver

# 2. 拉取新镜像
docker pull jiangrui1994/cloudsaver:latest

# 3. 用与首次部署相同的命令重建（端口、挂载、环境变量保持一致）
docker run -d \
  --name cloud-saver \
  -p 8008:8008 \
  -v /your/local/path/data:/app/data \
  -v /your/local/path/config:/app/config \
  --restart unless-stopped \
  jiangrui1994/cloudsaver:latest
```

::: warning 常见翻车点
重建时**漏掉或改动了挂载路径**是最常见的"数据丢失"原因——不是真丢了，是新容器挂了个空目录。重建前用 `docker inspect cloud-saver | grep -A 3 Mounts` 确认旧容器挂载了哪些目录，原样照抄。嫌麻烦建议迁移到 docker compose（见[快速开始](/guide/quick-start)），以后升级只需两条命令。
:::

## 方式三：群晖 DSM（Container Manager）

1. **注册表**：搜索 `jiangrui1994/cloudsaver` → 下载 `latest` 标签
2. **容器**：停止旧的 `cloud-saver` 容器 → **清除**（删除容器）
3. **映像**：用新拉取的映像**重新创建容器**，向导中端口与卷设置照旧

::: tip 关键确认
创建向导走到存储空间一步时，确认 `/app/data` 与 `/app/config` 两个映射还在且指向原来的目录，再点完成。
:::

用"项目（Project）"方式部署的：项目页面停止 → 编辑（确认镜像 tag 为 `latest`）→ 重新构建并启动即可。

## 方式四：飞牛 fnOS

1. **Docker → 仓库**：搜索 `jiangrui1994/cloudsaver` → 拉取 `latest`
2. **Docker → 容器**：停止并删除旧的 `cloud-saver` 容器
3. **镜像**：用新镜像**重新创建容器**，端口与存储空间映射照旧

## 方式五：Portainer

- **Stacks** 方式部署：进入 Stack → **Pull and redeploy** 一步完成
- 单容器方式：Images 页面 Pull 最新 → Containers 里 **Recreate**（勾选 Re-pull image）

## 进阶：自动更新（Watchtower）

让容器自动跟进新版本（适合追新党，稳定党可忽略）：

```bash
docker run -d \
  --name watchtower \
  --restart unless-stopped \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower \
  --cleanup --interval 86400 cloud-saver
```

每 24 小时检查一次 `cloud-saver` 的新镜像，有更新自动拉取重建并清理旧镜像。建议按 Watchtower 文档配置邮箱 / Telegram 通知，更新结果有感知。

## 镜像版本说明

| 镜像 | 说明 |
| --- | --- |
| `jiangrui1994/cloudsaver` | 正式版（Docker Hub） |
| `jiangrui1994/cloudsaver:test` | 体验版，新功能先行 |
| `ghcr.io/jiangrui1994/cloudsaver[:test]` | 同内容 GHCR 源，Docker Hub 拉取慢时备用 |

Docker Hub 拉取过慢可参考社区方案（如 [DockerTarBuilder](https://github.com/wukongdaily/DockerTarBuilder) 在 GitHub Actions 构建镜像压缩包导入本地）。

## 升级后

- 打开 `http://<IP>:8008`，等 1-2 分钟后端就绪（期间 Bad Gateway 勿慌）
- 数据库结构**自动迁移**，无需手动执行脚本
- `release-content.local.json` 按 `RELEASE_CONTENT_SYNC_MODE` 自动处理（默认 `auto`：仅当镜像版本更高时覆盖）
- 左下角版本号确认已更新；各版本更新内容见 [版本日志](/release-notes/)

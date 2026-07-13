# CloudSaver Agent CLI

CloudSaver CLI 让 Codex、OpenClaw 等 Agent 通过命令行调用用户自己部署的 CloudSaver API。它只输出 JSON，成功输出到 stdout，失败输出到 stderr 并返回非零退出码，便于自动化流程稳定解析。

## 配置

生产部署通过 Nginx 暴露 API 时，地址通常以 `/api` 结尾：

```bash
export CLOUDSAVER_API_URL="http://你的服务器:8008/api"
export CLOUDSAVER_TOKEN="设置页面生成的 cs_ 开头长期 Token"
```

如果直接连接后端的 `8009` 端口，则不要添加 `/api`：

```bash
export CLOUDSAVER_API_URL="http://127.0.0.1:8009"
```

推荐在 CloudSaver 的“设置 → API Token”中生成专属长期 Token。明文只显示一次，服务端仅保存哈希。Token 只通过环境变量或 `--token` 传入，CLI 不会将它写入磁盘。可用 `CLOUDSAVER_TIMEOUT` 设置超时时间，默认是 16000 毫秒。

## Agent 能力发现

```bash
node cli/src/cli.js capabilities --pretty
```

该命令无需 API 地址或 Token，会返回所有命令、参数和认证要求的 JSON 描述。Agent 应先调用它了解能力。

## 登录并取得 Token

```bash
node cli/src/cli.js login \
  --api-url "http://127.0.0.1:8008/api" \
  --username "用户名" \
  --password "密码"
```

登录响应中的短期 `data.token` 也可临时设置为 `CLOUDSAVER_TOKEN`，但会在 6 小时后过期。长期自动化应使用设置页面生成的 API Token。在多人或共享机器上，建议通过受保护的环境变量传递密码和 Token，避免把凭据写进脚本或聊天记录。

## 搜索资源

```bash
node cli/src/cli.js search --keyword "流浪地球" --pretty
```

加载指定频道的下一页：

```bash
node cli/src/cli.js search \
  --keyword "流浪地球" \
  --channel-id "频道 ID" \
  --last-message-id "上一页最后一条消息 ID"
```

## 解析分享链接

CLI 可以直接从 115 或夸克分享 URL 提取分享码：

```bash
node cli/src/cli.js share-info --provider 115 --url "https://115.com/s/分享码?password=提取码"
node cli/src/cli.js share-info --provider quark --url "https://pan.quark.cn/s/分享码"
```

也可以显式传参：

```bash
node cli/src/cli.js share-info --provider 115 --share-code "分享码" --receive-code "提取码"
```

## 查询目录与转存

```bash
node cli/src/cli.js folders --provider quark --parent-cid 0

node cli/src/cli.js save \
  --provider quark \
  --share-code "share-info 返回的 pwdId" \
  --receive-code "share-info 返回的 stoken" \
  --folder-id "目标目录 ID" \
  --file-ids "文件 ID 1,文件 ID 2" \
  --file-id-tokens "文件 Token 1,文件 Token 2"
```

115 转存不需要 `--file-id-tokens`。执行目录和转存前，需要先在 CloudSaver 网页设置相应网盘 Cookie。

## 其他命令

```bash
node cli/src/cli.js douban-hot --type movie --tag 热门 --limit 20 --start 0
node cli/src/cli.js settings-get
node cli/src/cli.js sponsors
```

保存用户网盘 Cookie：

```bash
node cli/src/cli.js settings-save \
  --user-settings-json '{"cloud115Cookie":"...","quarkCookie":"..."}'
```

调用未来新增、CLI 尚未封装的 API：

```bash
node cli/src/cli.js request \
  --method GET \
  --path /search \
  --query-json '{"keyword":"电影"}'
```

## Agent 调用约定

- 先运行 `cloudsaver capabilities` 获取机器可读的能力描述。
- 在仓库中使用 `node cli/src/cli.js` 可避免 npm 输出干扰 JSON；执行 `npm install` 后也可以直接使用 `./node_modules/.bin/cloudsaver`。
- 只解析 stdout 的 JSON；进程退出码非零表示调用失败。
- 成功响应固定包含 `ok: true`、`command`、`code` 和 `data`。
- 错误响应固定包含 `ok: false` 和 `error.message`，可能包含 `error.code`、`error.status`、`error.details`。
- 搜索、解析和浏览属于只读操作；`save` 与 `settings-save` 会修改远端状态，Agent 应在调用前取得用户授权。

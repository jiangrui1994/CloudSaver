# 外部搜索源

> 配置即可接入——不改一行代码，把你自己部署的搜索后端（如 [pansou](https://github.com/fish2018/pansou)）接进 CloudSaver 的资源搜索，结果和频道内容并排展示。v0.10.0 起可用。

## 背景故事与作者手记

### 1. 用户反馈的高频痛点
在社群和 Issue 反馈中，有两个声音出现得最频繁：
* **网络门槛**：CloudSaver 此前必须具备能够访问 Telegram 的网络条件才能使用，一些没有特殊网络环境的用户完全无法体验；
* **搜索体验受限**：很多用户的主要诉求就是“找资源”，但 Telegram 频道的原生中文搜索能力确实“一言难尽”，常常出现明明频道里有资源却搜不出来的情况。

每当用户遇到无法连接 Telegram，或者搜不到想要的冷门资源时，我都会真诚地向他们推荐另一个非常优秀的开源项目——[pansou](https://github.com/fish2018/pansou)。

### 2. 为什么 CloudSaver 一直只做 TG 频道？
很多人好奇：为什么 CloudSaver 不一开始就做全网聚合搜索？
**因为对于我个人而言，CloudSaver 的核心定位更像是一个「Telegram 资源频道订阅器」**：
* 闲暇的时候，打开 CloudSaver 刷新一下最新的频道消息；
* 相比于纯文字链接列表，我更喜欢 TG 频道里由众多热心老哥精心维护的**精美海报墙与详细图文排版**；
* 遇到感兴趣的封面或影片，长按标题选词跳转豆瓣查看评分与影评口碑，觉得好看再一键转存到网盘。

这种“逛资源杂志”的惬意体验，是纯文字搜索给不了的。因此在单纯的“关键词搜索”这件事上，CloudSaver 从来不是最全、最好的，而专注于多插件聚合搜索的 pansou 则极其出色。

### 3. 为什么不直接在 CloudSaver 里“内置” pansou？
* **定位不同**：pansou 专注在 16+ 第三方源的爬虫与聚合检索，而 CloudSaver 专注在资源浏览、豆瓣联动、网盘转存与下游推送。
* **尊重生态与解耦**：如果直接内置死某个具体项目的代码，既增加了维护包袱，也限制了用户的选择自由。

### 4. 催生外部搜索源的契机：优雅协同，告别割裂
当我推荐大家去用 pansou 时，很多朋友反馈：
> “pansou 的插件搜出来的资源确实多，但我们又极其想要 CloudSaver 的**一键转存**和**转存后的插件联动推送**（比如自动推送到下载器或消息通知）啊！”

其实 CloudSaver 原本就有一个相对隐蔽的小彩蛋功能：**把在任何地方复制到的网盘链接，直接粘贴到 CloudSaver 的搜索框里回车，系统就会自动解析并提供一键转存**。但这个方式需要用户在两个网页或应用之间来回复制、粘贴、切换，体验依然不够顺畅。

于是我认真思考：既然大家既想要 pansou 丰富的插件源，又想要 CloudSaver 的一键转存、推送与管理生态，**那为什么不在 CloudSaver 内部做一套通用的外部搜索源引擎呢？**

不改动 CloudSaver 浏览订阅频道的初心，但把搜索源的接入权彻底交给用户——**这就是 v0.10.0「外部搜索源通用引擎」的诞生背景。**

一句话：**CloudSaver 不做最好的搜索，但让最好的搜索为你所用。**

组合玩法：

[![外部搜索源联动：自部署搜索后端经一次配置接入 CloudSaver，完成结果展示、链接识别、网盘转存与推送](/diagrams/external-source-integration.png)](/diagrams/external-source-integration.png)

::: details 查看文字版流程
1. **准备搜索后端**：pansou 或任意自部署的 JSON 搜索 API，提供丰富的插件搜索源，无需 TG 网络环境。
2. **配置一次**：通过外部搜索源接入 CloudSaver。
3. **展示与联动**：搜索结果分组展示，识别网盘链接并提取磁力 / ED2K，一键转存到夸克 / 115 / 天翼 / 123 网盘，转存后联动推送。
:::

## 能力速览

| 能力 | 说明 |
| --- | --- |
| **请求模板** | URL 中 `{keyword}` 自动替换为搜索词（含 URL 编码）；GET / POST、自定义请求头（可携带鉴权 token）、POST JSON Body、按源独立超时（1-30 秒） |
| **响应字段映射** | 点路径定位结果数组（如 `data.results`）；标题 / 完整标题 / 正文 / 时间 / 封面自由映射；支持数组下标（`images.0`） |
| **云盘链接映射** | 表单三态：**关闭**（从正文文本提取）/ **链接数组**（结构化 links，如 pansou）/ **单链接字段**（链接平铺在记录上）；网盘类型支持别名归一（`115 → pan115`），未映射时按链接 URL 自动识别（11 类主流网盘） |
| **磁力 / ED2K** | 三种模式下都会从标题与正文自动提取，提供独立复制入口 |
| **预置模板** | pansou 模板开箱即用（改个地址即可）；另有通用 JSON 模板与网盘专属源变体 |
| **调试面板** | 保存前发送测试请求：原始响应与映射结果对照预览、字段错误逐条标出、被过滤条数一目了然 |
| **合并展示** | 外部源以独立分组并入搜索（带「外部源」标识），支持整体**前置到频道结果之前** |
| **容错隔离** | 单个源失败 / 超时只在自己的分组显示「源异常」，不影响频道搜索 |
| **权限** | 配置仅管理员可见可改；搜索结果全员可用 |

## 快速接入（以 pansou 为例）

全程约 10 分钟。

### 第一步：准备搜索后端

```bash
docker run -d --name pansou -p 8888:8080 ghcr.io/fish2018/pansou:latest
```

自测（返回形如 `{"code":0,"data":{"results":[...]}}` 即就绪）：

```bash
curl "http://127.0.0.1:8888/api/search?kw=测试&res=results&src=plugin"
```

### 第二步：网络放行（默认无需任何配置）

**局域网 / NAS / Docker 部署开箱即用**，内网与本机地址直接填进请求地址就能用——SSRF 校验默认只限制 http/https 协议，不拦内网目标。

`PLUGIN_ALLOWED_HOSTS`（主机白名单）与 `PLUGIN_BLOCK_PRIVATE_NETWORK`（内网阻断）是**公网部署的可选加固项**，局域网用户跳过：

```yaml
# docker-compose 示例（可选，仅公网部署建议开启）
environment:
  - PLUGIN_ALLOWED_HOSTS=pansou.example.com   # 配置后仅放行列表内主机
  # - PLUGIN_BLOCK_PRIVATE_NETWORK=true       # 阻断内网目标；内网部署请勿开启
```

### 第三步：从模板创建外部源

1. 管理员登录 → 侧边栏 **配置管理 → 外部搜索源**
2. 点 **新增外部源**，选择 **pansou** 模板

   ![从预置模板创建：pansou 开箱即用](/screenshots/external-source-preset.png)

3. 把请求地址改成你的实际地址（模板默认 `http://127.0.0.1:8888/api/search?kw={keyword}&res=results&src=plugin`，只改主机端口即可）

两个参数别删：`res=results` 让 pansou 返回标准结果数组（默认 merge 模式返回按网盘分组的 `merged_by_type`，无法映射）；`src=plugin` 只拉取插件源，避免与频道搜索重复。

### 第四步：调试面板验证

编辑抽屉底部的**调试面板**：输入测试关键词 → 点 **发送测试请求**。结果区给出：

![调试面板：状态摘要、映射错误明细与结果预览](/screenshots/external-source-debug.png)

- **状态摘要**：HTTP 状态、耗时、返回总数 vs 映射后条数（差值 = 被关键词过滤）
- **映射错误**：`listPath` 未命中、链接数组不存在等问题逐条标出
- **原始响应预览** / **映射结果预览**（含网盘类型徽标、磁力 / ED2K）

### 第五步：保存并搜索

保存后回到资源搜索页输入关键词：外部源结果以独立分组出现。想让它排在频道结果前面？配置页工具栏打开 **「外部源排在频道结果之前」** 即可。

> 注意：「最新资源」刷新浏览**不含**外部源（设计如此，外部源仅参与关键词搜索）。

## 配置详解

编辑抽屉支持 **表单模式** 与 **JSON 模式** 双向同步。速查表如下。

![编辑抽屉的表单模式：请求配置、响应映射与调试面板](/screenshots/external-source-editor.png)

### 请求（request）

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `url` | ✓ | 以 `http(s)://` 开头；`{keyword}` 占位符自动替换 |
| `method` | | `GET`（默认）/ `POST` |
| `headers` | | 字符串键值对；鉴权 token 直接填在对应 header 值里（明文存库，建议低权限专用 token） |
| `body` | | 仅 POST 生效；JSON 对象，值支持 `{keyword}` 占位符 |
| `timeoutMs` | | 1000-30000，默认 8000；超时只影响该源自身 |

### 响应映射（response）

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `listPath` | ✓ | 结果数组的点路径：pansou 实际返回 `{"code":0,"data":{"results":[...]}}`，填 `data.results`；其他接口如 `{"data":{"list":[...]}}` 填 `data.list` |
| `fields.*` | | 可映射 `title` / `completeTitle` / `content` / `pubDate` / `image`，值为相对每条记录的路径；支持数组下标（`images.0`）；**title 与 content 至少一项需映射成功，否则该条目被丢弃**；`0001-01-01` 零值时间自动忽略 |
| `cloudLinks` | | 表单三态。数组模式：`from` 填链接数组路径（如 `links`）+ `link`（元素内链接字段）+ 可选 `cloudType`（元素内类型字段）；单链接模式：`from` 留空，`link` 直接填记录上的链接字段（如 `url`） |
| `cloudLinks.typeAliases` | | 外部类型名 → 本站类型（如 `115 → pan115`、`baidu → baiduPan`），配置页有全部可选值提示与自动补全；未映射 / 未识别时按链接 URL 自动识别 |

### 选项（options）

| 字段 | 说明 |
| --- | --- |
| `skipLocalFilter` | 默认会过滤与关键词无关、或不含任何链接（云盘 / 磁力 / ED2K）的条目；开启后保留接口返回的全部条目 |

## 预置模板

### pansou（开箱即用）

```json
{
  "request": {
    "url": "http://127.0.0.1:8888/api/search?kw={keyword}&res=results&src=plugin",
    "method": "GET",
    "headers": {},
    "body": null,
    "timeoutMs": 8000
  },
  "response": {
    "listPath": "data.results",
    "fields": {
      "title": "title",
      "completeTitle": "title",
      "pubDate": "datetime",
      "content": "content",
      "image": "images.0"
    },
    "cloudLinks": {
      "from": "links",
      "link": "url",
      "cloudType": "type",
      "typeAliases": { "baidu": "baiduPan", "115": "pan115", "123": "pan123" }
    }
  },
  "options": { "skipLocalFilter": false }
}
```

### 通用平铺式 API（单链接挂在记录上）

```json
{
  "request": { "url": "https://example.com/api/search?q={keyword}" },
  "response": {
    "listPath": "data.items",
    "fields": { "title": "name", "pubDate": "updated_at", "content": "description" },
    "cloudLinks": { "link": "share_url" }
  }
}
```

`from` 留空 + `link: "share_url"`：每条记录的单个链接字段直接映射为云盘链接，类型按 URL 自动识别。

## 进阶玩法

### 按网盘类型拆分多个 pansou 源

pansou 支持 `cloud_types` 参数。为每个常用网盘建一个专属源（URL 追加 `&cloud_types=quark` / `cloud_types=baidu` 等，源命名「pansou·夸克」），搜索结果天然按网盘分组——只用一个盘的你不必在混合结果里翻找。

**语义**：`cloud_types` 是**包含过滤**——返回的资源至少含一个目标网盘链接（同条资源可能附带其他网盘），不会出现完全没有目标网盘的结果。常用取值：`quark` / `baidu` / `aliyun` / `115` / `uc` / `xunlei` / `tianyi` / `123` / `pikpak` / `magnet` / `ed2k`。

小提示：多个源之间可调整顺序把最常用的放前面；每个源是一次独立请求，拆 2-3 个通常足够；接入公共实例（非自建）时注意对方限流。

### 排序偏好

配置页工具栏的「外部源排在频道结果之前」开关对整页返回与渐进加载均生效；纯外部源场景（未配置任何 TG 频道）直接用关键词搜索即可。

## 设计边界

- 仅支持 **JSON 响应**的 HTTP API（HTML 抓取由频道搜索承担）
- 映射为**声明式点路径**，不执行脚本 / 表达式
- 外部源不支持加载更多（单次返回全部），仅参与**关键词搜索**
- 与频道结果的重复条目暂不去重（pansou 模板 `src=plugin` 已规避大部分）

## 常见问题

| 现象 | 原因与处理 |
| --- | --- |
| 调试报「目标域名不在允许列表中 / 不允许使用内网地址」 | 你开启过可选加固（白名单或内网阻断）：`PLUGIN_ALLOWED_HOSTS` 加入搜索后端主机后重启；内网部署建议直接关闭加固 |
| Docker 里填 `127.0.0.1:8888` 连接拒绝 | `127.0.0.1` 指容器自身。改用容器名（同网桥 `http://pansou:8080`）、宿主机局域网 IP 或 `host.docker.internal` |
| pansou 调试报 listPath 错误，响应里只有 `merged_by_type` | 默认 merge 模式无法映射；URL 加 `res=results`（预置模板已内置） |
| `totalItems` > 0 但 `itemCount` = 0 | 差值即被过滤数：换更贴合接口内容的关键词；检查 `title`/`content` 映射；或临时开启「跳过本地过滤」观察 |
| 结果无网盘徽标 / 不能转存 | 链接 URL 不在已知 11 类网盘内，类型为 `unknown`，按普通链接展示（可复制） |
| 与频道搜索大量重复 | pansou 模板确认带 `src=plugin` |
| 「最新资源」里没有外部源 | 设计行为：外部源仅参与关键词搜索 |
| 分组头显示「源异常」 | 该源本次失败（超时 / HTTP 错误 / 映射失败），不影响其他频道；到调试面板看具体错误 |
| 只配了外部源、没加频道，首页提示「请先添加搜索频道或外部搜索源」 | 配好第一个源后关键词搜索即可正常出结果；刷新浏览依赖频道，此时不可用属预期 |

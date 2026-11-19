# 官网流程图

使用内置 `image_gen` 生成，统一采用蓝紫色文档插图风格。

| 图片 | 使用位置 |
| --- | --- |
| `cloudsaver-workflow.png` | `guide/what-is.md` 的「工作原理」 |
| `external-source-integration.png` | `guide/features/external-source.md` 的「组合玩法」 |

## 文章补充配图

本批配图复用项目现有的 [CS logo](../logo.png)。文章内展示无损压缩的 WebP，点击图片打开 PNG 原图，文字说明保留在对应章节中。

| 图片（同名 PNG / WebP） | 使用位置 | 表达内容 |
| --- | --- | --- |
| `first-run-roadmap` | `guide/getting-started.md` 的引言之后 | 首次配置的五步顺序与按需配置项 |
| `push-automation` | `guide/features/push-plugins.md` 的「使用场景」 | 转存后可选的四类自动化联动 |
| `cloud-drive-support` | `guide/features/search-channels.md` 的「目前支持抓取的网盘类型」 | 区分一键转存、链接跳转和磁力 / ED2K 复制 |
| `persistent-upgrade` | `guide/upgrade.md` 的「持久化目录」 | 容器与宿主机 data / config 目录的挂载关系 |
| `runtime-architecture` | `dev/index.md` 的「架构概览」 | Docker 单容器内 Nginx、前端、后端与数据库的请求路径 |

完整生成提示词与插入位置见 [article-illustrations-prompts.json](./article-illustrations-prompts.json)。架构信息已对照项目 `Dockerfile`、`nginx.conf`；一键转存范围已对照 `frontend/src/constants/index.ts` 的 `SUPPORTED_CLOUD_TYPES`。

## 工作原理：完整生成提示词

```text
Use case: infographic-diagram.
Asset type: production-ready Chinese product documentation illustration for CloudSaver, to replace a plain ASCII flowchart in a VitePress documentation website.
Art direction: exceptionally clean, professional, precise product information design. White/off-white canvas (#FFFFFF / #F8FAFF), restrained indigo-blue (#5B62D8) and periwinkle accents matching the site's existing blue-purple links, dark slate text (#243047). Flat vector-like artwork rendered as a high-resolution raster, crisp outlines, refined rounded rectangular cards, very subtle shadows, thoughtful spacing, small tasteful line icons with pale indigo backgrounds. No photorealism, no 3D, no neon, no cartoon, no busy decoration, no patterned background, no watermark, no fake software screenshots.
Typography is the focus: perfectly legible Simplified Chinese, clean modern Chinese sans serif similar to Noto Sans SC, correct glyphs, strong hierarchy, substantial body text. Treat the exact Chinese labels below as a strict specification. No extra invented text. Design for a website content column about 700 CSS px wide; labels must remain readable at that display size. Large high-resolution landscape canvas around 2400 x 1400 px (roughly 12:7), modest outer padding, no huge empty margins. Fully opaque background. Consistent stroke weight and card corner radius.
Primary request: Create the overview workflow for CloudSaver. Three equal-width stages arranged left to right, connected by short clear indigo arrows BETWEEN cards. Three aligned cards form a single continuous logical flow. Each stage has a small sequential marker 01, 02, 03, a simple icon, and a bold stage heading, with three separated text rows inside. The central card may have a slightly stronger indigo outline to anchor the composition. Make the layout spacious and immediately understandable, diagram first, not a marketing poster.
Text (verbatim), in correct left-to-right order:
LEFT STAGE heading: "搜索入口"
Row 1: "TG 频道（订阅）"
Row 2: "外部搜索源"
Row 3: "粘贴网盘链接"
Use paper-plane / plug / link icons, small and restrained.
CENTER STAGE heading: "处理与展示"
Row 1 split across two lines if useful: "统一搜索结果" / "分组展示"
Row 2 split across two lines if useful: "链接识别" / "磁力 / ED2K"
Row 3 split across two lines if useful: "豆瓣评分" / "详情联动"
Use stack-of-results / chain-link / star icons. Keep both parts of every label.
RIGHT STAGE heading: "生态联动"
Row 1: "一键转存到网盘"
Row 2: "转存后推送触发"
Row 3: "自动追更 / 同步"
Use cloud-download / bell / circular-sync icons.
A small understated "CloudSaver" wordmark may appear in the upper left, but no other title, tagline or footer. The essential visual hierarchy is three large Chinese headings and the precise flow between them. Every row stays within its own card; no crossing arrows, no clipped text.
```

## 外部搜索源：完整生成提示词

```text
Use case: infographic-diagram.
Asset type: production-ready Chinese product documentation illustration for CloudSaver, to replace a plain ASCII flowchart in a VitePress documentation website.
Art direction: exceptionally clean, professional, precise product information design. White/off-white canvas (#FFFFFF / #F8FAFF), restrained indigo-blue (#5B62D8) and periwinkle accents matching the site's existing blue-purple links, dark slate text (#243047). Flat vector-like artwork rendered as a high-resolution raster, crisp outlines, refined rounded rectangular cards, very subtle shadows, thoughtful spacing, small tasteful line icons with pale indigo backgrounds. No photorealism, no 3D, no neon, no cartoon, no busy decoration, no patterned background, no watermark, no fake software screenshots.
Typography is the focus: perfectly legible Simplified Chinese, clean modern Chinese sans serif similar to Noto Sans SC, correct glyphs, strong hierarchy, substantial body text. Treat the exact Chinese labels below as a strict specification. No extra invented text. Design for a website content column about 700 CSS px wide; labels must remain readable at that display size. Large high-resolution landscape canvas around 2400 x 1400 px (roughly 12:7), modest outer padding, no huge empty margins. Fully opaque background. Consistent stroke weight and card corner radius.
Primary request: Create an integration workflow showing a self-hosted search backend connected once to CloudSaver. Two main side-by-side panels with a generous clear connector area between them. LEFT panel about 34% width, RIGHT panel about 48%, connector about 18%. Both panels aligned top and bottom; keep card text comfortably large. The connector is a simple left-to-right indigo arrow through a small plug motif, with two compact labels above and below. It must read as connecting two complementary tools.
Text (verbatim):
LEFT panel heading: "搜索后端"
Secondary label: "pansou / JSON API"
Two prominent rows with small icons:
"丰富的插件搜索源"
"无需 TG 网络环境"
Use a tasteful server-stack icon near the heading and two or three subtle stacked source tiles as a minor visual accent, without extra text.
CENTER connector above arrow: "配置一次"
CENTER connector below arrow, split onto two lines if useful: "外部搜索源"
RIGHT panel heading: "CloudSaver"
Four clearly separated rows, each with a small matching indigo line icon:
"搜索结果分组展示"
"链接识别 / 磁力 / ED2K"
"一键转存到网盘"
"转存后联动推送"
Under the saving row or as a subtle row of light indigo chips: "夸克" "115" "天翼" "123".
Use result-stack / link / cloud-download / bell icons. No other text, tagline or footer. Arrow direction only from the search backend toward CloudSaver. Accurate, polished Chinese developer documentation infographic, cohesive with the three-stage overview workflow from the same documentation.
```


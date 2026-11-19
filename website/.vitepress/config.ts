import { defineConfig } from "vitepress";

// GitHub Pages 子路径部署（无自定义域名）；改用自定义域名时改为 "/" 并添加 CNAME
const BASE = "/CloudSaver/";
const GITHUB_REPO = "https://github.com/jiangrui1994/CloudSaver";

export default defineConfig({
  lang: "zh-CN",
  title: "CloudSaver",
  description:
    "私有化部署的网盘资源搜索与转存平台：TG 频道订阅浏览 + 外部搜索源聚合 + 一键转存与推送",
  base: BASE,
  head: [["link", { rel: "icon", type: "image/png", href: `${BASE}favicon.png` }]],
  ignoreDeadLinks: true,

  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
      themeConfig: {
        logo: { src: "/logo.png", alt: "CloudSaver", width: 28, height: 28 },

        nav: [
          { text: "指南", link: "/guide/what-is", activeMatch: "/guide/" },
          {
            text: "外部搜索源",
            link: "/guide/features/external-source",
            activeMatch: "/guide/features/",
          },
          { text: "版本日志", link: "/release-notes/", activeMatch: "/release-notes/" },
          { text: "开发者", link: "/dev/", activeMatch: "/dev/" },
          { text: "关于", link: "/about", activeMatch: "/about" },
          { text: "赞赏", link: "/sponsor", activeMatch: "/sponsor" },
        ],
        sidebar: {
          "/guide/": [
            {
              text: "快速入门",
              items: [
                { text: "项目介绍", link: "/guide/what-is" },
                { text: "快速部署", link: "/guide/quick-start" },
                { text: "开始使用", link: "/guide/getting-started" },
                { text: "配置说明", link: "/guide/configuration" },
              ],
            },
            {
              text: "功能专题",
              items: [
                { text: "外部搜索源", link: "/guide/features/external-source" },
                { text: "自定义推送", link: "/guide/features/push-plugins" },
                { text: "搜索频道", link: "/guide/features/search-channels" },
                // 后续功能专题：豆瓣 / 转存 / PWA
              ],
            },
            {
              text: "帮助支持",
              items: [
                { text: "常见问题", link: "/guide/faq" },
                { text: "升级指南（Docker）", link: "/guide/upgrade" },
                { text: "赞赏支持", link: "/sponsor" },
              ],
            },
          ],
          "/release-notes/": [
            {
              text: "版本日志",
              items: [
                { text: "版本列表", link: "/release-notes/" },
                { text: "历史归档（0.2.x - 0.9.3）", link: "/release-notes/legacy" },
              ],
            },
          ],
          "/dev/": [
            {
              text: "开发者",
              items: [{ text: "概览", link: "/dev/" }],
            },
          ],
        },

        socialLinks: [{ icon: "github", link: GITHUB_REPO }],
        outline: { level: [2, 3], label: "本页目录" },
        docFooter: { prev: "上一篇", next: "下一篇" },
        lastUpdated: { text: "最后更新", formatOptions: { dateStyle: "short", timeStyle: "short" } },
        returnToTopLabel: "回到顶部",
        sidebarMenuLabel: "菜单",
        darkModeSwitchLabel: "主题",
        lightModeSwitchTitle: "切换到亮色模式",
        darkModeSwitchTitle: "切换到暗色模式",

        search: {
          provider: "local",
          options: {
            translations: {
              button: { buttonText: "搜索文档", buttonAriaLabel: "搜索文档" },
              modal: {
                noResultsText: "没有找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: { selectText: "选择", navigateText: "切换", closeText: "关闭" },
              },
            },
          },
        },

        footer: {
          message: "开源与私有化部署工具，欢迎在 GitHub 关注与交流",
          copyright: "Copyright © 2026 CloudSaver",
        },
      },
    },
  },
});

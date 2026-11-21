# 开发者文档

## 架构概览

- **前端**：Vite + Vue 3 + TypeScript + Pinia + Element Plus（PC）/ Vant（移动端），默认开发端口 `8008`
- **后端**：Express + TypeScript + Sequelize + SQLite，默认端口 `8009`
- **运行时**：Docker 单容器（Nginx 托管前端静态资源并反代 `/api` 到后端）
- **测试**：Vitest（后端与前端均为与源码共置的单元测试）
- **本地开发**：见[快速开始 · 本地开发](/guide/quick-start#本地开发)

[![Docker 运行架构：浏览器经 8008 访问 Nginx，Nginx 托管 Vue 3 前端并将 /api/ 代理到容器内的 Express 8009，后端通过 Sequelize 访问 SQLite](/diagrams/runtime-architecture.webp)](/diagrams/runtime-architecture.png)

图中展示 Docker 部署下的请求路径，前后端位于同一容器内，对外通过 `8008` 提供服务。点击图片可查看高清原图。

## 仓库结构

| 目录 | 说明 |
| --- | --- |
| `frontend/` | 前端应用（FSD 分层：entities / features / stores / views） |
| `backend/` | 后端服务（routes / controllers / services / repositories / models） |
| `docs/` | 技术方案、发版物料与发布流程等开发档案 |
| `website/` | 本文档站（VitePress，GitHub Pages 发布） |

## 贡献指南

1. Fork 本仓库
2. 创建分支：`git checkout -b feat/your-feature`
3. 提交改动：`git commit -m "feat: your feature"`（遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/)）
4. 推送分支并发起 PR

提交前请确保前后端测试与类型检查通过：

```bash
cd backend && npm test && npm run typecheck
cd frontend && npm test && npm run typecheck
```

## 发布流程

版本号与 CHANGELOG 由 `docs/releases/<版本>.json` 作为唯一输入驱动：

```bash
npm run release:prepare -- --notes-file docs/releases/0.10.0.json --type minor
```

详见 [本地发布流程文档](https://github.com/jiangrui1994/CloudSaver/blob/main/docs/RELEASE_PROCESS.md)。

## 技术方案档案

历史功能的技术方案与实施记录保存在仓库 [`docs/optimization/`](https://github.com/jiangrui1994/CloudSaver/tree/main/docs/optimization) 目录，包括外部搜索源引擎的[完整技术方案](https://github.com/jiangrui1994/CloudSaver/blob/main/docs/optimization/OPTIMIZATION_EXTERNAL_SEARCH_SOURCE_TECH_PLAN_2026-11-16.md)等。

## 本文档站

- 技术栈：VitePress，部署于 GitHub Pages
- 本地预览：`cd website && npm install && npm run dev`
- 版本日志页面由 `website/scripts/gen-release-notes.mjs` 从 `docs/releases/*.json` 自动生成

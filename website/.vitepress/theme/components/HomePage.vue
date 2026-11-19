<script setup lang="ts">
import { withBase } from "vitepress";

const saveDrives = [
  { name: "夸克网盘", color: "#00b96b", bg: "rgba(0, 185, 107, 0.12)", border: "rgba(0, 185, 107, 0.35)", badge: "转存" },
  { name: "115网盘", color: "#2563eb", bg: "rgba(37, 99, 235, 0.12)", border: "rgba(37, 99, 235, 0.35)", badge: "转存" },
  { name: "天翼云盘", color: "#0284c7", bg: "rgba(2, 132, 199, 0.12)", border: "rgba(2, 132, 199, 0.35)", badge: "转存" },
  { name: "123云盘", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.12)", border: "rgba(245, 158, 11, 0.35)", badge: "转存" },
];

const parseDrives = [
  { name: "百度网盘", color: "#0ea5e9", bg: "rgba(14, 165, 233, 0.08)", border: "rgba(14, 165, 233, 0.22)" },
  { name: "阿里云盘", color: "#ea580c", bg: "rgba(234, 88, 12, 0.08)", border: "rgba(234, 88, 12, 0.22)" },
  { name: "迅雷云盘", color: "#06b6d4", bg: "rgba(6, 182, 212, 0.08)", border: "rgba(6, 182, 212, 0.22)" },
  { name: "UC网盘", color: "#f97316", bg: "rgba(249, 115, 22, 0.08)", border: "rgba(249, 115, 22, 0.22)" },
  { name: "磁力 / ED2K", color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.08)", border: "rgba(139, 92, 246, 0.22)" },
];

const ecosystemTags = [
  { name: "Docker", color: "#0284c7", bg: "rgba(2, 132, 199, 0.1)", border: "rgba(2, 132, 199, 0.25)" },
  { name: "SQLite", color: "#3b82f6", bg: "rgba(59, 130, 246, 0.1)", border: "rgba(59, 130, 246, 0.25)" },
  { name: "Telegram 频道", color: "#0088cc", bg: "rgba(0, 136, 204, 0.1)", border: "rgba(0, 136, 204, 0.25)" },
  { name: "豆瓣联动", color: "#00b51d", bg: "rgba(0, 181, 29, 0.1)", border: "rgba(0, 181, 29, 0.25)" },
  { name: "Webhook 推送", color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.1)", border: "rgba(139, 92, 246, 0.25)" },
  { name: "PWA 移动端", color: "#ec4899", bg: "rgba(236, 72, 153, 0.1)", border: "rgba(236, 72, 153, 0.25)" },
];

const philosophyCards = [
  {
    icon: "📺",
    tag: "发现方式",
    color: "#2563eb",
    title: "杂志式的频道订阅浏览",
    desc: "找资源并不一定是从特定关键词开始。Telegram 频道中有大量活跃分享者精心整理的海报墙与图文排版，闲暇时翻阅最新分享，随心发现好内容。",
  },
  {
    icon: "🎬",
    tag: "口碑决策",
    color: "#00b51d",
    title: "长按选词搜豆瓣",
    desc: "面对频道标题中混杂的分辨率、年份、压制组等冗余字段，长按标题自由选取片名关键词，一键跳转豆瓣搜索页面查看真实评分与影评口碑。",
  },
  {
    icon: "💾",
    tag: "极简操作",
    color: "#f59e0b",
    title: "简单顺畅的一键转存",
    desc: "遇到心仪资源直接一键转存至夸克、115、天翼、123 网盘（目前支持这 4 款网盘一键转存），并支持选择与管理目标目录；在别处复制的网盘链接贴入搜索框也能直接解析转存。",
  },
];

const workflowSteps = [
  {
    step: "01",
    tag: "订阅发现",
    color: "#06b6d4",
    bg: "rgba(6, 182, 212, 0.12)",
    border: "rgba(6, 182, 212, 0.3)",
    title: "海报墙随心浏览",
    desc: "订阅 Telegram 频道，翻看分享者整理的高清海报与图文排版；亦可接入外部搜索源拓展全网内容。",
  },
  {
    step: "02",
    tag: "选词口碑",
    color: "#00b51d",
    bg: "rgba(0, 181, 29, 0.12)",
    border: "rgba(0, 181, 29, 0.3)",
    title: "长按选词搜豆瓣",
    desc: "长按标题点选片名，一键跳转豆瓣搜索页面查看真实评分与热门影评，好片不漏、差片不踩。",
  },
  {
    step: "03",
    tag: "快捷归档",
    color: "#2563eb",
    bg: "rgba(37, 99, 235, 0.12)",
    border: "rgba(37, 99, 235, 0.3)",
    title: "一键存入个人网盘",
    desc: "支持夸克、115、天翼、123 四大网盘一键转存，自定义目录层级；百度、阿里等网盘支持链接跳转，正文磁力与 ED2K 自动识别提取。",
  },
  {
    step: "04",
    tag: "生态联动",
    color: "#8b5cf6",
    bg: "rgba(139, 92, 246, 0.12)",
    border: "rgba(139, 92, 246, 0.3)",
    title: "自动触发下游推送",
    desc: "转存完成后自动触发 Webhook、消息机器人通知或后续任务，与你自建的媒体库或下载脚本顺畅衔接。",
  },
];
</script>

<template>
  <div class="cs-home">
    <!-- Hero Section -->
    <section class="cs-section cs-hero">
      <div class="cs-container">
        <!-- Brand Lockup: Logo + Project Name + Badge -->
        <div class="cs-hero-brand">
          <div class="cs-brand-logo-box">
            <img :src="withBase('/logo.png')" alt="CloudSaver Logo" class="cs-brand-logo" />
          </div>
          <div class="cs-brand-text-block">
            <span class="cs-brand-name">CloudSaver</span>
            <div class="cs-hero-badge">
              <span class="cs-badge-dot"></span>
              <span>资源发现与转存工具</span>
            </div>
          </div>
        </div>

        <h1 class="cs-hero-title">
          像逛杂志一样发现资源，<br />
          <span class="cs-gradient-text">顺畅转存</span>至你的个人网盘。
        </h1>

        <p class="cs-hero-subtitle">
          Telegram 频道海报墙订阅 · 长按选词搜豆瓣 · 主流网盘一键转存 · 外部搜索源扩展 · 自动化推送联动
        </p>

        <!-- Action Buttons -->
        <div class="cs-hero-actions">
          <a :href="withBase('/guide/quick-start')" class="cs-btn cs-btn-primary">
            快速开始 →
          </a>
          <a :href="withBase('/guide/what-is')" class="cs-btn cs-btn-secondary">
            项目介绍
          </a>
          <a :href="withBase('/guide/features/external-source')" class="cs-btn cs-btn-secondary cs-btn-badge">
            外部搜索源
            <span class="cs-pill">v0.10.0</span>
          </a>
          <a href="https://github.com/jiangrui1994/CloudSaver" target="_blank" rel="noreferrer" class="cs-btn cs-btn-secondary">
            GitHub ⭐
          </a>
        </div>

        <!-- Ecosystem Chips: Vibrant Tints -->
        <div class="cs-chips-wrapper">
          <!-- Row 1: 一键转存 (Highlighted) -->
          <div class="cs-chips-row">
            <span class="cs-chips-label cs-label-save">
              <span class="cs-label-save-tag">⚡ 一键转存</span>
            </span>
            <div class="cs-chips-list">
              <span
                v-for="drive in saveDrives"
                :key="drive.name"
                class="cs-chip cs-chip-save"
                :style="{ color: drive.color, backgroundColor: drive.bg, borderColor: drive.border }"
              >
                <span class="cs-chip-dot" :style="{ backgroundColor: drive.color }"></span>
                <span class="cs-chip-name">{{ drive.name }}</span>
                <span class="cs-chip-badge" :style="{ backgroundColor: drive.color }">{{ drive.badge }}</span>
              </span>
            </div>
          </div>

          <!-- Row 2: 链接识别与跳转 -->
          <div class="cs-chips-row">
            <span class="cs-chips-label">链接解析：</span>
            <div class="cs-chips-list">
              <span
                v-for="drive in parseDrives"
                :key="drive.name"
                class="cs-chip cs-chip-parse"
                :style="{ color: drive.color, backgroundColor: drive.bg, borderColor: drive.border }"
              >
                <span class="cs-chip-dot" :style="{ backgroundColor: drive.color }"></span>
                <span>{{ drive.name }}</span>
              </span>
            </div>
          </div>

          <!-- Row 3: 开放生态 -->
          <div class="cs-chips-row">
            <span class="cs-chips-label">开放生态：</span>
            <div class="cs-chips-list">
              <span
                v-for="eco in ecosystemTags"
                :key="eco.name"
                class="cs-chip"
                :style="{ color: eco.color, backgroundColor: eco.bg, borderColor: eco.border }"
              >
                <span class="cs-chip-dot" :style="{ backgroundColor: eco.color }"></span>
                {{ eco.name }}
              </span>
            </div>
          </div>
        </div>

        <!-- Hero Screenshot Preview -->
        <div class="cs-hero-preview">
          <div class="cs-preview-window">
            <div class="cs-preview-bar">
              <span class="cs-dot red"></span>
              <span class="cs-dot yellow"></span>
              <span class="cs-dot green"></span>
              <span class="cs-preview-title">CloudSaver · 频道订阅海报墙浏览</span>
            </div>
            <img :src="withBase('/screenshots/home-browse.png')" alt="CloudSaver 频道订阅海报墙预览" class="cs-preview-img" />
          </div>
        </div>
      </div>
    </section>

    <!-- Philosophy & Core Experience -->
    <section class="cs-section cs-bg-soft">
      <div class="cs-container">
        <div class="cs-section-header">
          <div class="cs-section-tag">产品理念</div>
          <h2 class="cs-section-title">不仅仅是搜索，更享受「发现」的乐趣</h2>
          <p class="cs-section-desc">
            找资源并不一定是从一个特定的关键词开始搜索。我们更专注于提供沉浸舒适的浏览与收集体验。
          </p>
        </div>

        <div class="cs-grid cs-grid-3">
          <div v-for="card in philosophyCards" :key="card.title" class="cs-card">
            <div class="cs-card-header">
              <span class="cs-card-icon">{{ card.icon }}</span>
              <span class="cs-card-tag" :style="{ color: card.color, borderColor: card.color }">{{ card.tag }}</span>
            </div>
            <h3 class="cs-card-title">{{ card.title }}</h3>
            <p class="cs-card-desc">{{ card.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Complete Workflow -->
    <section class="cs-section">
      <div class="cs-container">
        <div class="cs-section-header">
          <div class="cs-section-tag">体验链路</div>
          <h2 class="cs-section-title">从发现到归档的完整闭环</h2>
          <p class="cs-section-desc">
            每个环节各司其职，串联起从寻找、决策到保存的平滑体验。
          </p>
        </div>

        <div class="cs-workflow-grid">
          <div v-for="step in workflowSteps" :key="step.step" class="cs-workflow-card">
            <div class="cs-workflow-top">
              <span class="cs-workflow-step">{{ step.step }}</span>
              <span
                class="cs-workflow-tag"
                :style="{ color: step.color, backgroundColor: step.bg, borderColor: step.border }"
              >
                {{ step.tag }}
              </span>
            </div>
            <h3 class="cs-workflow-title">{{ step.title }}</h3>
            <p class="cs-workflow-desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- v0.10.0 Spotlight: External Search Source -->
    <section class="cs-section cs-bg-soft">
      <div class="cs-container">
        <div class="cs-spotlight-box">
          <div class="cs-spotlight-content">
            <div class="cs-section-tag cs-tag-hot">v0.10.0 重磅演进</div>
            <h2 class="cs-spotlight-title">外部搜索源通用引擎</h2>
            <p class="cs-spotlight-desc">
              不改动浏览订阅频道的初心，把搜索源的接入权交给用户。无需改动代码，即可接入自部署搜索后端（如 pansou）或任意 JSON 搜索 API。
            </p>

            <ul class="cs-spotlight-list">
              <li>
                <strong>配置即接入</strong>：声明式请求模板与响应字段映射，预置 pansou 模板改个地址就能用。
              </li>
              <li>
                <strong>实时可视化调试</strong>：编辑抽屉内置测试面板，保存前直接看接口原始响应与解析卡片。
              </li>
              <li>
                <strong>解耦网络环境</strong>：无特殊网络条件时，把本地部署的搜索后端作为数据源，纯内网打造转存神器。
              </li>
              <li>
                <strong>生态无缝继承</strong>：外部源搜出来的资源，与频道结果一样享受一键转存与自动化推送。
              </li>
            </ul>

            <div class="cs-spotlight-actions">
              <a :href="withBase('/guide/features/external-source')" class="cs-btn cs-btn-primary">
                查看外部搜索源专题 →
              </a>
            </div>
          </div>

          <div class="cs-spotlight-media">
            <img :src="withBase('/screenshots/external-source-editor.png')" alt="外部搜索源配置与调试" class="cs-spotlight-img" />
          </div>
        </div>
      </div>
    </section>

    <!-- Private & Self-Hosted -->
    <section class="cs-section">
      <div class="cs-container">
        <div class="cs-section-header">
          <div class="cs-section-tag">私有可控</div>
          <h2 class="cs-section-title">私有化自托管，数据由你掌控</h2>
          <p class="cs-section-desc">
            无第三方中转，无使用门槛，简单纯粹的自建工具。
          </p>
        </div>

        <div class="cs-grid cs-grid-3">
          <div class="cs-card">
            <div class="cs-card-icon">🌱</div>
            <h3 class="cs-card-title">开源与个人自建</h3>
            <p class="cs-card-desc">
              源于开源项目与个人日常需求，无强制商业捆绑，私有化自由部署使用。
            </p>
          </div>
          <div class="cs-card">
            <div class="cs-card-icon">🔒</div>
            <h3 class="cs-card-title">数据凭据自持</h3>
            <p class="cs-card-desc">
              网盘 Cookie、搜索源配置与本地数据库全部保留在你的机器上，私密安心。
            </p>
          </div>
          <div class="cs-card">
            <div class="cs-card-icon">⚡</div>
            <h3 class="cs-card-title">极简轻量部署</h3>
            <p class="cs-card-desc">
              单 Docker 容器即可跑起，SQLite 零外部数据库依赖，ARM / x86 通吃。
            </p>
          </div>
        </div>

        <!-- Quick Deploy Command -->
        <div class="cs-deploy-box">
          <div class="cs-deploy-header">
            <span>docker-compose.yml 示例</span>
          </div>
          <pre class="cs-deploy-code"><code>services:
  cloudsaver:
    image: jiangrui1994/cloudsaver:latest
    container_name: cloud-saver
    ports:
      - "8008:8008"
    volumes:
      - ./data:/app/data
      - ./config:/app/config
    restart: unless-stopped</code></pre>
        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="cs-section cs-cta">
      <div class="cs-container cs-cta-inner">
        <h2 class="cs-cta-title">开启更惬意的资源订阅与转存体验</h2>
        <p class="cs-cta-desc">
          部署在自己的 NAS、VPS 或小主机上，只需几分钟即可完成初始配置。
        </p>
        <div class="cs-cta-actions">
          <a :href="withBase('/guide/quick-start')" class="cs-btn cs-btn-primary">
            立即开始部署 →
          </a>
          <a :href="withBase('/guide/what-is')" class="cs-btn cs-btn-secondary">
            阅读项目介绍
          </a>
          <a :href="withBase('/sponsor')" class="cs-btn cs-btn-secondary">
            赞赏支持 ☕
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.cs-home {
  width: 100%;
  color: var(--vp-c-text-1);
}

.cs-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

.cs-section {
  padding: 64px 0;
}

.cs-bg-soft {
  background-color: var(--vp-c-bg-soft);
}

/* Hero */
.cs-hero {
  padding: 48px 0 64px;
  text-align: center;
}

/* Brand Lockup: Logo + Title + Badge */
.cs-hero-brand {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
}

.cs-brand-logo-box {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 6px;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s ease;
}

.cs-brand-logo-box:hover {
  transform: scale(1.05) rotate(-3deg);
}

.cs-brand-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.cs-brand-text-block {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cs-brand-name {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.cs-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 12px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(6, 182, 212, 0.08));
  border: 1px solid rgba(37, 99, 235, 0.28);
  color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
}

.cs-badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--vp-c-brand-1);
  box-shadow: 0 0 8px var(--vp-c-brand-1);
}

.cs-hero-title {
  font-size: 44px;
  line-height: 1.25;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
}

.cs-gradient-text {
  background: linear-gradient(120deg, var(--vp-c-brand-1) 20%, #06b6d4 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cs-hero-subtitle {
  font-size: 17px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  max-width: 740px;
  margin: 0 auto 32px;
}

/* Actions */
.cs-hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 36px;
}

.cs-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 22px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.cs-btn-primary {
  background: linear-gradient(135deg, var(--vp-c-brand-1), #1d4ed8);
  color: #fff;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
}

.cs-btn-primary:hover {
  background: linear-gradient(135deg, #1d4ed8, #1e40af);
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.45);
}

.cs-btn-secondary {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.cs-btn-secondary:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-alt);
}

.cs-pill {
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 999px;
  background: linear-gradient(135deg, #f59e0b, #ea580c);
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.02em;
  box-shadow: 0 2px 6px rgba(234, 88, 12, 0.3);
}

/* Chips Container with vibrant tints */
.cs-chips-wrapper {
  max-width: 860px;
  margin: 0 auto 48px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cs-chips-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}

.cs-chips-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
  font-weight: 600;
  margin-right: 4px;
}

.cs-chips-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.cs-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 999px;
  border: 1px solid transparent;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  backdrop-filter: blur(8px);
}

.cs-chip:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
}

.cs-chip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  opacity: 0.9;
}

.cs-label-save-tag {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  color: #059669;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
  padding: 3px 9px;
  border-radius: 6px;
  letter-spacing: 0.02em;
}

.dark .cs-label-save-tag {
  color: #34d399;
  background: rgba(16, 185, 129, 0.18);
  border-color: rgba(52, 211, 153, 0.35);
}

.cs-chip-save {
  padding: 4px 10px 4px 12px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.cs-chip-badge {
  font-size: 10px;
  color: #ffffff;
  padding: 1px 6px;
  border-radius: 999px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.02em;
}

.cs-chip-parse {
  opacity: 0.92;
  font-weight: 500;
}

/* Preview Window */
.cs-hero-preview {
  margin-top: 20px;
}

.cs-preview-window {
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.09);
  overflow: hidden;
  text-align: left;
}

.dark .cs-preview-window {
  box-shadow: 0 24px 54px rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.12);
}

.cs-preview-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
}

.cs-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.cs-dot.red { background-color: #ff5f56; }
.cs-dot.yellow { background-color: #ffbd2e; }
.cs-dot.green { background-color: #27c93f; }

.cs-preview-title {
  margin-left: 8px;
  font-size: 12px;
  color: var(--vp-c-text-3);
  font-weight: 500;
}

.cs-preview-img {
  width: 100%;
  height: auto;
  display: block;
  border: none;
}

/* Headers */
.cs-section-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 48px;
}

.cs-section-tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 4px 12px;
  border-radius: 999px;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border: 1px solid rgba(37, 99, 235, 0.25);
  margin-bottom: 12px;
}

.cs-tag-hot {
  background: linear-gradient(135deg, rgba(234, 88, 12, 0.12), rgba(245, 158, 11, 0.12));
  color: #ea580c;
  border-color: rgba(234, 88, 12, 0.3);
}

.cs-section-title {
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 12px;
}

.cs-section-desc {
  font-size: 15px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

/* Grids */
.cs-grid {
  display: grid;
  gap: 20px;
}

.cs-grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.cs-card {
  padding: 24px;
  border-radius: 12px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.cs-card:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.08);
}

.cs-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.cs-card-icon {
  font-size: 28px;
}

.cs-card-tag {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid transparent;
  background-color: var(--vp-c-bg-soft);
}

.cs-card-title {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 8px;
}

.cs-card-desc {
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

/* Workflow */
.cs-workflow-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.cs-workflow-card {
  padding: 22px;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: transform 0.2s ease;
}

.cs-workflow-card:hover {
  transform: translateY(-2px);
}

.cs-workflow-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.cs-workflow-step {
  font-size: 22px;
  font-weight: 800;
  color: var(--vp-c-text-1);
  opacity: 0.9;
  letter-spacing: -0.02em;
}

.cs-workflow-tag {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid transparent;
}

.cs-workflow-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
}

.cs-workflow-desc {
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

/* Spotlight */
.cs-spotlight-box {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 36px;
  align-items: center;
  padding: 36px;
  border-radius: 16px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
}

.cs-spotlight-title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 12px;
}

.cs-spotlight-desc {
  font-size: 15px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 20px;
}

.cs-spotlight-list {
  padding-left: 20px;
  margin-bottom: 24px;
  display: grid;
  gap: 10px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.cs-spotlight-media {
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.cs-spotlight-img {
  width: 100%;
  height: auto;
  display: block;
}

/* Deploy Box */
.cs-deploy-box {
  margin-top: 36px;
  border-radius: 10px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
}

.cs-deploy-header {
  padding: 8px 16px;
  font-size: 12px;
  color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-divider);
  font-weight: 500;
}

.cs-deploy-code {
  margin: 0;
  padding: 16px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.5;
  overflow-x: auto;
}

/* CTA */
.cs-cta {
  padding: 80px 0;
  text-align: center;
  background-color: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
}

.cs-cta-inner {
  max-width: 600px;
}

.cs-cta-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
}

.cs-cta-desc {
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin-bottom: 28px;
}

.cs-cta-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

/* Responsive */
@media (max-width: 960px) {
  .cs-hero-title {
    font-size: 34px;
  }
  .cs-grid-3 {
    grid-template-columns: 1fr;
  }
  .cs-workflow-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .cs-spotlight-box {
    grid-template-columns: 1fr;
    padding: 24px;
  }
}

@media (max-width: 640px) {
  .cs-hero-brand {
    flex-direction: column;
    gap: 10px;
  }
  .cs-brand-text-block {
    flex-direction: column;
    gap: 8px;
  }
  .cs-hero-title {
    font-size: 28px;
  }
  .cs-workflow-grid {
    grid-template-columns: 1fr;
  }
  .cs-hero-actions,
  .cs-cta-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .cs-btn {
    justify-content: center;
  }
}
</style>

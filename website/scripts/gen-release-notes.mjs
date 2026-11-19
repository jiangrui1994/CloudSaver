import { readdirSync, readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// 从 docs/releases/*.json 生成官网版本日志页面
const scriptDir = dirname(fileURLToPath(import.meta.url));
const releasesDir = resolve(scriptDir, "../../docs/releases");
const outputDir = resolve(scriptDir, "../release-notes");
// 官网正式域名（version.json 的 releaseNotesUrl 拼接为绝对地址，便于客户端直接使用）
const SITE_BASE = "https://jiangrui1994.github.io/CloudSaver";

const compareVersion = (a, b) => {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i += 1) {
    const diff = (pb[i] || 0) - (pa[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
};

const listFiles = () =>
  existsSync(releasesDir)
    ? readdirSync(releasesDir)
        .filter((name) => name.endsWith(".json"))
        .map((name) => {
          const notes = JSON.parse(readFileSync(join(releasesDir, name), "utf8"));
          return { file: name, notes };
        })
        .filter(({ notes }) => notes && notes.version)
        .sort((a, b) => compareVersion(a.notes.version, b.notes.version))
    : [];

const renderNote = ({ notes }) => `---
title: ${notes.title || `CloudSaver ${notes.version} 版本更新说明`}
description: ${notes.headline || ""}
---

# ${notes.version}

发布于 ${notes.publishedAt || "（未发布）"} · [查看全部版本](/release-notes/)

> ${notes.headline || ""}

${notes.summary || ""}

## 亮点

${(notes.highlights || []).map((item) => `- ${item}`).join("\n")}

${Object.entries(notes.changes || {})
  .map(([group, items]) => `## ${group}\n\n${items.map((item) => `- ${item}`).join("\n")}`)
  .join("\n\n")}
`;

const renderIndex = (entries) => `---
title: 版本日志
description: CloudSaver 各版本更新说明
---

# 版本日志

${entries
  .map(
    ({ notes }) =>
      `- [${notes.version}（${notes.publishedAt || "未发布"}）](/release-notes/${notes.version}) — ${notes.headline || ""}`
  )
  .join("\n")}

更早期的版本（0.2.x - 0.9.3 之前）见[历史版本日志归档](/release-notes/legacy)。
`;

const entries = listFiles();
if (entries.length === 0) {
  console.warn("未找到 docs/releases/*.json，跳过版本日志生成");
  process.exit(0);
}

mkdirSync(outputDir, { recursive: true });
entries.forEach(({ notes }) => {
  writeFileSync(join(outputDir, `${notes.version}.md`), renderNote({ notes }));
});
writeFileSync(join(outputDir, "index.md"), renderIndex(entries));

// 生成 public/version.json：客户端新版本检测的数据源（官网根路径 /version.json 与 jsDelivr 均可读）
const latest = entries[0].notes;
const versionFile = {
  version: latest.version,
  publishedAt: latest.publishedAt || "",
  headline: latest.headline || "",
  highlights: latest.highlights || [],
  releaseNotesUrl: `${SITE_BASE}/release-notes/${latest.version}`,
};
writeFileSync(
  resolve(scriptDir, "../public/version.json"),
  JSON.stringify(versionFile, null, 2) + "\n"
);

console.log(`已生成 ${entries.length} 个版本日志页面 → ${outputDir}`);
console.log(`已生成 version.json → v${latest.version}`);

---
name: skill-index
description: |
  MANDATORY FIRST READ before ANY task. Maps task keywords → required skills.
  Every session: scan this index, match task to skills, read matched skills before acting.
  Burned 2026-07-07 — "为什么你不会经常想起来用已有的skill和sop"
---

# Skill Index 技能索引

> ⛔ **每次收到任务，先查这张表。匹配到关键词 → 读对应的 skill → 再开工。**
> 这不是参考。这是启动流程第一步。

---

## 📋 Quick Match Table

| 任务关键词 | 必读 Skill | 说明 |
|-----------|-----------|------|
| 🎵 音频/TTS/语音/配音/Audio | `edge-tts-sop` + `kee-voice-gen` | Edge TTS 生成 + Kee 声音克隆 |
| 🎤 口语音频/发音分析 | `dynasaurus-audio` | ASR + 发音反馈 |
| 🎨 网页/HTML/页面/landing/前端 | `design-system-kee` + `design-taste-frontend` | Kee 设计系统 + 反模板 |
| 🔗 网页工具箱/链接已有工具 | `course-authoring-sop` §2.6 | KeeBot+音变+CEFR 必须链入新页 |
| 📊 PPT转HTML/课件转换 | `pptx-to-html-sop` | Lossless 6-Phase: 提取→分类→设计→建造→QA→部署 |
| 📄 PPT/Slides/幻灯片/演示 | `guizang-ppt` | 网页 PPT |
| 🎞️ 视频/Video | `video-sop` + `video-edit-local` | 视频嵌入 + 本地编辑 |
| 🏗️ 部署/上线/发布/Deploy | `deploy-sop` + `project-gateway` + `preview-first-deploy` | 部署流水线 + 目录映射 + 先预览 |
| 🧠 学习闭环/RUA/个性化学习 | `dynamos-core` | DynamOS 旗舰: RUA拆解→计划→课件→追踪→分析→优化 |
| 📦 课程/建课/教案/DET/IELTS | `course-authoring-sop` | 课程编纂全流程 |
| 📝 内容/文案/文章/帖子 | `content-creator-suite` + `de-ai-writing` | 平台内容 + 去 AI 化 |
| 🔊 Kee 声音/Kee 配音 | `kee-voice-gen` | VoxCPM-0.5B 克隆 |
| ✂️ 修图/P图/改海报 | `surgical-image-edit` | 精准图片编辑 |
| 🖼️ 成人/NSFW 图片 | `nsfw-image` | Atlas Cloud |
| 🎥 成人/NSFW 视频 | `nsfw-video` | Atlas Cloud |
| 📚 PU/备课/课前/课后 | `pu-production-sop` | Power Up 全流程 |
| 📦 大文件/附件/PPT/PDF下载 | `large-file-sop` | >5MB 上传网页下载 |
| 🖨️ PU Printables/PDF | `pu-printables-pdf` | Chrome PDF 生成 |
| 📋 课前准备 | `pre-class-sop` | 预习页生成 |
| 📊 课后反馈 | `post-class-sop` | 问卷+反馈+作业 |
| 🔄 回滚/恢复 | `rollback-sop` | Vercel 回滚 |
| 🛡️ 防灾难 | `anti-disaster-protocol` | 视觉锁 + vertical slice |
| 🔍 课前验证 | `rule-zero` + `pre-action-sop` | 动手确认 + 三步验证 |
| 🐛 排错/调试/出问题了 | `self-improving-agent` + `engineering-loop` | 错误记录 + 工程循环 |
| ✅ QA/质检/检查质量 | `qa-sop` | 音频视频PDF网页全检 |
| 🔄 更新SOP/改SOP | `sop-update-sop` | 元规则：覆盖旧版删碎片 |
| 🌐 网页交互/复制微信/导出PDF | `web-ux-sop` | 编辑按钮 一键复制 PDF导出 |
| 💬 指示代词/那个/这个/上次 | `imessage-context-sop` | 先搜iMessage再回复 |
| 🗂️ Obsidian 维护 | `obsidian-vault-organizer` | 知识库管理 |
| 📝 记笔记/存档 | `agent-notes-taker` | Obsidian 笔记 |
| 🧠 自动偏好提取/Session总结 | `preference-extraction-sop` | Session结束自动更新USER.md |
| 🔗 提炼 Skill | `distill-to-skill` | 把流程写成 skill |
| 🐦 X/Twitter 链接 | `x-reader` | 读推文 |
| 🤖 AI 工具评估 | `ai-tools-radar` | 工具雷达 |
| 🔬 研究/调研 | `claude-code-research` | Claude Code 研究 |
| 💬 iMessage 新会话 | `imessage-context` | 先查聊天历史 |
| 📡 数据库通知 | `db-notify` | Supabase → iMessage |
| 📊 更新已有项目 | `project-update-sop` | 确认 → vertical slice → QA |
| 🔀 Git 贡献审查 | `oss-contribution-guard` | 假 PR 检测 |

---

## 🎯 按任务类型分类

### 🎨 设计与视觉
```
design-system-kee        → Kee 白 Editorial / 暗黑 App / 瑞士 Editorial
design-taste-frontend    → 反模板 pre-flight + Meta Astryx
web-ux-sop               → 网页交互 (编辑按钮/复制微信/导出PDF)
guizang-ppt              → 网页 PPT (杂志风 / 瑞士风)
editorial-slide-designer → 编辑风格幻灯片
interaction-patterns-kee → 交互模式
gpt-image2-typography    → GPT 图像排版
```

### 🔊 音频与语音
```
edge-tts-sop             → Edge TTS 生成 (慢倍速英式男声等)
kee-voice-gen            → Kee 声音克隆 (VoxCPM-0.5B, 16kHz)
malik-voice-gen          → Malik 声音克隆
dynasaurus-audio         → 发音分析 (MOSS-Audio, GPT-SoVITS, CosyVoice)
```

### 🎬 视频
```
video-sop                → 视频嵌入 + 双语字幕
video-edit-local         → Whisper 转写 + 自动剪辑
video-use                → 视频使用
video-subtitle-pipeline  → 字幕流水线
```

### 📝 内容与文字
```
content-creator-suite    → 平台内容 (anti-slop + 平台格式)
content-voice-kee        → Kee 内容风格
de-ai-writing            → 去 AI 化 (24 种检测模式)
```

### 📚 课程与教学
```
course-authoring-sop     → 课程编纂 Phase 0-5 (先画像→架构→生产→QA→维护)
pu-production-sop        → Power Up 全流程 (视频+网页+PDF)
pre-class-sop            → 课前预习页
post-class-sop           → 课后反馈 (问卷+作业+通知)
pu-printables-pdf        → PU 打印 PDF (Chrome headless)
```

### 🚀 部署与基础设施
```
deploy-sop               → 部署流水线 (所有项目)
project-gateway          → 项目目录映射 (必读！开工前)
preview-first-deploy     → test.rkrk.io 先预览
qa-sop                   → QA质检 (音视频PDF网页全检)
rollback-sop             → Vercel 回滚
large-file-sop           → 大文件上传网页下载
anti-disaster-protocol   → 视觉锁 + vertical slice
engineering-loop         → curl 对比 + 根因检测
dynasaurus-deploy-guard  → DynaSaurus 部署守门员
cloudflare-analytics     → Cloudflare 分析
```

### 🔐 安全与规则
```
rule-zero                → 动手前确认 (绝对第一道闸)
pre-action-sop           → API验证+偏好匹配+源头确认
sop-update-sop           → SOP元规则 (覆盖旧版删碎片)
imessage-context-sop     → iMessage指示代词搜索
self-improving-agent     → 错误学习 + 持续改进
oss-contribution-guard   → OSS 贡献审查
```

### 🧠 知识与记忆
```
agent-notes-taker        → Obsidian 笔记归档
obsidian-vault-organizer → Obsidian 知识库健康检查
distill-to-skill         → 流程提炼为 Skill
mempalace                → 记忆宫殿
```

### 🔗 外部连接
```
x-reader                 → 读取 X/Twitter 内容
ai-tools-radar           → AI 工具雷达
claude-code-research     → Claude Code 研究
mention-router           → @handle 路由
imessage-context         → iMessage 会话启动例程
```

### 🎯 特定产品
```
dynadict                 → DynaDict 词汇提示生成
floating-chat-button     → 浮动聊天按钮
garden-3d-walkthrough    → 3D 花园漫步
image-viewer             → 图片查看器
microcomic               → 微型漫画
radio-station-operator   → 电台操作员
task-tracker             → 任务追踪
chat-history             → 聊天历史
```

### 🖼️ 图片 (成人内容)
```
nsfw-image               → 成人图片 (Wan 2.6, Seedream)
nsfw-video               → 成人视频 (Wan 2.7, Seedance, HappyHorse)
surgical-image-edit      → 精准修图
```

---

## ⛔ Session Startup Protocol (MANDATORY)

```
1. 收到任务
2. 看关键词 → 查上面这张表
3. read 匹配到的 skill 文件
4. 再动手
```

### 常见任务 → 自动匹配示例

| 任务 | 自动加载 Skill |
|------|---------------|
| "建一个 XXX 课程页" | course-authoring-sop → design-system-kee → project-gateway → preview-first-deploy |
| "部署/更新 XXX 网站" | deploy-sop → project-gateway → preview-first-deploy |
| "生成 XXX 音频" | edge-tts-sop → kee-voice-gen |
| "发送大文件/PPT" | large-file-sop |
| "这段文字去 AI 化" | de-ai-writing |
| "发一篇小红书" | content-creator-suite → de-ai-writing |

---

## 📅 维护规则

- 新增 skill → 立即更新此索引
- 发现遗漏的自动匹配 → 补充
- 每个 skill 的 description 必须写清楚触发条件
- 此索引在每次 session start 时自动可查

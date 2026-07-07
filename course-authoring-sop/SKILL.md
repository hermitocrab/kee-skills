---
name: course-authoring-sop
description: |
  Author Course Authoring System — comprehensive SOP for designing courses AND web pages.
  MANDATORY pre-flight before ANY course build or web page build.
  Covers: student profiling → course architecture → content production → AI enhancement → QA & deploy → maintenance.
  Source: rkrk.io/adult-english/course-authoring-sop.html (HTML), MEMORY.md rules.
---

# 课程编纂 SOP v2

> Author · AI-Native Course Authoring System
> 从零到上线：任何课程类型、任何考试、任何水平。
> 这是一台课程工厂。输入学生画像，输出完整课程包。

---

## ⛔ PRE-FLIGHT — BEFORE ANY COURSE OR WEB PAGE BUILD (BURNED 2026-07-07)

**This runs FIRST. Before touching any file. Before spawning any agent.**

### Step 0: iMessage History Check
- **When Author uses 指示代词 (那个/这个/上次说的/前几天) or references prior content** → search iMessage history FIRST before responding
- Command: `imsg history --chat-id 2 --limit 500 | grep -i "<keywords>"`
- Never guess what he's referring to. Find the exact context.

### Step 1: Knowledge Base Check
1. **iCloud Websites folder** — check existing pages:
   ```
   ls "/home/user/Library/Mobile Documents/com~apple~CloudDocs/Websites/<TOPIC>/"
   ```
2. **Obsidian / Wiki** — search for existing notes on the topic
3. **Existing HTML pages** — read them before building new ones to avoid duplication

### Step 2: Deployment Architecture Check (project-gateway)
```
read skills/project-gateway/SKILL.md
```
Verify:
- Which domain? → Which directory deploys to it?
- Local Python server + Tunnel? OR Vercel? OR direct nginx?
- **ielts.rkrk.io** → served by local Python server (`server.py`) through Cloudflare Tunnel → `localhost:9091` — NOT Vercel!
- **New HTML files** → require `server.py` restart to auto-discover routes

### Step 3: Reference Check
- Search iMessage for prior discussions about this exact topic
- Check MEMORY.md for relevant rules
- Read the design-system-kee skill for visual rules

---

## ⛔ SOP 铁律

1. **新 SOP 覆盖旧版** — 所有旧版删除，不留碎片
2. **一个课程一个文件夹** — 不跨项目污染
3. **AI 生成 → 人审核 → 部署** — 三步闭环，缺一不可
4. **素材优先于设计** — 内容对了再排版，别反过来
5. **学生视角是唯一视角** — 每份材料都要问：学生拿到手知道怎么用吗？
6. **⛔ 先查后建** — 开工前必须跑完 Pre-Flight 才能碰文件 (BURNED 2026-07-07)
7. **⛔ iMessage 指示代词检测** — Author 说"那个/这个"时先搜聊天记录 (BURNED 2026-07-07)

---

## Phase 0：课程画像（2h）

在碰任何文件之前，先回答这 8 个问题。答不出来就别开工。

### 0.1 学生画像

```
学生是谁？
- 年龄段：6-8 / 9-12 / 13-17 / 18+ / 成人
- 当前水平：用可验证的分数说话（IELTS 4.5 / TOEFL 65 / CEFR A2 / KET Pass）
- 目标分数/水平：具体到数字
- 出分紧迫性：1 个月冲刺 / 3 个月系统 / 6 个月长期
- 学习风格：自律型 / 需要催 / 完全躺平
- 家长参与度：直升机家长 / 正常关注 / 完全甩手 / 不存在（成人学生）
```

### 0.2 课程定义

```
课程是什么？
- 类型：考试提分 / 能力提升 / 兴趣拓展 / 考前冲刺
- 考试：IELTS / TOEFL / PTE / KET / PET / DET / 中高考 / 其他
- 科目：全科 / 口语单项 / 听力单项 / 写作单项 / 阅读单项
- 总课时：____小时（____次课，每次____小时）
- 班型：1v1 / 小班（2-3人）/ 班课（4-8人）
- 上课形式：线下 / 线上 / 混合
```

### 0.3 资源盘点

**MANDATORY: Check these sources before declaring "no resources exist":**

```
已有资源：
- Teaching Arsenal 里有没有这个考试的资料？路径：_______
- iCloud Websites 里有没有现成页面？
  ls "/home/user/Library/Mobile Documents/com~apple~CloudDocs/Websites/<考试名>/"
- 有没有合适的教材？书名：_______
- 有没有真题/模考题库？来源：_______
- 有没有现成的 PPT/教案可以改？路径：_______
- Obsidian 里有没有相关笔记？

缺什么：
- 需要买什么教材？
- 需要从哪里找真题？
- 需要 AI 生成什么？
```

### 0.4 输出：课程画像卡片

ChatGPT 用以下 prompt 生成一页《课程画像》：

```
你是一个课程设计师。根据以下信息，生成一页《课程画像》卡片：

学生信息：[粘贴 0.1]
课程定义：[粘贴 0.2]
资源盘点：[粘贴 0.3]

输出格式：
📊 学生画像 — 3 句话描述这个学生
🎯 提分目标 — 从 X 分到 Y 分，最大的杠杆点是什么
📅 课次规划 — 总课时如何分配到各科目/各阶段
📚 核心教材 — 主教材 + 辅助材料清单
⚠️ 风险预警 — 最大的阻碍是什么
💡 Kee 策略 — 如果是 Kee，他会怎么教这个学生？

保持简洁，一页纸。
```

---

## Phase 1：课程架构（4h）

### 1.1 大纲制定

从 Teaching Arsenal 的磁课 syllabus 库中找最接近的模板，用 ChatGPT 定制。

**Prompt：**

```
你是 [考试名称] 课程设计师。根据以下课程画像，制定完整课程大纲：

课程画像：[粘贴 Phase 0 输出]

要求：
1. 总课时分配到每次课（不是笼统的"听力20h"，是"第1次课：Section 1 个人信息题 · 2h"）
2. 每次课包含：教学目标 + 核心内容 + 使用教材页码 + 课后作业
3. 标注 3 个阶段节点
4. 参考 RUA 框架：Recognise → Understand → Apply
5. 如果学生是低龄（<12岁），每 1h 插入 10min 活动环节

输出格式：表格，每行一次课
```

### 1.2 教材适配

如果使用现成教材，做适配而不是重写：
- 标注哪些单元直接用（打 ✅）
- 标注哪些单元需要改编（打 🔧）—— 写清楚怎么改
- 标注哪些单元跳过（打 ❌）—— 写清楚为什么

### 1.3 课时分配检查

```
□ 听力、口语、阅读、写作四个技能都覆盖了吗？
□ 如果有词汇/语法薄弱，单独安排了课时吗？
□ 模考安排了几次？至少 3 次
□ 最后一次课和考试之间的间隔是否合理？（至少 3-7 天缓冲）
□ 如果学生中途进度落后，哪些课时可以压缩？哪些绝对不能动？
```

---

## Phase 2：内容生产（按课时逐个进行）

### 2.1 词汇表生产

```
为 [考试] [水平] 学生生成 [话题] 词汇表。

要求：
1. 12-15 个核心词汇
2. 每个词汇包含：英文、中文释义、词性、IPA音标、1个例句、1个常用搭配
3. 按难度分级标注：⭐基础词、⭐⭐核心词、⭐⭐⭐拓展词
4. 标注中国学生常见错误
5. 提供 3 个同义替换组
```

### 2.2 教案生产

教案结构（Kee 的标准格式）：

```
📋 第 X 次课 · [课题] · [时长]

🎯 教学目标
学完这节课，学生能：
- 用 [语法点] 造 3 个完整的句子
- 听懂 [听力场景] 的关键信息
- 就 [口语话题] 讲述 2 分钟以上

📝 教学材料
- 教材：[书名] 第 X 单元 第 Y-Z 页
- 补充材料：[worksheet / 视频 / 音频]
- 词汇表：[附链接]

⏱️ 课堂流程（[总时长]）
Part 1（[时长]）：R→U→A
Part 2（[时长]）：R→U→A

📤 课后作业
1. [具体任务，定量]
2. [具体任务，定量]

⚠️ 常见问题预警
- 学生可能会在 [某知识点] 上卡住 → 备用解释方式
```

### 2.3 课件/PPT 生产

- 有现成 PPT → 直接改，不重做
- 没有现成 → AI 生成初稿 + 人工排版

### 2.4 练习/Worksheet 生产

```
根据以下教案生成一份学生 Worksheet（可打印）。
要求：
1. 4 个练习板块：词汇 → 语法 → 听力/阅读 → 输出
2. 难度递进
3. 包含 answer key
4. 每个练习标注建议时长
5. 留出足够的书写空间
```

### 2.5 听力/视频素材

- 视频素材遵循 `video-sop`
- 听力题用 AI 生成，标注定位词

### 2.6 网页课程页面生产

**Design**: 遵循 `design-system-kee` SKILL.md。White Editorial for courseware / Dark App for student-facing tools。
**Deploy**: 遵循 `project-gateway` + `deploy-sop` SKILL.md。
**Preview**: 遵循 `preview-first-deploy` SKILL.md — test.rkrk.io first。

**⛔ 网页设计铁律 (BURNED 2026-07-07)**:

**① Vertical Slice 先提炼**
- 开工前先提取页面所有关键信息
- 按重要性排序，确定信息层级
- 不要边写边想——先有结构图再写代码

**② 设计研究必须做**
- 搜索 Awwwards / Dribbble / Behance 找同类内容的最佳设计
- 提取：布局模式、配色方案、交互方式、字体层级
- 不要凭空设计——站在最好的设计肩膀上

**③ 必须有设计感**
- 信息要灵动不死板——用卡片、时间线、热力图代替纯表格
- 设计要精巧——间距、阴影、圆角、字体对比都要精心调
- ⛔ 拒绝原生 HTML table、拒绝文字墙

**④ 信息墙加前置 Quote**
- 任何密集信息段前面加 pull quote / 摘要
- 用大号字体 + 左边框 + italic 突出
- 让学生一眼知道这段在说什么

**⑤ 必须有 Hero**
- 每页顶部有视觉冲击力的 hero section
- 包含：标题、副标题、核心数据（时长/题量/级别）、CTA
- 可以渐变背景、大号数字、品牌色 accent

**⑥ 交互设计要精妙**
- 浮层 overlay / modal 展示细节（不要 accordion 推内容）
- 横向滑动卡片条（scroll-snap）用于同类内容
- 锚点平滑滚动 sticky 侧边栏
- hover 有反馈 transition 丝滑

**⑦ 信息层级要可见**
- 通过缩进 margin-left / padding-left 表达父子关系
- 通过字体大小 clamp() 表达重要性
- 通过颜色深浅表达主次
- 不要所有文字一样大一样色

**⛔ 工具箱链接规则 (BURNED 2026-07-07)**:
- 生成任何新网页时，必须搜索已有工具页面并链入
- **KeeBot (DeepSeek AI 助手) 必须出现在所有新页面中**
- 搜索范围：知识库 / memory.md / imsg 记录 / 已有网站
- 判断标准：是否适用由 agent 决定
- 适用工具示例：音变训练 phonetics / 白板 whiteboard / CEFR 解读 / 思维导图 mindmap / 语法 grammar / 语篇标记 discourse-markers
- 每个链接格式：emoji + 中文名 + English 名 + 简短描述 + 🚀 跳转按钮

Web page pre-flight:
```
□ 读了 design-system-kee/SKILL.md？
□ 确定了用哪个设计系统？（White / Swiss / Dark App）
□ 读了 design-taste-frontend/SKILL.md？
□ 检查了目标部署架构？（Tunnel vs Vercel vs nginx）
□ 如果是 ielts.rkrk.io：文件放 dev/ielts-with-kee/，重启 server.py
□ 先 deploy 到 test.rkrk.io，Author 审批后再上生产
```

---

## Phase 3：AI 增强

### 3.1 口语陪练

见 TA SOP 第二章。

### 3.2 作文批改

```
你是 [考试] 写作考官。批改以下作文：
1. 按评分标准逐项打分
2. 标出 3 个语法错误并解释
3. 标出 3 个中式表达并给出地道替换
4. 给一个"升级版"范文段落
5. 给出 1 个最重要的改进建议（不要泛泛说"多练习"）
```

### 3.3 学情分析

```
分析以下学生的 4 周学习数据，生成学情报告：
1. 📈 趋势描述
2. 🎯 最大进步点
3. ⚠️ 停滞/退步点 + 可能原因
4. 📅 下阶段调整建议
5. 👨‍👩‍👧 家长沟通要点
```

---

## Phase 4：QA & 部署

### 4.1 课程 QA Checklist

```
□ 每节课都有完整教案？
□ 每节课都有对应词汇表？
□ 每节课都有 worksheet 或练习材料？
□ 听力/视频素材的字幕和音频同步了吗？
□ PPT 排版统一吗？
□ 所有发给学生的文件都是 PDF 吗？
□ 文件命名清晰吗？
□ 中英文双语标注了吗？
```

### 4.2 Web Page QA Checklist (BURNED 2026-07-07)

```
□ design-taste-frontend 8-point pre-flight passed？
□ 移动端 320px 不溢出？
□ text-overflow: word-break:break-word on inline text？
□ overflow-x:hidden on body？
□ 缓存刷新链接 ?v=N appended？
□ 发给 Author 的链接是最新版？
```

### 4.3 部署

**静态内容** → `~/dev/rkrk.io/` 或对应项目目录

**ielts.rkrk.io** → `~/dev/ielts-with-kee/` → 重启 server.py:
```bash
pkill -f "server.py"
cd ~/dev/ielts-with-kee && PORT=9091 nohup python3 server.py > /tmp/ielts-server.log 2>&1 &
```

**rkrk.io** → Cloudflare Tunnel `hairuis` → nginx

**Vercel 项目** → `vercel --prod --yes`

部署后必须做：
1. 手机打开看一眼
2. 缓存刷新链接（`?v=timestamp`）
3. 发链接给 Author

---

## Phase 5：课后维护

### 5.1 学生追踪

每次课后更新：出勤、作业完成度、课堂表现（1-5 分 + 一句话）、下次课关注点

### 5.2 课程迭代

每 4 次课后回顾：哪些好？哪些卡？进度落后？模考有变化？

---

## 附录：快速启动指南

### 30 分钟出一门课的最短路径

```
1. 打开 Teaching Arsenal → 找到最接近的课程模板
2. 复制 syllabus Excel → ChatGPT 定制 → 10min
3. 用 Phase 0 prompt 生成课程画像 → 5min
4. 确认第一节课教案 + 词汇表 → 10min
5. 部署 → 5min
```

### 快速启动：建一个课程网页

```
1. 搜 iMessage 历史 → 确认 Author 的需求上下文
2. 查 iCloud Websites → 读已有页面 → 避免重复
3. 跑 project-gateway → 确认部署架构
4. 读 design-system-kee → 确认设计系统
5. 建页 → preview (test.rkrk.io) → Author 审批 → 生产
6. 重启 server.py（如果是 Tunnel 服务）
7. 发链接 ?v=N 给 Author
```

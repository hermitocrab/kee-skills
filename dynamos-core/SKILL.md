---
name: dynamos-core
description: |
  DynamOS flagship skill. RUA-powered closed-loop learning system.
  Takes any learning goal → decomposes with RUA → generates daily plans + HTML courseware →
  tracks completion → analyzes mastery → identifies pain points → optimizes plans.
  The crown jewel of the DynamOS ecosystem.
  Triggered by: "DynamOS", "RUA", "学习计划", "课程闭环", "learning system", "个性化学习"
---

# DynamOS Core — RUA Closed-Loop Learning System

> DynamOS 核心引擎。任何学习目标 → RUA 拆解 → 每日计划 → HTML 课件 → 作业 → 追踪 → 分析 → 优化 → 闭环。
> The engine behind det.rkrk.io, pte.rkrk.io, courseware.rkrk.io, ielts.rkrk.io.

---

## ⛔ The RUA Framework

Kee Lee 发明。所有 DynamOS 产品基于此框架。

```
R — Recognise (识别)
    找出问题：我不知道什么？我做错了什么？
    诊断：差距在哪里？具体到哪个知识点/技能点？

U — Understand (理解)
    搞清楚：规则是什么？为什么会这样？
    内化：用自己的话解释，不看笔记能复述

A — Apply (应用)
    练习：在真实场景中正确使用
    验证：做对了没有？错了回到 R 重新来
```

每个学习单元 = 一次完整的 R→U→A 循环。

---

## Phase 0: Input — 学习目标定义

### 0.1 收集输入
```
学生画像：
- 年龄段/当前水平（具体分数）/目标分数/出分紧迫性
- 学习风格/家长参与度

课程定义：
- 考试类型/科目/总课时/班型/上课形式

资源盘点：
- 已有教材/PPT/真题/模考题库
```

### 0.2 RUA 拆解学习目标
```
学习目标: "PTE 口语从 50 提到 65"
    ↓ R: 识别差距
    当前 50 分 → 目标 65 分 → 差距 15 分
    薄弱项：流利度 45、发音 50、内容 55
    最大杠杆：流利度（提升空间最大）
    ↓ U: 理解路径
    流利度不足原因：意群断句不熟、重弱读不敏感
    发音问题：元音不饱满、辅音位置错误
    ↓ A: 应用计划
    W1: RA 跟读 + 意群训练
    W2: RS 2-5-8 策略 + DI 模板
    W3: RL 笔记 + 模考
```

---

## Phase 1: Plan — 轮询生成每日计划

### 1.1 轮询算法
```
DAY 1:
  输入：学习目标 + RUA 拆解
  输出：当日 HTML 课件 + 作业
  学生完成 → 记录数据

DAY 2:
  输入：学习目标 + RUA 拆解 + DAY 1 完成数据
  分析：DAY 1 正确率、耗时、困难点
  调整：如果正确率 < 70%，今天复习昨天内容 30%
  输出：当日 HTML 课件 + 作业

DAY N:
  输入：全部历史数据
  分析：趋势、瓶颈、预测
  输出：个性化的当日计划
```

### 1.2 每日计划结构
```
📋 Day N · [主题]
├── 🔍 R: 识别 — 自测/回顾错题 (5-10min)
├── 🧠 U: 理解 — 核心知识点 + CCQ 检测 (15-20min)
├── 🎯 A: 应用 — 练习 + 即时纠错 (20-30min)
└── 📝 作业 — 定量任务 + 提交方式
```

---

## Phase 2: Build — 生成 HTML 课件

### 2.1 调用下游技能
```
course-authoring-sop → 课程架构
design-system-kee → 视觉系统
pptx-to-html-sop → 如有 PPT 素材
edge-tts-sop → 音频生成
de-ai-writing → 内容去 AI 化
qa-sop → 质量检查
deploy-sop → 上线
```

### 2.2 HTML 课件规范
- Hero: 学习目标 + 进度 (Day N/total)
- R 区: 昨日回顾 + 自测题
- U 区: 知识点卡片 + CCQ + Pull quote
- A 区: 交互练习 + 即时反馈
- 作业区: 任务列表 + 提交方式 + 进度表
- 标注 RUA 标签在每个模块

---

## Phase 3: Track — 学习完成度记录

### 3.1 每日追踪
```
日期 | 出勤 | R完成 | U完成 | A完成 | 作业提交 | 正确率 | 耗时
7/7  | ✅   | ✅    | ✅    | ✅    | ✅       | 85%    | 45min
7/8  | ✅   | ✅    | ⚠️    | ✅    | ✅       | 72%    | 52min
7/9  | ✅   | ✅    | ✅    | ❌    | ⚠️      | 60%    | 38min
```

### 3.2 完成度指标
```
完成度 = 实际完成 / 计划任务
连续打卡 = 连续完成天数
RUA 平衡度 = R完成率 vs U vs A 的差异
  (差异 >20% 说明某环节薄弱)
```

---

## Phase 4: Analyze — 达成度分析

### 4.1 内容达成度
```
知识点/技能 → 目标正确率 → 实际正确率 → 达成度
RA 流利度   → 80%         → 72%         → 90%
RS 准确率   → 75%         → 60%         → 80% ⚠️
DI 模板     → 90%         → 88%         → 98%
```

### 4.2 痛点头识别
```
🚨 持续低正确率 (<60% 连续 3 天) → 基础薄弱，需要退回
⚠️ 忽高忽低 (标准差 >15%) → 方法不稳定，需要标准化
🐌 进度滞后 (完成度 <70%) → 计划过重或动力不足
💤 平台期 (连续 5 天无进步) → 需要换方法/换材料
```

### 4.3 RUA 断点定位
```
哪个环节最弱？
- R 环节弱 → 不会自我诊断 → 加预听框架训练
- U 环节弱 → 理解了但说不出 → 加 CCQ + 费曼输出
- A 环节弱 → 懂但做不对 → 加变式练习 + 限时
```

---

## Phase 5: Optimize — 闭环优化

### 5.1 计划自动调整
```
IF 连续 2 天正确率 < 70%
  → 今天减量 30%，加入昨日复习

IF R 环节耗时超过计划 50%
  → 调整 R 难度，降低自测题量

IF A 环节正确率 > 90% 连续 3 天
  → 把当前内容标记为 Mastered，推进到下一难度

IF 作业连续 2 天未提交
  → 触发提醒机制（通知 Kee/家长）
```

### 5.2 学习进度建议
```
📊 当前状态: 完成 12/20 天，整体正确率 78%
🎯 预计达成: 按当前速度，20 天后达到目标分数
⚠️ 风险: RS 题型持续低于目标，建议增加 RS 专项训练
💡 建议: 未来 3 天每日加 15min RS 2-5-8 策略练习
```

---

## Phase 6: Deploy — 上线闭环

### 6.1 生成产物
- HTML 课件 (每日)
- 学习数据看板 (每周)
- 痛点头报告 (每 4 次课)
- 优化建议 (实时)

### 6.2 部署目标
```
det.rkrk.io → DET 学生
pte.rkrk.io → PTE 学生
ielts.rkrk.io → 雅思学生
courseware.rkrk.io → PU/成人英语
```

---

## 端到端示例

```
输入: "Zhang, IELTS 5.5 → 6.5, 口语单项, 12次课, 1v1"
    ↓
RUA 拆解: 最大差距流利度+词汇, 杠杆点 Part 2 结构
    ↓
轮询 DAY 1: 生成 R=自测 Part 2, U=结构模板, A=练习1题
    学生完成: 正确率 65%, 耗时 48min, 流利度弱
    ↓
轮询 DAY 2: 调整 — 加入昨天复习 + RS 跟读训练
    学生完成: 正确率 72%, 耗时 42min, 进步但仍有停顿
    ↓
...DAY 12...
    ↓
达成度分析: 目标 6.5, 预测 6.5, 置信度 85%
痛点头: Part 3 辩证思维弱, 建议加 REAM 补偿
    ↓
闭环: 生成结课报告 + 后续自训计划
```

---

## 与 DynamOS 生态的连接

```
dynamos-core (本 skill)
├── course-authoring-sop → 课程结构
├── pptx-to-html-sop → 课件转换
├── design-system-kee → 视觉风格
├── edge-tts-sop → 音频
├── qa-sop → 质量把关
├── deploy-sop → 上线
├── pre-class-sop → 课前材料
├── post-class-sop → 课后反馈
├── preference-extraction-sop → 持续优化
└── skill-index → 工具索引
```

## 反模式

- ❌ 跳过 RUA 拆解直接排课
- ❌ 不轮询 — 第一天就排完 30 天
- ❌ 只有排课没有追踪
- ❌ 追踪了但不用数据优化
- ❌ 痛点头发现了但不触发提醒
- ❌ RUA 三个环节混成一团

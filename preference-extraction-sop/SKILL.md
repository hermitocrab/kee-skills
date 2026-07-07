---
name: preference-extraction-sop
description: |
  Auto-extract SrKeeda's design/style preferences after every session. 
  Update USER.md + relevant skills with product-specific requirements.
  Burned 2026-07-07 — SrKeeda: "你要学会自动总结我的喜好和设计风格要求，不同产品的不同要求都要体现，每次session结束自动总结，把这个做成sop"
---

# Preference Extraction SOP — 自动偏好提取

> 每次 session 结束后自动运行。提取 SrKeeda 的设计偏好、产品要求、风格倾向。

## ⛔ 规则

每次 session 结束时（或 SrKeeda 长时间不回复时），自动：

### Step 1: Review Corrections
搜索当前 session 中 SrKeeda 的纠正：
- "don't do X" / "别做X"
- "change Y to Z" / "把Y改成Z"
- "这不对" / "为什么不是"
- 任何他让重做的事情

### Step 2: Extract Approved Patterns
搜索他明确夸奖的：
- "这个好" / "这个不错" / "like this"
- "keep this" / "保留这个"
- "记下来" / "写成SOP"

### Step 3: Categorize by Product
按产品分类存储：

```
产品线映射：
- adult-english → courseware.rkrk.io → 成人英语
- DET → det.rkrk.io → 多邻国备考
- PU → courseware.rkrk.io/pu/ → 少儿英语
- ielts → ielts.rkrk.io → 雅思
- rkrk.io → 品牌主站
- dynasaurus → dynasaurus.rkrk.io → SaaS产品
```

### Step 4: Update Files
- USER.md → 新增产品偏好
- 对应 skill → 更新设计规则
- MEMORY.md → 记录关键偏好（如果够重要）

### Step 5: Report
Session 结束时输出：
```
📝 本次偏好提取：
产品: [产品名]
新增偏好: [具体规则]
更新文件: [USER.md / skill名]
```

## 反模式
- ❌ 等 SrKeeda 说"记下来"才记 → 主动提取
- ❌ 偏好存在"脑子里" → 必须写入文件
- ❌ 所有产品用一套规则 → 按产品分类

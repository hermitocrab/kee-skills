---
name: pptx-to-html-sop
description: |
  Lossless PPTX to HTML courseware conversion. Extract all content (text, images, presenter notes),
  redesign with Awwwards-level visual design. Burned 2026-07-07.
  Triggered by: "转换PPT", "PPT转HTML", "pptx to html", "课件转换", "courseware from PPT"
---

# PPTX → HTML 课件转换 SOP

> Lossless conversion. Every word, image, and presenter note preserved.
> Design must be better than the original PPT — never worse.
> Burned 2026-07-07.

---

## ⛔ Phase 0: Pre-Flight

```
□ 找到了所有 PPTX 文件？检查 Aug 2025 Update 等子文件夹
□ 确认考试/课程类型 → 选对设计系统
  - 成人英语/PTE → Swiss Editorial courseware
  - DET/学生 → Dark App or branded colorful
  - PU 少儿 → Rainbow playful
□ 搜索 PPT 目录下是否有配套 PDF/图片
□ 确认目标域名和部署路径
```

---

## Phase 1: Lossless Extraction

### 1.1 提取所有内容
```python
from pptx import Presentation
prs = Presentation("file.pptx")
for i, slide in enumerate(prs.slides):
    # Text: all shapes, all paragraphs, all runs (with formatting)
    # Images: shape.shape_type == 13 → save as PNG/JPG
    # Presenter notes: slide.has_notes_slide → full text
    # Slide layout: title slide, content slide, image slide
```

### 1.2 图片提取
```python
if shape.shape_type == 13:  # Picture
    image = shape.image
    ext = image.content_type.split('/')[-1]
    fname = f'{prefix}_s{slide_num}_{shape_idx}_{seq}.{ext}'
    with open(f'media/{fname}', 'wb') as f:
        f.write(image.blob)
```

### 1.3 内容清单
提取后生成 checklist：
- 总 slides 数
- 总图片数
- 有备注的 slides 数
- 每个 slide 的标题和内容类型

---

## Phase 2: Vertical Slice — 信息分类

**⛔ 开工前必须完成这一步**

### 2.1 信息类型分类
把每个 slide 的内容归类：

| 信息类型 | 示例 | 展示方式 |
|---------|------|---------|
| 分数/数据 | CEFR换算、评分配比 | 热力图卡、进度条 |
| 题型概览 | 7种口语题型 | 横向滑动时间线卡 |
| 策略步骤 | RA准备→作答→训练 | 三步箭头流程 |
| 对比数据 | PTE vs IELTS | 并排渐变卡 |
| 考试流程 | 6步流程 | 数字徽章时间线 |
| FAQ/Q&A | Introduction计分吗？ | 浮层 tooltip |
| 教学备注 | 每页备注 | Modal overlay |
| 练习题 | 朗读段落 | 可展开卡片 |
| 评分标准 | Content/Pron/Fluency | 三列进度条 |

### 2.2 信息层级
```
H1: 页面标题
H2: Chapter/Section
H3: 题型名称
Pull quote: 核心摘要
Body: 详细说明
Meta: 时间/题量/备注
```

---

## Phase 3: Design Research

**⛔ 不要凭空设计**

### 3.1 搜索同类设计
- Awwwards: education category
- Dribbble: course platform, dashboard
- 参考：Stripe Docs, Linear, Apple HIG

### 3.2 提取设计元素
- 布局模式 (card grid, timeline, split panel)
- 配色方案 (academic blue for PTE, coral for DET)
- 字体层级 (clamp() for responsive sizing)
- 交互模式 (modal, scroll-snap, sticky nav)

---

## Phase 4: Build — 七条铁律

### ① 零裸表
所有 `<table>` → 视觉组件
- 热力图卡 (CEFR levels)
- 时间线卡 (question types)
- 进度条 (scores)
- 步骤流 (strategies)

### ② Hero 必须有
每页顶部：
- 渐变/accent 背景
- 标题 + 副标题
- 关键数据 (时长/题量/级别)
- 面包屑导航

### ③ Pull Quote
密集信息前加大号引用：
```html
<blockquote class="pull-quote">
  "PTE交叉评分意味着口语分数影响的不只是口语"
</blockquote>
```

### ④ 图片必须嵌入
每张 PPT 原图 → 对应内容 section
- `<figure>` + `<figcaption>`
- lazy loading
- 响应式: max-width 100%
- 圆角 + 阴影 + 边框

### ⑤ 交互要精妙
- Presenter notes → Modal overlay (不是 inline)
- 题型卡 → 横向 scroll-snap
- 导航 → Sticky sidebar
- FAQ → Tooltip/hover reveal

### ⑥ 信息层级可见
- 缩进表达父子关系
- clamp() 表达重要性
- 颜色深浅表达主次
- 不要所有文字一样大

### ⑦ 响应式 + 防护
- word-break: break-word
- overflow-x: hidden on body
- touch-action: manipulation
- 320px 不溢出

---

## Phase 5: QA

### 5.1 内容 QA
```
□ 所有 slide 内容都转换了？
□ 所有 presenter notes 都保留了？
□ 所有图片都嵌入了？
□ 图片位置和标注正确？（DI/SGD/RTS 不要标错）
□ 题型名称和官方一致？
□ 时间和分数数据准确？
```

### 5.2 视觉 QA
```
□ 0 个 HTML table？
□ Hero 存在？
□ Pull quote 存在？
□ Sticky nav 工作？
□ Modal overlay 工作？
□ 320px 无溢出？
```

### 5.3 Fact-Check
```
□ 对照官方最新信息校验
□ Pearson PTE 官网
□ 考题数量/时间/评分标准
□ CEFR 换算表
```

---

## Phase 6: Deploy

```
□ 文件写入正确目录
□ 重启服务器
□ curl 验证 HTTP 200
□ 发链接给 SrKeeda
```

---

## 反模式

- ❌ 不提取图片就开始写 HTML
- ❌ 保留 HTML table
- ❌ 所有 section 用同一布局
- ❌ 跳过 vertical slice 直接写代码
- ❌ 图片标注靠猜 — 必须对照 PPT slide 内容
- ❌ 丢失 presenter notes
- ❌ 不搜 Awwwards 就设计
- ❌ DI/SGD/RTS 图片标错位置

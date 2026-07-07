---
name: web-ux-sop
description: |
  Web page UX standards for Kee's courseware. In-page editing, WeChat copy, PDF export.
  Burned 2026-06-30 — Author: "网页SOP更新：一键复制无markdown格式维持排版复制粘贴到微信"
  Triggered by: "网页交互", "编辑按钮", "导出PDF", "复制到微信"
---

# Web UX SOP — 网页交互标准

> 任何课程网页必须实现的交互功能。
> Burned 2026-06-30

## 必须实现的功能

### 1. 一键复制到微信
- 课后反馈 / 学情反馈 → 填写后一键复制
- 复制内容：无 markdown 格式，但保留排版结构
- 直接用 emoji 和换行维持层次
- 粘贴到微信 → 美观可读

### 2. 模块内编辑按钮
- 每个内容模块（作业模块、思维导图、词汇表等）旁边有 ✏️ 修改按钮
- 点击 → 内容变为可编辑
- 修改 → 保存到网页上（localStorage 或 Supabase）
- 任何有这个链接的人都能看到修改后的内容

### 3. 一键导出 PDF
- 学情反馈单 / Printables → 页面内 [导出PDF] 按钮
- 导出时：隐藏所有按钮（修改、导出、编辑等）
- 只保留内容本身
- 使用浏览器 print / Chrome headless

### 4. 答案保护
- 所有填空/练习 → 答案区域默认隐藏
- 点击"查看答案"才显示
- PDF 导出 → 答案区域完全移除

## 反模式
- ❌ 需要用户手动 Ctrl+P 打印（应该一键按钮）
- ❌ PDF 里显示编辑/导出按钮
- ❌ 复制到微信带着 markdown 符号

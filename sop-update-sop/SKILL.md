---
name: sop-update-sop
description: |
  Meta-SOP for updating SOPs. Core purpose: prevent rollback of previously-approved rules when adding new ones.
  Burned 2026-07-02, clarified 2026-07-07.
  Triggered by: "更新SOP", "改SOP", "加规则", "新要求"
---

# SOP 更新 SOP

> 唯一目的：**改A的时候，不能让B、C、D回滚。**
> Burned 2026-07-02 · clarified 2026-07-07

## 问题

```
SrKeeda 6/30: 修mindmap格式 → 英文加粗居中 + 中文单独一行 ✗3次才修对
SrKeeda 7/1: 更新SOP加入新的printables布局要求
Agent 7/1: 写了新SOP → 但忘了写mindmap那三条 → mindmap格式回滚了 ❌
SrKeeda: "为什么改A把B弄坏了？"
```

这就是SOP更新SOP要杜绝的问题。

## ⛔ 唯一正确做法

```
收到 SOP 更新指令
    ↓
① 读现有 skill 文件全文
    ↓
② 搜 iMessage 找到最新的要求
    ↓
③ 新版本 = 旧版本全部内容 + 新要求 - 被替换的旧要求
    逐条核对：旧版本的每一条规则都带进新版本了吗？
    只有被明确替换的规则才能删除
    ↓
④ write 整篇覆盖
    ↓
⑤ 回复：新加了X，保留了Y和Z，替换了W
```

## 例子

旧 SOP 有 7 条规则。SrKeeda 说要加第 8 条。

✅ 正确：新文件 = 7 条旧规则 + 第 8 条
❌ 错误：新文件只有第 8 条（前 7 条回滚了）
❌ 错误：新文件有第 8 条 + 凭记忆写了 5 条（丢了 2 条）

## 铁律

1. **逐条迁移** — 旧版本每条规则必须明确：保留 / 替换 / 删除
2. **只有被替换的才删** — "看起来可能不需要了"不是删除理由
3. **写清楚改了什么** — 回复 SrKeeda 时说"保留了X条，替换了Y条，新加了Z条"
4. **整篇覆盖** — 用 `write` 不用 `edit`，避免碎片共存
5. **旧碎片删除** — 如果 skills/ 或 memory/ 里有旧 SOP 残留，立刻删除

## 反模式

- ❌ 凭记忆重写 SOP → 一定丢规则
- ❌ 只写新加的规则 → 旧规则全部回滚
- ❌ 复制旧文件 → 只改新加的部分 → 旧规则被意外删除
- ❌ "这个规则好像过时了" → 不是你来判断，SrKeeda 没说的都保留

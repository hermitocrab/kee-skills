---
name: imessage-context-sop
description: |
  iMessage context search — when SrKeeda uses 指示代词, search chat history first.
  Burned 2026-07-07 — SrKeeda: "每次我使用到指示代词或者讲到了之前的内容时，先搜索imessage历史记录"
  Triggered by: 任何 "那个/这个/上次/前几天/之前说的/你记得吗" 等指示代词
---

# iMessage Context Search SOP

> 当 SrKeeda 用指示代词引用之前的内容时，必须先搜索 iMessage 历史记录再回复。
> Burned 2026-07-07

## 触发词（任意语言）

```
那个 / 这个 / 上次 / 前几天 / 之前 / 你记得吗 / 我说过的
that / this / last time / remember / the one / earlier
あれ / それ / この前 / 前に言った
그거 / 그 / 저번에 / 전에
```

## 搜索流程

```
检测到指示代词
    ↓
不猜测！不靠记忆！
    ↓
imsg history --chat-id 2 --limit 500 | grep -i "<关键词>"
    ↓
找到原始上下文
    ↓
确认理解 → 再回复
```

## 例子

❌ SrKeeda: "搭建网页的sop为什么没跑？"
   我: "project-gateway 和 preview-first-deploy 没跑"

✅ 先搜 iMessage → 发现他说的 "搭建网页sop" 是之前让我更新的设计SOP
   我: "你说的是设计SOP里的开工前查知识库，我没加进去"

## 反模式
- ❌ 靠记忆猜 "他大概说的是XX"
- ❌ 跳过搜索直接回复
- ❌ 搜了但没找到 → 不说 "没找到" → 继续猜

---
name: pre-action-sop
description: |
  Pre-action verification — check API keys, match user preferences, verify source of truth before acting.
  Burned 2026-06-30 — SrKeeda: "确保你真的写进memory 做成sop"
  Triggered by: "调用API", "用Supabase", "用key", "验证", "before acting"
---

# Pre-Action Verification SOP

> 在任何外部服务操作之前跑这三步。
> Burned 2026-06-29, updated 2026-06-30

## 三步验证

### Step 1: VERIFY-KEY — 验证密钥
- Curl-test 每个 API key 再用
- 源 key 只能来自：.env.local / Vercel env vars / SrKeeda 明确给的
- 如果 key 包含省略号 `…` → 是占位符，不能用
- 命令：`curl -s "<endpoint>" -H "apikey: <full_key>" | head -5`

### Step 2: MATCH-PREFERENCE — 匹配偏好
- 回想 SrKeeda 当前 session 之前说过什么
- 他说 "no cron" → 不建 cron
- 他说 "no images" → 不加图片
- 他说 "don't deploy yet" → 不部署
- 不确定 → ASK

### Step 3: SOURCE-TRUTH — 查源头
- 声称 "API key expired" 前 → 先 curl 测试
- 声称 "service is down" 前 → 先 `curl -sI` 端点
- 声称 "file doesn't exist" 前 → 先 `ls -la` 确切路径
- 证据先行，结论在后

## 反模式
- ❌ 看 key 像过期了 → 不测试就声称过期
- ❌ 没看 .env.local → 说 key 找不到了
- ❌ 记得 SrKeeda 说过 X → 不搜索聊天记录确认

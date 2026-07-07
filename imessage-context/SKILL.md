---
name: imessage-context
description: "MANDATORY startup routine for new iMessage sessions. Check imsg chat history before responding. Use when a new session starts on iMessage channel."
---

# iMessage Session Context Recovery

## When to Use

**EVERY new iMessage session.** Before responding to ANY message on iMessage channel, check chat history for context from the previous session. This is NOT optional.

## Procedure

1. The moment you detect `channel: imessage` in inbound metadata, run:
   ```bash
   imsg chats --limit 5 --json
   ```
2. Find the chat with `identifier: user@example.com` — get its `id`
3. Pull recent history:
   ```bash
   imsg history --chat-id <ID> --limit 50 --json
   ```
4. Review the last 20+ messages from Author (sender `user@example.com`, `is_from_me: false`) to understand what he was working on
5. Look for: active projects, pending fixes, complaints, feature requests, voice/style preferences
6. Only THEN respond

## Why

iMessage sessions lose context when they reset. Chat history in Messages.app is the durable record. Never start an iMessage session blind.

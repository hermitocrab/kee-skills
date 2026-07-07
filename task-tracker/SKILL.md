---
name: task-tracker
description: Track pending tasks and auto-report outstanding items that haven't had a completion report delivered to the user.
---

# Task Tracker

Use this skill to track tasks that Author assigns and have not yet been reported as complete.

## How it works

1. **When Author assigns a task**, write it to `memory/pending-tasks.json`
2. **When you complete it and report back**, mark it done in the same file
3. **A daily cron job** checks for overdue/unreported tasks and reminds you

## Task format

```json
{
  "tasks": [
    {
      "id": "task-2026-04-26-001",
      "assigned": "2026-04-26T12:00:00+08:00",
      "description": "Deploy TEDx web slides to Vercel",
      "status": "done",
      "reported": true,
      "delivered_to": "feishu",
      "notes": "Deployed at https://tedx-cocoon-catalyst.vercel.app"
    },
    {
      "id": "task-2026-04-26-002",
      "assigned": "2026-04-26T12:30:00+08:00",
      "description": "Add vision-capable models to OpenRouter config",
      "status": "done",
      "reported": true,
      "delivered_to": "feishu",
      "notes": "Added Qwen3 VL and Gemini Flash"
    }
  ]
}
```

## Status lifecycle

- `pending` → Assigned but not yet worked on
- `in_progress` → Being worked on
- `done` → Completed. Set `reported: false` until you tell Author the result
- `blocked` → Can't proceed (document why in notes)
- `cancelled` → No longer needed

## Anti-Hallucination Rules

1. **Never mark a task `done` until you've verified it actually works.**
   - Deployed something? Curl the URL and check the response.
   - Changed a config? Restart the service and confirm it's running.
   - Wrote a file? Verify it exists and has the right content.
2. **Never set `reported: true` until you've messaged Author the result.**
3. **If you can't verify a task completed, keep it as `in_progress` and explain why.**
4. **When in doubt between 'done' and 'almost done', pick 'almost done'.**

## Cron check

The cron job in HEARTBEAT.md or a system cron will periodically:

1. Read `memory/pending-tasks.json`
2. Find tasks where `reported: false`
3. Remind me to report them to Author

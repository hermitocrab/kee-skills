---
name: db-notify
description: "Event-driven database notification: INSERT triggers immediate iMessage alert via osascript. No polling."
---

# Database Event Notification

Use for any local Python+SQLite project that needs real-time notifications on new entries. Database write triggers notification in the same call path — no cron, no polling.

## Pattern

```
HTTP POST → save to SQLite → spawn notify thread → return 200
                                     ↓
                              osascript iMessage
```

## Server Template

```python
import sqlite3, subprocess, threading, json
from datetime import datetime

DB_PATH = 'data.db'

def save_and_notify(table, data):
    conn = sqlite3.connect(DB_PATH)
    now = datetime.now().isoformat()
    keys = ', '.join(data.keys())
    placeholders = ', '.join(['?'] * len(data))
    conn.execute(
        f'INSERT INTO {table} (submitted_at, {keys}) VALUES (?, {placeholders})',
        (now, *data.values())
    )
    conn.commit()
    row_id = conn.execute('SELECT last_insert_rowid()').fetchone()[0]
    conn.close()
    # Fire notification in background — never block the HTTP response
    threading.Thread(target=notify, args=(row_id, data), daemon=True).start()
    return row_id

def notify(row_id, data):
    """Send iMessage via osascript. Runs in daemon thread."""
    msg = f"📊 新数据 #{row_id}\n{json.dumps(data, ensure_ascii=False, indent=2)}"
    applescript = f'tell application "Messages" to send "{msg}" to buddy "RECIPIENT"'
    subprocess.run(['osascript', '-e', applescript], timeout=10, capture_output=True)
```

## Rules

- Always spawn `threading.Thread(daemon=True)` for notification — never block the HTTP response.
- Subprocess timeout at 10s so a hung osascript doesn't leak threads.
- Capture osascript output with `capture_output=True` to suppress stdout noise.
- Print notification result to server log for debugging.
- `RECIPIENT` is the iMessage handle (e.g. `user@example.com`).
- Escape double quotes in message content: `msg.replace('"', '\\"')` before passing to AppleScript.
- If notification content contains newlines, AppleScript needs `\\n` — construct message inline without literal newlines, or replace `\n` with space.

## Never

- Never use cron polling when INSERT-triggered notification is possible.
- Never send raw user input directly to osascript without escaping.
- Never call notify synchronously in the HTTP handler path.

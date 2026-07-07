# Chat History Archive Skill

## What It Is
A BlueBubbles-style searchable chat history browser that archives all OpenClaw session transcripts into a beautiful web UI. Lives at `/Users/agentii/.openclaw/canvas/chat-history/index.html`.

## Architecture
```
canvas/chat-history/
├── index.html          ← BlueBubbles UI (sidebar + chat view)
├── index.json          ← Master session index (metadata only)
└── sessions/
    └── <uuid>.json     ← Per-session full content (messages + blocks)
```

## How to Refresh
Run the generator:
```bash
python3 /Users/agentii/.openclaw/workspace/scripts/chat-history-generate.py
```

This parses all JSONL transcript files across all agents (`~/.openclaw/agents/*/sessions/*.jsonl`), extracts message blocks (text, thinking, tool calls), and regenerates the index + per-session JSON files.

## Auto-Refresh
A cron job runs the generator daily. If sessions seem stale, check:
```bash
cron list
```
Look for `chat-history-refresh`. If missing, recreate:
```
cron add name=chat-history-refresh schedule.kind=cron schedule.expr="0 5 * * *" schedule.tz=Asia/Shanghai payload.kind=systemEvent payload.text="Refresh chat history: python3 /Users/agentii/.openclaw/workspace/scripts/chat-history-generate.py" delivery.mode=none sessionTarget=main
```

## Chat UI Features
- **Left sidebar**: Session list — searchable, filterable by agent (Main/Malik/Prompt/Diag/Eng)
- **Right panel**: BlueBubbles chat view with:
  - User messages: blue bubbles (right-aligned)
  - Assistant messages: gray bubbles (left-aligned)
  - Collapsible thinking blocks (grey, italic)
  - Collapsible tool call blocks (monospace, small)
  - Full markdown rendering (headers, lists, code, tables, blockquotes, links, bold/italic)
  - Timestamps
- All data is static JSON — no server needed, works as a local file

## Known Limitations
- Only sessions with JSONL transcript files are included (some transient sessions may not be persisted)
- Large sessions (500+ messages) may load slowly — consider pagination if this becomes an issue
- Thinking blocks are displayed inline; very long chains of thought may clutter the view
- The markdown renderer is a simple regex-based one — complex nested formatting may not render perfectly

## Future Improvements
- Media/attachment display (images from assistant messages)
- Search within individual sessions
- Export sessions as PDF/markdown
- Session comparison view (side-by-side)
- Infinite scroll for large sessions

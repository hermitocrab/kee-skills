# MemPalace

## Status
**INSTALLED AND OPERATIONAL.** Do not ask "is MemPalace installed?" — it is.

## Quick Reference
```bash
# Search
mempalace search "query"                                    # whole palace
mempalace search "query" --wing product_protocol --room ui_design   # scoped

# Status
mempalace status

# Mine (index new files into palace)
mempalace mine <directory>

# Init new project
mempalace init <directory>

# Wake-up context
mempalace wake-up
mempalace wake-up --wing product_protocol
```

## Palace Structure
| Wing | Room | Drawers | Purpose |
|------|------|---------|---------|
| `product_protocol` | `content_copy` | 1 | Copy guidelines, tonal rules, pedagogical frameworks |
| `product_protocol` | `ui_design` | 1 | UI conventions, rkrk.io baseline, design decisions |
| `workspace` | `ielts_website` | 1,896 | IELTS teaching platform |
| `workspace` | `ielts_toolkit` | 1,634 | Teaching tools |
| `workspace` | `rkrk_landing` | 170 | rkrk.io landing pages |
| `workspace` | `general` | 1,160 | Cross-cutting files |
| `workspace` | `memory` | 180 | Session memory files |
| `workspace` | `agents` | 59 | Agent definitions |
| `workspace` | `design` | 35 | Design assets |
| `workspace` | `tedx_web_slides` | 38 | TEDx slide deck |
| `workspace` | `editorial_slide_designer` | 94 | Editorial design skill |

## Binaries
- CLI: `/Users/REDACTED_USER/Library/Python/3.9/bin/mempalace`
- MCP: `/Users/REDACTED_USER/Library/Python/3.9/bin/mempalace-mcp`
- Version: 3.3.3 (pip3)
- Palace: `~/.mempalace/palace`

## Constantine Twins
- `constantine-ui` (UI Protocol QA) → `product_protocol/ui_design`
- `constantine-content` (Content Protocol QA) → `product_protocol/content_copy`

## Mandatory Rule
**Before answering any question about prior work, designs, copy decisions, or product conventions, search MemPalace first.** The user has installed this specifically to prevent hallucination and repetition.

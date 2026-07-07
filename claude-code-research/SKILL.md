---
name: claude-code-research
description: "Set up Claude Code as an autonomous research analyst. 4-level system: basic research, document-grounded projects, reusable skills, autonomous cowork. Use when setting up Claude Code for domain-specific research, investment analysis, or any knowledge-worker automation with file access, browser control, and web scraping."
---

# Claude Code Research Analyst

Turn Claude Code from a chatbot into a background research workflow engine. Four-level maturity model from leopardracer's system.

## Installation

- **Mac:** Terminal → paste install command → `claude` opens the prompt
- **Windows:** PowerShell equivalent
- **GUI layer:** Download Cursor — chat interface that still lets Claude execute. Removes "terminal anxiety" for non-engineers.

## The 4-Level System

### Level 1: Research (Basic)
Claude searches the web and generates structured overviews. Good for initial screens, understanding new industries, surface-level briefings.
- Prompt: "Research [topic]. Give me a structured overview with key players, trends, and risks."
- Citations included automatically.

### Level 2: Projects (Document-Grounded)
Upload your own documents (10-Ks, earnings transcripts, investor presentations, personal notes). Claude grounds all answers in these specific sources, citing page numbers. Prevents hallucinations.
- Build an Obsidian vault as compounding knowledge base.
- Claude reads from the vault — answers are source-backed.
- Prompt: "Based on the uploaded 10-K and Q4 transcript, analyze the revenue growth trajectory."

### Level 3: Skills (Reusable Workflows)
Build repeatable workflows triggered by simple commands:
- **Earnings review:** Auto-analyze new earnings against historical data
- **Valuation screen:** Run a multi-factor screen across a watchlist
- **Red flag checklist:** Check for accounting irregularities, governance issues
- **Thesis update:** Compare new filings against existing investment thesis
- Store these as prompt templates or Claude Code custom commands.

### Level 4: Cowork (Autonomous Agent)
Claude gets direct read/write access to a folder on your computer. It autonomously:
- Reads new 10-K filings as they drop
- Updates thesis documents
- Creates new analysis files
- Runs screens on a schedule
- Monitors portfolios for changes
- This is where Claude stops being a tool and becomes a workflow engine.

## External Tool Stack

| Tool | Purpose | Setup |
|------|---------|-------|
| **Cursor** | GUI for Claude Code | Download, point to same workspace |
| **Obsidian** | Knowledge base vault | Store 10-Ks, transcripts, notes as .md |
| **Playwright** | Browser automation | `npm install playwright` — Claude can drive real browsers |
| **Firecrawl** | Web scraping at scale | API key — scrape financial sites, news |
| **Financial APIs** | Live data | Income statements, balance sheets, cash flow |

## Prompt Pattern: Role Grounding
Before any research, give Claude context:
"Act as an equity research analyst covering [sector]. Use [framework/style]. Your output should include [structure]."

This tailors vocabulary, analytical framework, and output format.

## Key Insight
Claude Code isn't just a chatbot for finance — it's a **brain that runs your workflows.** The four levels represent a maturity curve: the more access and autonomy you give it, the more it compounds.

## Reference
- Original article: "How I Set Up Claude Code as My Investment Research Analyst" by leopardracer
- Anthropic Claude for Finance lecture (37 min video, linked by @Av1dlive)
- Learned: 2026-05-27 from SrKeeda's shared X articles

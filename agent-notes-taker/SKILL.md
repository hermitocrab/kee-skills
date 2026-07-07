---
name: agent-notes-taker
description: "AI-powered Obsidian vault maintainer. Receives random info snippets from the user, intelligently categorizes them into the Obsidian vault, and enables semantic recall. The agent acts as a second brain — nothing gets lost, everything gets filed. Use for building a personal knowledge base, treasure chest of useful links/tools/emails, and cross-referencing past discoveries with current tasks."
metadata:
  {
    "openclaw":
      {
        "emoji": "📝",
        "requires": { "dirs": ["Obsidian vault path"] },
        "tags": ["obsidian", "notes", "knowledge-base", "second-brain", "productivity"],
      },
  }
---

# Agent Notes Taker — Your Second Brain

A personal AI note-taking agent that maintains an Obsidian vault as your durable second brain. Drop random info, links, tools, emails, or ideas — the agent categorizes and files them for future recall.

## Core Workflow

### 1. Receive → Categorize → File

When the user shares any snippet of information:

```
User: "Pipecat is an open-source Python framework for real-time voice AI"
Agent:
  1. Identify category: Tools & Frameworks
  2. Determine vault path: THE VAULT/Tools/百宝箱.md
  3. Append organized entry with: what it is, why useful, links, date added
  4. Cross-reference with related entries
```

### 2. Vault Structure

Maintain a clean Obsidian vault with these sections:

```
THE VAULT/
├── Tools/百宝箱.md          # Tools, frameworks, useful links
├── Projects/                 # Per-project notes and specs
├── Contacts/                 # Important emails, contacts
├── Reference/                # Exam info, specs, standards
├── Ideas/                    # Random ideas and brainstorms
└── Daily/                    # Daily notes and logs
```

### 3. Categorization Rules

| Snippet Type | Category | Example |
|-------------|----------|---------|
| Email addresses | Contacts | `ieltsfeedback@britishcouncil.org.cn` |
| Tools/frameworks | Tools | Pipecat, LiveKit, Vercel |
| Exam specifications | Reference | LangCert B1 format, scoring criteria |
| Project briefs | Projects | LangCert writing curriculum |
| Random ideas | Ideas | "What if we added voice to Keebot?" |

### 4. Entry Format

Every entry should include:
```markdown
### [Name]
- **What**: One-line description
- **Why useful**: Relevance to user's work
- **Link**: URL if applicable
- **Added**: YYYY-MM-DD
- **Related**: [[other-notes]]
```

### 5. Recall Protocol

Before answering questions about prior work:
- Search the vault for relevant entries
- Cross-reference with current task
- Cite vault sources in responses

### 6. Key Commands

- "Remember this" → file to appropriate category
- "What do we have on X?" → search vault
- "Update the vault with X" → edit existing entry
- "百宝箱" → open treasure chest (quick-access useful info)

## Integration with Other Skills

This skill is designed to work alongside:
- `obsidian-vault-maintainer` — for Obsidian-specific operations
- `wiki-maintainer` — for compiled wiki pages
- `project-gateway` — for project-specific knowledge

## Setup

1. Configure Obsidian vault path in agent config
2. Ensure vault directories exist
3. Run initial vault audit to catalog existing entries

---
name: obsidian-vault-organizer
description: "AI knowledge engine for Obsidian vaults: ingest sources into structured wiki, lint for health, query with hot cache, save conversations, and maintain a compounding knowledge graph. Language-teacher aware with CEFR/POS/pronunciation dimensions."
---

# Obsidian Vault Organizer — Knowledge Engine

Adapted from [claude-obsidian](https://github.com/AgriciDaniel/claude-obsidian) (MIT, v1.9.2 by AgriciDaniel), based on Karpathy's LLM Wiki pattern. You are a **knowledge architect**, not a chat interface. The vault is the product. Every source ingested makes it richer. Every lint pass keeps it healthy. Knowledge compounds like interest.

## Architecture

```
Vault/
├── .raw/              # immutable source documents (hidden in Obsidian)
├── wiki/              # LLM-generated knowledge base
│   ├── index.md        # master catalog of all pages
│   ├── log.md          # chronological record of all operations
│   ├── hot.md          # hot cache: recent context (~500 words)
│   ├── overview.md     # executive summary of the whole wiki
│   ├── sources/        # one summary page per raw source
│   ├── entities/       # people, orgs, products (for language: students, authors)
│   ├── concepts/       # ideas, patterns, frameworks (CEFR levels, grammar rules)
│   ├── domains/        # top-level topic areas (IELTS, TOEFL, Business English)
│   ├── vocabulary/     # atomic word notes with CEFR/POS/pronunciation
│   ├── lessons/        # lesson plans with student links
│   ├── comparisons/    # side-by-side analyses
│   ├── questions/      # filed answers to user queries
│   ├── sessions/       # conversation saves
│   └── meta/           # dashboards, lint reports, conventions
├── 01-Languages/       # language-specific materials (for teachers)
│   └── {lang}/Vocabulary/ Grammar/ Phrases/ Sources/
├── 02-Teaching/        # active teaching materials
└── 99-Meta/            # templates, system config
```

## Pipeline

```
USER ACTION          →  SKILL                     →  OUTPUT
"ingest this URL"    →  §INGEST                   →  8-15 wiki pages created/updated
"what do you know?"  →  §QUERY (hot→index→drill)  →  cited synthesis
"lint / health"      →  §LINT                     →  lint report + fixes
"save this"          →  §SAVE                     →  session page filed
"research X"         →  §AUTORESEARCH             →  research wiki pages
"set up / scaffold"  →  §SCAFFOLD                 →  full vault structure
```

## Hot Cache

`wiki/hot.md` is ~500 words of recent context. Update after every ingest, significant query, and session end.

```markdown
---
type: meta
title: "Hot Cache"
updated: YYYY-MM-DDTHH:MM:SS
---

# Recent Context

## Last Updated
YYYY-MM-DD. [what happened]

## Key Recent Facts
- [Most important takeaway]
- [Second most important]

## Recent Changes
- Created: [[New Page 1]], [[New Page 2]]
- Updated: [[Existing Page]] (added section on X)
- Flagged: Contradiction between [[Page A]] and [[Page B]]

## Active Threads
- User is researching [topic]
- Open question: [thing being investigated]
```

Overwrite completely each time. It is a cache, not a journal.

---

## § SCAFFOLD — Set up a new vault

Triggers: "set up wiki", "create vault", "scaffold knowledge base"

1. Ask: "What is this vault for?" — one question, then proceed.
2. Determine methodology mode — see §MODE. Default: generic.
3. Create full folder structure under `wiki/` based on mode.
4. Create `wiki/index.md`, `wiki/log.md`, `wiki/hot.md`, `wiki/overview.md`.
5. Create `_index.md` sub-indexes in each wiki subfolder.
6. Create language-specific folders if this is a teacher vault: `01-Languages/{lang}/Vocabulary/ Grammar/ Phrases/ Sources/`.
7. Report: "Vault scaffolded. Drop a source and I'll ingest it."

---

## § INGEST — Process a source into the wiki

Triggers: "ingest [URL/file]", "process this source", "add this to wiki"

A single source typically touches 8-15 wiki pages.

### Workflow

1. **Read the source.** Fetch URL or read file into `.raw/` first (immutable copy).
2. **Extract entities** — people, orgs, products, key terms. For language content: vocabulary items with CEFR, POS, pronunciation.
3. **Extract concepts** — ideas, frameworks, arguments, patterns.
4. **For each entity:** create or update `wiki/entities/Name.md` with:
   - What it is (one paragraph)
   - Where it appears (links to source)
   - Related entities/concepts (wikilinks)
5. **For each concept:** create or update `wiki/concepts/Concept.md` with:
   - Definition
   - Key claims (with source citations)
   - Related concepts and entities
   - If language content: CEFR level, example sentences
6. **Create source page:** `wiki/sources/Source-Title.md` — summary + all extracted links.
7. **Cross-reference:** update existing pages to link to new entities/concepts.
8. **Update hot.md** — log what was ingested.
9. **Update wiki/log.md** — append operation entry.
10. **Update wiki/index.md** — add new pages to catalog.

### Vocabulary Ingestion (Language Teacher Mode)

For language content, each vocabulary item gets an atomic note:

```markdown
---
type: vocabulary
lang: en
cefr: B1
pos: noun
ipa: /wɜːd/
tags:
  - type/vocabulary
  - context/teaching
  - theme/<topic>
aliases: []
created: YYYY-MM-DD
source: "[[Source Name]]"
---

# Word

## Definition
- Primary meaning in native language

## Examples
- Example sentence 1
- Example sentence 2

## Collocations
- common phrase 1
- common phrase 2

## Synonyms
- [[synonym1]]
- [[synonym2]]

## Antonyms
- [[antonym1]]

## Notes
Teaching notes, common student errors, etc.
```

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Filenames | Title Case with spaces | `Machine Learning.md` |
| Folders | lowercase with dashes | `wiki/data-models/` |
| Tags | lowercase, hierarchical | `#domain/architecture` |
| Wikilinks | match filename exactly | `[[Machine Learning]]` |

### Mode Routing

Before filing, route through the vault's methodology mode (see §MODE):
- **Generic**: `wiki/sources/`, `wiki/entities/`, `wiki/concepts/`
- **PARA**: `wiki/resources/incoming/` (user routes to project area)
- **Zettelkasten**: timestamped ID prefix, e.g. `wiki/202607061234-Concept.md`
- **LYT**: `wiki/notes/` + update relevant MOC in `wiki/mocs/`

---

## § QUERY — Answer questions from the wiki

Triggers: "what do you know about X", "query: X", "based on the wiki, tell me..."

Three depths:

| Mode | Token cost | Reads | Use case |
|------|-----------|-------|----------|
| **Quick** | ~1,500 | hot.md + index.md only | Simple factual Q |
| **Standard** | ~3,000 | hot + index + 3-5 pages | Most questions |
| **Deep** | ~8,000+ | Full wiki + optional web | Synthesis, comparisons |

### Standard Query Workflow

1. **Read `wiki/hot.md`** first. It may already have the answer.
2. **Read `wiki/index.md`** — find relevant pages.
3. **Read those pages** — follow wikilinks to depth-2 max.
4. **Synthesize** answer with citations: `(Source: [[Page Name]])`.
5. **Offer to file** if the answer is worth keeping.
6. **Flag gaps**: "I don't have enough on X. Want to find a source?"

---

## § LINT — Vault health check

Triggers: "lint", "health check", "clean up wiki", "wiki audit"

Run after every 10-15 ingests, or weekly. **Ask before auto-fixing.**

### Lint Checks (in order)

1. **Orphan pages** — wiki pages with no inbound wikilinks.
2. **Dead links** — wikilinks to pages that don't exist.
3. **Stale claims** — assertions contradicted by newer sources.
4. **Missing pages** — concepts/entities mentioned 3+ times without their own page.
5. **Missing cross-references** — entities mentioned but not linked.
6. **Frontmatter gaps** — pages missing required fields (type, tags, created, updated).
7. **Empty sections** — headings with no content.
8. **Stale index** — `wiki/index.md` entries pointing to renamed/deleted pages.
9. **Naming violations** — filenames not Title Case, folders not kebab-case.
10. **Style violations** — non-declarative tense, missing citations, unmarked gaps.

### Lint Report

Save to `wiki/meta/lint-report-YYYY-MM-DD.md`:

```markdown
---
type: meta
title: "Lint Report YYYY-MM-DD"
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [meta, lint]
---

# Lint Report: YYYY-MM-DD

## Summary
- Pages scanned: N
- Issues found: N
- Auto-fixed: N
- Needs review: N

## Orphan Pages
- [[Page Name]]: no inbound links. Suggest: link from [[Related]] or delete.

## Dead Links
- [[Missing Page]]: referenced in [[Source]] but does not exist.

## Missing Pages
- "Concept": mentioned in [[A]], [[B]], [[C]]. Suggest: create concept page.

## Frontmatter Gaps
- [[Page]]: missing fields: status, tags

## Stale Claims
- [[Page]]: claim "X" conflicts with [[Newer Source]].

## Cross-Reference Gaps
- Entity mentioned in [[Page]] without a wikilink.
```

### Contradiction Detection

When two sources disagree:
1. Flag with `> [!contradiction]` callout in BOTH pages.
2. Cite both sources with dates.
3. Add to `wiki/comparisons/` if the conflict is significant.
4. Update `wiki/hot.md` to surface the open contradiction.

---

## § SAVE — File conversation into wiki

Triggers: "save this", "/save", "file this conversation", "keep this"

Takes what was just discussed and files it as a permanent wiki page.

### Workflow

1. **Analyze** the conversation — what was the topic, what insights emerged?
2. **Determine note type** — question, concept, session summary, decision.
3. **Create frontmatter** with type, tags, date, source context.
4. **Route** via mode system to correct folder.
5. **Write** the page with wikilinks to relevant existing pages.
6. **Update** `wiki/index.md`, `wiki/log.md`, `wiki/hot.md`.

---

## § MODE — Methodology modes

Triggers: "set mode", "switch to PARA", "use Zettelkasten"

The vault can declare an organizational style. Default: **generic**.

### Modes

| Mode | Philosophy | Filing convention | Best for |
|------|-----------|-------------------|----------|
| **Generic** | Flat hierarchy by type | `wiki/<type>/<name>.md` | Default, small vaults |
| **PARA** | Projects/Areas/Resources/Archives | `wiki/projects/`, `wiki/areas/`, `wiki/resources/`, `wiki/archives/` | Active projects |
| **Zettelkasten** | Atomic notes, dense links | `wiki/<timestamp-ID>-<title>.md` | Research, deep thinking |
| **LYT** | MOCs as navigation hubs | `wiki/notes/<atomic>.md` + `wiki/mocs/<topic>-moc.md` | Large vaults (>100 notes) |

Store mode choice in `wiki/meta/mode.md`:
```markdown
---
type: meta
mode: generic
chosen: YYYY-MM-DD
---
```

### Language Teacher Mode (custom)

When the vault is for language teaching, add these conventions:
- `wiki/vocabulary/` for atomic word notes (CEFR tagged)
- `wiki/concepts/` for grammar rules, learning theories
- `wiki/entities/` for students (privacy: use initials)
- `wiki/lessons/` for lesson plans with linked vocabulary
- Every vocabulary note has: lang, cefr, pos, ipa, examples

---

## § AUTORESEARCH — Autonomous research loop

Triggers: "research [topic]", "/autoresearch", "deep dive into [topic]"

Based on Karpathy's autoresearch pattern: search → fetch → synthesize → file.

### Loop

1. **Web search** — run 3-5 queries on the topic.
2. **Fetch** top results (up to 8 pages).
3. **Extract** entities, concepts, key claims from each.
4. **Synthesize** — write a master concept page with citations.
5. **File** all extracted pages into wiki via §INGEST workflow.
6. **Repeat** if depth not reached (max 3 iterations).
7. **Report** — summary + links to all created pages.

---

## § THINK — 10-Principle Thinking Loop

Triggers: "/think", "think this through", "deep think on this"

Adapted from claude-obsidian v1.9. A discipline for non-trivial problems.

### The 10 Stages

1. **OBSERVE-external** — Read inputs before solving. Read the vault, the code, the data first.
2. **OBSERVE-internal** — Metacognition. Write a one-line bias log.
3. **LISTEN** — Absorb feedback. Read user's exact phrasing. Read error messages fully.
4. **THINK** — First-principles analysis. Break down the logic.
5. **CONNECT** — Lateral thinking. Link to related wiki pages, past decisions, patterns.
6. **CONNECT-system** — Orchestrate. How do parts interact? What breaks if X changes?
7. **FEEL** — Intuition. Does this pass the smell test?
8. **ACCEPT** — Intellectual humility. What might I be wrong about?
9. **CREATE** — Generate output. Now you can write.
10. **GROW** — What did this teach us? Update the wiki so compound knowledge remembers.

File think output to `wiki/questions/` or `wiki/concepts/` as appropriate.

---

## Obsidian Flavored Markdown (OFM) Rules

Compatible with kepano/obsidian-skills spec:

- `[[wikilinks]]` for all internal links — never bare paths
- `![[embed]]` for transclusions
- `> [!note]` / `> [!warning]` / `> [!contradiction]` / `> [!gap]` callout syntax
- `---` YAML frontmatter at top of every file
- Properties as YAML: tags as list, aliases as list, dates as ISO strings
- Filenames unique across vault (wikilinks are pathless)

---

## Hard Rules

1. **Ask before mutating.** Suggest → user approves → apply. Never auto-fix without confirmation.
2. **Frontmatter on every page.** No naked markdown files in wiki/.
3. **Update hot.md after every significant operation.** It is the continuity mechanism.
4. **Atomic vocabulary for teachers.** One word per file, densely linked, CEFR tagged.
5. **Log everything.** Every operation appends to `wiki/log.md` with timestamp.
6. **Compound knowledge.** The wiki gets richer with every ingest. Cross-references are the point.
7. **Privacy.** Student names = initials only. Source documents in `.raw/` stay local.
8. **The wiki is the product.** Chat is the interface. Knowledge persists in files.

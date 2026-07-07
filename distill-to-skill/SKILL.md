---
name: distill-to-skill
description: "Distill any article, URL, SOP, or workflow into a standard SKILL.md file."
---

# Distill to Skill

Turn any content into a reusable SKILL.md. Inspired by "万物皆可 Skill" (GeekCatX) + Tencent ima knowledge engineering methodology.

## Trigger

User says "做成 skill" / "distill this" / "make this a skill" — or provides a URL/SOP to convert.

## Input Sources

- URL (article, tweet thread, documentation)
- Paste text (SOP, workflow, methodology)
- Verbal description ("I want a skill that does X")
- Existing conversation turns (approved workflow from chat)

## Output

A SKILL.md file placed at `skills/<name>/SKILL.md` following the skill-creator spec.

## Distillation Process

### Phase 1: EXTRACT — Pull the core from the source

1. Fetch full content if URL; read source if local
2. Identify the **one core workflow** the content teaches
3. Separate:
   - **Procedural** (steps, commands, triggers) → goes into skill
   - **Explanatory** (why, background, theory) → summarize or discard
   - **Fluff** (intros, anecdotes, marketing) → discard
4. Extract all **brittle details**: exact commands, API names, config paths, gotchas, auth caveats

### Phase 2: STRUCTURE — Shape into skill format

1. Write **frontmatter**: `name` (kebab-case), `description` (noun-phrase, quoted)
2. Write **one-line purpose** under title
3. Write **trigger conditions** — when to load this skill
4. Write **workflow** — numbered steps, imperative mood, fragments ok
5. Add **reference section** if needed — commands, configs, templates → put in `references/`
6. Add **scripts** if deterministic helpers needed → `scripts/`

### Phase 3: VALIDATE — Ensure quality

1. YAML frontmatter parses correctly
2. Description is one noun-phrase, not a paragraph
3. No background fluff in skill body
4. Steps are executable (not "understand X" but "run X")
5. File at correct path: `skills/<name>/SKILL.md`

## Hard Rules

- **Lean body.** Base model already knows how to fetch URLs, read files, write code. Skill body only contains what's NOT obvious.
- **Brittle details stay.** Exact CLI flags, API endpoints, auth patterns, known gotchas — keep them. They're the whole point.
- **No README bloat.** No changelog, setup guide, or architecture doc unless it's a reference file.
- **Validate after write.** Run frontmatter YAML parse + path check.
- **Default workspace:** `~/.openclaw/workspace/skills/`

## Quality Gates

| Gate | Check |
|------|-------|
| Frontmatter | `---`, `name`, `description`, valid YAML |
| Length | Body < 100 lines (move extras to references/) |
| Executable | Every step can be done with tools available |
| No fluff | Zero marketing, zero "why this matters", zero theory unless operational |
| Path | `skills/<name>/SKILL.md` |

## Example

Source: "用 WorkBuddy + ima 搭个人知识库" article
Output: `skills/personal-kb-workbuddy-ima/SKILL.md` — only the setup steps, tool names, config paths, and gotchas. No theory.

## References

- Skill format spec: `skill-creator/SKILL.md`
- Validation: `python skills/skill-creator/scripts/quick_validate.py skills/<name>`

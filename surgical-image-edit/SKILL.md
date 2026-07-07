---
name: surgical-image-edit
description: Surgical image editing — poster design, layout adjustments, text corrections, element removal, and stylistic tweaks. Use when the user sends an image and asks for specific, scoped changes (especially "keep everything the same apart from X"). Applies to posters, social media graphics, event designs, and any visual design where the user wants precision edits preserving the existing aesthetic. Triggered by phrases like "fix this poster", "remove X", "change the text to Y", "adjust spacing", "make it look more like Z style".
---

# Surgical Image Edit

Precision image editing. When given an image and a set of changes, execute ONLY those changes. Do not improve, enhance, or creatively reinterpret anything not explicitly requested.

## Core Principle

**You are a precision instrument, not a creative collaborator during edits.** The user chose the image because they like it. Your job is to change ONLY what they asked for, exactly as they described.

## Phase 1: Analyze

Before touching anything:

1. **Extract all text** — Use OCR (tesseract) AND vision API (Gemini via OpenRouter) to get every word, its case, and its position.
2. **Map visual elements** — Use vision API to identify: people, objects, colors, backgrounds, effects, layout structure.
3. **Confirm with user** — "Here's what I see on the image — is this accurate?" Only proceed after confirmation.

See [references/analysis.md](references/analysis.md) for OCR and vision API templates.

## Phase 2: Lock Scope

1. **List ONLY the requested changes** — Create a checklist. No additions.
2. **Flag blending concerns separately** — If removing element X will leave a visual gap, ask: "Removing X will leave empty space here — want me to rebalance the surrounding elements, or leave it as-is?"
3. **Never assume** — Changing "BRIDGE THE GAP" to title case was NOT requested unless explicitly said. Fixing "Wangjiang St" to close the gap WAS requested. Only do what's asked.

## Phase 3: Preview the Prompt

**Before any generation, show the exact prompt to the user.** Format:

```
CHANGE: [specific change 1]
CHANGE: [specific change 2]
KEEP: everything else — colors, layout, typography, visuals, [list key preserved elements]
```

Wait for approval. Do not generate without it.

## Phase 4: Generate + Verify

1. **Generate ONE image** — Not multiple variants. The user wants precision, not options.
2. **Verify against checklist** — Use vision API to check each change was applied and nothing else was altered.
3. **If any check fails** — Fix ONLY the failed change. Do not rebuild the entire image.

## Phase 5: Deliver

1. Report which changes were applied successfully.
2. Note any judgement calls made (e.g., "Removed the text, filled with matching background texture").
3. If anything couldn't be done perfectly, say so rather than delivering a degraded image.

## Anti-Patterns

These are PROHIBITED during surgical edits:

- ❌ Adding text the user didn't ask for
- ❌ Changing text case without explicit instruction
- ❌ Rebuilding the entire poster from scratch when 3 surgical changes were requested
- ❌ Generating multiple variants hoping one is "better"
- ❌ Adding "design improvements" (fonts, colors, layout adjustments) unless asked
- ❌ Using the original as a loose reference instead of a source to edit precisely
- ❌ Hallucinating content from unrelated context

## Prompt Template for Gemini Image Edit

```
Edit this image. Make ONLY these changes. Do not alter anything else — not the colors, not the typography, not the layout, not the [list preserved elements], not anything.

1. [Specific change 1]
2. [Specific change 2]
3. [Specific change 3]
```

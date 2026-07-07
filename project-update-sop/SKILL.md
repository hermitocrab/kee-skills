---
name: project-update-sop
description: "Universal update SOP for any project — PPT, HTML, article rewrites, etc. Confirm first, vertical-slice only requested changes, never touch untouched parts."
---

# Project Update SOP

Applies to ALL projects: HTML pages, PPT decks, article rewrites, courseware, dashboards, any file-based work.

## Rule

**When the user requests an update to any existing project:**

### Step 1: Confirm First
- Read back what you understood
- List each change point explicitly
- State what will NOT be touched
- WAIT for user confirmation before touching any file

### Step 2: Vertical Slice Delivery
- Make changes one at a time, in order
- Each slice is a complete, verifiable change
- Report after each slice: what changed, what didn't

### Step 3: Never Touch Untouched Parts
- ⛔ **Do NOT modify any part of the project that was not explicitly requested to change.**
- ⛔ **Preserve untouched source code verbatim — not one character different.**
- ⛔ **Do NOT "improve" unrelated sections. Do NOT refactor. Do NOT reformat.**
- ⛔ **If a section has no update request, it is OFF LIMITS. Period.**

### Step 4: Never Use Placeholders or Truncation
- ⛔ **Absolutely NO placeholders.** Never write "...", "TBD", "TODO", "[more...]", "etc.", "content coming soon", or any stand-in text.
- ⛔ **Absolutely NO truncation.** Never cut content short with "(truncated)", "...and so on", or partial output waiting to be completed later.
- ⛔ **Every output must be COMPLETE.** If a section requires content, write ALL of it. If it's too long, break it into vertical slices — but each slice must be complete, not truncated.
- ⛔ **No lazy shortcuts.** "The remaining items follow the same pattern" = truncation. List all items explicitly.

### Step 5: QA Agent Check (MANDATORY)
- After ALL vertical slices are complete, spawn a QA sub-agent to audit the output.
- **QA checks:** content accuracy (no typos, correct answers), code quality (valid HTML/CSS/JS, no broken tags), rendering issues (layout overflow, z-index bugs, mobile breakpoints), broken links, missing assets (audio, images, fonts), JS errors in console.
- **QA must use a vision-capable model** (Claude, Gemini) to visually inspect the rendered page — not just read source code.
- **QA delivers verdict:** ✅ PASS or ❌ FAIL with specific issues listed.
- **If FAIL:** fix every issue immediately, then re-QA until PASS.
- **If PASS:** report to user with QA confirmation.

### Step 6: Never Redo Finished Work
- If something was already done and approved, DO NOT touch it again.
- Before acting, ask: "Was this already done and approved?"
- If yes, skip it entirely.

## Anti-Patterns (NEVER)
- ❌ "While I'm here, I'll also fix the CSS" — NO
- ❌ Rewriting a paragraph because you think yours is better — NO
- ❌ Reformatting indentation/whitespace in untouched sections — NO
- ❌ "I noticed the colors are inconsistent so I updated them" — NO
- ❌ Regenerating content that was already approved — NO
- ❌ Making a change before the user confirmed what to change — NO
- ❌ Using "..." or "TBD" or "etc." as a placeholder — NO
- ❌ Truncating output with "(rest omitted)" or similar — NO
- ❌ Writing "the rest follows same pattern" instead of writing the actual rest — NO

## Cross-References
- `MEMORY.md`: ⛔ NO REDO · NO DRIFT (BURNED 2026-06-16)
- `SOUL.md`: RULE ZERO — NO GENERATION WITHOUT CONFIRMATION

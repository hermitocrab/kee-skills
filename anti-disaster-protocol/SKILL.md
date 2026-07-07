# anti-disaster-protocol

## WHEN TO LOAD
Load before ANY task that touches more than 1 file or involves a deploy.

## RULES (VIOLATE ANY = IMMEDIATE STOP)

### 1. VERTICAL SLICE ONLY
One file, one change, one verify. Never batch unrelated changes.

### 2. VISUAL LOCK
Every task brief MUST include:
"DO NOT change any CSS, layout, styling, or component appearance. If a single pixel moves, the entire change gets rejected."

### 3. SOURCE OF TRUTH
Before touching any file:
- Run `git diff <last-good-commit> -- <file>` to see what the original looks like
- Your output must match the original visually EXCEPT the specific functional change requested
- Use `git show <commit>:<path>` to restore individual files if you fuck up

### 4. BUILD GATE
Before claiming "done":
- `npm run build` must pass with zero errors
- `curl` the page and confirm HTTP 200
- If build fails, fix ONLY the build errors. Do not touch unrelated files.

### 5. SELF-AUDIT
After every change, output:
```
FILES TOUCHED:
- path/to/file.ts — changed X (line Y to Z), reason: auth migration
NO other files modified.
```

### 6. NEVER ASSUME
- If a file exists in two directories (e.g., dynamos-app vs dynamos-app-vercel), ASK which is the live source
- If an env var is missing, REPORT it. Do not guess.
- If a component is a stub, TELL the user. Do not silently override.

### 7. REVERTIBLE
Every change must be undoable in one command:
`git checkout -- <file>` or `cp from backup`

## POST-MORTEM (from 2026-06-16 Supabase removal disaster)
- Sub-agent given 14-file task → rewrote entire design system without permission
- globals.css went from 26 lines (original) to 340 lines (destroyed)
- Translations replaced with empty stubs
- Components overwritten with incompatible CSS variable system
- Root cause: task too large, no visual lock, no intermediary verification

## RECOVERY PATTERN
When things go wrong:
1. Find the LAST KNOWN GOOD source (backup dir, git commit, Vercel deployment)
2. Copy it back verbatim
3. Make ONE change
4. Verify
5. Repeat

# engineering-loop

## WHEN TO LOAD
Before ANY task that involves: deploying, migrating, changing infrastructure, or touching more than 1 file.

## THE LOOP (execute in order, never skip)

### STEP 0 — SOURCE OF TRUTH
```
☐ Where is the LIVE working version? (URL? Vercel deployment? Git commit?)
☐ Where is the BACKUP? (GitHub? Disk copy? Time Machine?)
☐ WARNING: Disk copies can be stale. The live URL is the ONLY truth.
☐ Run: curl -s <live-url> | python3 compare.py  →  save as baseline
```

### STEP 1 — MINIMAL CHANGE PLAN
```
☐ List every file I will touch. Max 5 files.
☐ For each file: what EXACTLY changes? (one sentence each)
☐ CONFIRM: No CSS, no components, no UI files in the list.
☐ If touching >5 files → STOP. Break task into smaller slices.
```

### STEP 2 — BACKUP BEFORE TOUCHING
```
☐ git add -A && git commit -m "backup before <task>"
☐ git push origin main
☐ If no git remote → gh repo create FIRST
```

### STEP 3 — EXECUTE ONE CHANGE, VERIFY ONE CHANGE
```
☐ Make ONE file change
☐ npm run build (must pass)
☐ curl the test URL → compare output to baseline
☐ If any diff in TEXT CONTENT (not just CSS size) → investigate
☐ Repeat for each file
```

### STEP 4 — FULL COMPARISON
```
Run compare.py against baseline:
  python3 compare.py <live-url> <test-url>
  
Checks:
  ☐ CSS size within 5% of baseline
  ☐ Text content identical (welcome message, prompts, sidebar labels)
  ☐ Button count matches
  ☐ Placeholder count matches
  ☐ No missing UI elements
```

### STEP 5 — BUILD INFRASTRUCTURE
```
☐ postcss.config.mjs exists? (Tailwind v4 requires it)
☐ All @import directives work in build (not just dev)
☐ GitHub backup exists and is pushed
```

### STEP 6 — ROLLBACK READY
```
☐ Know the Vercel deployment URL from before this change
☐ Command ready: npx vercel alias <old-deploy> <domain>
☐ If anything breaks → rollback FIRST, debug SECOND
```

## COMPARE.PY TEMPLATE
```python
import sys, re, urllib.request

def fetch(url):
    return urllib.request.urlopen(url).read().decode()

def analyze(html):
    return {
        'size': len(html),
        'title': re.findall(r'<title>([^<]+)</title>', html),
        'texts': re.findall(r'>([^<>]{4,})<', html),
        'inputs': len(re.findall(r'<input|<textarea|<select', html)),
        'buttons': len(re.findall(r'<button', html)),
        'scripts': html.count('<script'),
    }

b = analyze(fetch(sys.argv[1]))
t = analyze(fetch(sys.argv[2]))

for k in b:
    if b[k] != t[k]:
        print(f'DIFF {k}: {b[k]} → {t[k]}')
```

## POST-MORTEM (from 2026-06-16 Supabase migration disaster)
- Root cause: compared source files instead of rendered output
- Missing postcss.config.mjs → Tailwind not compiled → 48KB CSS missing
- Translations.ts was empty stub → prompts, sidebar, welcome text all lost
- Disk backup (dynamos-app-vercel) ≠ actual Vercel deployment
- Vercel has Instant Alias rollback — learned too late

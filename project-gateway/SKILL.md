---
name: project-gateway
description: "MANDATORY pre-flight check before ANY file edit or deploy. Maps every project to its correct working directory and deployment target. Run this before touching any project file."
---

# Project Gateway — Pre-Flight Checklist

**⛔ NEVER skip this. Before editing or deploying ANY file, verify the project path here.**

## Quick Reference

| Domain | Deploy From | Working Copy | Vercel Project |
|--------|------------|--------------|----------------|
| det.rkrk.io | `dev/det-with-kee/` | `dev/det-with-kee/` (direct) | Flask :9092 + Tunnel |
| courseware.rkrk.io | `dev/rkrk.io/` (port 8090) | `workspace/teaching-research/` | Python http.server :8090 + Tunnel |
| ielts.rkrk.io | `dev/ielts-with-kee/` | `workspace/ielts-with-kee/` | Flask :9091 + Tunnel |
| rkrk.io/dynamos | `dev/rkrk.io/dynamos/` | `dev/rkrk.io/dynamos/` (direct) | rkrk.io |
| dynasaurus.rkrk.io | `dev/dynamos-app-vercel/` | `dev/dynamos-app-vercel/` | dynamos-app |

## Pre-Edit Checklist

1. What domain am I deploying to?
2. Which directory does it deploy FROM?
3. Is there a workspace copy? Is it synced with dev?
4. What files am I changing? List them.
5. For ielts.rkrk.io: rsync workspace → dev BEFORE deploying
6. For courseware.rkrk.io: rsync workspace/teaching-research/ → dev/rkrk.io/ BEFORE deploying (BURNED 2026-07-07)
7. For det.rkrk.io: edit directly in dev/det-with-kee/, restart server.py :9092

## Pre-Deploy Checklist

1. `ls` the dev directory — confirm all needed files are there
2. File sizes look correct? (not truncated, not 0 bytes)
3. `cd dev/[project] && vercel --prod --yes`
4. After deploy: refresh browser, verify changes are live

## Directory Map

```
dev/
├── ielts-with-kee/          → ielts.rkrk.io (Vercel: ielts-website)
│   ├── speaking-p2/         → ielts.rkrk.io/speaking-p2/
│   ├── report/              → ielts.rkrk.io/report/
│   ├── dynamos/             → ielts.rkrk.io/dynamos/ (Push Engine Demo)
│   └── pt3-bank.html
├── rkrk.io/
│   └── dynamos/             → rkrk.io/dynamos/ (Vercel: rkrk.io)
│       ├── intro/index.html → "The Roblox for Education"
│       ├── bp/index.html    → Business Plan
│       └── index.html       → Hub page
└── dynamos-app-vercel/      → dynasaurus.rkrk.io (Vercel: dynamos-app)

workspace/
└── ielts-with-kee/          → working copy (sync to dev/ielts-with-kee/ before deploy)
```

## Common Mistakes (DON'T DO THESE)

- ❌ Editing workspace/ielts-with-kee/dynamos/intro/ for rkrk.io/dynamos/intro (wrong deploy target!)
- ❌ Deploying dev/ielts-with-kee without syncing from workspace first
- ❌ Forgetting rkrk.io/dynamos deploys from dev/rkrk.io/dynamos, NOT dev/ielts-with-kee

## Learned

2026-05-27 — Created after discovering rkrk.io/dynamos deploys from dev/rkrk.io/dynamos, a third directory not documented in MEMORY.md. The ielts.rkrk.io dual-directory trap only covers ielts-with-kee, not the rkrk.io DynamOS pages.

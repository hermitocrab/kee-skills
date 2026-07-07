# DynaSaurus Deploy Guard

## ⛔ ABSOLUTE PROHIBITION

**NEVER deploy, redeploy, promote, or alias ANYTHING to dynasaurus.rkrk.io without EXPLICIT, VERBATIM permission from Author.**

This means:
- ❌ `vercel --prod` on the dynamos-app project
- ❌ `vercel deploy --prod`
- ❌ `vercel redeploy` targeting production
- ❌ `vercel promote` to production
- ❌ `vercel alias` that affects dynasaurus.rkrk.io
- ❌ Any action that modifies what dynasaurus.rkrk.io serves

## ✅ Allowed Operations (without additional permission)

- `vercel` (preview only, no --prod flag)
- `vercel list` / `vercel ls`
- `vercel alias ls`
- Reading/inspecting deployments

## Project Mapping (UPDATED 2026-06-28)

DynaSaurus has THREE sites:
- **dynasaurus.rkrk.io** = PRODUCT page (chat app) → Vercel project: `dynamos-app` → Local source: `dev/dynamos-app/`
- **dynasaurus.rkrk.io/intro** = INTRO/LANDING page (Aisyah persona) → Local source: `dev/dynasaurus-preview/intro/index.html`
- **test-dynasaurus.rkrk.io** = TEST site → Flask localhost:5050, Cloudflare Tunnel → Local source: `dev/dynasaurus-test/`
- ⛔ NEVER confuse product page with intro page or test page

## Test-First Workflow (BURNED 2026-06-28)

1. ALL DynaSaurus updates go to **test-dynasaurus.rkrk.io** FIRST
2. Author reviews and approves on test
3. Only THEN deploy to product (dynasaurus.rkrk.io)
4. ⛔ NEVER skip test → go directly to product

## Trigger Words

If Author says ANY of these, STOP and ASK for explicit confirmation:
- "deploy dynasaurus"
- "push to dynasaurus"
- "update dynasaurus.rkrk.io"
- "redeploy dynasaurus"
- Any command involving dynasaurus.rkrk.io production

## Recovery

If an unauthorized deploy to dynasaurus.rkrk.io occurs:
1. Immediately stop all further deploys
2. Check `vercel list` to identify the pre-incident production deployment
3. `vercel promote` the correct deployment back
4. Report to Author

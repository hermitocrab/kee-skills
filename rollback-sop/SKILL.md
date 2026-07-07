# rollback-sop

## WHEN TO USE
When a deploy breaks the site. Before trying to fix code, try these — from fastest to slowest.

## 1. VERCEL INSTANT ALIAS (seconds)
The deployed version still lives at its preview URL. Just re-alias it.

```bash
# Find the last good deployment
cd project-dir && npx vercel ls --next <token>
# Alias the good deployment to production
npx vercel alias <good-deployment-url> <production-domain>
# Example:
npx vercel alias dynamos-160r7lpnr-hermitocrabs-projects.vercel.app dynasaurus.rkrk.io
```

## 2. VERCEL DASHBOARD ROLLBACK (30 seconds)
1. https://vercel.com/hermitocrabs-projects/<project>/deployments
2. Find the good deployment
3. Click ⋮ → Instant Rollback
4. Confirm

## 3. GIT REVERT + REDEPLOY (minutes)
```bash
git log --oneline -10  # find the last good commit
git revert <bad-commit>
git push
# Vercel auto-deploys from GitHub
```

## 4. RE-DEPLOY FROM BACKUP (minutes)
```bash
cd /Users/agentii/dev/dynamos-app-vercel  # or any backup dir
npx vercel --prod --yes
```

## GOLDEN RULES
- **Before deploying, `git push`**
- **Never fix broken deploys by editing more files — rollback first, then fix locally**
- **Every project must have a GitHub backup**
- **Vercel keeps ALL deployments — they never delete, use them**

## PROJECT GITHUB REPOS
| Project | GitHub |
|---------|--------|
| dynasaurus.rkrk.io | github.com/hermitocrab/dynasaurus |
| rkrk.io | github.com/hermitocrab/rkrk.io |
| ielts.rkrk.io | github.com/hermitocrab/ielts-with-kee |
| dynasaurus-preview | github.com/hermitocrab/dynasaurus-preview |
| hairuis-checkin | github.com/hermitocrab/hairuis-checkin |

# Preview-First Deploy Protocol

All rkrk.io site changes go to preview first, production only after explicit approval.

## Environments

| Environment | URL | Purpose |
|---|---|---|
| Preview | `test.rkrk.io` | Staging — all changes land here first |
| Production | `rkrk.io` | Live — only after Author approves preview |

Both serve from the same root: `/home/user/dev/rkrk.io/`
Nginx config: `/opt/homebrew/etc/nginx/servers/sites.conf`
Tunnel: Cloudflare tunnel `hairuis` (`f9d0c4ab`), ingress in `~/.cloudflared/config.yml`

## Workflow

### 1. Deploy to Preview
Make changes, then:
```bash
# Copy files to dev/rkrk.io/ (shared root)
# If server-side: restart API process
# nginx auto-reloads, tunnel auto-routes
```
Verify: `curl -s -o /dev/null -w "%{http_code}" https://test.rkrk.io/quicklevel/`

### 2. Present Preview
Send Author the test URL and describe changes:
```
🦄 002 — Preview ready at test.rkrk.io/quicklevel
Changes: [list]
Tap to review, then say "make it live" or request changes.
```

### 3. Approval Gate
- **"make it live"** or **"push to production"** → confirm files are in shared root → done
- **"looks wrong"** or **"fix X"** → fix on preview, re-present
- No response → do NOT push. Keep on preview.

### 4. Production
Since both environments share the same root directory, production is already updated once files are in `dev/rkrk.io/`. The "approval" step is a gating checkpoint.

For isolated changes (e.g., new features): use feature branches or separate directories:
```bash
# Option: deploy to a different port/branch first
cp -r dev/rkrk.io/quicklevel dev/rkrk.io/quicklevel-next/
# Then swap after approval
rm -rf dev/rkrk.io/quicklevel && mv dev/rkrk.io/quicklevel-next dev/rkrk.io/quicklevel
```

## Rules
- ⛔ Never push directly to production without preview
- ⛔ Never skip preview for visual changes, new features, or API changes
- ✅ Content-only changes (text updates, question tweaks) can skip preview with explicit approval
- ✅ Emergency fixes can skip preview if Author explicitly requests "hotfix"
- After approval, delete any temporary preview artifacts

## Testing
Before presenting preview:
1. `curl` the preview URL to confirm HTTP 200
2. Test the main user flow (start → answer → report)
3. Check mobile via responsive curl or mention mobile testing needed

## Tunnel Restart
If preview URL returns 502/404:
```bash
pkill -9 cloudflared
sleep 3
cloudflared tunnel run hairuis > /tmp/cloudflared.log 2>&1 &
```

# Vision Skills — Bowie's Eyes

## Prerequisites
- Playwright (`npx playwright`) — installed ✓
- Sharp (image processing) — installed in gateway ✓
- Screenshot output: always `~/.openclaw/workspace/` (NOT /tmp — image tool needs allowed dir)

## Commands

### Browser Screenshot
Capture any webpage as a screenshot:
```bash
npx playwright screenshot <url> ~/.openclaw/workspace/screenshot.png
```
Options:
- `--full-page` — full scroll capture
- `--viewport-size "1440,900"` — custom viewport (use for UI review, not full-page)
- `--wait-for-selector ".content"` — wait for specific element

### Browser View (CDP — Live Chrome)
To see your actual browser tabs (not headless):
```bash
# STEP 1 (you do this once): Launch Chrome with remote debugging
# /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222

# STEP 2: Bowie connects and captures active tab
node -e "
const pw = require('playwright');
(async () => {
  const browser = await pw.chromium.connectOverCDP('http://localhost:9222');
  const pages = browser.contexts()[0].pages();
  await pages[0].screenshot({ path: process.env.HOME + '/.openclaw/workspace/live_browser.png' });
  console.log('Captured:', await pages[0].title());
  await browser.close();
})();
"
```

### Desktop Screenshot (macOS)
```bash
screencapture -x ~/.openclaw/workspace/desktop.png
```
*Note: May fail in sandboxed/headless context. Requires GUI session with Accessibility permission.*

### Image Analysis After Capture
```
read ~/.openclaw/workspace/screenshot.png
# or with specific prompt:
image ~/.openclaw/workspace/screenshot.png "What UI elements and typography do you see?"
```

## Full Pipeline Example
```bash
# 1. Capture
npx playwright screenshot --viewport-size "1440,900" https://rkrk.io ~/.openclaw/workspace/page.png

# 2. Analyze (separate turn — image tool needs the file on disk)
Then: "Bowie, look at ~/.openclaw/workspace/page.png and describe the design system"
```

## Limitations
- `sharp` requires gateway restart after install
- CDP requires Chrome launched with `--remote-debugging-port=9222`
- Desktop capture may not work in headless mode
- Image tool has file size limits (keep screenshots under ~1MB, use viewport mode not full-page)

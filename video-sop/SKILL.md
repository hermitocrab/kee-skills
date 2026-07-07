---
name: video-sop
description: "Any video sourcing or embedding: sourcing rules, player layout, bilingual subtitle stream, and local serving."
---

# Video SOP

Use for ANY task involving video sourcing, downloading, embedding, or subtitle work. Load before selecting or embedding a video.

## Sourcing Rules

- **Accent**: Five Eyes only — US, UK, Canada, Australia, New Zealand native speakers. No non-native accents, no AI-generated voices.
- **Duration**: full video can be any length. Choose a 3-4 minute excerpt that delivers the core story.
- **Quality**: high production value, professional editing, engaging visuals. VICE, Great Big Story, or similar documentary-style preferred.
- **Content**: choose someone edgy, artsy, or culturally fascinating — a profile that makes students curious about the world. The person should be interesting to think about and describe.
- **Source**: YouTube preferred. Use yt-dlp to download.

### Subtitle Requirements
- VTT bilingual subtitles MANDATORY for the chosen excerpt.
- **Right-side subtitle stream must be verbatim** — exact spoken words, extracted from whisper or VTT transcription. Never paraphrase, never summarize, never rewrite.
- Timestamps must match the original video positions.
- Chinese translation below each English line.

### Download Method

#### Step 0: Check Clash Verge Status
```bash
# Check TUN mode and traffic remaining
curl -s --unix-socket /tmp/verge/verge-mihomo.sock http://localhost/configs 2>/dev/null | python3 -c "
import sys,json
d=json.load(sys.stdin)
tun=d.get('tun',{})
print(f'TUN enabled: {tun.get(\"enable\",\"?\")}')
"

# Check current node and remaining traffic
curl -s --unix-socket /tmp/verge/verge-mihomo.sock http://localhost/proxies/Proxy 2>/dev/null | python3 -c "
import sys,json
d=json.load(sys.stdin)
print(f'Current node: {d.get(\"now\",\"?\")}')
all_nodes=d.get('all',[])
for n in all_nodes:
    if 'Traffic Remaining' in n:
        print(f'  {n}')
"
```

#### Step 1: Switch to a Working Node
```bash
# List available nodes
curl -s --unix-socket /tmp/verge/verge-mihomo.sock http://localhost/proxies/Proxy 2>/dev/null | python3 -c "
import sys,json
d=json.load(sys.stdin)
for n in (d.get('all',[]) or []):
    if 'Rate' in n: print(f'  {n}')
"

# Switch to a node with working traffic (prefer Germany/Australia for YouTube)
curl -s -X PUT --unix-socket /tmp/verge/verge-mihomo.sock \
  http://localhost/proxies/Proxy -H 'Content-Type: application/json' \
  -d '{"name":"Germany-PRO-FW-DE1-Rate:0.5"}'
```

#### Step 2: Enable TUN Mode (if not already)
```bash
# Check current TUN status
curl -s --unix-socket /tmp/verge/verge-mihomo.sock http://localhost/configs 2>/dev/null | python3 -c "
import sys,json
d=json.load(sys.stdin)
print('TUN enabled:', d.get('tun',{}).get('enable','?'))
"

# Enable TUN mode via Clash API
curl -s -X PATCH --unix-socket /tmp/verge/verge-mihomo.sock \
  http://localhost/configs -H 'Content-Type: application/json' \
  -d '{"tun":{"enable":true}}'
```
**TUN mode routes ALL system traffic through the VPN (198.18.0.1 via utun4). No --proxy flag needed.**

#### Step 3: Verify YouTube Access
```bash
# Method A: TUN mode (preferred — system-wide routing)
curl -s --max-time 8 https://www.youtube.com -o /dev/null -w '%{http_code}'
# Should return 200

# Method B: HTTP proxy fallback (port 7897)
curl -s --max-time 8 --proxy http://127.0.0.1:7897 -o /dev/null -w '%{http_code}' https://www.youtube.com
# Should return 200
```

#### Step 4: Download
```bash
# With TUN mode (no --proxy flag needed)
python3 -m yt_dlp --no-playlist -f 'worst' \
  --extractor-args 'youtube:player_client=android' \
  'SEARCH_OR_URL' -o 'media/video.%(ext)s'

# OR: with HTTP proxy if TUN not working
python3 -m yt_dlp --proxy http://127.0.0.1:7897 \
  --no-playlist -f 'worst' \
  --extractor-args 'youtube:player_client=android' \
  'SEARCH_OR_URL' -o 'media/video.%(ext)s'
```

**Why android client**: YouTube enforces SABR streaming which blocks web/ios clients. The android client bypasses this on many videos. If android also fails, try `player_client=tv`.

#### Troubleshooting

| Symptom | Check | Fix |
|---------|-------|-----|
| curl returns 000 | Proxy or TUN not routing | Enable TUN mode, switch node |
| Traffic Remaining 0.00 GB | Subscription exhausted | Renew Clash subscription — nothing else works |
| yt-dlp SABR error | YouTube blocked the client | Try `player_client=tv` or `player_client=android_vr` |
| TUN 000 but proxy 200 | TUN stack routing bug | Use `--proxy http://127.0.0.1:7897` flag |
| All nodes return 000 | Network down or all nodes dead | Check internet, restart Clash Verge |

**⛔ If traffic is 0.00 GB, STOP. Do not waste time trying yt-dlp flags. Tell SrKeeda: proxy subscription needs renewal.**

## Player Layout

Two-panel design:

```
┌──────────────────────┬──────────────────────┐
│                      │  0:00  English line  │
│                      │       中文翻译       │
│     Video Player     │  0:05  English line  │
│                      │       中文翻译       │
│                      │  0:10  English line  │
│                      │       中文翻译  ← active
└──────────────────────┴──────────────────────┘
```

- **Left panel**: embedded video player (16:9 ratio)
- **Right panel**: scrollable lyric-style subtitle stream
  - Each line: timestamp · English sentence · Chinese translation
  - Timestamps are clickable → jump video to that sentence
  - Active line highlighted (`.active` class)
  - Auto-scroll follows playback via `timeupdate` event
  - Stack vertically: mobile collapses to video on top, subtitles below

## Implementation

```javascript
// Click subtitle → jump video
document.querySelectorAll('.sub-line').forEach(el => {
  el.addEventListener('click', () => {
    video.currentTime = parseFloat(el.dataset.time);
  });
});

// Active line tracking
video.addEventListener('timeupdate', () => {
  const lines = document.querySelectorAll('.sub-line');
  lines.forEach(l => l.classList.remove('active'));
  for (let i = lines.length - 1; i >= 0; i--) {
    if (video.currentTime >= parseFloat(lines[i].dataset.time)) {
      lines[i].classList.add('active');
      lines[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      break;
    }
  }
});
```

## Subtitle Data Format
From VTT or structured JSON:
```
[timestamp_seconds] | English line | Chinese translation
0.0 | How do you feel when you hear these words? | 当你听到这些话时，你感觉如何？
```

## Cross-References
- `openai-whisper` skill for transcription
- `video-subtitle-pipeline` for YouTube download + bilingual VTT
- `pre-class-sop` for pre-class specific video integration
- MEMORY.md: VPN TUN mode for yt-dlp

## File Sending SOP

### ⛔ Large Files (>5MB): Upload to Web, Send Link

**Never send large files through iMessage.** Files >5MB get rejected, garbled, or buried in UUID clutter.

Instead: copy to `~/dev/rkrk.io/files/` and send the URL.

```bash
# 1. Copy file to web-accessible directory
cp /path/to/large-file.ext ~/dev/rkrk.io/files/

# 2. Send the URL to SrKeeda
# Format: https://rkrk.io/files/filename.ext
```

Works because rkrk.io is served by Python HTTP server from `~/dev/rkrk.io/` on port 8080.
One-click download, no iMessage size limits, no UUID garbage.

### Small Files (<5MB): MEDIA Directive

- Use `MEDIA:` directive with clean absolute path
- Verify file exists before sending
- ⚠️ OpenClaw iMessage appends internal UUIDs to attachment names. Keep filenames short (<15 chars).

### Naming Rules
- **Short and clear** — max 15 characters for iMessage readability
- Format: `SourceCode-TrackID.ext`
  - Example: `U19-T14i.mp3` ✅
  - NOT: `IELTS-Grammar-U19-Track14i.mp3` ❌
- Use digits + short prefix, hyphens only

## 指读视频 (Guided Reading Video) Format

For PU/Kids guided reading videos. Three video types.

### ⛔ Visual Design Rules (MANDATORY)

1. **Background**: Light dual-color gradient ONLY. Never dark/aurora/deep blue backgrounds.
   - Top: warm cream/peach #FFF8E7
   - Bottom: light sky blue #E8F4FD

2. **Text Color**: BLACK for ALL text (#1a1a1c). Highlight uses gold glow (#FFD700) around text, but text itself stays black.
   - Read: #555 (medium gray)
   - Unread: #BBB (light gray)
   - Section headers: #333 (dark gray)

3. **Active Font Size**: The active/highlighted element should occupy ~2/3 of screen width.
   - Sentences: 60-80pt bold
   - Vocabulary words: 48-64pt bold
   - Mindmap active: 56-72pt bold

### 1. Vocabulary Video
- 3×4 grid of standalone words (emoji + word)
- Active word: BIG (48-64pt), bold black, gold glow ring
- Read words: medium gray #555; Unread: light gray #BBB

### 2. Sentences Video
- Karaoke/lyric-style — one sentence active at center occupying 2/3 of screen
- Active sentence: 60-80pt BOLD BLACK with gold glow ring

### 3. Mindmap Video
- 4 sections: Characters, Setting, Story, Lesson
- ⛔ **Module scoping**: Only show sentences from the CURRENT module being read
- **Center active module**: Module centered on screen; active sentence 56-72pt BOLD BLACK, ▶ prefix, gold glow
- ⛔ **One sentence per line**: NEVER two sentences on same line
- ⛔ **Audio Sync**: Use Whisper word-level timestamps for sentence start/end times. Never uniform timing.

### ⛔ TTS Audio Generation (MANDATORY)
- **Concatenate method ONLY**: Generate each word/sentence as a SEPARATE MP3 via edge-tts, then ffmpeg concat with silence gaps
- ⛔ **NEVER use SSML `<break>` tags** — edge-tts reads them as literal text ("break time equals...")
- Silence gap: 0.7-1.0s between segments via ffmpeg anullsrc filter
- Script template: individual edge-tts.Communicate() per segment → ffmpeg concat demuxer

### Emoji Rendering Fix
- Pillow cannot render Apple Color Emoji. Use Swift helper (AppKit) to pre-render as PNGs.

### QA Checklist
- [ ] Light dual-color gradient background
- [ ] ALL text is BLACK (not white, not coral)
- [ ] Apple Color Emoji render correctly (not teal)
- [ ] Active occupies ~2/3 screen width
- [ ] Audio sync (mindmap: Whisper timestamps)
- [ ] One sentence per line (mindmap)
- [ ] Module scoping (mindmap: only current module visible)

## ⛔ 指读视频页面布局 (Reading Video Page)

Combined page: **学情反馈 + 指读视频 + 家庭作业**.

### ⛔ Cache-Busting (MANDATORY)
- **Every page update MUST include cache-busting**: add `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">` in `<head>`
- **All internal links and video src MUST carry `?v=TIMESTAMP`** — update the timestamp every deploy
- Use `date +%s` to generate fresh cache buster
- Command: `sed -i '' "s|videos/NAME.mp4?v=[0-9]*|videos/NAME.mp4?v=$(date +%s)|g" *.html`
- This prevents Safari/Cloudflare from serving stale cached pages

### Content Blocks (in order)
1. **Vocabulary** — dual-column cards (English+Chinese in one card) → video embed
2. **Sentences** — sentence list with translations → video embed  
3. **Story Map** — 4 modules with complete sentences matching the video → video embed
4. **Divider** — visual separator (── ✦ ──)
5. **Homework** — numbered list with bilingual items (from feedback sheet)
   - 📖 Read aloud, 🔤 Practice vocab + spelling, 🎬 Submit reading video, 📖 Workbook pg 96-97 Q2-5

### Design
- Consistent with feedback-sheet.html style (`.section` card)
- Page title: "学情反馈 + 指读视频"
- **Rainbow gradient cards**: Each section gets a unique light gradient to attract kids (NOT the same gradient everywhere)
  - Vocabulary: warm peach → coral → gold (#FFE0D3 → #FFF3E0 → #FFECB3)
  - Sentences: sky blue → aqua → mint (#D4F1F9 → #E0F7FA → #B2EBF2)
  - Story Map: grass → lime → moss (#E8F5E9 → #F1F8E9 → #DCEDC8)
  - Homework: lavender → violet → lilac (#F3E5F5 → #EDE7F6 → #E1BEE7)
- **Inner text boxes**: semi-transparent white (rgba 0.75), 12px rounded corners
- Round corners: 20px section cards, subtle shadow
- Reference: iCloud `Websites/phonetics_interactive card.html`

### Floating Nav Banner
- Sticky top-center nav with quick-access links to each section
- Design: frosted glass pill (rgba white + backdrop-blur), rounded 100px
- Links: emoji + short label, hover color matches section gradient
- **Collapsible**: ✕ button toggles visibility; ☰ shows when hidden (return to visible)
- Smooth scroll to section on click
- Mobile: smaller text/padding

## Never
- Never use non-native English accents (Five Eyes only)
- Never use AI-generated voices or TTS as video content
- Never use raw webcam / amateur / low-production videos
- Never embed without bilingual subtitle stream

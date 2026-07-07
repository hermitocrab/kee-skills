---
name: pu-production-sop
description: "Complete PU course production SOP — from PPT to deployed website with guided reading videos, printables PDF, feedback notes, lesson plan. Single source of truth. DO NOT create parallel SOPs. Update THIS file only."
---

# PU Course Production SOP v7

> Single source of truth. All previous versions deleted. No parallel SOPs exist.
> Source of truth priority: 1) This file 2) imsg chat history (if newer) 3) V1G1 benchmark
> **SOP Update Rule:** new SOP OVERWRITES old completely. Old files DELETED. No fragments left behind.
> V1G1 videos at `unit-8/vocab-1-grammar-1/videos/` are the visual benchmark.
> ⛔ **Mindmap Sync Rule:** When mindmap content changes in reading-video.html, ALL artifacts MUST be updated: feedback-notes.html, printables.html, printables-pdf.html, and mindmap.mp4. Sentence count, module headers, and format must be IDENTICAL across all files. Never ship partial updates.

---

## ⛔ SOP UPDATE PROTOCOL

1. **New SOP OVERWRITES old** — replace entire file, do not append
2. **Delete old fragments** — if an old SOP file contradicts this one, DELETE it
3. **Conflict resolution** — if SOP conflict, use latest from imsg chat history
4. **One file per domain** — no duplicates across skills/ directories
5. **Benchmark reference** — V1G1 `vocab-1-grammar-1/videos/generate_guided_reading.py` is the gold-standard implementation

---

## 📋 Pre-Flight: Before ANY Generation

### Input Required
1. PPT file(s) from iCloud (`Teaching/FCE & PU/` directory)
2. Lesson name (e.g. "PU1 U8 Vocab 1 + Grammar 1")
3. Confirm: 2-3 students, 2hr class (1hr + 10min Just Dance + 1hr)

### Vocabulary Rule
- Minimum 12 words — if PPT has fewer, extract more from context (furniture names, action verbs, etc.)
- Each word gets: emoji, English, Chinese, example sentence
- ⛔ **No duplicate vocabulary across lessons**: cross-reference all previous lessons in same unit. Never reuse words.
- ⛔ **No duplicate sentences across lessons**: sentences must use NEW vocabulary and NEW grammar points.

---

## 🎬 Guided Reading Videos (×3)

### ⛔ Lesson Type Split (MANDATORY)
Two types of lessons — different Chinese translation rules:
- **Type A (Vocab 1+Grammar 1 / Vocab 2+Grammar 2):** NO Chinese translations anywhere. English only.
- **Type B (Cross-Curricular / Literature):** Chinese translations included — rules below.

### ⛔ Hard Rules (from chat — Author approved)
- **Background**: Light dual-color gradient ONLY — #FFF8E7 (cream/peach) → #E8F4FD (sky blue)
- **Text Color**: BLACK (#1a1a1c) for ALL text — never white, never coral, never colored
- **Highlight**: Gold glow (#FFD700) ring halo behind black text — text itself stays BLACK
- **Glow method**: Multi-offset ring (24 positions, radius 5, alpha 200) + Gaussian blur (radius 2)
- **Read text**: #555555 gray · **Unread text**: #BBBBBB gray
- **Resolution**: 1920×1080, 1fps, PNG frames → H.264 MP4
- **Emoji**: Apple Color Emoji via Swift renderer `/tmp/emoji_render` — NEVER PIL font emoji
- **TTS Speed**: `--rate=-40%` for A1 primary school children (Grade 1-2, ages 6-8). `--rate=-20%` for older children/teens.

### ⛔ Chinese Translation Rules (Type B ONLY — CC/Lit)
- **Timing**: Chinese ONLY visible on the ACTIVE item. For read/unread items, Chinese is COMPLETELY HIDDEN.
- **Position**: TWO lines below English — add 36px extra gap between English and Chinese
- **Format**: 32pt BOLD, centered below English
- **Highlight**: Chinese gets GOLD GLOW (same glow_paste as English) — ONLY on active
- **Font**: Bold Chinese font (`_cn_font_bold`)
- Use `_wrap_text` with `max_w = int(W * 0.65)` for both English and Chinese (side padding ≤ 1/3 width)

### Benchmark Script
- Copy from: `unit-8/cross-curricular/videos/generate_guided_reading.py` (v5 — most current)
- Adapt content only (vocab words, sentences, mindmap sections + timestamps)
- Do NOT change: color system, glow system, emoji renderer, font system, layout logic
- Verify `/tmp/emoji_render` exists before running

### ⛔ TTS Audio (MANDATORY)
- **Concatenate method ONLY**: Generate each word/sentence as SEPARATE MP3 via edge-tts
- **⛔ NEVER use SSML `<break>` tags** — edge-tts reads them as literal text
- Silence gaps: ffmpeg `anullsrc` filter, 0.7-1.0s between segments
- Voice: `en-US-JennyNeural` (friendly female, kid-appropriate)
- Speed: `--rate=-40%` (extra slow for A1 primary school children, ages 6-8)

### 1. Vocabulary Video
- Type A (no Chinese): 3×4 grid, emoji + English word only
- Type B (with Chinese): 3×4 grid, emoji + English word + Chinese below (Chinese only on active)
- Highlight at grid POSITION — do NOT center the active word
- Swift-rendered emoji: 56px (active), 36px (read), 36px faded 0.15 (unread)
- Active: 60pt BOLD BLACK + gold glow ring
- Read: 44pt #555 + 50% opacity emoji
- Unread: 44pt #BBB + 15% opacity emoji
- Chinese (Type B): 32pt BOLD, gold glow, hidden on read/unread

### 2. Sentences Video
- Karaoke/lyrics-style — one sentence active at center
- Emoji + full sentence (+ Chinese below for Type B, on active only)
- Active: 72pt BOLD BLACK, gold glow, Swift-rendered emoji 56px
- Read (above): 34pt #555, emoji 28px faded
- Unread (below): 28pt #BBB, emoji 22px faded
- Chinese (Type B, active only): 32pt BOLD, gold glow, 36px gap below English

### 3. Mindmap Video
- ⛔ Module-by-module scoping: ONLY show sentences from the CURRENT module
- ⛔ Current module centered on screen, gold underline on header
- ⛔ MAX 8 sentences total across all modules
- Active sentence: 72pt BOLD BLACK, gold glow, NO prefix
- ⛔ One sentence per line — NEVER two sentences on same line
- ⛔ Whisper timestamps for EVERY sentence start/end
- Read: 38pt #555 · Unread: 30pt #BBB
- Chinese (Type B, active only): 32pt BOLD, gold glow, 36px gap below English
- Module headers: Swift-rendered emoji text, 38pt
- Format matches sentences video: English BOLD, Chinese below (Type B only, active only)

### ⛔ Audio Sync (MANDATORY)
- **Run Whisper on mindmap.mp3 FIRST** to get word-level timestamps
- Parse JSON → extract segment start/end for each sentence
- Never use uniform timing (total_dur / num_segments)
- Video uses `-shortest` flag: auto-trimmed to audio length

### ⛔ Emoji QA
- Extract frames and verify: NO teal circles (PIL emoji failure), NO missing emoji
- Cache directory: `/tmp/emoji_cache_pu1/`

### Video QA Checklist
- [ ] Light dual-color gradient background (NOT dark aurora, NOT solid color)
- [ ] ALL text is BLACK (#1a1a1c) — verify programmatically
- [ ] Apple Color Emoji render correctly (Swift renderer used)
- [ ] Gold glow visible on active text (multi-offset ring + blur)
- [ ] Vocabulary: grid layout, highlight at position, Chinese below each word
- [ ] Sentences: lyrics/karaoke, active sentence centered, Chinese below
- [ ] Mindmap: module scoping (only current module visible), one sentence per line
- [ ] Mindmap: Whisper timestamps used for every sentence
- [ ] Mindmap: ▶ prefix on active, section header with gold underline
- [ ] Audio sync: no TTS code read aloud, no SSML artifacts
- [ ] Chinese translations present on ALL items
- [ ] Content matches reading-video.html EXACTLY (cross-reference)

---

## 🌐 Reading Video Page (学情反馈 + 指读视频)

### File: `reading-video.html`

### ⛔ Layout (MANDATORY)
- **NO breadcrumb** — page starts with nav banner directly above h1
- Title: "📋 学情反馈 + 指读视频"
- Subtitle: "PU1 UX · Lesson Name · Topic · 课后巩固 + 跟读练习"

### Floating Nav Banner
- Sticky **BOTTOM**-center nav with quick-access links
- Frosted glass pill: rgba white + backdrop-blur, border-radius 100px
- Links: emoji + short label, 14px font, 10px 18px padding
- Minimize/Maximize toggle: ◉ button

### Content Blocks (in order)
1. **Vocabulary** — 3-column grid cards (emoji+English / Chinese in ONE card) → video embed
2. **Sentences** — centered cards with translations → video embed  
3. **Mindmap** — 4 modules stacked, complete sentences matching video EXACTLY → video embed
4. **Divider** — "── ✦ ──"
5. **Homework** — bilingual list items

### Rainbow Gradient Cards
Each `.section` gets a UNIQUE light gradient:
- Vocabulary: peach/coral (#FFE0D3 → #FFF3E0 → #FFECB3)
- Sentences: sky blue (#D4F1F9 → #E0F7FA → #B2EBF2)
- Mindmap: grass green (#E8F5E9 → #F1F8E9 → #DCEDC8)
- Homework: lavender (#F3E5F5 → #EDE7F6 → #E1BEE7)
- Round corners: 20px, subtle shadow
- Inner cards: rgba(255,255,255,0.75), 12px rounded

### Cache-Busting (MANDATORY)

**Every page MUST have cache-busting. This is NON-NEGOTIABLE.**

1. **Version comment** in every HTML file: `<!-- vYYYYMMDDHHmm -->` (e.g. `<!-- v2026070318 -->`)
2. **Cache-Control meta tags** on EVERY page:
   ```html
   <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=0">
   <meta http-equiv="Pragma" content="no-cache">
   <meta http-equiv="Expires" content="0">
   ```
3. **Video src**: `videos/NAME.mp4?v=TIMESTAMP`
4. **Links to Author**: always append `?v=N` query param (e.g. `?v=3`)
5. **When updating**: increment the version number in both the comment AND the link query param

### ⛔ Version Bump Protocol (MANDATORY — AUTOMATIC)

**Every content change to any HTML file MUST trigger a version bump. This is automatic, not optional.**

1. **Version comment** `<!-- vYYYYMMDDHHmm -->` must update to CURRENT timestamp on EVERY edit
2. **Query param** `?v=N` on ALL links must increment by +1 on EVERY edit
3. **Video src** timestamp must update on EVERY video content change
4. **All files in lesson must use the SAME version number** — bump them together
5. **Before deploy**: grep all files for the old version number, confirm all bumped
6. **After deploy**: Author's link should also get the new `?v=N`

**⛔ NEVER ship a page without cache-busting. Mobile Safari caches aggressively.** This applies to ALL pages: reading-video, feedback-notes, printables, printables-pdf, lesson-plan, index.

### ⛔ Mindmap HTML Format (MANDATORY — Two Templates)

Two mindmap formats exist. NEVER mix them. Match the lesson type.

#### Template A: Concept Map (Cross-Curricular, Vocab/Grammar)
```html
<h2>🧠 语法导图 · Concept Map</h2>
<div class="story-sections">
  <div class="story-module">
    <div class="module-header">🏠 Module Title · 模块标题</div>
    <div class="module-sentences">
      <div class="ms">
        <div class="s-en">English sentence.</div>
        <div class="s-zh">中文翻译。</div>
      </div>
    </div>
  </div>
</div>
```
- CSS: `.story-module` `text-align: center` · `.s-en` `font-weight: 700` · `.s-zh` separate line below
- ⛔ English + Chinese on SEPARATE lines (never same line)
- ⛔ English MUST be bold (`.s-en` with `font-weight: 700`)
- ⛔ Both centered
- Used in: cross-curricular, vocab-1-grammar-1, vocab-2-grammar-2

#### Template B: Story Map (Literature ONLY)
```html
<h2>🧠 故事导图 · Story Mind Map</h2>
<div class="story-sections">
  <div class="story-module">
    <div class="module-header">👤 Characters · 角色</div>
    <div class="module-sentences">
      <div class="ms">
        <div class="s-en">Rob is at Sue's home today.</div>
        <div class="s-zh">Rob今天在Sue家里。</div>
      </div>
    </div>
  </div>
</div>
```
- SAME HTML structure as Template A: `.story-sections` > `.story-module` > `.module-header` + `.module-sentences` > `.ms` > `.s-en` + `.s-zh`
- 4 fixed modules: Characters, Setting, Story, Lesson
- ⛔ MAX 8 sentences total across all modules
- ⛔ English + Chinese on SEPARATE lines — `.s-en` (bold) above `.s-zh`
- ⛔ Both centered — matches sentences section format
- Used ONLY in: literature

#### ⛔ Cross-Artifact Sync (MANDATORY)
When mindmap content changes in reading-video.html, update ALL FIVE artifacts:
1. `reading-video.html` (source)
2. `feedback-notes.html` (clipboard text + page content)
3. `printables.html` (display)
4. `printables-pdf.html` (print layout)
5. `videos/mindmap.mp4` (regenerate video)

**Verify**: sentence count, module headers, and Chinese translations must be IDENTICAL across all 5 files. Never ship partial mindmap updates.

---

## 🖨️ Printables (PDF + HTML)

### 3 Separate PDFs (from one `printables-pdf.html`)
1. **Pre-Test** (课前测): Green gradient card, name/date, 8 dictation items, 4 fill-in-blank, score box
2. **Cutout Flashcards** (🃏): ⛔ NO Chinese — English only. Emoji 36px, English 22px BOLD. Dashed border. 58mm×32mm room cards, 82mm×24mm action cards. Font ~2/3 of card.
3. **Feedback Sheet** (学情反馈单): QR code at top CENTERED, vocabulary 3-column, sentences centered, mindmap stacked modules, grammar table, homework bilingual

### PDF Generation (MANDATORY after ANY content change)
```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless --disable-gpu --print-to-pdf=OUTPUT.pdf --no-pdf-header-footer "file://...printables-pdf.html"
```
⛔ **NEVER skip PDF regeneration.** After ANY change to printables-pdf.html, regenerate the PDF immediately. A stale PDF ≠ updated PDF.

### ⛔ Page Break Rules (MANDATORY for PDF)
- **Mindmap MUST be complete on a single page** — never split across two pages
- If mindmap overflows: reduce font size, tighten line-height, or add `page-break-before: always` on mindmap section
- Use CSS: `@media print { .mindmap-section { page-break-before: always; } }` to force mindmap onto its own page (page 6)
- Pre-Test (page 1-2), Flashcards (page 3-5), Feedback Sheet (page 6-7+)
- Verify PDF page count after generation — every section should start cleanly

### ⛔ Never — Printables
- Never put Chinese on cutout flashcards
- Never use tiny fonts (<13px printed)
- Never leave large empty areas
- Never truncate sentences
- Never omit QR code
- Never forget emoji on every section
- Never let mindmap split across pages — use page-break-before: always on mindmap section

### ⛔ Mindmap Print Format (MANDATORY — BURNED 2026-07-05)
- **Mindmap sentences MUST match Key Sentences format EXACTLY.** Same CSS, same visual weight.
- English: `.s-en` `font-weight: 600` `font-size: 15px` `margin-bottom: 3px`
- Chinese: `.s-zh` `font-size: 13px` — separate line below English, NOT inline
- Both centered via parent `.mind-module` `text-align: center`
- HTML: `<div class="ms"><div class="s-en">English.</div><div class="s-zh">中文。</div></div>`
- ⛔ NEVER use inline `<span class="zh">` inside `.ms` — always `.s-en` + `.s-zh` divs
- ⛔ NEVER use separate-line s-en/s-zh without bold English — the sentences section is the benchmark
- This applies to BOTH printables.html AND printables-pdf.html
- Verify before regenerating PDF: grep `font-weight: 600` and `font-size: 15px` in the mindmap CSS

---

## 🚀 MHSG Production Pipeline — Idea → Website in 4 Steps

> Fused from 灯下白 OPC workflow. Complements the design quality layers in Sections 0-4.

### M — Map Structure (梳理结构)
Turn ideas into a hierarchical Markdown document FIRST. Do not start in code.
- One `.md` file per page: headings, content blocks, image placeholders, CTA descriptions
- Write for AI readability: clear section markers, explicit content requirements
- This is your single source of truth — change the MD, regenerate the page
- Example: `page-brief.md` with `## Hero`, `## Features`, `## CTA` sections

### H — HTML Generation (生成页面)
Feed the Markdown + DESIGN.md (§ 2.C) + prompt template (§ 0.F) to AI.
- Prompt: `[CONTEXT: page-brief.md] + [CONSTRAINTS: DESIGN.md] → single HTML file`
- AI reads MD structure → generates HTML with inline CSS
- One pass. Do not iterate on the first generation — evaluate first.
- Output: working single-file HTML, all content in place

### S — Supplemental Graphics (补充图形)
Add charts, logos, icons, infographics. AI or best available source.
- Charts: AI-generated SVG from data descriptions
- Icons: Phosphor/Hugeicons library (§ 3.C)
- Infographics: AI-generated from bullet points
- Logos: AI generate or use existing brand assets
- Images: AI generate based on section context descriptions
- ⛔ Copyright freedom — use the best available graphic, do not worry about copyright

### G — Go Live (发布上线)
Push to deployment. One command, instant URL.
- GitHub: push → Pages auto-deploy → public URL
- Vercel: `vercel --prod` for Next.js projects
- For static HTML: any static host (GitHub Pages, Cloudflare Pages, Netlify)
- Always verify: curl test the live URL before sending to Author

---

## 🚀 Deployment SOP — Kee's Product Go-Live Checklist

> Every product has a specific deploy pipeline. Do NOT guess which one. Check the product registry first.

### Static HTML (rkrk.io / courseware.rkrk.io / ielts.rkrk.io / test.rkrk.io)

**Source → /home/user/dev/rkrk.io/**

```bash
# 1. Verify local server is running
curl -sI --max-time 3 http://127.0.0.1:8080/ | head -3

# 2. Verify Cloudflare Tunnel
pgrep cloudflared && echo "Tunnel OK" || nohup /opt/homebrew/bin/cloudflared tunnel --protocol http2 run hairuis > /tmp/cf-tunnel.log 2>&1 &

# 3. Test external access
curl -sI --max-time 10 https://rkrk.io/ | head -3

# 4. Send link with cache-buster
# Format: https://rkrk.io/path/to/page.html?v=N
```

**⚠️ Tunnel Debug:**
```bash
# Check tunnel connections
curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/50f32828a1d08441afffd20fbebe7353/cfd_tunnel/f9d0c4ab-60ac-43e2-aac2-96e09b85a6ae/connections" \
  -H "X-Auth-Email: user@example.com" \
  -H "X-Auth-Key: $(cat /home/user/.openclaw/workspace/.secrets/cloudflare-api-key.txt)" | python3 -c "import json,sys;d=json.load(sys.stdin);[print(c.get('client_id','?')[:8],c.get('conns',[])[0].get('colo_name','?')) for c in d.get('result',[])]"

# Purge cache if stale
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/ce01ac58349bdc4c42ac8294cb9967d7/purge_cache" \
  -H "X-Auth-Email: user@example.com" \
  -H "X-Auth-Key: $(cat /home/user/.openclaw/workspace/.secrets/cloudflare-api-key.txt)" \
  -H "Content-Type: application/json" -d '{"purge_everything":true}'
```

### Next.js / Vercel (DynaSaurus)

**Source → /home/user/dev/dynamos-app/**

```bash
# 1. Build check
cd /home/user/dev/dynamos-app && npx next build 2>&1 | tail -5

# 2. Deploy to Vercel
cd /home/user/dev/dynamos-app && npx vercel --prod --yes

# 3. Verify
curl -sI --max-time 10 https://dynasaurus.rkrk.io/ | head -3
```

### ⛔ Post-Deploy Check (MANDATORY — EVERY TIME)
- [ ] curl live URL → HTTP 200
- [ ] Cache-Control meta tags present on HTML pages
- [ ] Video src `?v=N` bumped
- [ ] Link sent to Author with latest `?v=N`
- [ ] QR code scans correctly (for courseware pages)
- [ ] Cloudflare Tunnel running (`pgrep cloudflared`)

### ⛔ Rollback Protocol
```bash
# Vercel rollback (DynaSaurus)
cd /home/user/dev/dynamos-app && npx vercel rollback

# Static HTML rollback (rkrk.io)
cd /home/user/dev/rkrk.io && git checkout index.html
# OR: restore from backup
cp index.html.bak index.html
```

---

## 📋 Feedback Notes (课后反馈)

- Title: "【PU1】Unit X Lesson Name 课后反馈"
- ⛔ NO signature lines (no 教师签名 / 家长签名)
- Template: copy from the latest unit-8 lesson (e.g. `vocab-2-grammar-2/feedback-notes.html`)
- "📋 一键复制（发微信）" button + "🖨️ 打印" button

### ⛔ Clipboard Format (MANDATORY)

Copy text must be hand-built (NOT innerText). Exact format:

```
【PU1】Unit X Lesson Name 课后反馈
日期：2026.7.X  教师：Kee

一、今日学习主题
English topic line
Chinese description paragraph

二、重点词汇 (N个)
🪑 armchair 扶手椅
🛋️ sofa 沙发
(one word per line, emoji + English + Chinese, NO pipe separators)

三、重点句型
1. English sentence
Chinese translation
2. English sentence
Chinese translation

四、课后任务
📖 task item 1
🔤 task item 2
🎬 task item 3
📖 task item 4

学情反馈指读视频
https://rkrk.io/power-up/book-one/unit-X/lesson-name/reading-video.html?v=N
```

Format rules:
- ⛔ 课后任务 MANDATORY — never omit
- ⛔ 学情反馈指读视频 link MANDATORY — add after homework items, before any closing content
- 学情反馈指读视频 format: section title (no numbering) + reading-video.html URL on next line, with ?v=N cache buster
- Blank line BEFORE each section (一、二、三、四)
- Blank line BEFORE the 学情反馈指读视频 section
- Section header immediately followed by its content (no blank line between header and first content line)
- Vocab: one per line, no separators
- Sentences: English line → Chinese line, blank line between sentence groups

---

## 🎓 Lesson Plan

- 2-3 children, 2hr total (~120min)
- 10-minute Just Dance break between Part 1 and Part 2
- Overview: P1 (~55min) → 💪 Just Dance (10min) → P2 (~55min)
- Step cards: number circle + title + detail + time tag

---

## 🚀 Deployment Checklist

### Post-Deploy
- [ ] All pages return HTTP 200
- [ ] Cache busters updated on all video src
- [ ] Cache-control meta on all pages
- [ ] QR code scans correctly
- [ ] Videos play correctly (verify ffprobe: 1920x1080, h264, aac)
- [ ] Copy-to-WeChat button works
- [ ] Floating nav visible and functional
- [ ] Content in HTML matches video content EXACTLY
- [ ] Chinese translations present everywhere

---

## ⛔ Never List
- Never use SSML `<break>` in TTS
- Never center-display vocabulary outside grid
- Never use dark backgrounds — light dual-gradient only
- Never use colored text — ALL BLACK
- Never use PIL font emoji — Swift renderer only
- Never put Chinese on cutout flashcards
- Never use uniform video timing — Whisper timestamps only
- Never omit QR code from feedback sheet
- Never include breadcrumb on reading-video page
- Never include signature lines on feedback notes
- Never use tiny fonts (<13px) on any printable
- Never ship truncated sentences
- Never skip cache-busting on deploy
- Never ship videos without cross-referencing reading-video.html content
- Never create parallel SOP files — update THIS file only
- Never leave old SOP files after updating — DELETE them

---

## ⛔ Type A Video Protocol (BURNED 2026-07-05)

**Type A (Vocab/Grammar) videos: English ONLY. No Chinese anywhere.**

### Font Sizes (LARGER — kid-friendly)
- Active: 80pt BOLD BLACK + gold glow
- Read: 44pt #555
- Unread: 34pt #BBB
- Emoji: Swift-rendered, 56px active / 36px read / 36px 0.15 opacity unread

### Generation Method (MANDATORY)
1. Copy benchmark from latest Type A lesson that passed visual QA
2. Replace content ONLY: vocab words, sentences, mindmap sections
3. Strip ALL Chinese — verify zero `.zh` or Chinese text in data tuples
4. Run: `python3 generate_guided_reading.py`
5. **Vision verify**: open each video, screenshot, confirm NO Chinese, gold glow visible, fonts large
6. Update reading-video.html video src with new version param

### Type A vs Type B Quick Reference
| | Type A (VG) | Type B (CC/Lit) |
|---|---|---|
| Chinese in video | ❌ None | ✅ Active only, gold glow |
| Chinese font size | — | 32pt BOLD, PingFang SC |
| Benchmark source | U9 V1G1 (latest) | U8 CC |
| Vocab video format | Emoji + English only | Emoji + English + CN (active only) |

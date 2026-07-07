---
name: pre-class-sop
description: "From class transcript → auto-generate pre-class prep page: video, reading, lexicon, exercises, PDF download. Full pre-class pipeline."
---

# Pre-Class SOP

Input: class transcript or lesson plan. Output: pre-class prep HTML page with video, reading passage, vocabulary, comprehension exercises, and downloadable PDF.

## Pipeline (run in order)

### 1. Parse Lesson Plan
Extract from transcript/lesson plan:
- **Lesson topic + stage/level**
- **Core theme** (the "big idea" — e.g. "First Impressions 7-second rule")
- **Key video**: URL, title, bilingual VTT subtitle file
- **Reading passage**: editorial-style text (200-400 words) that introduces the core theme
- **Key vocabulary**: 8-12 words/phrases from video + reading, with phonetic and example sentences
- **Comprehension points**: what the student should understand before class

### 2. Source Video
Follow `video-sop` skill for full sourcing rules and download method.
- Five Eyes accent, under 3 min, high production quality
- Use yt-dlp with `--proxy http://127.0.0.1:7897` and `--extractor-args 'youtube:player_client=android'` to bypass SABR
- **NEVER hallucinate a video URL.** Find a real video on YouTube, download it, and serve it locally.
- Switch Clash node to Germany or Australia before downloading (via Unix socket API)
- Download to local media directory, serve via `<video>` tag

**QA: Video-Subtitle Sync (MANDATORY)**
After video download, before page deployment:
1. **Transcribe the actual audio** — use openai-whisper with `--model tiny` for speed (sufficient for clear studio audio).
2. **If whisper is too slow**: try `yt-dlp --write-auto-subs --sub-lang en` first. If no auto-subs available, use whisper.
3. **Never write subtitles from imagination.** Every subtitle line must match the actual spoken words from the video.
4. **Read the transcription** before embedding — understand the actual content, adjust page copy (reading, lexicon) to match.
5. **Verify sync**: play the video locally, click random timestamps in the subtitle stream, confirm the jump matches the spoken words.
6. If subtitles don't match the video audio, regenerate them from the real transcript. Never ship mismatched subtitles.

### 3. Write Reading Passage
- Editorial style, 200-400 words
- Opens with drop-cap
- Introduces the core theme/concept for the lesson
- Natural English, no ESL awkwardness
- **Translation toggle button placed BEFORE the reading passage** (not after)
- Chinese translation provided: **each paragraph's Chinese translation appears directly below its original English paragraph**, inline — not all in one separate block at the end
- Translation should be natural, fluent Chinese — not stiff word-for-word literal translation
- Tone: warm, inviting, thinks the reader is intelligent

### 4. Build Vocabulary Flashcard Grid

8-12 key words/phrases from video + reading. Presented as an Anki-style flashcard grid BEFORE the video section.

**Grid Layout (Collapsed State):**
- Emoji + word only, displayed in a responsive grid (3-4 columns desktop, 2 columns tablet, 1 column mobile)
- Each card is a clickable tile — clean, minimal, inviting
- No columns, no table — pure card grid

**Card Data (per word):**
- Emoji (visual mnemonic)
- Word/phrase
- Phonetic (IPA)
- Simple English definition (A2-B1 level)
- Chinese translation + brief explanation
- Example sentence from video or reading
- Chinese translation of example sentence

**Interaction (click → float → flip):**
1. Click a collapsed card → card floats up (scale + z-index + shadow) into a full Anki flashcard
2. **Front of card**: Emoji + Word + Phonetic + 🔊 Pronunciation button (Edge TTS, pre-generated .mp3 served locally)
3. Click card → **3D flip animation** to back side
4. **Back of card** (centered, large text):
   - Simple English definition (in plain, accessible English)
   - Chinese translation & brief explanation
   - Example sentence from video/article (italic)
   - Chinese translation of example
5. Click again → flip back to front
6. Click outside / close button → card collapses back to grid

**Edge TTS Pronunciation:**
- Pre-generate audio files per word using `edge-tts` Python package
- Save to `media/audio/[word].mp3`
- Use `<audio>` element triggered by 🔊 button on card front
- Fallback: Web Speech API if audio file unavailable

**Implementation Notes:**
- 3D CSS transforms for flip: `transform: rotateY(180deg)` with `perspective` on parent
- `backface-visibility: hidden` on both sides
- Float animation: `transition: transform 0.3s, box-shadow 0.3s, z-index 0s 0.3s`
- Overlay backdrop when card is expanded
- Close on backdrop click or Escape key

### 5. Create Comprehension Exercises

**Section A: Matching** (8 items)
- **Definitions are the questions** (longer text), **words are the options** (shorter, A-H). Student reads a definition and selects which word matches.
- **Definitions display in FIXED order** — 1=crochet def, 2=mural def, 3=portray def... always the same.
- **Dropdown option order is shuffled** using Fisher-Yates. Options show A — word, B — word... but in random order.
- **Word reference bubbles display in alphabetical A-H order** as a fixed answer key.
- Grid layout (2 columns desktop, 1 column mobile)
- Each match item: definition text + dropdown select from shuffled A-H options
- **Answer section shows**: shortened definition → correct letter (word)
- **Correct answers are fixed**: 1=A, 2=B, 3=C... (matches PDF answer key)

**Section B: Multiple Choice** (5 items)
- Test understanding of core concepts from reading
- 4 options each, one correct
- **All distractors must be plausible** — wrong answers should sound like they COULD be right. Base distractors on related-but-wrong concepts from the reading, common misunderstandings, or partially-correct statements. Never use obviously unrelated options.
- Based on actual reading/video content (never fabricated)
- Shuffle option order per question

### 6. Add Answers Toggle
- Hidden by default
- Button: "📝 View Answers · 查看答案"
- Correct answers highlighted in green
- Matching: show correct pairs
- MCQ: show correct option letters

### 7. Generate PDF

**⛔ PDF 铁律 (ALL MANDATORY):**

**Content Order:**
1. Cover: logo + title + subtitle + ⏱ badge + 📱 QR code + reminder (观看视频 · 单词发音 · 互动练习 · 查看答案解析)
2. 📚 Vocabulary table — NO Source column (only Word, Phonetic, 中文, Example)
3. ✅ Section A Matching — definitions as questions, word reference as highlighted options (gold background, bold, prominent)
4. 📖 Reading passage (full text, editorial style)
5. ✅ Section B Multiple Choice — all 5 MCQs with circle options
6. 📝 "扫码查看答案解析" + QR code — NO answer key printed
7. Footer: rkrk.io × 托朴教育

**Page breaks:**
- NO forced page breaks between sections — let content flow naturally
- Single page break (`page-break-before: always`) only before the answer/QR section
- Remove `.page { page-break-after: always }` — waste of space

**Cover page:**
- QR code prominently at the top alongside title
- Reminder box: yellow background (#fffbeb), gold border (#fcd34d) — tells students pronunciation, video, interactive tests are on the website
- NEVER write "Edge TTS" — just "单词发音"

**Vocabulary table:**
- Columns: Word | Phonetic | 中文 | Example
- NO Source column
- Dark header (#3d405b), alternating row backgrounds, compact font (8pt print)

**Matching exercise:**
- Definitions 1-8 in fixed order (same as website)
- Word reference (A-H) in a HIGHLIGHTED box: gold background (#fef3c7), gold border, bold, prominently visible
- Blank lines for student to write answers
- NO answer key — website has randomized dropdown options, PDF can't show definitive answers

**MCQ:**
- 5 questions with 4 options each
- Circle bullets (○) for options
- NO answers shown

**Technical:**
- Create `pdf-content.html` — separate file, NOT the interactive prep page
- Base template: copy CSS from Lesson 1 (jun-23/pdf-content.html) — do NOT invent new CSS
- QR code: generate with `qrcode` Python library → save as `media/qr-code.png` → embed in HTML
- Print: headless Chrome → `google-chrome --headless --print-to-pdf=OUTPUT.pdf --no-pdf-header-footer file://...pdf-content.html`
- Fonts: Outfit (headings), Inter (body), Noto Sans SC (Chinese)
- Color scheme: accent #e07a5f, dark #3d405b, gold #fef3c7

**⛔ NEVER:**
- Never put answers in the PDF — only QR + "扫码查看答案解析"
- Never include Source column in vocab table
- Never write "Edge TTS" — just "单词发音"
- Never force page breaks between every section — wasteful whitespace
- Never invent new PDF CSS — copy from jun-23/pdf-content.html
- Never generate PDF from the interactive prep page — use dedicated pdf-content.html
- Never put vocabulary after reading — vocabulary ALWAYS first
- Never use sequential matching answers in PDF (1=A,2=B) — NO answers at all
- Never omit the QR code on the cover page
- Never skip the reminder note about website features
- Never skip the cover page with logo and title

### 8. Deploy
- Save HTML to `adult-english/demo/[date]/prep.html`
- Serve via the same static server as courseware
- Link from courseware page's pre-class section

## Page Structure
```
Header (logo, title, badge: ⏱ duration only — NO demo badge, NO level badge)
Vocabulary Flashcard Grid (8-12 items, Anki-style — FIRST)
Section A: Matching (8 items, fixed order, dropdown A-H, non-sequential answers)
Video embed + bilingual transcript toggle
Reading passage (editorial, drop-cap, translation toggle, inline bilingual)
Section B: Multiple Choice (5 items, plausible distractors)
Answers toggle (hidden)
Download section (PDF button)
Footer
```

## Design Specs
- Colors: warm editorial (--accent: #e07a5f, --bg: #fafaf9)
- Fonts: Outfit (headings), Inter (body), Noto Sans SC (Chinese)
- Cards: white bg, 16px radius, subtle shadow
- Max-width: 720px centered
- Badges: demo/level/time pills
- Mobile: single column at 500px
- **Text wrapping**: all text containers must have `word-wrap: break-word; overflow-wrap: break-word; hyphens: auto;` to prevent horizontal overflow. Set `max-width: 100%` on all text elements, `<pre>` tags, and code blocks. Test with long unbroken strings. Nothing may exceed its container width.

## Cross-References
- `video-sop` for video sourcing, player layout, and subtitle stream
- `openai-whisper` skill for video transcription
- `design-system-kee` for editorial visual system
- `post-class-sop` for the paired post-class workflow
- `vocabulary-flashcard` component spec (inline above in §4) for Anki card grid implementation

## Never
- Never fabricate reading content — base it on real video/article material
- Never skip the vocabulary flashcard grid — vocabulary pre-teaching is critical for comprehension
- Never omit Chinese translations — pre-class material must be accessible
- Never create MCQs without checking answers against the actual reading
- Never hallucinate or placeholder a video URL — find, verify, download, deploy
- ⛔ Never ship printables with truncated sentences — verify all text fits
- ⛔ Never leave large whitespace in cutout card layouts — fill page width
- ⛔ Never ship printables PDF without QR code on feedback sheet
- ⛔ Never omit emoji from printables — all sections need visual engagement for kids

## ⛔ Lesson Plan SOP

### Class Format (MANDATORY)
- **Students**: 2-3 children (small group)
- **Duration**: 2 hours total
- **Break**: 10-minute Just Dance fitness break between Part 1 and Part 2
- Each student gets individual speaking/practice time in every activity

### Lesson Plan Document
- HTML page with `.step` cards showing step number, title, detail, and time tag
- Overview section at top showing Part 1 → 💪 Just Dance → Part 2 with durations
- Just Dance break styled distinctively (warm yellow gradient, emoji, centered)
- All time allocations add up to ~120min

## ⛔ Printables SOP

Every lesson generates `printables.html` AND `PU1-UX-VXGX-Printables.pdf`.

### PDF Generation
- Use Chrome headless: `--headless --print-to-pdf --print-to-pdf-no-header`
- Source: `printables-pdf.html` (separate from interactive `printables.html`)
- Uses `@page { size: A4; margin: 5mm }` and `.page { page-break-after: always; min-height: 290mm }`

### Page Order (MANDATORY)

#### Page 1: Pre-Test 课前测
- Green gradient card filling full page
- Name + Date fields at top (18px)
- Dictation (听写): 8 items, Chinese prompt → English blank line (20px, 2.5px dashed border)
- Fill-in-blank (填空): 4 items testing grammar + vocabulary (18px, 3px colored border)
- Score box at bottom (16px)
- Fonts: 18-20px — MAXIMUM for kids to write in blanks

#### Page 2: Cutout Flashcards 🃏
- Room Cards: 58mm × 32mm, 2px dashed border, rounded 12px
- Action Cards: 82mm × 24mm, 2px dashed border, rounded 12px
- ⛔ **NO Chinese on cutout cards** — English only (these are flashcards for recognition)
- Emoji: 36px, English name: 22px BOLD, color #e55b4b
- Font MUST occupy ~2/3 of card size — these are FLASHCARDS not tiny labels
- 3 room cards per row, 2 action cards per row
- Game instructions at bottom

#### Pages 3+: Feedback Sheet 学情反馈单
- QR code at top (38mm, centered with flex justify-content): scans to reading-video.html
- Section order: Vocabulary → Sentences → Grammar Map → Grammar Table → Homework
- Each section is a rainbow gradient card matching website design:
  - Vocabulary: peach/orange (#FFE0D3 → #FFF3E0 → #FFECB3)
  - Sentences: sky blue (#D4F1F9 → #E0F7FA → #B2EBF2)
  - Grammar Map: green (#E8F5E9 → #F1F8E9 → #DCEDC8)
  - Homework: purple (#F3E5F5 → #EDE7F6 → #E1BEE7)
- Inner boxes: rgba(255,255,255,0.75) rounded 10px

### Content Formatting (match reading-video.html EXACTLY)
- Vocabulary: 3-column grid (emoji+English / Chinese) — same as website
- Sentences: centered cards — same as website
- Grammar Map: stacked modules (not 2×2 grid) — same as website
- Grammar table: can/can't + − ? rows with Chinese
- Homework: bilingual list items

### Font Sizes (per section)
| Section | Base | Heading | Card Text |
|---------|------|---------|-----------|
| Pre-Test | 20px dictation | 24px | 18px fill-in |
| Cutout | 22px English | 17px | 36px emoji |
| Feedback | 15px body | 17px h2 | 15px vocab / 14px grammar |

### ⛔ Never
- Never put Chinese on cutout flashcards
- Never use tiny fonts on any printable (<13px)
- Never leave large empty areas — fill the A4 page
- Never truncate sentences — verify all text fits
- Never omit QR code from feedback sheet
- Never put reading/video content in the PDF — video is linked via QR
- Never ship printables without emoji on every vocabulary word and section header

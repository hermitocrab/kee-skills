# Pre-Class Prep Page Template

## Required Sections

### 1. Video Player + Subtitle Stream
Two-panel layout:
- **Left**: embedded video player (responsive, 16:9)
- **Right**: scrollable lyric-style subtitle stream
  - Each line: `[timestamp] English line` + `Chinese translation`
  - Timestamps are clickable → video.currentTime = timestamp
  - `.active` class on currently playing line (highlighted background)
  - Auto-scroll on timeupdate event
  - Bilingual: EN above CN per line block

```html
<div class="video-container">
  <div class="video-left">
    <iframe src="[URL]" allowfullscreen></iframe>
  </div>
  <div class="subtitle-stream" id="subtitle-stream">
    <div class="sub-line" data-time="0.0">
      <span class="ts">0:00</span>
      <span class="en">How do you feel when you hear these words?</span>
      <span class="cn">当你听到这些话时，你感觉如何？</span>
    </div>
    <!-- more lines -->
  </div>
</div>
```

JS behavior:
- Click `.sub-line` → `video.currentTime = data-time`
- `video.ontimeupdate` → find active line, add `.active`, scrollIntoView
- Active line: background highlight, bold text

### 2. Reading Passage
```html
<div class="section-card">
  <div class="emoji">📖</div>
  <h2>[Reading Title]</h2>
  <div class="meta">⏱ 5-7 min read</div>
  <div class="reading-passage">
    <p><span class="drop-cap">[F]</span>irst sentence of the passage...</p>
    <!-- 3-6 paragraphs -->
  </div>
  <button onclick="toggleTranslation()">🌐 Show Chinese Translation</button>
  <div style="display:none" id="reading-zh">
    <!-- Chinese translation paragraphs -->
  </div>
</div>
```

### 3. Lexicon Table
Must include: Word/Phrase, Phonetic, Chinese, Source (Reading/Video/Both), Example
- 8-12 entries
- Source-tagged with colored badges (.source-reading / .source-video / .source-both)
- Phonetic in monospace
- Examples from actual video/reading content

### 4. Comprehension Exercises
**Matching**: 8 items, grid layout, numbered
**MCQ**: 5 items, 4 options each, test concept understanding

### 5. Answers Section
Hidden by default. Toggle button. Correct answers in green.

### 6. Download Section
Gold gradient box with PDF download button.
PDF contains: reading + lexicon + exercises (not answers).

## Tone Rules
- Bilingual throughout (EN primary, CN support)
- Warm, inviting, not textbook-dry
- Student is intelligent, not talked down to
- Reading: editorial voice (NYT Magazine / The Atlantic style)

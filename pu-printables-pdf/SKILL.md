---
name: pu-printables-pdf
description: Generate pre-class teaching materials as PDFs for Power Up lessons. Uses Chrome headless + CSS print rules for 3-page A4 PDFs with Chinese support.
---

# PU Course Pre-Class Printables PDF Generation

## Quick Start

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
FLAGS="--headless=new --disable-gpu --no-sandbox --disable-extensions --disable-background-networking --disable-sync --no-first-run --no-pdf-header-footer"

"$CHROME" $FLAGS --print-to-pdf="output.pdf" "file://path/to/printables.html"
```

Serves from: `https://courseware.rkrk.io/power-up/book-one/unit-X/lesson-type/`

---

## PDF Structure (3 Pages, A4)

| Page | Content |
|------|---------|
| 1 | **Pre-Test** — 12 dictation words, sentence fill, grammar test |
| 2 | **Study Feedback Sheet** — vocab (2-col EN+CN), sentences, mind map, homework |
| 3 | **Cut-outs** — character cards (63×40mm), game cards (90×28mm) |

## File Naming

```
PU{Level}-U{Unit}-{LessonType}-{Document}.pdf

Examples:
  PU1-U7-Literature-All.pdf        (3-page complete pack)
  PU1-U7-Literature-Feedback.pdf   (feedback sheet only)
  PU1-U7-Literature-PreTest.pdf    (pre-test only)
```

---

## CSS Print Rules

```css
@page { size: A4; margin: 10mm; }

@media print {
  body { background: #fff; padding: 0; }
  
  /* Flow-based: let content break naturally */
  .print-section { break-after: page; orphans: 3; widows: 3; }
  
  /* Only small elements get avoid */
  .dict-row, .fill-row, .fb-sentence, .cut-card { break-inside: avoid; }
  
  /* Headers stay with content */
  h2, h3, h4 { break-after: avoid; }
  
  /* Preserve CSS colors and emoji */
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
```

### Anti-patterns
- ❌ `page-break-inside: avoid` on large containers → huge white gaps
- ❌ Fixed pixel heights → content gets cut off
- ❌ Manual page breaks via `<div style="height:297mm">` → fragile

---

## Section Design Rules

### Pre-Test Page
- Larger font (≥.9rem), 1.8 line-height
- Content centered on page (`max-width: 90%; margin: 0 auto`)
- Dictation: 2 columns, 6 words each
- Blanks: `border-bottom: 1.5px solid` with min-width 70px

### Feedback Vocab
- 2-column grid (EN + CN per card)
- Each word card: English bold + Chinese muted
- Use `.vocab-grid { grid-template-columns: 1fr 1fr }`

### Cut-outs
- Size labels in section header only, NOT on cards
- No gray instruction text
- Character cards: 63×40mm, dashed border, emoji icon
- Game cards: 90×28mm, dashed border
- Story fill-in-the-blanks: removed (not in cut-outs)

### All Pages
- No toolbar download button in the PDF (only visible on web page)
- No page title "Full Printables Pack" — content starts immediately
- All fill-in-the-blank fields must be EMPTY (no answers pre-filled)

---

## Content Rules

| Rule | Detail |
|------|--------|
| Vocabulary | 10+ words, A2-level, EN+CN per card |
| Homework | Bilingual (EN first, CN second) |
| Mind Map | Full sentences, no truncation, English-first |
| Pre-test blanks | ALL empty — no visible answers |
| PU2+ | Add 6 extra phrases per lesson |

---

## Post-Generation Checklist

- [ ] PDF is 3 pages (not 4+)
- [ ] Chinese renders correctly
- [ ] Emojis are visible
- [ ] No answers visible in blanks
- [ ] No duplicate headers
- [ ] Cut-outs have dashed borders
- [ ] Links on SOP page point to .pdf (not .html)
- [ ] `download` attribute on PDF links → one-click download

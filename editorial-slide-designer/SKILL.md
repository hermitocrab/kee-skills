---
name: editorial-slide-designer
description: |
  Design and produce editorial-quality slide decks — presentations, courseware, pitch decks, talks — that look like they belong in Time, Wired, or The New York Times Magazine. Use when the user asks for anything visual: PowerPoint, Keynote, slides, decks, courseware, SPAs, presentations, or visual course materials. Covers Keynote automation (AppleScript/JXA), web-based editorial SPA slides, and PPTX generation with proper design principles applied. Always load before executing any visual/design task.
---

# Editorial Slide Designer

## Workflow

1. **Analyze content** — Read the source material (speech, lesson plan, data). Identify narrative arc, emotional beats, key ideas per slide.
2. **Design brief** — Define visual treatment (color palette, typography, grid system, layout approach). Reference `references/editorial-design-principles.md` for fundamentals.
3. **Choose output format:**
   - **Keynote (.key / .pptx)** — For editable, presentation-ready files. Uses `scripts/build_keynote_slides.js`. Best for TED talks, live presentations.
   - **Web editorial SPA (.html)** — For pixel-perfect magazine-style slides with CSS gradients, grid, responsive layout. Uses `assets/web-slide-template.html`. Best for courseware, SPAs, interactive content.
   - **python-pptx (.pptx)** — For data-heavy or auto-generated decks where layout flexibility is secondary.
4. **Build** — Execute selected method.
5. **Review against editorial quality bar** (see below).

## Editorial Quality Bar

Every slide must pass these checks:

| Check | Standard |
|-------|----------|
| ✅ One idea per slide | Graspable in 1 second glance |
| ✅ Whitespace | Generous. Nothing touches edges. Minimum 10% margins. |
| ✅ Typographic hierarchy | Clear difference between headline, subhead, body, caption |
| ✅ Narrative color | Every color has a semantic role (tension → coral, hope → gold, etc.) |
| ✅ Depth & layering | Background gradient → midground card → foreground text |
| ✅ Image treatment | No clip art. Cinematic or abstract only. Dark overlay for text. |
| ✅ Minimal text | Max 8-10 words per headline. Never more than 3 body lines. |
| ✅ Grid alignment | 12-column or 4-column grid. Nothing placed arbitrarily. |
| ✅ Grayscale test | If info is lost in grayscale, redesign. |
| ✅ Font pairing | Max 2 typefaces. Never Arial/Times/Calibri. |

## Output Methods

### Method 1: Web Editorial SPA (Default — Best editorial quality)

Use `assets/web-slide-template.html` as the starting point. This produces a pixel-perfect magazine-style slideshow with full CSS control over gradients, typography, glassmorphism, and responsive layout.

**Process:**
1. Copy `assets/web-slide-template.html` to output location
2. Replace slide content per the design brief
3. Adjust CSS customizations: grid layout, color variables, typography
4. Open in browser for review
5. To convert to PPTX: Save as PDF → Import to Keynote/PPT

**Advantages:**
- Real CSS gradients and backdrop-filter blur
- Perfect typography via Google Fonts (Inter)
- Responsive layout
- Fast iteration (edit CSS, refresh browser)

### Method 2: Web Editorial SPA (Best for courseware/interactive)

Use `assets/web-slide-template.html` as a starting point.

**Process:**
1. Copy `assets/web-slide-template.html` to output location
2. Replace slide content per the design brief
3. Adjust CSS customizations:
   - `--primary`, `--accent-*`, `--bg-*` variables
   - Grid layout classes (`.grid-2`, `.grid-3`, `.grid-6-4`)
   - Typography sizes and weights
4. Open in browser for review
5. Save final version

**Key advantages over PPTX:**
- Real CSS gradients, backdrop blur, animations
- Responsive (works on phone/projector/browser)
- Pixel-perfect editorial typography (Inter font)
- Hot-reload iteration (edit CSS, refresh)

### Method 3: python-pptx (For data-heavy auto-generation)

Fallback when Keynote unavailable or data-driven decks needed.

**Process:**
1. Define slide structure as data
2. Use python-pptx primitives: shapes, text boxes, fills
3. Apply color palette and typography from `references/editorial-design-principles.md`
4. Save as .pptx

**Limitations:** No real gradients, no backdrop blur, no precise typography control. Use only when slides must be generated from dynamic data.

## Color Strategy Templates

### Dark Editorial (TED/Wired style)
- Background: `#050510` (near-black)
- Card: `#121228` with frosted effect
- Tension: `#FF4560` (coral)
- Hope: `#F5A623` (gold)
- Clarity: `#00BFBF` (teal)
- Creativity: `#9F44D3` (purple)

### Light Editorial (NYT/Time style)
- Background: `#F8F6F2` (warm off-white)
- Card: `#FFFFFF` with subtle shadow
- Primary text: `#1A1A1A`
- Accent: `#C62828` (deep red — urgency)
- Accent: `#1565C0` (deep blue — authority)
- Accent: `#2E7D32` (deep green — growth)

### Minimal Monochrome
- Background: `#000000`
- Card: `#1A1A1A`
- Accent: single vibrant color
- All text: white
- Purpose: Maximum focus on content

## Design Adaptation Rules

Match the visual treatment to the content type:

| Content | Style | Layout |
|---------|-------|--------|
| TED Talk | Dark editorial, cinematic | Split screen with hero image |
| IELTS courseware | Clean editorial with warmth | Card-based, workshop feel |
| Pitch deck | Light editorial, bold accent | Full-bleed hero + data |
| Academic lecture | Minimal, monochrome | Text-forward, generous margins |
| Product launch | Dark with vibrant accent | Narrative arc, reveal pattern |

## Resources

### scripts/
- `build_keynote_slides.js` — JXA script to build editorial slides in Apple Keynote and export to PPTX

### references/
- `editorial-design-principles.md` — Complete guide to grid, typography, color, layout, and quality bar

### assets/
- `web-slide-template.html` — Production-grade editorial SPA slide template with CSS gradients, glassmorphism, and responsive design

# Editorial Design Principles

These principles must be applied to every slide/visual output. Think *Time*, *Wired*, *NYT*, *The Economist* — not Canva, not PowerPoint templates, not TikTok.

---

## 1. The Grid System

Every slide follows an invisible grid. Nothing is placed arbitrarily.

### Standard Grids
- **12-column grid** (web slides) — most flexible
- **4-column grid** (Keynote/PPT) — classic editorial, good for print-like layouts
- **Golden ratio grid** (1:1.618) — for image-to-text ratios

### Proportions
- **Whitespace is not wasted space.** It's the most expensive real estate.
- **Margins:** Minimum 10% on each side. Content never touches edges.
- **Gutters between elements:** Consistent. Use multiples of a base unit (8px, 12px, 16px).
- **Rule of thirds:** Key focal points land on grid intersections.

---

## 2. Typography

Typography is 90% of editorial design.

### Hierarchy (strictly enforced)
1. **Headline** — Bold, 48-72pt, max 8-10 words. One clear idea.
2. **Subhead / deck** — Regular or light, 18-24pt, 1-2 lines of context.
3. **Body / caption** — Regular, 14-18pt. Minimal. Never more than 3 lines in a slide context.
4. **Label / meta** — Small, 9-12pt, uppercase or muted. For page numbers, dates, sources.

### Font Pairing Rules
- **Sans + Sans** (safer): Use different weights/widths. E.g., Helvetica Neue Bold for headlines + Helvetica Neue Light for body.
- **Sans + Serif** (more editorial): Sans headline + serif body feels like a magazine.
- **Never use more than 2 typefaces** in one deck. One for display, one for text.
- **Never use system defaults** (Arial, Times New Roman, Calibri) — they scream "corporate."

### Readability Rules
- Line length: 45-75 characters max per line.
- Leading (line-height): 1.4x for body, 1.0-1.1x for headlines.
- Tracking (letter-spacing): +2% for uppercase headlines, 0 for body.
- Ragged right is preferred over justified (no rivers).

---

## 3. Color

Color is emotional architecture. Every color choice must serve the narrative.

### Color Strategy
- **Primary:** One dominant color (usually background — dark or white).
- **Accent palette:** 3-4 colors max. Each with a defined emotional role.
- **Semantic colors:** Assign meaning — e.g., Coral = tension, Gold = hope, Teal = clarity.

### Gradient Usage
- **Linear gradients** for backgrounds: subtle, from dark to slightly less dark (e.g., `#050510` → `#0A0A1E`).
- **Radial gradients** for focal points: pull the eye to center.
- **Never use garish gradients** (rainbow, bright-to-bright). Editorial gradients are barely perceptible.
- **Overlay gradients** over images: dark-to-transparent at bottom for text readability.

### Accessibility
- All text must pass WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large).
- Never rely solely on color to convey meaning. Pair with icons or text labels.
- Test in grayscale — if information is lost, redesign.

---

## 4. Layout & Composition

### The Editorial Page Model
Think of each slide as a magazine spread:
- **Hero area:** The main visual or headline. Takes ~60% of space.
- **Secondary area:** Supporting text or data. ~30%.
- **Footer / meta:** Navigation, page numbers, branding. ~10%.

### Visual Weight
- Balance asymmetry, don't center everything. Off-center compositions feel more sophisticated.
- Large elements near the top-left pull the eye first (reading direction).
- Use negative space as an active design element, not an afterthought.

### Depth & Layering
- **Z-axis matters.** Elements should feel like they exist on different planes.
  - Background (deepest): Gradient, texture, or image.
  - Midground: Cards, shapes, overlays.
  - Foreground: Text, icons, key graphic elements.
- Use semi-transparent overlays, subtle drop shadows, and blur to create depth.
- Glassmorphism: Frosted glass cards (`backdrop-filter: blur(20px)`) with subtle colored borders.

---

## 5. Imagery

- **No clip art. No stock-photo-looking stock photos.** If it looks like it came from a template, don't use it.
- Images should be cinematic: dramatic lighting, intentional composition, negative space.
- **Editorial cropping:** Leave room for text overlay. Avoid busy backgrounds.
- Image treatment: Dark overlays (20-40% opacity black) for readability. Subtle vignettes.
- When no real image is available, use: abstract gradients, geometric patterns, or data visualization instead of generic placeholders.

---

## 6. Motion & Transitions (Web Slides)

- Transitions should be **subtle and purposeful** — never decorative.
  - Fade: Standard. 300-500ms ease.
  - Slide: Only when revealing sequential content. 400ms ease-in-out.
  - No zoom, bounce, flip, or 3D effects.
- Micro-interactions: Subtle hover states, smooth scroll, content that appears on scroll.
- **Load time matters.** No heavy animations that delay content appearing.

---

## 7. The Quality Bar

Before considering a slide "done," check:
1. ✅ One clear idea per slide — could someone grasp it in 1 second?
2. ✅ Whitespace is generous. Nothing feels cramped.
3. ✅ Typography hierarchy is clear at a glance.
4. ✅ Colors serve the narrative, not decoration.
5. ✅ If printed in grayscale on newsprint, it still works.
6. ✅ No element is there "just because" — every pixel earned its place.
7. ✅ The slide would look at home in *Wired*, *Time*, or *The New York Times Magazine*.

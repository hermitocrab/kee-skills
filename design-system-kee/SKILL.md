---
name: design-system-kee
description: |
  Kee Lee's visual design system. Colors, typography, spacing, cards, dark mode, mobile rules, and anti-patterns. Load BEFORE any visual output — HTML pages, slides, landing pages, dashboards, courseware, or frontend builds. Contains the cumulative design corrections and preferences from all design sessions.
---

# Design System — Kee Lee (SrKeeda)

> Last updated: 2026-06-23
> Source: 550+ main sessions April–June 2026, memory files, SOUL.md, MEMORY.md, design-protocol.md

---

## ⛔ RULE ZERO — ASK BEFORE ANY DESIGN CHANGE

If another agent just revamped a page, do NOT revamp it again without SrKeeda's explicit approval. Different agents have different taste. We serve ONE visual identity.

**Source:** 2026-05-24 rkrk.io landing page multi-revamp chaos. SrKeeda furious after 002 changed things without asking.

---

## 🏛️ THREE DESIGN SYSTEMS

| System | Domain | Vibe | Use For |
|--------|--------|------|---------|
| **White Editorial** | rkrk.io, ielts.rkrk.io | NYT Magazine meets clean Swiss | Landing pages, reports, courseware, editorial content |
| **Swiss Editorial** | /dynamos/bp, pitch decks | White editorial + grid quadrant + big stats | Business plans, investor decks, strategy docs |
| **Dark App** | dynasaurus.rkrk.io, /dynamos, programmer-english | LangCert Gen Z Y2K Dark | SaaS apps, builder tools, student-facing products |

**NEVER mix systems on the same page. Each domain picks one.**
**Source:** design-protocol.md, 2026-05-24 council discussion

---

## 🎨 SYSTEM 1: WHITE EDITORIAL (Landing & Content)

### Palette
```
Background:     #FAFAFA (warm white, never pure #FFF for pages)
Card bg:        #FFFFFF
Text:           #1A1A1A (near-black, never pure #000)
Accent:         #E62B1E (TEDx red — use SPARINGLY)
Secondary:      #D97706 / #C2410C (warm orange/gold — rkrk.io landing)
Gray scale:     #F5F5F5 / #E0E0E0 / #999 / #666
```

**Source:** design-protocol.md, 2026-05-24 rkrk.io v2.1 editorial final. SrKeeda approved warm orange/gold palette after rejecting multiple alternatives.

### Typography
```
Headings:   Playfair Display (editorial, elegant) — weights: 400, 600, 700
Body:       Source Serif 4 or Inter (UI)
UI labels:  Inter Light 300
Code:       Fira Code (app-only)
Reading:    Newsreader (long-form)

Heading sizes:  h1 2.2–3.2rem, h2 1.4–1.8rem, h3 1rem
Body size:      16px base, line-height 1.7
Letter-spacing: -0.02em on headings, none on body
```
**Rule: 3 typefaces max, each with a clear role. Weight over size for hierarchy.**
**Source:** SOUL.md Section X-A, rkrk.io v2.1 (2026-05-24), TEDx speech page (2026-06-19)

### Layout
```
Max-width:      1100px centered
Section pad:    80px vertical desktop / 48px mobile
Grid:           2-col and 3-col, stack to 1-col at 768px
Red bar:        28px × 2px under section headings
Border:         1px solid #E0E0E0 between sections and on cards
```

### Navigation (rkrk.io)
- Fixed top, white bg with 97% opacity + `backdrop-filter: blur(24px) saturate(1.5)`
- Logo: "Kee Lee" with red dot accent
- Links: uppercase, 0.68rem, 600 weight, gray-600
- "Contact Kee" red filled button — always visible
- Quick access buttons: thin bordered (#s: DynamOS, DynaSaurus, IELTS)
- Language switcher: 🌐 emoji + code

**Source:** 2026-05-24 rkrk.io v2.1, 2026-06-19 redesign

### Components

**Cards:**
- White bg, 1px #E0E0E0 border, 28px padding
- Hover: border turns red, subtle shadow
- Category cards: 3–4px LEFT border accent (the ONLY category indicator)
- Never show the same information twice on one card

**Flip Cards (RUA):**
- 270px height, white bg
- hover: `rotateY(180deg)`
- Back: dark bg with BEEF/3C/GAP content
- Mobile: `touchend` event for tap-to-flip
- "🔄 Tap to flip all cards" pill button
- Content center-aligned

**Detail views:** Centered modals, NOT content-pushing accordions

**Source:** MEMORY.md, SOUL.md Section X-A, 2026-05-24 rkrk.io v2.1

---

## 🖥️ SYSTEM 2: SWISS EDITORIAL (Business Plans & Decks)

Same as White Editorial PLUS:
- Red bar under EVERY section heading
- Grid quadrant for market positioning
- Big stat numbers: `4rem 900 weight #E62B1E` red
- Tier cards for pricing
- Timeline with active marker dot (red circle)
- Print `@page` styles for A4 PDF export
- Contact box: black background, white text

**Source:** design-protocol.md, 2026-05-24 "BP Design Grill" session

---

## 🌑 SYSTEM 3: DARK APP (SaaS & Tools)

### DynaSaurus App Palette
```
Background:     #0D0D0F (near-black)
Panels:         #1A1A1E (dark gray surface)
Text:           #E8E8F5 (warm off-white)
Accent:         #FF6B6B (coral) → #FFB347 (amber gradient)
Secondary:      #7C3AED (purple — DynamOS systems)
```
**Source:** 2026-05-16 DynaDict 4-improvement sprint, design-protocol.md

### DynamOS Platform Palette
```
Background:     #0A0A14
Surface:        #12122A
Text:           #E8E8F5
Accent:         #7C3AED (purple, NOT red)
```
**Source:** design-protocol.md, 2026-05-24

### Programmer English Palette
```
Dark Gen Z editorial style — Content Creator Suite compliant
(Full spec at programmer-english/design-system.md by Agent 004)
```
**Source:** 2026-06-06 Kee daily report

### Dark App Components
- Chat bubbles: dark surfaces, gradient accent lines
- Sidebar: dark with glass overlay
- 🦕 logo everywhere: header, chat bubbles, loading spinner
- Prompt chips: rounded pills, emoji-prefixed, dark bg with accent border
- Gradient avatars
- Loading spinner: 🦕 animated

**Source:** 2026-05-17 DynaSaurus sprint, 2026-05-16 DynaDict improvements

---

## 🎴 CARD DESIGN RULES (ALL SYSTEMS)

### Universal Card Patterns
1. **One thing per card** — every card answers exactly one question. If you have 2 ideas, that's 2 cards.
2. **Progressive disclosure** — summary on front, detail behind tap/flip. (Stripe, Linear, Apple pattern)
3. **Category colors are semantic** — purple=people, teal=places, amber=events, violet=objects. Never decorative.
4. **3–4px left border accent** is the ONLY category indicator. Don't repeat the color elsewhere on the card.
5. **NEVER show the same information twice on one card.** Redundancy = noise.

**Source:** SOUL.md Section X-A (2026-05-12), speaking-p2 project (MEMORY.md)

---

## 📱 MOBILE & RESPONSIVE RULES

### Touch Interaction (Apple HIG + WebKit)
```
Tap targets:    ≥ 44×44px (finger is 10-14mm)
CSS:            touch-action: manipulation on all interactive elements
Tap highlight:  -webkit-tap-highlight-color: transparent
Swipe detect:   track touchStart coords, threshold 8-10px before treating as tap
Prevent:        e.preventDefault() only on confirmed taps, NOT swipes
Focus:          outline: none on :focus/:focus-visible for role="button"
Hover:          NEVER use :hover transforms that change layout dimensions
```

### Layout Behavior
- Cards: stack single-column on mobile
- Modals: open from BOTTOM on mobile (not center)
- Navigation: hamburger → slide-over drawer with dark overlay backdrop
- Fixed header: backdrop-filter glass, buttons compressed
- Cache-busting: query params on CSS/JS for iOS Safari
- ⛔ **Text overflow check**: EVERY inline text element (chips, tags, code spans, badges, chunk highlights) must use `word-break:break-word; overflow-wrap:break-word` — NEVER `white-space:nowrap` on text that could exceed container width. Verify by shrinking viewport to 320px.

**Source:** SOUL.md Section VIII (2026-05-11), 2026-05-17 DynaSaurus mobile sidebar, 2026-06-24 Allison overflow bug

---

## 🚫 ANTI-PATTERNS — NEVER DO THESE

### Visual Anti-Patterns (from SrKeeda corrections)
| ❌ NEVER | Date Corrected | Context |
|----------|---------------|---------|
| Centered hero over dark mesh gradient | 2026-05-24 | rkrk.io v2.0 Dark rejected |
| AI-purple (#8B5CF6, #A855F7) gradients | 2026-05-24 | Generic AI slop |
| Equal-width feature cards in a row | 2026-05-24 | No hierarchy = boring |
| Inter as default font (it's UI-only) | 2026-05-24 | rkrk.io needs Playfair |
| Generic glassmorphism (no purpose) | 2026-05-24 | rkrk.io v2.0b "liquid glass" rejected |
| ALL-CAPS section headings | 2026-05-24 | Original rkrk.io had "LEARNINGIS NOWDESIGN" |
| Outline text / text-stroke on light bg | 2026-05-24 | Invisible, amateur |
| Cursor glow effects / particles / orbs | 2026-05-24 | Distracting, dates the design |
| Scroll-jacking or complex animations | 2026-05-24 | User-hostile |
| Same info twice on one card | 2026-05-12 | Redundancy creates confusion |
| Equal category cards (no visual hierarchy) | 2026-05-12 | 7 principles research |
| `white-space: nowrap` on inline text inside cards | 2026-06-24 | Allison report — long chunks overflow on mobile. Use `word-break:break-word; overflow-wrap:break-word` instead |
| Any inline element with `nowrap` + long text content | 2026-06-24 | Chips, tags, badges, code spans. If text > 15 chars, don't nowrap it |
| Missing `overflow-x:hidden` on body | 2026-06-24 | Always set on body as safety net. Doesn't fix the root cause but prevents horizontal scrollbar |

### Process Anti-Patterns
| ❌ NEVER | Reason |
|----------|--------|
| Change a page another agent just revamped | Without SrKeeda's explicit approval |
| Change color palette without asking | Palette is locked per system |
| Add/remove sections without asking | Section structure is approved |
| Mix fonts across pages in same domain | One domain = one type system |
| Deploy without version comment in CSS | `/* VERSION: Name vX.Y — Desc */` |
| Claim "fixed" without verifying via curl/test | Ground truth is sacred |
| Scope creep: "fix chip size" → redesign whole page | Fix only what was asked |

**Source:** design-protocol.md, 2026-05-24 rkrk.io redesign saga, 2026-06-19 failures log

---

## 🎯 CATEGORY COLOR SYSTEM (IELTS & Courseware)

```
Purple (#7C3AED)  = People
Teal  (#14B8A6)   = Places
Amber (#F59E0B)   = Events
Violet(#8B5CF6)   = Objects
```

Used in: ielts.rkrk.io/speaking-p2 pages, discourse markers, report cards
**Source:** MEMORY.md speaking-p2 project, SOUL.md Section X-A

---

## 🔤 TYPOGRAPHY HIERARCHY (Full Map)

| Role | Font | Weight | System | Context |
|------|------|--------|--------|---------|
| Editorial headings | Playfair Display | 400/600/700 | White/Swiss | Landing, reports, speeches |
| Body reading | Source Serif 4 | 400 | White/Swiss | Long-form content |
| UI labels & body | Inter | 300/400/500/600 | ALL | Buttons, nav, cards, forms |
| Code blocks | Fira Code | 400 | Dark App | Inline code, examples |
| Extended reading | Newsreader | 400 | White | Long-form articles |

**Rule:** 3 fonts max per page. Each font has exactly ONE role.

**Source:** SOUL.md Section X-A, design-protocol.md, 2026-06-19 TEDx page restore

---

## 🪟 GLASS EFFECTS (When Approved)

Use SPARINGLY and only where it serves a purpose:
- Navigation: `backdrop-filter: blur(24px) saturate(1.5)` with 97% opacity
- Mobile sidebar: dark glass overlay backdrop
- Chat widget trigger: gradient purple glass button

**Never use generic glassmorphism as decoration.** Every glass effect must have a functional reason (layering, depth indication, modal backdrop).

**Source:** 2026-06-19 rkrk.io redesign, 2026-05-17 mobile sidebar

---

## 📐 SPACING & BREATHING ROOM

```
Section vertical:    80px desktop / 48px mobile
Card padding:        28px
Content max-width:   1100px
Body line-height:    1.7
Heading line-height: 1.2
Grid gap:            24px desktop / 16px mobile
```

**Principle:** Breathing room is INFORMATION, not waste. Whitespace creates focus. (Apple HIG, NYT Magazine pattern)

**Source:** SOUL.md Section X-A (2026-05-12), design-protocol.md

---

## 🏷️ VERSIONING PROTOCOL

Every deploy MUST have a version comment in CSS:
```css
/* VERSION: Editorial v2.1 — 8 approved changes, Inter Light, KeeLee logo */
```

Include: System name + version number + brief description of what changed.

**Source:** 2026-05-24 design-protocol.md

---

## 📋 CONTENT AUDIT REFERENCES

Reference sites SrKeeda approves of (when in doubt, match these vibes):
- **Apple Wallet** — card flip mechanics
- **NYT Magazine** — editorial type, breathing room, pull quotes
- **Stripe Docs** — progressive disclosure, color as signifier
- **Linear** — command palette, invisible navigation, dark app polish
- **Pitchfork** — one thing per card layout
- **A24 Films** — mood, minimal but striking
- **Our World in Data** — numbers as storytelling, stat cards

**Source:** SOUL.md Section X-A (2026-05-12), USER.md

---

## 📊 DYNATAURUS SPECIFIC RULES

### UI Language & Translation Protocol
- Language selector: 7 languages in sidebar (EN, ZH-CN, ZH-TW, KO, FR, JA, TH)
- "I want to learn" dropdown: ALL language names in SYSTEM language
- CEFR levels: A1-B1 in SYSTEM language, B2-C2 in TARGET language
- Sidebar label: "🌐 System Language" (not "UI Language")
- Footer hint: translated in all 11 languages

**Source:** 2026-05-26 dynasaurus tweaks session

### Rate Limiting Soft Lock Design
- 20 queries/day per IP, resets at midnight China time
- After limit: basic mode (definition only, no RUA tutoring)
- CTA to contact Kee for 15-min proficiency test
- Response headers: `X-RateLimit-Remaining`, `X-RateLimit-Limit`

**Source:** 2026-05-26 session

### Bug Report Form
- Emoji mood picker: 😤😕😐🫠💀
- Bilingual: EN / ZH
- Screenshot upload
- RUA-structured fields
- Stores to Supabase `bug_reports`

**Source:** 2026-05-26 session

---

## 🔄 DESIGN CHANGE APPROVAL PROCESS

Before ANY visual change:
1. State what EXACTLY will change
2. Show the proposed palette/font/layout
3. WAIT for SrKeeda's explicit approval
4. Apply only what was approved
5. Never "while I'm here" add unapproved changes
6. Version-tag the deploy

**Violation = automatic rollback. No exceptions.**

**Source:** Rule Zero (SOUL.md), 2026-05-24 rkrk.io disaster, 2026-06-19 DynaSaurus deploy guard

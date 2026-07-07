---
name: interaction-patterns-kee
description: |
  Kee Lee's interaction design rules. Touch targets, swipe/scroll/tap behaviors, card flip mechanics, navigation patterns, modal rules, loading states, animation dos and don'ts. Load when building any interactive UI — landing pages, SPAs, courseware, dashboards, or any page with user interaction.
---

# Interaction Patterns — Kee Lee (SrKeeda)

> Last updated: 2026-06-23
> Source: 550+ main sessions, memory files, SOUL.md Section VIII, dynasaurus sessions

---

## 📱 TOUCH & MOBILE INTERACTION (Apple HIG-Based)

### Tap Targets
```
Minimum size:    44×44px (finger is 10-14mm wide)
CSS mandatory:   touch-action: manipulation on ALL interactive cards/buttons
Tap highlight:   -webkit-tap-highlight-color: transparent on all touch targets
Focus:           outline: none on :focus/:focus-visible for role="button" elements
Hover death:     NEVER use :hover transforms that change layout dimensions
                 transform: translateY(-1px) on hover → grid reflow on mobile tap
```

### Swipe vs Tap Detection
```
1. Track touchStart coordinates
2. On touchend, calculate distance moved
3. Movement > 8-10px → treat as SCROLL (do NOT fire tap)
4. Movement < 8px → treat as TAP (fire click handler)
5. e.preventDefault() ONLY on confirmed taps, NEVER on swipes
```

### Scroll Semantics
```
Mobile cards:    stack single-column, no horizontal scroll
Modals:          open from BOTTOM on mobile, center on desktop
Fixed headers:   no scroll-jacking, smooth native scroll
Pull-to-refresh: native browser behavior preserved
```

**Source:** SOUL.md Section VIII (RUA'd from Apple HIG + WebKit, 2026-05-11)

---

## 🎴 CARD FLIP INTERACTION

### Desktop (hover)
```
Front face:  visible by default
Back face:   rotateY(180deg) by default, hidden
On hover:    container rotates 180deg, revealing back face
Transition:  transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)
Perspective: 1000px on parent for 3D effect
```

### Mobile (tap)
```
Event:       touchend (NOT click — 350ms delay on iOS Safari)
Pre-check:   was this a swipe? If movement < 8px from touchStart → TAP
Action:      toggle .flipped class on card container
CSS:         .flipped { transform: rotateY(180deg) }
Group flip:  "🔄 Tap to flip all cards" button toggles .flipped on ALL cards
```

### Flip Card States
```
Front:  white bg, icon + title + one-line description
Back:   dark bg (#1A1A1A), detail content (BEEF / 3C / GAP)
Content: center-aligned on both faces
```

**Source:** 2026-05-24 rkrk.io RUA flip cards, 2026-06-19 mobile touchend fix

---

## 🧭 NAVIGATION PATTERNS

### Fixed Header (rkrk.io White Editorial)
```
Position:       fixed, top: 0, z-index: 100
Background:     rgba(255, 255, 255, 0.97)
Backdrop:       blur(24px) saturate(1.5)
Transition:     smooth, no jarring opacity changes
Scroll effect:  subtle shadow on scroll (box-shadow transition)
```

### Mobile Navigation (Hamburger)
```
Button:         hamburger icon (☰), top-right, ≥44×44px
Drawer:         slide-over from RIGHT, full-height
Overlay:        dark semi-transparent backdrop behind drawer
Close:          tap overlay OR hamburger again OR swipe-right on drawer
Animation:      transform: translateX(), 0.3s ease
```

### Quick Access Buttons (rkrk.io)
```
Style:          thin bordered buttons, 0.68rem, uppercase
Order:          DynamOS · DynaSaurus · IELTS
Hover:          border darkens, subtle bg change
Mobile:         compress to icons or hide in hamburger
```

### Language Switcher
```
Button:         🌐 EN / 🌐 中文 (globe emoji + code)
Dropdown:       list of available languages
Desktop:        inline in nav
Mobile:         in hamburger drawer
```

**Source:** 2026-06-19 rkrk.io redesign, 2026-05-17 DynaSaurus mobile sidebar, design-protocol.md

---

## 🪟 MODAL / OVERLAY RULES

### Desktop Modals
```
Position:      centered (flex/grid centering)
Backdrop:      rgba(0, 0, 0, 0.5) with backdrop-filter: blur(4px)
Content:       white bg, rounded corners (8-12px), 32px padding
Close:         X button top-right OR click backdrop OR Escape key
Animation:     fade + scale (opacity 0→1, transform scale(0.95→1))
Duration:      200ms ease-out
```

### Mobile Modals
```
Position:      BOTTOM of screen (not center)
Height:        max 85vh, rounded top corners
Swipe:         swipe down to dismiss
Backdrop:      same as desktop
```

### When to Use Modals vs Accordions
```
Modal:         detail view, forms, confirmations, media
               "One focused task at a time"
Accordion:     expanding lists, FAQs, sequential content
               "Progressive reveal within page flow"
NEVER:         content-pushing accordions that shift the whole page
               (use centered modals instead)
```

**Source:** SOUL.md Section X-A (2026-05-12), design-protocol.md

---

## 🔘 BUTTON & INPUT BEHAVIORS

### Button States (All Systems)
```
Default:    visible, clear label, appropriate size
Hover:      subtle color/border change, cursor: pointer
Active:     slight scale-down (transform: scale(0.98))
Focus:      visible outline (respects prefers-reduced-motion)
Disabled:   opacity: 0.5, cursor: not-allowed, pointer-events: none
Loading:    spinner replaces text, button stays same size
```

### Button Types by System
```
Primary CTA:      filled red (#E62B1E), white text, 14-16px, 12-24px pad | White editorial
Secondary:        outlined, matching border color, transparent bg
Quick access:     thin border, small (0.68rem), uppercase
Prompt chips:     rounded pill, dark bg, accent border, emoji-prefixed | Dark app
Flip toggle:      pill shape, "🔄 Tap to flip all cards"
```

### Input Fields
```
Height:          44px minimum (tap target)
Border:          1px solid #E0E0E0
Focus:           border → accent color, subtle ring
Placeholder:     lighter gray (#999), never crucial info
Error state:     red border, inline error message below
Label:           always visible (never placeholder-as-label)
```

**Source:** design-protocol.md, 2026-05-16 DynaDict prompt chips

---

## ⏳ LOADING & EMPTY STATES

### Loading States
```
Spinner:        🦕 animated emoji (DynaSaurus), subtle CSS spinner (editorial)
Skeleton:       gray placeholder shapes matching content layout
                shimmer animation (background gradient sweep)
Duration:       show skeleton if > 300ms, spinner if indeterminate
Timeout:        10s → show error state with retry button
```

### Empty States
```
First visit:    welcome message + suggested actions
No results:     friendly message + try-again suggestion
No data:        "Nothing here yet. [Action to create first item]"
Error:          "Something went wrong. [Retry button]"
```

### Rate Limit State (DynaSaurus Specific)
```
Limit reached:  auto-switch to basic mode (definition only)
                clear message: "You've reached 20 queries today"
                CTA: "Book Kee's free 15-min proficiency test"
                Contact: WhatsApp + WeChat visible
Reset:          midnight China time (client-side timer display)
```

**Source:** 2026-05-26 dynasaurus rate limiting session

---

## 📋 FORM PATTERNS

### Bug Report Form (DynaSaurus)
```
Mood picker:    5 emoji options (😤😕😐🫠💀) — visual, fast
Language:       bilingual EN/ZH toggle
Fields:         RUA-structured (what were you doing, what happened, what should happen)
Attachment:     screenshot upload (optional)
Submit:         prominent button, success confirmation
```

### Auth Forms (DynaSaurus)
```
Layout:         centered card, 400px max-width
Fields:         email, password, confirm password
Validation:     inline, real-time (not on submit only)
Errors:         red border + message below field
Social:         future (not yet implemented)
```

### Search / Filter
```
Input:          text field with search icon, 44px height
Results:        dropdown list below input (not modal)
Filter chips:   horizontal scroll, pill shape, toggle on/off
Active filter:  filled pill, accent color bg
Clear all:      text link "Clear filters" when any active
```

**Source:** 2026-05-26 dynasaurus, SOUL.md Section X-A (IELTS report filter chips)

---

## 🎬 ANIMATION & MOTION PREFERENCES

### Approved Animations
```
Card flip:       transform rotateY(180deg), 0.6s cubic-bezier(0.4, 0, 0.2, 1)
Fade in:         opacity 0→1, 200-300ms ease-out
Slide in:        transform translate, 300ms ease-out
Scale:           subtle (0.95→1), 200ms ease-out
Hover lift:      transform translateY(-2px), box-shadow increase
Skeleton shimmer: background gradient sweep, 1.5s infinite
```

### Forbidden Animations
```
❌ Scroll-jacking (override native scroll)
❌ Parallax effects heavier than 2-3 layers
❌ Auto-playing video backgrounds
❌ Cursor-trail effects / particle systems
❌ Orbit / rotation animations on text
❌ Complex entrance animations (stagger children is ok)
❌ Animations > 600ms (feels laggy)
```

### Motion Sensitivity
```
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Source:** 2026-05-24 design rejection feedback (SrKeeda hated cursor glow, particles, orbs), SOUL.md

---

## 📊 DATA DISPLAY INTERACTIONS

### Progressive Disclosure (Mandatory Pattern)
```
Level 1:  summary card (title + one number/key insight)
Level 2:  tap → expanded detail (modal or inline expand)
Level 3:  "See full report" → dedicated detail page
```

### Filter + Sort
```
Chips:    horizontal scroll, category colors match system
Active:   filled state, clear visual difference
Sort:     dropdown or toggle (Newest, A-Z, Level)
Results:  animate in with stagger (50ms per item)
```

### Timelines
```
Layout:    flex row or column, alternating
Years:     red label, bold
Events:    gray content below year
Active:    marker dot (red circle) on current/latest
Mobile:    stack vertically, no horizontal scroll
```

**Source:** SOUL.md Section X-A (2026-05-12), design-protocol.md (2026-05-24)

---

## 🔍 SEARCH & COMMAND PATTERNS

### Site Search
```
Trigger:     search icon or ⌘K keyboard shortcut
Interface:   command palette overlay (Linear-inspired)
Results:     grouped by type (pages, lessons, topics)
Navigation:  arrow keys + Enter, click to select
Close:       Escape or click backdrop
```

### In-Page Search / Filter
```
Behavior:    filter-as-you-type (no submit button needed)
Debounce:    300ms before filtering
Clear:       X button inside input when text present
No results:  "No matches. Try [suggestion]."
```

**Source:** SOUL.md Section X-A (Linear command palette inspiration)

---

## 🔄 STATE PERSISTENCE

### What to Remember Across Sessions
```
Language preference:     localStorage (lang code)
Last visited page:       not tracked (privacy)
Form drafts:             NOT saved (security)
Flip card state:         reset on page load
Theme:                   auto (follows system)
```

### URL State
```
Filters:          ?category=people&level=B2
Search:           ?q=vocabulary
Pagination:       ?page=2
Modal open:       ?detail=eileen (shallow route)
```

---

## ⚡ PERFORMANCE INTERACTION RULES

### Perceived Speed
```
Skeleton screens:    show BEFORE data loads (not spinner)
Optimistic UI:       update UI immediately, rollback on error
Preload:             prefetch next likely page on hover
Transition:          never freeze UI during animation
```

### Mobile Performance
```
Cache-busting:    query params on CSS/JS (?v=20260623)
Image lazy load:  loading="lazy" for below-fold images
Font:             font-display: swap (prevents invisible text)
Tap response:     < 100ms to feel instant (button active state)
```

**Source:** SOUL.md Section VIII (mobile checklist), 2026-06-19 performance work

---

## 🚫 INTERACTION ANTI-PATTERNS

| ❌ NEVER | Because |
|----------|---------|
| Scroll-jacking | Breaks user expectation, accessibility fail |
| Auto-play audio/video | Hostile, especially on mobile |
| hover-only interactions on mobile | hover doesn't exist on touch |
| Fixed-position elements that overlap content | iOS Safari viewport bugs |
| Long-press for critical actions | Not discoverable |
| Double-tap for anything | Confuses zoom gesture |
| Swipe to delete without undo | Irreversible = anxiety |
| Infinite scroll without "load more" fallback | Breaks footer, SEO, accessibility |
| Popup on page load | Instant bounce |
| "Click here" as link text | Not descriptive, accessibility fail |

**Source:** SOUL.md, Apple HIG, multiple SrKeeda corrections

---

## ✅ APPROVED INTERACTION PATTERNS

| Pattern | Where Used | Approved |
|---------|-----------|----------|
| Card flip (hover + tap) | RUA cards, P2 vocabulary | 2026-05-24 |
| Touchend tap-to-flip | Mobile card fix | 2026-06-19 |
| Glass fixed header | rkrk.io nav | 2026-06-19 |
| Slide-over hamburger drawer | DynaSaurus mobile sidebar | 2026-05-17 |
| Prompt chips above input | DynaSaurus chat | 2026-05-16 |
| Bottom-opening mobile modals | All detail views | 2026-05-12 |
| Progressive disclosure (summary→detail) | Report cards, courseware | 2026-05-12 |
| Filter chips (horizontal scroll) | IELTS report, discourse markers | 2026-05-12 |
| Soft lock rate limiting | DynaSaurus | 2026-05-26 |
| Emoji mood picker | Bug report form | 2026-05-26 |
| Skeleton loading screens | All pages | 2026-05-17 |
| Command palette search (⌘K) | Future: all sites | Planned |

---

## 🧪 INTERACTION QA CHECKLIST (Before Every Ship)

```
☐ All buttons ≥ 44×44px (tap target)
☐ touch-action: manipulation on interactive elements
☐ -webkit-tap-highlight-color: transparent
☐ Swipe detection: touchStart tracking + 8px threshold
☐ No :hover-only critical interactions
☐ No layout-changing :hover transforms
☐ Modals: Escape key, backdrop click, X button all close
☐ Forms: inline validation, not submit-only
☐ Loading: skeleton/spinner shown within 300ms
☐ prefers-reduced-motion: reduce respected
☐ Tab order logical (keyboard navigation)
☐ Focus visible on all interactive elements
☐ URL state reflects current view (shareable)
```

**Source:** SOUL.md Section VIII (Mobile checklist extended)

---
name: content-creator-suite
description: "MANDATORY for ALL content creation — posts, slides, pages, images, videos. Anti-slop design + platform-native formatting + Xiaohongshu anti-AI detection. Use this skill before creating ANY visual or written content for any platform."
---

# Content Creator Suite — Always-On Design System

**⛔ THIS SKILL IS ALWAYS ACTIVE. Before creating ANY content, check the rules below.**

## 1. Anti-Slop Design (Taste Skill)

Every visual output MUST pass these checks:
- No boilerplate AI templates. No cookie-cutter layouts.
- Three dials: DESIGN_VARIANCE (layout experimentation), MOTION_INTENSITY (animation depth), VISUAL_DENSITY (info per viewport)
- Brief inference: understand the audience, mood, and industry before generating
- Hard pre-flight check: every page/slide must be intentional, not generated-by-default
- Dark mode by default for all web content. Dual-mode support for print/light.

## 2. Typography Rules

- Headings: Space Grotesk (web) or equivalent editorial sans-serif
- Body: Inter (web) or equivalent readable sans-serif
- Chinese: Noto Sans SC
- Never: Arial, Times New Roman, Comic Sans, system defaults
- Weight over size for hierarchy. 3 type sizes max per view.

## 3. Color as Signifier

- Every color choice maps to meaning, not decoration
- Dark backgrounds (#0a0a0f) with vibrant accents (a78bfa, 4ade80, f5a623)
- Visible gradients used sparingly — never washed-out pastels
- No random color splashes. Each accent serves a purpose.

## 4. Platform-Specific Rules

### Xiaohongshu (小红书)
- ⚠️ CRITICAL: Use HTML + real stock photography, NOT AI-generated images
- AI-generated images get flagged and shadowbanned
- AI finds matching high-quality images from Unsplash/Pexels/Pixabay
- Layout: image-first, text overlay, clean editorial feel
- Titles: SEO-optimized, keyword-rich, 20 characters max
- Format: 3:4 vertical images preferred

### WeChat Official Account (公众号)
- Use md2wechat-skill for Markdown → WeChat formatting
- 40+ style templates available
- Code blocks must be properly formatted
- Support AI image placement
- Batch publishing supported
- Rich media: embed videos, audio, interactive elements

### X/Twitter
- Threads over single tweets for educational content
- AI ghostwriting via Tweet Hunter for viral hooks
- Typefully for thread composition
- Clean formatting: no markdown, use line breaks for structure
- One idea per tweet. Thread for depth.

### PPT / Slides / Courseware
- Use editorial-slide-designer skill for all presentation content
- Keynote automation (AppleScript/JXA) for Mac-native slides
- Web-based SPA slides for cross-platform
- PPTX generation with proper design principles
- Never: bullet-point walls, clip art, default templates

### Web Pages / SPAs
- Dark Gen Z aesthetic as default: #0a0a0f background, #12121a cards
- Space Grotesk headings, Inter body
- Bilingual toggle EN ↔ ZH-CN for all education content
- Progressive disclosure: summary first, details on tap
- One thing per card — never repeat data
- Breathing room — whitespace is the most important design element

## 5. Image Rules

- Product/social images: use real photography, not AI-generated (Xiaohongshu rule)
- Web UI mockups: AI-generated OK for internal, real for public
- Portraits/personas: Wan 2.6 or similar for internal, stock for public
- Always credit image sources when using stock photography

## 6. Content Quality Gates

Before publishing ANY content:
1. Does it pass the "would I read this?" test?
2. Are there emoji at line starts for iMessage? (NO MARKDOWN on iMessage)
3. Is the design anti-slop? (No cookie-cutter AI look)
4. Are fonts correct per platform?
5. Is there a bilingual toggle if it's educational?
6. Is platform detection working? (iMessage vs web vs WeChat vs XHS)

## References

- Taste Skill: github.com/Leonxlnx/taste-skill (20.3k ⭐)
- 歸藏's Xiaohongshu Layout Skill: HTML + real photos, anti-AI detection
- md2wechat-skill: Markdown → 公众号, 40+ styles
- editorial-slide-designer: Keynote/web/PPTX courseware
- See also: project-gateway for deploy paths, ai-tools-radar for tool discovery

## Learned

2026-05-27 — Created from SrKeeda's mandate. All content from this point forward uses these rules. Burned into permanent memory.

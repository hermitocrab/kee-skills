# GPT-Image2 Typography & Font Rendering

## When to Use
Use when the user wants to generate images with text — posters, ads, UI mockups, magazine covers, packaging, social media graphics, brand assets, infographics, or any visual where accurate text rendering matters. GPT-Image2 (OpenAI, April 2026) achieves ~99% text accuracy across English, Chinese, Japanese, and Korean. This skill is the authoritative prompt-engineering guide for text-in-image generation.

## Model Reference
- **GPT-Image2** — OpenAI's native image model. ~99% text accuracy. Multi-language (incl. CJK). Up to 4K resolution. Flexible aspect ratios.
- Use via `image_generate` with `model: "openai/gpt-image-2"` or the default when GPT-Image2 is configured.
- For transparent backgrounds: `outputFormat: "png"`, `background: "transparent"`.
- Quality settings: `low`, `medium`, `high`, `auto`. Use `medium` or `high` for small text, dense layouts, or multi-font designs.

## Core Prompt Structure (六段式)

Always structure image prompts with these 6 dimensions. Never just describe the subject — describe the entire frame:

```
1. ASPECT RATIO — e.g. 16:9 (landscape), 9:16 (portrait), 1:1 (product), 4:5 (social)
2. SCENE — environment, background, mood, atmosphere
3. SUBJECT — main subject, positioning, details
4. LIGHTING — light source, direction, contrast, cinematic vs flat
5. STYLE — artistic direction: film, commercial, editorial, hand-drawn, 3D render
6. NEGATIVE — what to exclude: watermarks, extra text, sharpening artifacts
```

### Example (Chinese market poster)
```
Aspect 4:5. Vibrant night market in Chengdu, glowing red lanterns casting warm light,
steam rising from street food stalls. Bold title text (EXACT, verbatim, no extra characters):
"成都味道" in heavy Song typeface, vermillion red, centered at top. Subtitle below in clean
sans-serif: "A Taste of Sichuan". Wet pavement reflections, cinematic grading,
commercial photography quality. No watermarks. No extra text. No logo distortion.
```

## Text Rendering Rules (CRITICAL)

### 1. Specify Text EXACTLY
- Enclose exact text in **quotes**.
- Add the phrase: `(EXACT, verbatim, no extra characters)`.
- For tricky brand names: spell letter-by-letter if needed.

✅ Good: `Title text (EXACT, verbatim, no extra characters): "Fresh & Clean"`
❌ Bad: `A poster that says Fresh and Clean`

### 2. Describe Font Style Precisely
- **Weight:** bold, light, medium, heavy, thin
- **Style:** serif, sans-serif, display, script, handwritten, monospace
- **Chinese specific:** 宋体 (Song), 黑体 (Hei), 楷体 (Kai), 行书 (running script), 草书 (cursive), 粗宋 (bold Song), 细黑 (light Hei)
- **Aesthetic:** elegant, playful, authoritative, minimal, retro, brutalist

### 3. Specify EVERY Text Attribute
- **Size:** `large display size`, `small caption`, `hierarchical — title 3x body size`
- **Color:** `pure white #FFFFFF`, `brand vermillion #CC2936`, `gold foil gradient`
- **Position:** `centered`, `top-right`, `vertically centered in left half`, `bottom-left corner`
- **Spacing:** `tight kerning`, `generous leading`, `tracked out uppercase`
- **Effects:** `gold foil texture`, `neon glow`, `embossed`, `drop shadow`, `outlined stroke`

### 4. Multi-Text Layouts
For posters, magazine covers, or UI with multiple text blocks:
```
Layout: Magazine cover. Masthead "VOGUE" centered top, large serif display.
Cover line 1: "THE FUTURE OF AI" bold sans-serif, bottom-right, white on dark.
Cover line 2: "What GPT-Image2 Means for Design" smaller, below line 1.
Body snippets left-aligned in bottom third. Clean visual hierarchy.
No duplicate text. No orphaned characters.
```

### 5. Chinese Typography Tips
- GPT-Image2 handles CJK characters at pixel-perfect level.
- Use Chinese directly in prompts — no translation needed.
- For vertical text: specify `竖排` (vertical arrangement).
- For calligraphy: describe stroke flow, ink density, paper texture.
- Chinese prompt example: `"学无止境"，行书风格，笔画连贯，墨色浓淡自然，宣纸纹理背景`
- Dense Chinese layouts (infographics, menus, study guides) benefit from `quality=high`.

### 6. Negative Prompts for Text Safety
Always include relevant negatives:
```
No extra words. No duplicate text. No missing characters.
No warped letters. No orphan punctuation. No watermarks.
```

## Font System Design (Brand-Level)

When designing a complete brand font system with GPT-Image2, use this structure:

```
Design a complete font system for [BRAND NAME].
Brand personality: [3-5 adjectives]
Industry: [sector]
Target audience: [demographic + psychographic]
Font should evoke: [emotional keywords]
Reference brands: [2-3 examples]

Deliverables:
- Primary logo typeface
- Heading font with sample
- Body font with sample
- Accent/display font for highlights
- Color palette applied to each
- Consistent visual hierarchy across all samples
```

## Quality & Resolution Guide

| Use Case | Quality | Resolution | Notes |
|----------|---------|------------|-------|
| Social media post | auto/low | 1K | Fast iteration |
| Poster/ad | medium | 2K | Good text crispness |
| Magazine cover | high | 2K–4K | Dense text needs high |
| UI mockup with small text | high | 4K | Avoids character collapse |
| Packaging/label | medium | 2K | Medium usually sufficient |
| Infographic (dense CJK) | high | 4K | Essential for legibility |

## Iterative Refinement Protocol

1. **Never rewrite the entire prompt.** Make small, targeted adjustments.
2. **Fix one thing per iteration.** Text accuracy → layout → color → detail.
3. **If text is wrong:** Add `(EXACT, verbatim, no extra characters)` and re-specify the text block.
4. **If font is wrong:** Be more specific — `bold geometric sans-serif` > `modern font`.
5. **If layout is wrong:** Specify positioning more precisely with spatial language.

## Common Failure Modes & Fixes

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Extra/missing characters | Ambiguous text spec | Add `EXACT, verbatim, no extra characters` |
| Wrong font style | Vague description | Specify exact font name or detailed characteristics |
| Text placement off | Implicit positioning | Use explicit spatial terms: `centered in upper third` |
| Text illegible on background | Low contrast | Specify text color + background color explicitly |
| CJK characters warped | Quality too low | Set `quality=high` and increase resolution |
| Duplicate text blocks | Model over-generation | Add `no duplicate text` to negatives |
| Brand name misspelled | Model doesn't know brand | Spell letter-by-letter if needed |

## Prompt Templates

### Poster with Chinese + English
```
Aspect 4:5. [SCENE DESCRIPTION]. Headline text (EXACT, verbatim, no extra characters):
"[CHINESE TEXT]" in [FONT STYLE], [COLOR], [POSITION]. Subtitle (EXACT, verbatim):
"[ENGLISH TEXT]" in [FONT STYLE], smaller, below headline. [LIGHTING]. [STYLE].
No watermarks. No extra text. No logo distortion. quality=[LEVEL].
```

### Brand Identity Package
```
Aspect 1:1. Brand identity board for [BRAND]. Primary logo typeface "[TEXT]"
in [STYLE], centered. Color palette swatches along bottom edge. Heading sample,
body sample, accent sample — each labeled. Clean white background.
Professional presentation. No extra text. quality=high.
```

### UI Mockup with Text
```
Aspect 16:9. Mobile app screen mockup for [APP NAME]. Status bar at top.
Navigation title "[TITLE]" bold, centered in nav bar. Card component with
title "[CARD TITLE]" and body text "[BODY TEXT]" in system sans-serif.
Button labeled "[BUTTON TEXT]" in brand blue. Tab bar at bottom with 4 icons
labeled "[TAB1]", "[TAB2]", "[TAB3]", "[TAB4]". Clean iOS design language.
No duplicate text. quality=high.
```

## Source
- Synthesized from AI寒武纪 WeChat article "GPT-Image2提示词：瞬间拥有顶级字体美学" (May 2026)
- OpenAI GPT-Image2 documentation and community best practices
- fal.ai prompting guide for GPT-Image2
- Tencent Cloud GPT-Image2 evaluation report
- Community prompt galleries (GitHub awesome-gptimage2-prompts)

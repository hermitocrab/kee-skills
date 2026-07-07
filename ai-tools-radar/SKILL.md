---
name: ai-tools-radar
description: "Curated radar of AI tools and models worth watching. Update when SrKeeda shares new discoveries. Use when evaluating tools for DynaSaurus, DynamOS, or teaching workflow."
---

# AI Tools Radar

Live watchlist of open-source AI tools and models. Updated from SrKeeda's X/Twitter discoveries.

## 🎯 Quick Pick: What To Integrate First

| Priority | Tool | Why |
|:--------:|------|-----|
| 1 | **mem0** | Biggest blocker — DynaSaurus has no persistent memory across sessions |
| 2 | **MOSS-Audio** | Recording analysis — one model replaces 6. Timestamp ASR crushes Gemini. |
| 3 | **GPT-SoVITS** | Pronunciation feedback in learner's own voice — the killer feature |
| 4 | **MoneyPrinterTurbo** | Auto-generate 100s of IELTS video clips from keywords. Content at scale. |
| 5 | **Taste Skill** | Every AI-built page instantly looks premium. Already installed. |

## Audio / Voice (Priority for DynaSaurus)

| Tool | Stars | Best For | Key Capability |
|------|:-----:|----------|---------------|
| **GPT-SoVITS** | 57.8k | Pronunciation feedback | 1-min training → full voice clone with emotion/breathing/pauses. Cross-lingual. MIT. |
| **CosyVoice** | 21.2k | Quick voice demos | 3-second voice clone. Alibaba DAMO. Hundreds of languages. Local. |
| **MOSS-Audio** | New | Recording analysis | 6-in-1: ASR + speaker + emotion + environment + music + timestamp. Steamrolls Gemini 2.5 Pro. |
| **MoneyPrinterTurbo** | 13k | Auto video generation | Keyword → script → footage → subtitles → music → voice → video. 9:16/16:9. Local/Docker/Colab. |

## Content & Publishing

| Tool | Stars | Best For |
|------|:-----:|----------|
| **md2wechat-skill** | New | Markdown → WeChat 公众号 one-click. 40+ styles, code blocks, AI images, batch publish. |
| **MoneyPrinterTurbo** | 13k | Auto-generate short video content for IELTS/DynaSaurus at scale. |
| **markitdown** | — | Any file → clean Markdown. Office docs, PDFs, images, audio. |

## English Learning (Market Intel)

| Site | Free? | Best For |
|------|:-----:|----------|
| **Engoo** | ✅ | 8 categories (conversation, news, grammar, vocab, kids, pronunciation, speaking). 4 levels. Audio+images+exercises per lesson. Also JP/KR. Validates freemium English learning market. |

## Frontend / Design

| Tool | Stars | Best For |
|------|:-----:|----------|
| **Taste Skill** | 20.3k | Anti-slop AI-generated UIs. Portable SKILL.md design system. Multiple aesthetic variants. 3 tunable dials. |

## AI Agent Stack (DynaSaurus / DynamOS)

| Tool | Stars | Best For |
|------|:-----:|----------|
| **mem0** | — | AI agent memory layer. Persistent learner profiles for DynaSaurus. |
| **dify** | — | Visual AI agent builder. Zero-code teaching tool creation. |
| **langflow** | — | Drag-drop AI pipelines. Rapid prototyping for DynApps. |
| **browser-use** | — | AI browser control. Research automation, web scraping. |
| **crewai** | — | Multi-agent AI teams. Our council pattern. |
| **autogen** | 58k | Microsoft multi-agent framework. Our council architecture. |
| **metagpt** | 48k | AI agent software company pattern. |
| **aider** | — | Terminal AI coding assistant. For 003. |
| **n8n** | — | AI automation workflows. |

## Claude Code Ecosystem

| Tool | Source | Best For |
|------|--------|----------|
| **Claude Code Research Analyst** | leopardracer | 4-level system: research → projects → skills → cowork. |
| **Taste Skill** | Leonxlnx | Design system for AI coding agents. |
| **browserbase-skills** | — | Claude web SDK. Browser automation. |

## Open Source Culture

Chinese OSS facing exploitation crisis — fake PR factories, AI-generated résumé padding, commercial exploitation of individual devs. Useful when evaluating contributors or hiring.

## Full Integration Pipeline

```
Content Creation          →  Learning Experience       →  Feedback Loop
─────────────────           ─────────────────           ──────────────
MoneyPrinterTurbo           MOSS-Audio (transcribe)     RUA Engine (score)
  ↓ keyword → script          ↓ word timestamps           ↓ flag errors
  ↓ → footage → video         ↓ emotion detection         ↓ adjust difficulty
  ↓                            ↓                           ↓
md2wechat-skill              DynaSaurus UI               GPT-SoVITS
  ↓ publish to 公众号          ↓ play video clips          ↓ model answer
                               ↓ practice recording        ↓ learner's voice
                               ↓                           ↓
                            Taste Skill                  mem0
                              ↓ premium UI                 ↓ persist progress
                              ↓ dark theme                 ↓ session memory
```

## Vertical Slices Built

🔗 **Discourse Marker Clips:** dynasaurus-preview.vercel.app/dm-clips.html
- 4 DM cards with audio + speed control
- Practice recording simulation
- Full pipeline visualization
- Cross-sells to LangCert B2

## References
- All sourced from SrKeeda's shared X/Twitter links, 2026-05-27
- Skills: `dynasaurus-audio/`, `x-reader/`, `project-gateway/`, `claude-code-research/`, `oss-contribution-guard/`

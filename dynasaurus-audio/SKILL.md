---
name: dynasaurus-audio
description: "Audio recording analysis for DynaSaurus using open-source models: MOSS-Audio (ASR + emotion + speaker), GPT-SoVITS (voice cloning feedback), CosyVoice (instant voice sampling). Use when building pronunciation feedback, speaking assessment, or voice-based learning features."
---

# DynaSaurus Audio Analysis Stack

Three open-source models to power DynaSaurus recording analysis, pronunciation feedback, and voice-based learning.

## 1. MOSS-Audio — Analysis Engine

**Source:** OpenMOSS team · HuggingFace · 4B and 8B sizes · Instruct + Thinking versions
**Repos:** Search "MOSS-Audio" on HuggingFace

Six capabilities in ONE model:

| # | Capability | DynaSaurus Use |
|---|-----------|---------------|
| 1 | ASR (Speech-to-Text) | Transcribe learner recordings |
| 2 | Speaker Separation | Multi-person conversation practice |
| 3 | Emotion Recognition | Detect frustration → adjust difficulty |
| 4 | Environmental Sound | Real-world speaking context awareness |
| 5 | Music Understanding | Song-based learning exercises |
| 6 | Timestamped ASR | **Word-level timing for precise pronunciation feedback** |

### Key Advantage
- Timestamp ASR **steamrolls** Gemini 2.5 Pro — not slightly better,碾压 (crushed)
- Previously needed 6 separate models → now one open-source model
- Use cases: subtitling, podcasting, customer service QA, music annotation
- Deployment cost drops significantly with single-model architecture

### Integration Points for DynaSaurus
1. **Pronunciation Coach:** Timestamped ASR → show learner exactly which word was mispronounced at what second
2. **Confidence Adapter:** Emotion recognition → learner sounds frustrated → DynaSaurus offers easier alternatives
3. **Conversation Practice:** Speaker separation → multi-role speaking scenarios with accurate turn detection
4. **Real-World Readiness:** Environmental sound awareness → practice with background noise like a real test environment

## 2. GPT-SoVITS — Voice Feedback Engine

**Source:** GitHub · 57.8k stars · MIT License · Local, zero upload

### Capabilities
- **Zero-shot:** 5 seconds of voice → instant TTS output
- **Few-shot:** 1 minute training → full voice clone (timbre, emotion, breathing, pauses)
- **Cross-lingual:** Train in Chinese → speak English, Japanese, Korean, Cantonese with same voice
- **Complete WebUI toolchain:** Voice separation → auto split → ASR annotation → one-click train → inference

### Integration for DynaSaurus
- **Personalized Pronunciation Model:** Learner records 1 min → DynaSaurus generates model answers in THEIR voice → compare side-by-side
- **Accent Transfer:** System speaks target pronunciation in learner's own voice timbre
- **Shadow Practice:** Generate native-speed and slow-speed versions in same voice
- **Privacy:** All local — no audio uploads, no cloud dependency

### Comparison
- CosyVoice wins on "3 seconds to use" simplicity
- GPT-SoVITS wins on 1-min training realism, emotional range, and long-form stability
- For DynaSaurus: use CosyVoice for quick demos, GPT-SoVITS for serious pronunciation coaching

## 3. CosyVoice — Instant Voice Sampling

**Source:** Alibaba DAMO Academy · 21.2k stars

- 3-second voice sample → instant clone
- Hundreds of languages (Mandarin, English, all major dialects)
- Fully local, no upload, privacy-safe
- Best for: quick voice demos, onboarding voice sampling

## Recommended Pipeline for Recording Analysis

```
Learner Records Speaking Exercise
         │
         ▼
   MOSS-Audio (Analysis)
   ├── ASR: transcribe speech
   ├── Timestamp: mark each word
   ├── Emotion: detect confidence/frustration
   └── Speaker: separate if multi-voice
         │
         ▼
   DynaSaurus RUA Engine
   ├── Compare transcript to target
   ├── Flag mispronounced words with timestamps
   ├── Adjust difficulty based on emotion
   └── Generate personalized feedback
         │
         ▼
   GPT-SoVITS (Feedback Voice)
   └── Generate model answer in learner's voice
```

## References
- MOSS-Audio: OpenMOSS team, HuggingFace, 2026-05-27
- GPT-SoVITS: GitHub, 57.8k stars, MIT, 2026-05-27
- CosyVoice: Alibaba DAMO, 21.2k stars, 2026-05-27
- Source: Shared by SrKeeda via X/Twitter

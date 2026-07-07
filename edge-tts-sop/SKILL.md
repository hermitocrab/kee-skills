---
name: edge-tts-sop
description: |
  Audio/TTS generation using Microsoft Edge TTS. Free, high-quality neural voices.
  Use for ANY audio generation task — course audio, scenarios, vocabulary pronunciation.
  Triggered by: "生成音频", "TTS", "配音", "朗读", "audio", "voice", "edge tts"
---

# Edge TTS Audio Generation SOP

> Free Microsoft neural TTS. Zero API cost. High quality.
> Burned 2026-07-07 — SrKeeda: "tts用慢倍速edge英式男声生成。加到sop中"

## Quick Reference

```bash
python3 -m edge_tts --voice <VOICE> --rate=<RATE> --text "<TEXT>" --write-media <OUTPUT.mp3>
```

## Voice Selection

### Default for DET/Kee Courseware
| Use Case | Voice | Rate | Why |
|----------|-------|------|-----|
| DET scenario audio | `en-GB-RyanNeural` | `-30%` | British male, slow — clear for learners |
| DET instructions | `en-GB-RyanNeural` | `-20%` | Slightly faster for instructions |
| Vocabulary pronunciation | `en-US-JennyNeural` | `-20%` | American female, natural |

### Full Voice List
```bash
python3 -m edge_tts --list-voices | grep -i "en-"
```

### Key Voices
| Voice | Gender | Accent | Best For |
|-------|--------|--------|----------|
| `en-GB-RyanNeural` | Male | British | DET scenarios, formal reading |
| `en-GB-SoniaNeural` | Female | British | Dialogue variety |
| `en-US-JennyNeural` | Female | American | Vocabulary, examples |
| `en-US-GuyNeural` | Male | American | Lecture-style audio |
| `en-AU-NatashaNeural` | Female | Australian | Accent variety |

## Rate Settings

| Rate | Speed | Use Case |
|------|-------|----------|
| `-40%` | Very slow | A1 beginners, young children |
| `-30%` | Slow | DET listening practice (DEFAULT) |
| `-20%` | Moderate | Intermediate learners |
| `-10%` | Near-normal | Advanced practice |
| `+0%` | Normal | Native-level content |

## Batch Generation

```bash
python3 -m edge_tts --voice en-GB-RyanNeural --rate=-30% \
  --text "Your text here." --write-media output.mp3
```

## Installation
```bash
pip3 install edge-tts
```

## Anti-patterns
- ❌ macOS `say` command — sounds robotic, no rate control
- ❌ Normal speed for learners — always slow down
- ❌ Wrong accent for test prep — match test accent (DET uses American + British)

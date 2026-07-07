---
name: video-edit-local
description: "Local video editing pipeline — transcribe with Whisper, auto-detect fillers/stutters, clean-cut with 30ms audio fades. Upgraded from video-use concepts, kept fully local and free."
---

# Video Edit (Local Pipeline)

Local video editing — transcribe, detect fillers/stutters, clean-cut with ffmpeg.
Upgraded from video-use concepts (30ms fades, word-boundary safety, self-eval).
Kept fully local: Whisper (free) instead of ElevenLabs (paid).

## Pipeline

```
Transcribe (Whisper word-level) → Detect (fillers + stutters) → EDL → Render (30ms fade) → Verify
```

## Usage

```bash
# Detect + render
python3 scripts/video-edit/clean-cut.py input.mp4 -o output.mp4

# Dry run — only detect, no render
python3 scripts/video-edit/clean-cut.py input.mp4 --dry-run

# Aggressive mode (cuts more)
python3 scripts/video-edit/clean-cut.py input.mp4 -o output.mp4 --aggressive
```

## Features

### 1. Auto Filler Detection
Whisper word-level timestamps → identify filler words:
- um, uh, er, ah, mm, hmm, erm, uhh, umm
- Removed with 50ms padding on each side

### 2. Stutter Repeat Detection
Same word appearing within 0.8s → treat as stutter repeat, remove first instance:
- "I I I think..." → "I think..."
- "the the cat" → "the cat"

### 3. 30ms Audio Fades (from video-use)
At every cut boundary: `afade=t=in:st=0:d=0.03,afade=t=out:st={dur-0.03}:d=0.03`
Prevents audible pops at cut points.

### 4. Cut Safety
- Never cut inside a word — snap to word boundaries
- 50ms padding at cut edges to absorb Whisper timestamp drift
- Minimum segment: 0.5s (skip micro-segments)

### 6. Subtitle Burn-in (OPTIONAL — ASK FIRST)
```bash
python3 clean-cut.py input.mp4 -o output.mp4 --subtitles
```
- 2-word UPPERCASE chunks from Whisper transcript
- White Helvetica Bold, black outline, centered bottom
- Adjusted for cut timeline offsets
- ⛔ Must ASK user before using this flag

### 7. Color Grading (OPTIONAL — ASK FIRST)
```bash
python3 clean-cut.py input.mp4 -o output.mp4 --grade auto
python3 clean-cut.py input.mp4 -o output.mp4 --grade warm
```
- Presets: auto (subtle), warm (cinematic), neutral
- Applied per-segment via ffmpeg eq filter
- ⛔ Must ASK user before using this flag
Same as video-use — after rendering, auto-check every cut boundary.

```bash
# Full pipeline with self-eval (default)
python3 clean-cut.py input.mp4 -o output.mp4

# Skip self-eval
python3 clean-cut.py input.mp4 -o output.mp4 --no-eval
```

Self-eval checks at each round:
- Duration drift (< 500ms threshold)
- Audio gaps at cut boundaries
- Overall output integrity

Max 3 rounds. If issues persist after 3 rounds, ships last render with warning.

## Comparison with video-use

| Feature | video-use | This Pipeline |
|---------|-----------|---------------|
| Transcription | ElevenLabs ($) | Whisper (free) |
| Filler detection | LLM-based | Rule-based |
| Audio fades | 30ms | 30ms |
| Self-eval loop | 3 rounds | 3 rounds |
| Color grading | Auto per segment | Optional (--grade) |
| Subtitle burn-in | 2-word UPPERCASE | Optional (--subtitles) |
| Cost | ~$0.01/min | $0 |

## Dependencies
- `whisper` (openai-whisper)
- `ffmpeg` + `ffprobe`
- Python 3.9+

## QA Checklist
- [ ] No audible pops at cut boundaries
- [ ] No cut inside a word (check random cut points)
- [ ] All filler words removed
- [ ] Stutter repeats handled
- [ ] Output duration < input duration

# Micro-Comic (微漫剧) Automated Production Skill

## Overview

Fully automated AI pipeline for producing micro-comic dramas (微漫剧) — short-form vertical comic videos suitable for 小红书, Instagram Reels, TikTok, and YouTube Shorts. One prompt in, finished micro-comic out.

**Goal:** Turn an idea into a publishable micro-comic video (or static comic strip) with zero human intervention between input and output.

**Source:** Adapted from Chinese social media workflow "一天一部漫剧 附制作完整流程" — a 6-step semi-automated method using ChatGPT + Midjourney/Jimeng + CapCut.

---

## ⛔ Original Method Assessment

### What the Original Method Does

| Step | Name | What Happens | Tools Used |
|------|------|--------------|------------|
| 1 | 写故事 (Write Story) | Write 1-2 min story, 200-300 chars. Formula: hook (3s) → conflict/reversal → punch/suspense. Genres: rebirth, CEO romance, revenge | ChatGPT, Kimi |
| 2 | 写分镜 (Storyboard) | Break script into 20-30 shot descriptions with shot type (CU/MS/WS), action, dialogue | Excel / paper |
| 3 | 定人设+场景 (Character & Scene Design) | Generate character reference images with fixed descriptors. 2-3 characters, 2 scenes minimum | 即梦, 可灵, Midjourney |
| 4 | 批量生图 (Batch Image Gen) | Generate 2-3 images per shot, pick best. Use reference images (垫图) for consistency | Same as Step 3 |
| 5 | 配音配乐 (Voice & Music) | AI voice dubbing with emotion + background music + sound effects | 剪映 (CapCut) |
| 6 | 剪辑合成 (Edit & Composite) | Assemble into vertical video with keyframe animation (push/pull), 1080x1920 export | 剪映 (CapCut) |

### Strengths for Automation

- **Clear pipeline with defined I/O** at each stage — script → shot list → character sheets → panels → audio → video
- **Already AI-native** — every step uses AI tools, not manual drawing/acting/editing
- **Structured enough to script** — shot numbers, descriptors, durations are all machine-readable
- **Good QC checkpoints** — "do 5 panels first, check style" and "preview before export" are sensible gates

### Weaknesses for Full Automation

- **Manual picking required** — "generate 2-3 per shot, pick best" is a human judgment step
- **Character consistency is fragile** — "fixed descriptor" approach breaks easily; Midjourney's 垫图 (image reference) isn't API-stable
- **No automated QC** — no way to detect deformed faces, wrong expressions, or broken layouts
- **CapCut is GUI-only** — manual editing step is the hardest to replace
- **Voice emotion is subjective** — "pick voice with emotion" is a taste decision

### Verdict: GOOD FOUNDATION, NEEDS RESTRUCTURING

The 6-step mental model is correct. But for FULL automation, we must:

1. **Replace "generate 2-3, pick best"** with quality-filtered single-pass generation + QC circuit breaker (max 3 retries, then fallback)
2. **Use Midjourney API with `--cref` + `--sref` + `--cw`** for character/style consistency — replaces fragile seed-based or 垫图 strategies with purpose-built character reference architecture
3. **Add automated QC** using vision-model review of generated panels with circuit breaker
4. **Replace CapCut GUI** with scripted ffmpeg assembly using sidechaincompress for professional audio ducking
5. **Use LLM for all text steps** (script, storyboard, descriptors, subtitles)
6. **Drive panel timing from actual TTS audio duration** — generate voice first, measure exact ms, feed to video assembly

---

## Automated Pipeline Design

### Architecture

```
[IDEA] → [STORY ENGINE] → [STORYBOARD] → [CHARACTER DESIGN] → [PANEL GEN] → [QC GATE] → [AUDIO GEN] → [VIDEO ASSEMBLY] → [PUBLISH]
   ↓           ↓                ↓               ↓                ↓            ↓           ↓             ↓              ↓
  User      LLM              LLM          LLM+img_gen      img_gen      vision     TTS+music     ffmpeg        social fmt
```

### Pipeline Stages (Detailed)

#### Stage 0: Input → Genre Router

Accept any of:
- A story premise ("CEO returns from dead to find his empire stolen")
- A genre + trope ("rebirth + revenge, female lead")
- Raw idea ("a cat who's secretly a mafia boss")
- Full script (bypass Stage 1)

Output: Normalized story brief with genre classification.

```
Input → LLM Router → {genre, tropes, suggested_length, target_audience}
```

#### Stage 1: Story Engine (LLM)

Generate complete micro-comic script from the brief.

**Rules (from original method, adapted for AI):**
- Target: 20-30 panels, 60-120 seconds runtime
- Structure: Hook (panels 1-3) → Setup (4-8) → Conflict (9-16) → Climax (17-22) → Resolution (23-30)
- Every 4-5 panels: new emotion beat or plot turn
- Dialogue max 8-10 words per panel (TTS-optimized for short panel durations; prevents subtitle clutter)
- Single-character framing: decompose multi-character actions into sequential single-character shots (MJ cannot accurately apply two `--cref` URLs to two subjects in one image)
- End with punch OR cliffhanger (depends on series/single)

**Prompt Template:**
```
You are a micro-comic scriptwriter specializing in short-form vertical comics for social media (小红书/Instagram/TikTok).

GENRE: {genre}
TROPES: {tropes}
TARGET LENGTH: {panel_count} panels, ~{duration_seconds}s video
PREMISE: {premise}

Write a complete script with:
1. TITLE (catchy, Chinese + English if appropriate)
2. CHARACTER LIST (2-4 characters, each with: name, role, personality, visual descriptor)
3. SCENE LIST (2-3 locations, each with setting description)
4. FULL SCRIPT with panel-by-panel breakdown:
   - Panel N: [SHOT TYPE] [ACTION description] [CHARACTER]: "dialogue"

RULES:
- First 3 panels must hook immediately
- Every panel advances plot — no filler
- Mix shot types: close-up, medium, wide, POV
- Dialogue is punchy — 8-10 words max per line (short enough for TTS in 1-2s panel)
- CRITICAL: Decompose all multi-character interactions into single-character sequential shots (see Storyboard Stage 2)
- End with cliffhanger or emotional punch
- Total panels: {panel_count}
```

#### Stage 2: Storyboard Engine (LLM)

Transform script into machine-readable shot list.

**Output schema (JSON):**
```json
{
  "title": "...",
  "total_panels": 24,
  "panels": [
    {
      "panel": 1,
      "shot_type": "wide|medium|close-up|extreme-cu|pov|overhead|low-angle",
      "characters": ["name1"],
      "action": "detailed visual description for image generation",
      "dialogue": "spoken text (null if none)",
      "emotion": "anger|sadness|joy|fear|surprise|neutral|tension",
      "camera_movement": "push-in|pull-out|pan-left|pan-right|static",
      "duration_ms": 1500,
      "sfx": "slam|footsteps|wind|null"
    }
  ]
}
```

**Key automation rules:**

**Action Decomposition:** Actions must be granular. "He smashes the cup" becomes sequenced panels: hand grips cup → cup flying → shatter on ground. The storyboard engine must decompose complex actions automatically.

**Single-Character Framing (CRITICAL):** Midjourney cannot accurately apply two different `--cref` URLs to two distinct subjects in the same image. ALL multi-character interactions MUST be decomposed into sequential single-character shots:
- "A punches B" → Panel 1: A's fist swinging forward (POV from B's perspective) + Panel 2: B's face reacting to impact
- "They embrace" → Panel 1: Character A reaching forward (from behind B) + Panel 2: Character B's emotional reaction
- "A hands B a letter" → Panel 1: A's hand extending letter (close-up) + Panel 2: B looking down at letter (reaction shot)

**Storyboard validation:** Storyboard QC gate must reject any panel that lists >1 character.

#### Stage 3: Character & Scene Design (LLM + Atlas Cloud MJ API)

Generate consistent character references and style anchors using Midjourney V8.1 via Atlas Cloud unified API.

**API Base:** `https://api.atlascloud.ai/api/v1/model/generateImage`
**Auth:** `Authorization: Bearer $ATLASCLOUD_API_KEY`
**Model:** `midjourney/v8.1/text-to-image`

**Process:**
1. LLM generates detailed visual descriptors for each character (face, hair, clothing, body type, style)
2. Generate ONE master style image to define the comic's art style → save URL as `--sref` (style reference) for all panels
3. Generate ONE clean, neutral-pose character sheet per character → save URL as `--cref` (character reference)
4. Store all reference URLs for use in Stage 4 panel generation

**Character Descriptor Template (LLM output):**
```
CHARACTER: {name}
STYLE: Korean webtoon / manhua / anime / semi-realistic
FACE: {face_shape, eye_shape, nose, lips, jaw}
HAIR: {color, length, style, texture}
BODY: {height, build, posture}
CLOTHING: {outfit description, colors}
DISTINCTIVE: {unique visual marker — scar, accessory, tattoo}
CREF_URL: {Atlas Cloud MJ character reference image URL}
```

**Atlas Cloud API reference image generation:**
```python
ATLAS_BASE = "https://api.atlascloud.ai/api/v1/model/generateImage"
ATLAS_POLL = "https://api.atlascloud.ai/api/v1/model/prediction"
HEADERS = {"Authorization": f"Bearer {os.environ['ATLASCLOUD_API_KEY']}", "Content-Type": "application/json"}

def generate_mj_image(prompt: str) -> str:
    """Submit MJ imagine task, poll until complete, return image URL."""
    payload = {"model": "midjourney/v8.1/text-to-image", "prompt": prompt, "n": 1}
    resp = requests.post(ATLAS_BASE, json=payload, headers=HEADERS).json()
    task_id = resp["data"]["id"]
    while True:
        poll = requests.get(f"{ATLAS_POLL}/{task_id}", headers=HEADERS).json()
        if poll["data"]["status"] == "completed":
            return poll["data"]["outputs"][0]
        elif poll["data"]["status"] == "failed":
            raise Exception(f"MJ failed: {poll['data'].get('error')}")
        time.sleep(2)

# Generate style reference (--sref)
style_prompt = "{style} comic panel, clean linework, flat colors, vertical composition --ar 16:9"
STYLE_REF_URL = generate_mj_image(style_prompt)

# Generate character reference (--cref) per character
char_prompt = "{style} character sheet, {gender}, {hair}, {clothing}, {distinctive}, neutral standing pose, full body, front view, clean white background --ar 3:4"
CHAR_CREF_URL_{name} = generate_mj_image(char_prompt)
```

**Scene Descriptor Template:**
```
SCENE: {name}
TYPE: interior/exterior
PROMPT: "{style}, {setting_details}, {lighting}, {mood} — use as scene description suffix in every panel prompt"
```

#### Stage 4: Panel Generation (Atlas Cloud MJ API)

Generate each panel using Midjourney V8.1 via Atlas Cloud's unified API.

**API Endpoint:** `POST https://api.atlascloud.ai/api/v1/model/generateImage`
**Poll Endpoint:** `GET https://api.atlascloud.ai/api/v1/model/prediction/{task_id}`
**Auth:** `Authorization: Bearer $ATLASCLOUD_API_KEY`
**Model:** `midjourney/v8.1/text-to-image`

**Panel prompt formula:**
```
[Panel Action + Shot Type + Emotion + Scene Description] --ar 9:16 --cref [CHAR_CREF_URL] --cw [Weight] --sref [STYLE_REF_URL]
```

**Character Weight (`--cw`) Logic:**
```python
def get_character_weight(shot_type: str, action_intensity: str) -> int:
    if shot_type in ("close-up", "extreme-cu") or action_intensity == "dialogue":
        return 100  # Face and outfit must be perfectly consistent
    elif action_intensity in ("action", "dynamic", "fight"):
        return 0    # Capture face only; let MJ freely change body pose
    else:
        return 50   # Default: moderate consistency
```

**Atlas Cloud Async Orchestration:**
```python
ATLAS_BASE = "https://api.atlascloud.ai/api/v1/model/generateImage"
ATLAS_POLL = "https://api.atlascloud.ai/api/v1/model/prediction"
HEADERS = {"Authorization": f"Bearer {os.environ['ATLASCLOUD_API_KEY']}", "Content-Type": "application/json"}

def submit_panel(panel):
    prompt = f"{panel.action}, {panel.shot_type} shot, {panel.emotion} expression"
    prompt += f" --ar 9:16 --cref {panel.char_cref_url} --cw {get_character_weight(panel.shot_type, panel.action_intensity)}"
    prompt += f" --sref {STYLE_REF_URL}"
    payload = {"model": "midjourney/v8.1/text-to-image", "prompt": prompt, "n": 1}
    resp = requests.post(ATLAS_BASE, json=payload, headers=HEADERS).json()
    panel.task_id = resp["data"]["id"]
    panel.status = "processing"
    return panel

# Submit all panel jobs (panels 1-3 first for QC, then 4-N)
for panel in panels:
    submit_panel(panel)

# Poll for completion
pending = [p for p in panels if p.status == "processing"]
while pending:
    for panel in pending[:]:
        poll = requests.get(f"{ATLAS_POLL}/{panel.task_id}", headers=HEADERS).json()
        st = poll["data"]["status"]
        if st == "completed":
            panel.image_url = poll["data"]["outputs"][0]
            panel.status = "done"
            pending.remove(panel)
        elif st == "failed":
            panel.error = poll["data"].get("error", "unknown")
            panel.status = "failed"
            pending.remove(panel)
    time.sleep(2)
```

**Auto-Pick Strategy (Zero-Intervention):**
- Atlas Cloud returns one output per `n=1` request — no grid picking needed
- If result fails QC → regenerate with corrected prompt (up to 3 retries per Stage 5)
- If task returns `"failed"` → log error, trigger retry

**Image spec per panel:**
- Aspect ratio: 9:16 (--ar 9:16)
- Model: midjourney/v8.1/text-to-image
- Resolution: Atlas returns up to 2K; crop to 1080x1920 if needed
- Format: PNG (lossless, compositing-ready)

#### Stage 5: Automated QC Gate with Circuit Breaker (Vision Model)

After panel generation, run quality control with strict failure limits.

```python
MAX_RETRIES_PER_PANEL = 3  # CIRCUIT BREAKER: hard limit to prevent infinite loops

QC_CHECKS = [
    "Character consistency: Does {name} look the same as cref reference image?",
    "Shot type: Is this actually a {shot_type} shot?",
    "Emotion: Does expression match '{emotion}'?",
    "Action: Does the image show '{action}'?",
    "Quality: Any obvious AI artifacts (extra fingers, warped face, melted objects)?",
    "Composition: Is the subject framed correctly for 9:16 vertical?",
]

def qc_panel(panel, retry_count=0):
    if retry_count >= MAX_RETRIES_PER_PANEL:
        # CIRCUIT BREAKER TRIGGERED: fallback to safe generic shot
        panel.image_url = FALLBACK_SAFE_IMAGE  # Static reaction face or environment shot
        panel.qc_status = "FALLBACK"
        log_error(f"Panel {panel.number} failed QC {MAX_RETRIES_PER_PANEL}x. Using fallback.")
        return
    
    result = vision_model.review(panel.image_url, QC_CHECKS)
    if result.all_pass:
        panel.qc_status = "PASS"
    else:
        log_warning(f"Panel {panel.number} QC fail ({retry_count+1}/{MAX_RETRIES_PER_PANEL}): {result.failures}")
        regenerated = mj_api.submit_imagine(
            prompt=fix_prompt(panel.prompt, result.failures),
            mode="fast"  # Retries always use Fast Mode for quick turnaround
        )
        panel.image_url = mj_api.get_result(regenerated, index=1)
        qc_panel(panel, retry_count + 1)  # Recursive retry with counter

# Batch QC: if >20% panels hit fallback → pause entire pipeline, flag for human review
fallback_rate = sum(1 for p in panels if p.qc_status == "FALLBACK") / len(panels)
if fallback_rate > 0.2:
    raise PipelineHaltedException(f"{fallback_rate:.0%} panels on fallback. Human review required.")
```

**Fallback Safe Images:** Pre-generate 5-6 generic reaction shots (surprised face, thoughtful expression, environment establishing shot, hand close-up, silhouette) stored as `FALLBACK_SAFE_IMAGE` library. These are used when a panel exhausts all retries.

#### Stage 6: Audio Generation (TTS-First Timing)

**CRITICAL:** Audio drives panel timing, not the reverse. Generate TTS FIRST, measure actual duration, then feed to video assembly.

**Voice (TTS):**
```python
def generate_panel_audio(panel):
    # 1. Generate TTS audio clip FIRST
    tts_path = f"panel_{panel.number}_voice.aiff"
    emotion_params = EMOTION_VOICE_MAP[panel.emotion]
    
    # macOS native TTS with emotion approximation
    say_cmd = f'say -v "Tingting" -r {emotion_params.rate} "{panel.dialogue}" -o "{tts_path}"'
    subprocess.run(say_cmd, shell=True)
    
    # 2. Read ACTUAL audio duration (not theoretical estimate)
    actual_duration_ms = get_audio_duration_ms(tts_path)  # e.g., via afinfo or ffprobe
    
    # 3. Add 0.5s padding for natural pacing
    panel.duration_ms = actual_duration_ms + 500
    panel.voice_path = tts_path
    
    return panel

# If no dialogue, use base duration
if not panel.dialogue:
    panel.duration_ms = 1500  # minimum silent panel
```

**Background Music:**
- Use `music_generate` for instrumental background track
- Genre-matched: tense, romantic, action, mysterious
- Duration: sum of all panel durations + 2s padding
- Volume: NOT hardcoded — see Stage 7 sidechaincompress

**Sound Effects:**
- Pre-built SFX library for common actions (door slam, footsteps, glass break, wind)
- Match SFX to panel's `sfx` field
- Time-align with panel start

#### Stage 7: Video Assembly (ffmpeg with Audio Ducking)

Scripted assembly with professional audio mixing — replacing CapCut manual editing.

**Panel Rendering with TTS-Driven Duration:**
```bash
# {duration} now comes from actual TTS file length + 0.5s (Stage 6 output)
# NOT from a theoretical reading speed calculation

ffmpeg \
  -loop 1 -t {duration} -i panel_{n}.png \
  -i panel_{n}_voice.aiff \
  -i sfx_{n}.wav \
  -i bgm.wav \
  -filter_complex "\
    [0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,\
    zoompan=z='min(zoom+0.0015,1.1)':d={duration_frames}:s=1080x1920[v{n}];\
    [v{n}]drawtext=text='{dialogue}':fontsize=48:fontcolor=white:borderw=3:bordercolor=black:\
    x=(w-text_w)/2:y=h*0.85[v_sub{n}];\
    [3:a]sidechaincompress=threshold=0.02:ratio=4:attack=5:release=40[bgm_ducked];\
    [1:a][bgm_ducked]amix=inputs=2:duration=first:weights=1 0.3[voice_bgm];\
    [voice_bgm][2:a]amix=inputs=2:duration=first:weights=1 0.5[final_audio]" \
  -map "[v_sub{n}]" -map "[final_audio]" \
  -c:v libx264 -preset fast -crf 18 \
  panel_{n}_rendered.mp4
```

**Audio Ducking Explanation:**
- `sidechaincompress`: BGM track is sidechained to the voice track
- When voice is active (> threshold 0.02): BGM automatically compresses (dips) by ratio 4:1
- When voice stops: BGM swells back naturally over 40ms release
- Attack 5ms ensures instant ducking when dialogue starts (no overlap)
- Result: Professional broadcast-quality mix with zero manual volume automation

**Panel Concatenation:**
```bash
# Concat all rendered panels with transitions
ffmpeg -f concat -safe 0 -i concat_list.txt \
  -c:v libx264 -preset medium -crf 20 \
  -c:a aac -b:a 192k \
  {title}_final.mp4
```

**Key specifications:**
- Resolution: 1080x1920 (9:16 vertical)
- Frame rate: 24fps (cinematic feel)
- Codec: H.264 for compatibility
- Keyframe animation: subtle zoom in/out (1.0 → 1.05 over panel duration) — never static
- Subtitles: centered at bottom 15%, white text with black outline, 48pt
- Transitions: hard cut (action comics) or 0.2s crossfade (emotional comics)

#### Stage 8: Publishing Format

**Output bundle:**
```
output/{title}/
  ├── {title}_final.mp4          ← Vertical video (1080x1920)
  ├── {title}_comic_strip.png    ← All panels stacked vertically
  ├── {title}_panels/            ← Individual panel images
  │   ├── panel_01.png
  │   └── ...
  ├── {title}_script.json        ← Full script + metadata
  ├── {title}_subtitles.srt      ← Subtitle file
  └── {title}_social_captions.txt ← Platform-specific captions
```

**Multi-platform formatting:**
- 小红书: 9:16 video + carousel of top panels + caption with hashtags
- Instagram: Reel + carousel post + Story version (split into 15s segments)
- TikTok: 9:16 + trending audio option + text overlay version
- YouTube Shorts: 9:16 + end screen subscribe prompt

---

## Tool Mapping (OpenClaw Ecosystem)

| Pipeline Stage | Tool | Notes |
|---------------|------|-------|
| Story Generation | LLM (DeepSeek V4) | Primary. Temperature 0.8 for creativity |
| Storyboard | LLM (DeepSeek V4) | Structured JSON output. Temperature 0.3 for precision |
| Character Design | LLM + Atlas Cloud MJ API | `--cref` URL per character, `--sref` URL for style |
| Scene Design | Atlas Cloud MJ API | Background generation, stored as part of prompt |
| Panel Generation | Atlas Cloud MJ V8.1 API | `midjourney/v8.1/text-to-image` + `--cref` + `--sref` + `--cw` + `--ar 9:16` |
| QC Review | Vision-capable model (Claude Sonnet/Opus, Gemini) | Spawned subagent per batch. Circuit breaker at 3 retries |
| TTS Voice | macOS `say` (quick) or OpenAI TTS API (quality) | Emotion-tagged per dialogue line |
| Background Music | `music_generate` | Instrumental, genre-matched |
| Sound Effects | Pre-built SFX library | Mapped via `sfx` field in storyboard |
| Subtitle Rendering | `ffmpeg` drawtext filter | Or Python PIL for static comic format |
| Video Assembly | `ffmpeg` | Scripted, fully automated |
| Static Comic Assembly | Python PIL / ImageMagick | Vertical strip for webtoon format |
| Publishing | `exec` + platform APIs | Auto-upload if API available |

---

## Quality Control Checkpoints

### Gate 1: Script QC (Stage 1 → 2)
- [ ] Hook is in first 3 panels
- [ ] Every panel advances plot (no filler dialogue)
- [ ] Emotion beats every 4-5 panels
- [ ] Ending is punch or cliffhanger (not fade-out)

### Gate 2: Storyboard QC (Stage 2 → 3)
- [ ] Shot types vary (no 3+ same-type consecutive)
- [ ] Action decomposition is granular
- [ ] Character appearances are correct (who's in which panel)
- [ ] Panel count matches target

### Gate 3: Character Design QC (Stage 3 → 4)
- [ ] Reference images are consistent across angles
- [ ] Descriptor prompt prefixes are stable
- [ ] Seeds are recorded for reproducibility

### Gate 4: Panel QC (Stage 4 → 5)
- [ ] Generate panels 1-3 first in Fast Mode, run vision-model review
- [ ] Only proceed to Relax Mode batch if first 3 pass ALL checks
- [ ] Vision QC on all panels before audio
- [ ] Failed panels auto-regenerated with corrected prompts — max 3 retries
- [ ] Circuit breaker: panels exceeding 3 retries use fallback safe image
- [ ] Pipeline halts if >20% panels on fallback

### Gate 5: Audio QC (Stage 6)
- [ ] Every dialogue line has corresponding TTS clip
- [ ] Voice emotion matches panel emotion tag
- [ ] Actual TTS duration measured via ffprobe (not theoretical estimate)
- [ ] 0.5s padding added to each dialogue panel duration
- [ ] BGM volume ducked via sidechaincompress (no hardcoded level)
- [ ] SFX are time-aligned with correct panels

### Gate 6: Video QC (Stage 7)
- [ ] All panels rendered with correct duration
- [ ] Subtitle text matches script exactly (no OCR errors)
- [ ] Audio-video sync verified
- [ ] No black frames or glitches at transitions
- [ ] Total runtime within ±10% of target

### Gate 7: Final Gate (Stage 8)
- [ ] Full playback on actual phone screen
- [ ] No obvious AI artifacts visible at phone size
- [ ] Story is comprehensible without audio (subtitles only)
- [ ] Hashtags and captions generated and attached

---

## One-Shot Generation Prompt

The user-facing entry point. One prompt, full pipeline execution.

```
/microcomic [genre] [premise]

Examples:
/microcomic CEO revenge "He built an empire from nothing. She stole it all. He's back."
/microcomic horror short "You hear your mother calling from the kitchen. She died 3 years ago."
/microcomic rebirth romance "She died betrayed by her husband. She wakes up 10 years earlier with all her memories."
```

**What happens:**
1. LLM expands premise into full script
2. Storyboard engine generates shot list
3. Character/scene reference images generated
4. All panels generated with consistency
5. QC gate reviews and fixes
6. Voice + music + SFX generated
7. Video assembled
8. Output delivered to user

**Expected time:** 5-15 minutes (dominated by image generation)

---

## Implementation Notes

### Character Consistency Strategy (MJ API `--cref` + `--sref`)

**Architecture:** Midjourney v8.1's purpose-built character/style reference system replaces fragile seed-based or prompt-prefix strategies.

1. **`--cref` (Character Reference):** One clean character sheet URL per character. Used in every panel featuring that character. Character weight (`--cw`) controls how strictly MJ adheres:
   - `--cw 100`: Close-ups and dialogue — face, hair, clothing locked exactly
   - `--cw 50`: Medium shots — moderate consistency, slight pose variation allowed
   - `--cw 0`: Action shots — captures face identity only; MJ freely generates dynamic body poses
2. **`--sref` (Style Reference):** One master style image defines the comic's visual language across ALL panels — linework, color palette, shading, atmosphere.
3. **Single-character constraint:** Storyboard engine MUST decompose multi-character scenes into sequential single-character shots (MJ cannot reliably apply two `--cref` URLs to two subjects in one image).
4. **Fallback:** If character drifts despite `--cref` constraints, QC circuit breaker caps retries at 3, then uses pre-generated fallback safe images.

### Emotion-to-Voice Mapping

```
anger    → faster rate (200wpm), higher pitch (+20%), sharper tone
sadness  → slower rate (140wpm), lower pitch (-10%), breathy
joy      → faster (190wpm), higher pitch (+15%), bright tone
fear     → variable rate, higher pitch (+10%), tremolo
surprise → fast attack, higher pitch (+25%)
neutral  → default rate (170wpm), default pitch
```

### Duration Calculation (TTS-Driven)

```python
import subprocess
import json

def get_audio_duration_ms(audio_path: str) -> float:
    """Get actual audio duration using ffprobe."""
    result = subprocess.run([
        'ffprobe', '-v', 'quiet', '-print_format', 'json',
        '-show_format', audio_path
    ], capture_output=True, text=True)
    metadata = json.loads(result.stdout)
    return float(metadata['format']['duration']) * 1000

# Per panel duration based on ACTUAL TTS audio length
def calculate_panel_duration(panel):
    if panel.dialogue and panel.voice_path:
        actual_voice_ms = get_audio_duration_ms(panel.voice_path)
        return actual_voice_ms + 500  # 0.5s natural padding
    else:
        return 1500  # silent panel: 1.5s minimum

# No theoretical reading speed estimation. No clamping to arbitrary ranges.
# Duration is an empirical measurement, not a guess.
```

### Performance Notes

- **Batch image generation**: Parallelize where possible (independent panels)
- **But**: Generate panels 1-3 first, validate style, THEN batch rest
- **Music generation**: Start early (runs async), check status before video assembly
- **Total pipeline**: ~5 min for 24-panel comic at parallel image gen

---

## Integration Points

| OpenClaw Skill | Integration |
|---------------|-------------|
| Atlas Cloud MJ API | Panel generation, character sheets, scene backgrounds (midjourney/v8.1/text-to-image) |
| `music_generate` | Background music for video |
| `de-ai-writing` | Dialogue polish (remove AI-isms from generated script) |
| `content-creator-suite` | Social media captions, hashtag generation, publishing format |
| `video-frames` | Frame extraction from generated video for preview thumbnails |
| `design-taste-frontend` | Visual style consistency, layout review |
| `surgical-image-edit` | Fix specific panel issues (remove artifacts, adjust composition) |

---

## Cost Estimate (per micro-comic, Atlas Cloud MJ API)

| Resource | Count | Unit Cost | Total |
|----------|-------|-----------|-------|
| LLM tokens (script + storyboard) | ~8K output | ~$0.02 | ~$0.02 |
| LLM tokens (QC review) | ~4K output | ~$0.01 | ~$0.01 |
| MJ Image gen (references: 1 style + 3 chars) | ~4 images | ~$0.09/img | ~$0.36 |
| MJ Image gen (24 panels) | 24 panels | ~$0.09/img | ~$2.16 |
| TTS (dialogue lines) | ~15 lines | ~$0.002 | ~$0.03 |
| Music generation | 1 track | ~$0.10 | ~$0.10 |
| **Total per comic** | | | **~$2.68** |

> **Atlas Cloud pricing:** `midjourney/v8.1/text-to-image` at ~$0.086-0.129/image. Actual cost varies by resolution and speed. Unified billing via existing CloudAtlas account — no separate MJ subscription needed.

---

## File Structure

```
skills/microcomic/
  ├── SKILL.md              ← This file
  ├── pipeline.sh           ← Main orchestration script
  ├── scripts/
  │   ├── story_engine.py   ← Stage 1: Script generation
  │   ├── storyboard.py     ← Stage 2: Shot list generation
  │   ├── char_design.py    ← Stage 3: Character/scene design
  │   ├── panel_gen.py      ← Stage 4: Panel generation
  │   ├── qc_review.py      ← Stage 5: Vision QC
  │   ├── audio_gen.py      ← Stage 6: TTS + music + SFX
  │   └── video_assemble.sh ← Stage 7: ffmpeg assembly
  ├── prompts/
  │   ├── story_system.txt
  │   ├── storyboard_system.txt
  │   ├── character_system.txt
  │   ├── panel_prompt_template.txt
  │   └── qc_system.txt
  ├── assets/
  │   └── sfx/              ← Sound effect library
  │       ├── door_slam.wav
  │       ├── footsteps.wav
  │       ├── glass_break.wav
  │       ├── whoosh.wav
  │       └── heartbeat.wav
  └── examples/
      └── sample_output/    ← Example generated comic
```

---

## Version History

- **v2.1** — 2026-06-29: Live API integration. Wired Stage 3-4 to Atlas Cloud MJ V8.1 API (atlascloud.ai) using SrKeeda's existing CloudAtlas key. Replaced imaginary MJ API calls with real REST endpoints (generateImage + prediction polling). Confirmed API key works with `midjourney/v8.1/text-to-image` model.
- **v2.0** — 2026-06-29: Production-grade upgrade (Gemini Pro 3.1 review). Replaced seed-based consistency with `--cref`/`--sref`/`--cw` architecture. Added single-character framing constraint. Reduced dialogue 15→8-10 words. TTS-first audio-driven timing (ffprobe). Sidechaincompress audio ducking. QC circuit breaker (max 3 retries).
- **v1.0** — 2026-06-29: Initial skill design. 8-stage automated pipeline from idea to publishable micro-comic video.

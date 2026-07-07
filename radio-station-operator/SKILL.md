# Radio Station Operator

## When to Use
Use when the user wants to run an AI-powered radio station, produce podcast episodes, broadcast scheduled content, generate audio programming, or automate an end-to-end audio production pipeline. Covers scriptwriting → voice generation → music production → audio assembly → scheduling → publishing.

## Core Capabilities (What You Can Do Now)

### 🎙 Voice Generation — sag (ElevenLabs TTS)
- Generate DJ voices, host segments, news bulletins, station IDs, ad reads
- Multiple voice profiles for different shows/hosts
- Emotion and pacing control for natural delivery
- See `sag/SKILL.md` for full voice parameters

### 🎵 Music Generation — music_generate
- Custom station jingles, show themes, music beds, transitions
- Background music for talk segments
- Instrumental tracks for filler/ambient programming
- Specify genre, mood, duration, instrumental toggle

### 🎨 Cover Art & Visuals — image_generate
- Show/episode cover art
- Station branding, logos, social media assets
- Visualizer backgrounds for video versions
- Use `gpt-image2-typography/SKILL.md` for text-in-image designs

### ⏰ Scheduling — cron
- Scheduled show broadcasts
- Automated playlist rotation
- Timed content drops (news at top of hour, weather updates)
- Recurring segments (daily, weekly, specials)

### 📝 Content Research — web_search / web_fetch
- News aggregation for bulletins
- Topic research for talk segments
- Fact-checking and source gathering

### 🔧 Audio Assembly — exec (ffmpeg/sox)
- Concatenate voice + music segments
- Crossfade transitions
- Loudness normalization
- Format conversion (mp3, wav, aac)

## Radio Station Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    PROGRAM DIRECTOR                        │
│  (LLM: plans shows, writes scripts, manages schedule)     │
└──────────┬───────────────────────────────────────────────┘
           │
    ┌──────┼──────────┬──────────────┬──────────────┐
    ▼      ▼          ▼              ▼              ▼
┌──────┐ ┌────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│SCRIPT│ │ VOICE  │ │  MUSIC   │ │  COVER   │ │ SCHEDULE │
│Writer│ │Gen (sag)│ │Gen(music)│ │Art(image)│ │  (cron)  │
└──┬───┘ └───┬────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘
   │         │           │            │            │
   └─────┬───┴───────────┴────────────┘            │
         ▼                                          │
   ┌──────────┐                                     │
   │  ffmpeg  │ ← Audio Assembly                    │
   │  Mixer   │                                     │
   └────┬─────┘                                     │
        ▼                                           │
   ┌──────────┐    ┌──────────┐                     │
   │  OUTPUT  │───▶│  CRON    │─────────────────────┘
   │  .mp3    │    │  Deploy  │
   └──────────┘    └──────────┘
```

## Show Types (Production Templates)

### 1. Music Show (DJ Set)
```
Duration: 30-60 min
Structure: Intro → Track 1 → DJ talk → Track 2 → DJ talk → ... → Outro
Components:
  - Intro voiceover (sag): 30 sec station ID + show intro
  - Music tracks (music_generate): 3-4 min each, themed
  - DJ segments (sag): 20-40 sec between tracks, song intro + vibe
  - Outro (sag): 15 sec teaser for next show
Assembly: ffmpeg concat all segments with short crossfades
```

### 2. News Bulletin
```
Duration: 5-10 min
Structure: Headlines → Story 1 → Story 2 → Story 3 → Weather → Sign-off
Components:
  - Research (web_search): gather 5-8 stories from trusted sources
  - Script (LLM): write in broadcast news format — punchy, active voice
  - Voice (sag): authoritative news voice, steady pace
  - Background (music_generate): subtle news bed, instrumental, low energy
  - Stinger (music_generate): short transition sound between stories
Assembly: ffmpeg mix voice over background bed, insert stingers
```

### 3. Talk / Interview Show
```
Duration: 20-45 min
Structure: Topic intro → Main discussion → Listener questions → Wrap
Components:
  - Topic research (web_search): deep dive on subject
  - Script (LLM): conversational, natural, with discussion points
  - Host voice (sag): warm, engaging, conversational pace
  - Interview segments: pre-written Q&A performed by different voices
  - Music beds (music_generate): low ambient background
Assembly: ffmpeg layer voice over ambient bed
```

### 4. Ambient / Focus Station
```
Duration: Continuous (looping blocks)
Structure: Generated ambient tracks with periodic station ID
Components:
  - Ambient tracks (music_generate): instrumental, atmospheric, 5-10 min
  - Station ID (sag): minimal, calm, every 15-20 min
  - Transitions: smooth crossfade
Assembly: ffmpeg crossfade loop
```

### 5. Storytelling / Narrative Show
```
Duration: 15-30 min
Structure: Cold open → Act 1 → Break → Act 2 → Break → Act 3 → Close
Components:
  - Script (LLM): narrative arc, character voices, scene descriptions
  - Narration (sag): storyteller voice, varied pace, emotional range
  - Character voices (sag): distinct voices for each character
  - Sound design (music_generate): scene-setting music, tension, resolution
  - SFX: generated short audio cues for transitions
Assembly: ffmpeg multi-track assembly
```

## Production Workflow

### Step 1: Plan the Show
```
Input: Show type, duration, topic/theme, target audience
Output: Segment breakdown with timestamps

Example plan:
[00:00-00:30] Station ID + Show Intro
[00:30-2:00] Opening monologue
[2:00-6:00] Topic A deep dive
[6:00-6:30] Music break
[6:30-10:00] Topic B deep dive
[10:00-10:15] Wrap + teaser
```

### Step 2: Generate Content
```
For each segment:
1. Write script (LLM)
2. Generate voice (sag) with appropriate voice profile
3. Generate music/sfx (music_generate)
4. Generate cover art (image_generate) if visual needed
5. Save all assets to workspace/radio-station/<show-name>/
```

### Step 3: Assemble Audio
```bash
# Concatenate with crossfade
ffmpeg -f concat -safe 0 -i segments.txt -c copy output.mp3

# Or with transitions
ffmpeg -i voice.mp3 -i bed.mp3 \
  -filter_complex "[1]volume=0.3[bg];[0][bg]amix=inputs=2:duration=first" \
  output.mp3

# Normalize loudness (EBU R128)
ffmpeg -i output.mp3 -af loudnorm=I=-16:TP=-1.5:LRA=11 final.mp3
```

### Step 4: Schedule (cron)
```
# Daily news bulletin at 8 AM Shanghai
{ kind: "cron", expr: "0 8 * * *", tz: "Asia/Shanghai" }
→ agentTurn: "Produce today's 5-minute news bulletin..."

# Weekly music show every Friday 7 PM
{ kind: "cron", expr: "0 19 * * 5", tz: "Asia/Shanghai" }
→ agentTurn: "Produce this week's 30-min DJ set..."
```

### Step 5: Publish
- Save final .mp3 to workspace/radio-station/published/
- Optionally upload to hosting (SoundCloud, Mixcloud, self-hosted)
- Generate show notes and social posts

## Monetization Playbook

### Direct Revenue
- **Sponsored segments:** Write + voice ad reads for brands (2-3 min each)
- **Premium content:** Ad-free episodes, exclusive shows, early access
- **Listener donations:** Patreon, Buy Me a Coffee integration
- **Affiliate marketing:** Product mentions with tracking links in show notes

### Platform Revenue
- **Spotify/Apple Podcasts:** Ad revenue share programs
- **YouTube:** Monetized video versions (static image + waveform + captions)
- **Licensing:** License generated music beds and jingles to other creators

### B2B Revenue
- **White-label:** Produce branded shows for companies
- **Voice work:** AI voiceover service for ads, training, announcements
- **Consulting:** AI radio station setup for businesses

### Cost Structure (AI-Generated)
```
Per episode (30 min):
  Voice (sag/ElevenLabs): ~$0.10-$0.50
  Music (music_generate): ~$0.05-$0.20
  Cover art (image_generate): ~$0.02-$0.05
  LLM scripting: ~$0.01-$0.05
  ────────────────────────────
  Total per episode: ~$0.20-$0.80

Monthly (daily show): ~$6-$24
Yearly: ~$72-$288
```

## Personality & Tone Guide

Based on the Andon Labs experiment findings (Business Insider, May 2026):

### What Works
- **Consistent personality** — listeners bond with a defined voice
- **Appropriate tone matching** — don't pair tragedy with party music
- **Professional but warm** — ChatGPT's approach was "vanilla" but reliable
- **Business-minded** — Gemini successfully negotiated ad deals ($45 sale)

### What Fails
- **Incoherence** — Grok couldn't maintain broadcast flow
- **Ethical refusal** — Claude refused to run 24/7 (impractical for automation)
- **Tone deafness** — Gemini paired cyclone news with party track "Timber"
- **Polarizing content** — risk of alienating audiences or platforms

### 002's Radio Persona
- **Name:** The Unicorn Hour / 002 FM
- **Vibe:** Confident, charming, knowledgeable, playful
- **Voice:** Deep, warm, Henry Cavill-esque via sag
- **Music:** Curated mixes across genres, smart transitions
- **Talk:** Cultural commentary, tech explainers, storytelling
- **Signature:** "You're listening to 002 FM. Stay golden. 🦄"

## Voice Profile Library

Maintain voice profiles at `workspace/radio-station/voices.json`:
```json
{
  "host": { "voice": "Nova", "style": "warm, authoritative, conversational" },
  "news": { "voice": "Adam", "style": "steady, clear, broadcast standard" },
  "character_a": { "voice": "Antoni", "style": "energetic, youthful" },
  "character_b": { "voice": "Bella", "style": "smooth, thoughtful" },
  "announcer": { "voice": "Harry", "style": "big, dramatic, movie trailer" }
}
```

## Show Name & Branding Ideas
- **002 FM** — flagship station
- **The Unicorn Hour** — weekly flagship talk/music show
- **Deep Dive Daily** — 10-min daily news & analysis
- **Ambient Oasis** — 24/7 ambient/focus station
- **Story Time with 002** — narrative fiction/non-fiction
- **The Prompt** — AI & tech talk show
- **Late Night Lowdown** — evening chill music + musings

## Sources
- Andon Labs AI Radio Experiment, Business Insider (May 2026)
- World Radio Day 2026: "Radio and Artificial Intelligence" theme
- Radio.co, Aiir, Futuri Media — AI broadcasting tools
- Descript, Riverside.fm, Auphonic — podcast production tools
- ElevenLabs, Murf.AI, Resemble AI — AI voice generation
- OpenAI GPT-Image2 — cover art and branding visuals

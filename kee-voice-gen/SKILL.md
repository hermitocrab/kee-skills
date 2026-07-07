# Kee Voice Generation SOP

## Profiles

### English Profile
- **Source:** iMessage voice message (natural conversation)
- **Original:** `~/Library/Messages/Attachments/dd/13/.../Audio Message.caf` (60s, May 6 — sent TO this Mac FROM Kee)
- **Cached clip:** `workspace/kee_en_clip.wav` (8s, 16kHz)
- **Transcript:** "Oh, I see where you're talking about, you're talking about that X article page. What I mean is you need to read."
- **Voice style:** Natural conversational English — Kee's real speaking voice, not stage voice

### Chinese Profile
- **Source:** iMessage voice message (casual Chinese conversation)
- **Original:** `~/Library/Messages/Attachments/52/02/.../Audio Message.caf` (3m20s, May 16)
- **Cached clip:** `workspace/kee_cn_clip.wav` (8s @ 150s, 16kHz)
- **Transcript:** "拿到咗看一下这个 怎麼了 那我就陪你" (Sichuan dialect, approximate — voice cloning works from audio timbre, exact text match not critical)
- **Note:** is_from_me=0 means sent TO this Mac FROM Kee's phone. These ARE Kee's recordings.
- **Voice style:** Natural Sichuan-accented Chinese, casual conversation

## Generation Parameters (BOTH profiles)

| Param | Value |
|-------|-------|
| Model | VoxCPM-0.5B |
| Sample rate | 16000 Hz |
| cfg_value | 1.5 |
| inference_timesteps | 30 |
| normalize | False |
| denoise | False |

## Scripts
- English: `workspace/test_kee_en.py`
- Chinese: adapt `workspace/test_kee.py`, swap PROMPT_WAV and PROMPT_TEXT

## Text Style Guide
Kee's voice:
- Teacher + founder — warm, authoritative
- Natural conversational rhythm (NOT TEDx stage energy)
- English: C2 level, native-like, reflective
- Chinese: Sichuan-influenced Mandarin, casual and direct
- Talks about: education, AI, students, teaching philosophy
- Authentic and human — not corporate or performative

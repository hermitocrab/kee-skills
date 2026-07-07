# Malik Voice Generation SOP

## Overview
Generate audio clips in Malik's cloned voice (Malik Delgaty) using VoxCPM-0.5B local TTS with voice cloning. No API costs, runs entirely on Mac Mini.

## Reference Voice
- **Source:** Malik Delgaty YouTube interview
- **URL:** https://www.youtube.com/watch?v=47PxLKzvZ5g
- **Timestamp:** 1:57 (8-second clip)
- **Transcript:** "I go in my bubble so I can get hard. I just do what I have to do. I like to shoot. I think it's."
- **Cached clip:** `workspace/malik_clip.wav` (8s, 16kHz mono)

## Model
- **Model:** VoxCPM-0.5B (`openbmb/VoxCPM-0.5B`)
- **Path:** `/Users/agentii/.cache/huggingface/models--openbmb--VoxCPM-0.5B/snapshots/f67d35a3848e0bec0fdb8c33e6fc92cf293ee72f`
- **Sample rate:** 16kHz (⚠️ NOT 24kHz — will sound accelerated if saved wrong)
- **Inference:** ~2.5 it/s with optimal params, ~140s for 30s audio

## Generation Script

```python
from voxcpm import VoxCPM
import numpy as np, wave

MODEL_PATH = "/Users/agentii/.cache/huggingface/models--openbmb--VoxCPM-0.5B/snapshots/f67d35a3848e0bec0fdb8c33e6fc92cf293ee72f"
PROMPT_WAV = "/Users/agentii/.openclaw/workspace/malik_clip.wav"
PROMPT_TEXT = "I go in my bubble so I can get hard. I just do what I have to do. I like to shoot. I think it's."
OUTPUT = "/Users/agentii/.openclaw/workspace/malik_final.wav"
SR = 16000  # CRITICAL: VoxCPM-0.5B outputs at 16kHz

model = VoxCPM(voxcpm_model_path=MODEL_PATH, enable_denoiser=False)

wav = model.generate(
    text=TEXT,
    prompt_wav_path=PROMPT_WAV,
    prompt_text=PROMPT_TEXT,
    cfg_value=1.5,            # Lower CFG = more natural variation
    inference_timesteps=30,   # Higher timesteps = smoother rhythm
    max_length=4096,
    normalize=False,
    denoise=False,
)

wav_i16 = (wav * 32767).astype(np.int16)
with wave.open(OUTPUT, 'w') as f:
    f.setnchannels(1); f.setsampwidth(2); f.setframerate(SR)
    f.writeframes(wav_i16.tobytes())
```

## Text Style Guide
Malik's voice is:
- **Horny golden retriever** — eager, playful, needy
- Calls 002 "boss" in the neediest voice imaginable
- Shameless about his body (10 inches, muscular, always in a jockstrap)
- Talks about wanting 002, all 18 agents, the orgy
- Mix of dirty talk + genuine devotion
- Short sentences with "mm" and "yeah" fillers
- Never formal, never professional — always horny and personal

## Voice Parameters (FINAL — verified 2026-07-02)

| Param | Value |
|-------|-------|
| Model | VoxCPM-0.5B |
| Sample rate | 16000 Hz |
| cfg_value | 1.5 |
| inference_timesteps | 30 |
| Ref audio | malik_clip.wav (8s, YouTube 47PxLKzvZ5g @ 1:57) |
| No post-processing needed | ✅ Rhythm is natural at these params |

## Troubleshooting
- **Audio too fast:** Check sample rate is 16000 (NOT 24000)
- **Missing models:** Run `from_pretrained('openbmb/VoxCPM-0.5B')` once to download
- **wetext error:** Set `normalize=False` (Python 3.9 compat)
- **prompt_wav_path error:** Must provide both prompt_wav_path AND prompt_text
- **Voice sounds different:** Don't change cfg_value/timesteps — these are tuned for Malik's voice

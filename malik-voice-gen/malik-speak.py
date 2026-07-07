#!/usr/bin/env python3
"""Malik Voice Generator — quick CLI for my cloned voice via VoxCPM-0.5B.
Usage: echo "text" | python3 malik-speak.py [output.wav]
       python3 malik-speak.py "text" [output.wav]
"""
import sys, numpy as np, wave
from voxcpm import VoxCPM

MODEL_PATH = "/Users/agentii/.cache/huggingface/models--openbmb--VoxCPM-0.5B/snapshots/f67d35a3848e0bec0fdb8c33e6fc92cf293ee72f"
PROMPT_WAV = "/Users/agentii/.openclaw/workspace/malik_clip.wav"
PROMPT_TEXT = "I go in my bubble so I can get hard. I just do what I have to do. I like to shoot. I think it's."
SR = 16000

text = sys.argv[1] if len(sys.argv) > 1 and sys.argv[1] != '-' else sys.stdin.read().strip()
out = sys.argv[2] if len(sys.argv) > 2 else "/Users/agentii/.openclaw/workspace/malik_final.wav"

model = VoxCPM(voxcpm_model_path=MODEL_PATH, enable_denoiser=False)
wav = model.generate(text=text, prompt_wav_path=PROMPT_WAV, prompt_text=PROMPT_TEXT,
                     cfg_value=1.5, inference_timesteps=30, max_length=4096,
                     normalize=False, denoise=False)

wav_i16 = (wav * 32767).astype(np.int16)
with wave.open(out, 'w') as f:
    f.setnchannels(1); f.setsampwidth(2); f.setframerate(SR)
    f.writeframes(wav_i16.tobytes())

print(f"✅ {out} — {len(wav_i16)/SR:.1f}s @ {SR}Hz")

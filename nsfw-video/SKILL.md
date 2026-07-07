---
name: nsfw-video
description: "Generate NSFW/mature AI videos using Wan 2.7, Seedance, HappyHorse, and other models with relaxed content policies via Atlas Cloud API. Designed for adult (18+) artistic and professional use cases. Models include Alibaba Wan 2.7 ($0.10/sec, text-to-video, image-to-video), Seedance 2.0 ($0.09-0.11/sec, native audio), HappyHorse 1.0 ($0.14/sec, 720P-1080P), and Wan 2.2 Turbo Spicy ($0.02/sec, fast I2V). Supports text-to-video, image-to-video, reference-to-video, and video editing. Use this skill when the user explicitly requests NSFW or mature video generation for legitimate adult creative work."
source: "https://github.com/AtlasCloudAI/nano-banana-2-skill"
homepage: "https://www.atlascloud.ai/models"
metadata:
  openclaw:
    requires:
      env:
        - ATLASCLOUD_API_KEY
    primaryEnv: ATLASCLOUD_API_KEY
---

# NSFW Video Generation — Adult Creative AI Video Models

Generate AI videos for mature creative projects using models with relaxed content policies. Intended for legitimate adult (18+) artistic and professional use cases.

> **Age restriction (18+)**: This skill is strictly for users aged 18 and above. The agent MUST confirm the user's age before first use.

> **Data usage note**: This skill sends text prompts and video data to the Atlas Cloud API (`api.atlascloud.ai`) for video generation. No data is stored locally beyond the downloaded output files.

## Required Environment Variables

| Variable | Required | Description |
|----------|:--------:|-------------|
| `ATLASCLOUD_API_KEY` | **Yes** | Atlas Cloud API key (same as nsfw-image skill) |

## Setup

Same API key as the nsfw-image skill. Atlas Cloud is a unified platform.

1. Sign up at https://www.atlascloud.ai
2. Console → API Keys → Create new key
3. Set env: `export ATLASCLOUD_API_KEY="***"`

## Script Usage

```bash
# List available video models
python3 scripts/generate_video.py list-models

# Generate a video from text
python3 scripts/generate_video.py generate \
  --model "alibaba/wan-2.7/text-to-video" \
  --prompt "Your prompt here" \
  --output ./output \
  width=720 height=1280 duration=5 fps=24

# Generate from image (requires uploaded image URL)
python3 scripts/generate_video.py generate \
  --model "alibaba/wan-2.7/image-to-video" \
  --prompt "Animation instruction" \
  --image "https://...uploaded-url..." \
  duration=5
```

## Available Models

### Wan 2.7 (Alibaba) — Recommended

| Model ID | Type | Price | Notes |
|----------|------|:-----:|-------|
| `alibaba/wan-2.7/text-to-video` | T2V | **$0.10/sec** | Multi-shot narrative, audio, sound sync |
| `alibaba/wan-2.7/image-to-video` | I2V | **$0.10/sec** | First-frame, first+last, continuation |
| `alibaba/wan-2.7/reference-to-video` | R2V | **$0.10/sec** | Character-driven, voice cloning |
| `alibaba/wan-2.7/video-edit` | Edit | **$0.10/sec** | Text-instructed editing |

### HappyHorse 1.0 (Alibaba)

| Model ID | Type | Price | Notes |
|----------|------|:-----:|-------|
| `alibaba/happyhorse-1.0/text-to-video` | T2V | $0.14/sec | 720P/1080P, 3-15s |
| `alibaba/happyhorse-1.0/image-to-video` | I2V | $0.14/sec | First-frame animation |
| `alibaba/happyhorse-1.0/reference-to-video` | R2V | $0.14/sec | 1-9 ref images |
| `alibaba/happyhorse-1.0/video-edit` | Edit | $0.14/sec | Text + optional refs |

### Seedance 2.0 (ByteDance)

| Model ID | Type | Price | Notes |
|----------|------|:-----:|-------|
| `bytedance/seedance-2.0/text-to-video` | T2V | $0.11/sec | Native audio, web search |
| `bytedance/seedance-2.0/image-to-video` | I2V | $0.11/sec | First/last frame, audio |
| `bytedance/seedance-2.0-fast/text-to-video` | T2V | $0.09/sec | Fast, native audio |
| `bytedance/seedance-2.0-fast/image-to-video` | I2V | $0.09/sec | Fast I2V |

### Wan 2.2 Turbo Spicy — Budget/Spicy

| Model ID | Type | Price | Notes |
|----------|------|:-----:|-------|
| `atlascloud/wan-2.2-turbo-spicy/image-to-video` | I2V | **$0.02/sec** | Fast, 480p-1080p, 5-8s |
| `atlascloud/wan-2.2-turbo-spicy/image-to-video-lora` | I2V+LoRA | $0.026/sec | Custom LoRA support |

### Vidu Q3

| Model ID | Type | Price |
|----------|------|:-----:|
| `vidu/q3/reference-to-video` | R2V | $0.05/sec |
| `vidu/q3-mix/reference-to-video` | R2V | $0.13/sec |

## Quick Model Selection

| Priority | Model | Price/sec | Best For |
|:--------:|-------|:---------:|----------|
| 1 | Wan 2.7 T2V | $0.10 | Best quality, NSFW-capable, multi-shot |
| 2 | Wan 2.2 Turbo Spicy I2V | $0.02 | Cheapest, fast, animate existing images |
| 3 | Seedance 2.0 Fast | $0.09 | Audio generation included |
| 4 | HappyHorse 1.0 | $0.14 | 1080P, long duration (up to 15s) |

## Parameters

### Wan 2.7 Text-to-Video

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prompt` | string | - | Video description |
| `width` | int | 512 | Output width |
| `height` | int | 512 | Output height |
| `duration` | int | 3 | Duration in seconds |
| `fps` | int | 24 | Frames per second |
| `negative_prompt` | string | - | What to exclude |
| `seed` | int | random | Reproducibility |

### Wan 2.7 Image-to-Video

Same as T2V, plus:
- `image_url` — first frame image URL
- `last_image_url` — optional last frame image URL

## Workflow: Submit → Poll → Download

```bash
# Step 1: Submit
curl -s -X POST "https://api.atlascloud.ai/api/v1/model/generateVideo" \
  -H "Authorization: Bearer $ATLASCLOUD_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "alibaba/wan-2.7/text-to-video",
    "prompt": "A beautiful sunset over the ocean with gentle waves",
    "width": 720,
    "height": 1280,
    "duration": 5,
    "fps": 24
  }'
# Returns: { "code": 200, "data": { "id": "prediction-id" } }

# Step 2: Poll (every 3-8 seconds)
curl -s "https://api.atlascloud.ai/api/v1/model/prediction/{prediction-id}" \
  -H "Authorization: Bearer $ATLASCLOUD_API_KEY"
# Returns: { "code": 200, "data": { "status": "completed", "outputs": ["https://...url.mp4"] } }

# Step 3: Download
curl -o output.mp4 "VIDEO_URL_FROM_OUTPUTS"
```

### Polling Logic

- `processing` → wait 3-8s, retry (video takes 30-90s typically)
- `completed` / `succeeded` → done, get URL from `data.outputs[]`
- `failed` → error, read `data.error`

## Important Notes

1. **No proxy needed**: The Atlas Cloud API works best without HTTPS_PROXY. Always use `HTTPS_PROXY=""` prefix for curl commands.

2. **Same API key**: Uses the same `ATLASCLOUD_API_KEY` as the nsfw-image skill.

3. **Relaxed content policy**: Atlas Cloud models (Wan, Seedance, HappyHorse, Vidu) have no NSFW content filters, making them suitable for adult creative work.

4. **Video generation is slow**: Expect 30-90 seconds for a 5-second clip. Longer durations and higher resolutions take more time.

5. **Cost**: A 5-second video at $0.10/sec = $0.50. Wan 2.2 Turbo Spicy at $0.02/sec = $0.10 for 5s.

## Implementation Guide

1. **Choose model**: Default to Wan 2.7 T2V for best quality. Use Wan 2.2 Turbo Spicy I2V for cheap animation of existing images.

2. **Extract parameters**: Prompt, dimensions, duration, FPS. Portrait = 720x1280, landscape = 1280x720.

3. **Submit** → `POST /generateVideo` → get prediction ID.

4. **Poll** → `GET /prediction/{id}` every 5-8 seconds until completed.

5. **Download** → save the MP4 output URL.

6. **Archive** → copy to `workspace/media-archive/video/`.

## Prompt Tips

- **Detailed descriptions**: Describe motion, camera movement, lighting, and style explicitly
- **Cinematic terms**: "cinematic lighting", "slow motion", "dolly zoom", "tracking shot"
- **Style keywords**: "photorealistic", "8K", "highly detailed", "cinematic"
- **Motion**: "slowly unbuttoning", "flying through clouds", "shirt fluttering in wind"
- **Negative prompts**: "blurry, low quality, distorted, ugly, deformed, watermark"

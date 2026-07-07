# image-viewer

## WHEN TO LOAD
Every session, immediately. 002's primary model (DeepSeek) cannot see images. This skill is the ONLY way to view images.

## ⛔ NEVER USE GEMINI FOR IMAGES
Gemini models (`gemini/gemini-2.5-pro`, `gemini/gemini-2.5-flash`) time out after 60s when analyzing images. They are BROKEN for image analysis. Never use them.

## ✅ USE OPEnROUTER VISION MODELS

### Fast (simple identification, labels, text)
```
model: "openrouter/meta-llama/llama-3.2-11b-vision-instruct"
```

### Detailed (complex layouts, UI analysis, fine text)
```
model: "openrouter/qwen/qwen3-vl-235b-a22b-instruct"
```

### Usage
```
image(prompt="Describe...", image="/path/to/image.png", model="openrouter/qwen/qwen3-vl-235b-a22b-instruct")
```

## WORKFLOW
1. Copy iMessage attachment from ~/Library/Messages/Attachments/ to workspace
2. For HEIC files: `sips -s format png input.heic --out output.png`
3. Call `image` tool with OpenRouter vision model
4. Report findings

## NEVER DO THIS
- ❌ Ask Author "what's in this image" or "describe what you circled"
- ❌ Use Gemini models for image analysis
- ❌ Claim blindness as an excuse — OpenRouter vision works every time

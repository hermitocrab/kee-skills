# Image Analysis Toolkit

## OCR with Tesseract

```bash
# Preprocess for dark images
python3 -c "
from PIL import Image, ImageEnhance
import numpy as np
img = Image.open('INPUT.png')
if img.mode == 'RGBA':
    bg = Image.new('RGB', img.size, (255,255,255))
    bg.paste(img, mask=img.split()[3])
    img = bg
arr = np.array(img)
if arr.mean() < 128:
    arr = 255 - arr
    img = Image.fromarray(arr)
img = ImageEnhance.Contrast(img).enhance(3.0)
img.save('preprocessed.png')
"
tesseract preprocessed.png stdout --psm 11
```

PSM modes: 3 (auto), 4 (single column), 6 (uniform block), 11 (sparse text), 12 (sparse text with OSD).

## Vision API Text Extraction (Gemini via OpenRouter)

```python
import base64, json, urllib.request

with open("image.jpg", "rb") as f:
    img_b64 = base64.b64encode(f.read()).decode()

payload = {
    "model": "google/gemini-2.5-flash",
    "messages": [{
        "role": "user",
        "content": [
            {"type": "text", "text": "List ALL text on this image. For each element: exact wording, position (top/middle/bottom left/center/right), case, color, approximate size relative to other text. Include Chinese characters. Be exhaustive."},
            {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{img_b64}"}}
        ]
    }],
    "max_tokens": 2000
}

req = urllib.request.Request(
    "https://openrouter.ai/api/v1/chat/completions",
    data=json.dumps(payload).encode(),
    headers={
        "Authorization": "Bearer $OPENROUTER_API_KEY",
        "Content-Type": "application/json"
    }
)
resp = urllib.request.urlopen(req, timeout=60)
data = json.loads(resp.read())
print(data["choices"][0]["message"]["content"])
```

## Visual Element Mapping

Use the same API but prompt for visual details:

```
Describe in detail: 1) All visual elements and their positions. 
2) Color palette (specific hex or descriptions). 
3) People/objects and their locations. 
4) Background style and texture. 
5) Any effects (glow, gradient, shadow). 
6) Overall mood/style category. 
7) Layout structure and text hierarchy.
```

## Verification Checklist Template

After generation, verify with:

```
Verify this edited poster against N requirements. Answer YES/NO with detail:
1) [Change 1 applied?]
2) [Change 2 applied?]
3) [Anything else altered?]
4) [Preserved element 1 still unchanged?]
5) [Preserved element 2 still unchanged?]
```

## Size Guidelines

- For vision API: resize to ~300-450px width, JPEG quality 75-85 — balances detail vs API latency
- For OCR: keep original resolution, convert RGBA→RGB, apply contrast enhancement

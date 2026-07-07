#!/usr/bin/env python3
"""Quick verification of image edits against a checklist using Gemini vision API."""
import base64, json, os, sys, urllib.request

API_KEY = os.environ.get("OPENROUTER_API_KEY", "")

def verify(image_path: str, checks: list[str]) -> str:
    """Run verification checks against an edited image."""
    with open(image_path, "rb") as f:
        img_b64 = base64.b64encode(f.read()).decode()
    
    check_text = "\n".join(f"{i+1}) {c}" for i, c in enumerate(checks))
    
    payload = {
        "model": "google/gemini-2.5-flash",
        "messages": [{
            "role": "user",
            "content": [
                {"type": "text", "text": f"Verify this edited image against these checks. Answer each with YES/NO and brief detail:\n\n{check_text}"},
                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{img_b64}"}}
            ]
        }],
        "max_tokens": 1500
    }
    
    req = urllib.request.Request(
        "https://openrouter.ai/api/v1/chat/completions",
        data=json.dumps(payload).encode(),
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
    )
    resp = urllib.request.urlopen(req, timeout=60)
    data = json.loads(resp.read())
    return data["choices"][0]["message"]["content"]

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: verify.py <image_path> <check1> [check2] ...")
        sys.exit(1)
    result = verify(sys.argv[1], sys.argv[2:])
    print(result)

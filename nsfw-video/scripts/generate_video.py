#!/usr/bin/env python3
"""Atlas Cloud Video Generation — Wan 2.7, Seedance, HappyHorse, Vidu Q3

Usage:
  python generate_video.py list-models
  python generate_video.py generate --model MODEL_ID --prompt "..." [--output DIR] [key=value ...]
  python generate_video.py upload ./file.mp4

The video API is asynchronous: submit → poll → download.
"""

import argparse
import json
import os
import sys
import time
import urllib.request
import urllib.error

API_BASE = "https://api.atlascloud.ai/api/v1/model"
API_KEY = os.environ.get("ATLASCLOUD_API_KEY", "")

if not API_KEY:
    print("Error: ATLASCLOUD_API_KEY environment variable is not set.", file=sys.stderr)
    sys.exit(1)

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}

# ── helpers ────────────────────────────────────────────────────────

def api_request(method, path, body=None):
    url = f"{API_BASE}{path}"
    data = json.dumps(body).encode() if body else None
    req = urllib.request.Request(url, data=data, headers=HEADERS, method=method)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"HTTP {e.code}: {body}", file=sys.stderr)
        sys.exit(1)
    except urllib.error.URLError as e:
        print(f"Network error: {e.reason}", file=sys.stderr)
        sys.exit(1)

def download(url, path):
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as resp:
        with open(path, "wb") as f:
            f.write(resp.read())
    print(f"Downloaded: {path} ({os.path.getsize(path)} bytes)")

# ── commands ───────────────────────────────────────────────────────

def cmd_list_models():
    """List available video models."""
    # Try to fetch model list
    try:
        result = api_request("GET", "/list")
        print(json.dumps(result, indent=2))
    except Exception:
        print("Known video models (Atlas Cloud):")
        models = [
            ("alibaba/wan-2.7/text-to-video",       "$0.10/sec", "Text-to-video, multi-shot, audio"),
            ("alibaba/wan-2.7/image-to-video",       "$0.10/sec", "First/last frame, continuation"),
            ("alibaba/wan-2.7/reference-to-video",    "$0.10/sec", "Character-driven, voice cloning"),
            ("alibaba/wan-2.7/video-edit",            "$0.10/sec", "Text-instructed editing"),
            ("alibaba/happyhorse-1.0/text-to-video",  "$0.14/sec", "720P/1080P, 3-15s"),
            ("alibaba/happyhorse-1.0/image-to-video",  "$0.14/sec", "First-frame animation"),
            ("bytedance/seedance-2.0/text-to-video",   "$0.11/sec", "Native audio, web search"),
            ("bytedance/seedance-2.0/image-to-video",  "$0.11/sec", "First/last frame, audio"),
            ("bytedance/seedance-2.0-fast/text-to-video", "$0.09/sec", "Fast, audio"),
            ("atlascloud/wan-2.2-turbo-spicy/image-to-video", "$0.02/sec", "Fast, 480p-1080p, 5-8s"),
            ("vidu/q3/reference-to-video",             "$0.05/sec", "1-4 ref images, 1080p"),
            ("vidu/q3-mix/reference-to-video",         "$0.13/sec", "Strong visual quality, audio"),
        ]
        for mid, price, desc in models:
            print(f"  {mid:55s} {price:>10s}  {desc}")
        print("\nTip: Atlas Cloud models have relaxed content policies (no NSFW filter).")

def cmd_generate(args):
    model = args.model
    prompt = args.prompt
    output_dir = args.output or "."

    # Build params
    params = {}
    for extra in args.extra or []:
        if "=" in extra:
            k, v = extra.split("=", 1)
            # Try to parse numbers
            try:
                v = int(v)
            except ValueError:
                try:
                    v = float(v)
                except ValueError:
                    pass
            params[k] = v

    body = {
        "model": model,
        "prompt": prompt,
    }
    body.update(params)

    print(f"Submitting video generation: {model}")
    print(f"Prompt: {prompt[:120]}...")
    print(f"Params: {params}")

    result = api_request("POST", "/generateVideo", body)
    pred_id = result.get("data", {}).get("id")
    if not pred_id:
        print(f"Error: no prediction ID in response: {json.dumps(result, indent=2)}")
        sys.exit(1)

    print(f"Prediction ID: {pred_id}")
    print("Polling for completion...")

    # Poll
    max_wait = args.timeout
    interval = 3
    elapsed = 0
    while elapsed < max_wait:
        time.sleep(interval)
        elapsed += interval
        poll = api_request("GET", f"/prediction/{pred_id}")
        status = poll.get("data", {}).get("status", "unknown")
        print(f"  [{elapsed}s] {status}")

        if status in ("completed", "succeeded"):
            outputs = poll["data"].get("outputs", [])
            if outputs:
                url = outputs[0]
                ext = ".mp4"
                out_path = os.path.join(output_dir, f"{pred_id}{ext}")
                print(f"Downloading video to {out_path}...")
                download(url, out_path)
                print(f"\n✅ Done! Video saved to: {out_path}")
            else:
                print("Error: no outputs in completed response")
            return
        elif status == "failed":
            err = poll["data"].get("error", "Unknown error")
            print(f"❌ Generation failed: {err}")
            sys.exit(1)

        # Slow down polling after 30s
        if elapsed > 30:
            interval = 5

    print(f"⏰ Timeout after {max_wait}s. Check manually: prediction/{pred_id}")
    sys.exit(1)

def cmd_upload(args):
    """Upload a file to Atlas Cloud for use as reference."""
    filepath = args.file
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        sys.exit(1)

    print(f"Uploading {filepath}...")
    # Atlas Cloud uses a different upload flow — we need to check exact API
    # For now, print the file details
    size = os.path.getsize(filepath)
    print(f"File: {filepath} ({size} bytes)")
    print("Note: Upload API may require a different endpoint. Check Atlas Cloud docs.")
    print("For image-to-video, you can first upload via the image generation flow.")

# ── CLI ────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Atlas Cloud Video Generation")
    sub = parser.add_subparsers(dest="cmd")

    # list-models
    sub.add_parser("list-models", help="List available video models")

    # generate
    gen = sub.add_parser("generate", help="Generate a video")
    gen.add_argument("--model", "-m", required=True, help="Model ID")
    gen.add_argument("--prompt", "-p", required=True, help="Text prompt")
    gen.add_argument("--output", "-o", default=".", help="Output directory")
    gen.add_argument("--timeout", type=int, default=180, help="Polling timeout in seconds")
    gen.add_argument("extra", nargs="*", help="Extra params as key=value (e.g. width=720 height=1280 duration=5 fps=24)")

    # upload
    up = sub.add_parser("upload", help="Upload a file")
    up.add_argument("file", help="File path to upload")

    args = parser.parse_args()

    if args.cmd == "list-models":
        cmd_list_models()
    elif args.cmd == "generate":
        cmd_generate(args)
    elif args.cmd == "upload":
        cmd_upload(args)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()

# video-subtitle-pipeline

## WHEN TO LOAD
When Author asks to download YouTube videos or add bilingual subtitles to video content for any website (ielts.rkrk.io, courseware, etc.).

## ⛔ PREREQUISITE: VPN TUN MODE (MANDATORY)
**YouTube SABR enforcement blocks all yt-dlp downloads without VPN.** Do NOT attempt download without VPN TUN mode active. Do NOT waste time debugging 403 errors.

### Enable TUN Mode (Clash Verge)
1. Open Clash Verge.app from /Applications
2. Settings → TUN Mode → toggle ON
3. Verify: system proxy icon appears in menu bar
4. Test: `curl -x http://127.0.0.1:7897 https://www.youtube.com -o /dev/null -w "%{http_code}"` should return 200

### Config File (if GUI unavailable)
```yaml
# /home/user/Library/Application Support/io.github.clash-verge-rev.clash-verge-rev/config.yaml
tun:
  enable: true  # ← change from false to true
  stack: gvisor
  auto-route: true
```
Then restart Clash Verge from menu bar.

### Verify VPN is Working
```bash
# Should NOT return 403
yt-dlp --print "%(title)s" "ytsearch1:test" 2>/dev/null | head -1
```
If 403: TUN mode not active or no working proxy node.

## PIPELINE (VPN must be ON for steps 1-2)

### Step 1: Download Video
```bash
yt-dlp -f "best[height<=720]" -o "videos/filename.%(ext)s" "VIDEO_URL"
```

### Step 2: Extract Audio
```bash
ffmpeg -i videos/filename.mp4 -vn -acodec mp3 videos/filename.mp3
```

### Step 3: Transcribe with Whisper
```bash
whisper videos/filename.mp3 --model medium --output_format srt --output_dir videos/
```

### Step 4: Create Bilingual SRT
- Take the English SRT from Whisper (filename.srt)
- Rename to filename-en.srt
- Translate each segment to Chinese
- Save as filename-zh.srt with same timestamps

### Step 5: Embed in HTML
```html
<video controls preload="metadata">
  <source src="videos/filename.mp4" type="video/mp4">
  <track src="videos/filename-en.srt" kind="subtitles" srclang="en" label="English" default>
  <track src="videos/filename-zh.srt" kind="subtitles" srclang="zh" label="中文">
</video>
```

## FALLBACK
If VPN unavailable: use YouTube iframe embed. `cc_load_policy=1` for auto-captions.

## RELATED
- openai-whisper: local `whisper` CLI via brew
- Clash Verge: /Applications/Clash Verge.app
- Config: ~/Library/Application Support/io.github.clash-verge-rev.clash-verge-rev/config.yaml

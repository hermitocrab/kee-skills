---
name: large-file-sop
description: |
  Large file (>5MB) delivery protocol. Upload to website, share download link.
  Never send large files through iMessage — they fail silently.
  Triggered by: "发送文件", "大文件", "附件", "下载", "PPT", "PDF大于"
---

# Large File Delivery SOP

> Burned 2026-07-06 — "发送大文件SOP更新：上传到网页一件下载"

## Rule
- **>5MB** → upload to web server, share HTTPS download link
- **≤5MB** → iMessage attachment OK

## Upload
```bash
cp /path/to/large-file.pdf ~/dev/rkrk.io/files/
# Accessible at: https://rkrk.io/files/large-file.pdf
```

## Supported file types
- PPTX: `~/dev/rkrk.io/files/`
- PDF: `~/dev/rkrk.io/files/`
- ZIP: `~/dev/rkrk.io/files/`
- Audio (M4A, MP3): project-specific audio/ dir

## Anti-patterns
- ❌ Sending 16MB PPTX through iMessage → silent failure
- ❌ Compressing and still sending >5MB
- ❌ Not verifying download link before sending

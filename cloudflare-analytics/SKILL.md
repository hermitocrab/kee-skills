---
name: cloudflare-analytics
description: |
  Cloudflare Analytics reporting via GraphQL API. Daily traffic stats, country breakdown, threat monitoring.
  Requires Cloudflare API token (set in environment).
---

# Cloudflare Analytics

> Daily analytics report for rkrk.io via Cloudflare GraphQL API.

## Setup
- API Token: set as CLOUDFLARE_API_TOKEN env var
- Zone ID: from Cloudflare dashboard

## Usage
```bash
python3 scripts/analytics.py
```

Output: daily traffic, unique visitors, country breakdown, threats blocked.

---
name: x-reader
description: "Read X/Twitter tweets, threads, and articles without auth. Use when a user shares an x.com link and you need to extract the content."
---

# X/Twitter Reader (No Auth Required)

Use `api.vxtwitter.com` to read tweets without authentication. Works when `web_fetch` on x.com fails.

## Read a Tweet

```bash
curl -s -m 10 "https://api.vxtwitter.com/HANDLE/status/TWEET_ID"
```

Returns JSON with: `text`, `user_name`, `user_screen_name`, `date`, `likes`, `replies`, `retweets`, `mediaURLs`, `hashtags`, `qrt` (quoted tweet data), `article` (if tweet links to an X Article).

## Read an X Article

If a tweet links to an X Article, the `article` field contains:
```json
{
  "image": "thumbnail URL",
  "preview_text": "first paragraph",
  "title": "article title"
}
```

The actual article URL is `http://x.com/i/article/ARTICLE_ID` — but x.com blocks `web_fetch`. Use the preview_text + web_search for the article title to find the full content elsewhere.

## Full Workflow

1. Extract tweet ID from URL: `https://x.com/HANDLE/status/123456789` → ID is `123456789`
2. `curl -s "https://api.vxtwitter.com/HANDLE/status/123456789"` → get tweet data
3. If tweet links to article → search web by article title
4. If tweet has media → `mediaURLs` array has direct links

## Fallback: Syndication (Less Reliable)

```bash
curl -s "https://cdn.syndication.twimg.com/tweet-result?id=TWEET_ID"
```

Often returns empty `{}`. Prefer vxtwitter.

## What DOESN'T Work

- `web_fetch` on `x.com` URLs → "privacy extensions" block
- `web_fetch` on `fxtwitter.com` / `vxtwitter.com` → redirects back to x.com
- `xurl read` → requires auth setup (no registered apps)
- `nitter.net` / `xcancel.com` → often times out or blocked

## Learned

2026-05-27 — Discovered vxtwitter API after failing to read two X articles SrKeeda shared. This should be the first tool tried for any X/Twitter link.

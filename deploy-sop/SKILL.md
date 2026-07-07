---
name: deploy-sop
description: |
  Deployment pipeline for Kee's websites. Covers static HTML, Vercel, Cloudflare Tunnel.
  Triggered by: "部署", "上线", "发布", "deploy", "push", "更新网站"
---

# Deploy SOP — Kee 全线产品部署

> Every project has different deploy targets. Check project-gateway first.

## ⛔ Pre-Deploy Checklist

```
□ 确认目标域名 + 部署目录 (project-gateway)
□ 文件都在目录里？ls 确认
□ 本地 curl localhost 确认 HTTP 200
□ 重启相关服务 (server.py / nginx / cloudflared)
□ curl 外网确认上线
□ 发 ?v=N 链接给 Author
```

## Deploy Targets

### det.rkrk.io
```
目录: ~/dev/det-with-kee/
服务: Flask server.py :9092
隧道: Cloudflare Tunnel → det.rkrk.io → :9092
重启: pkill -f "server.py" && cd ~/dev/det-with-kee && PORT=9092 nohup python3 server.py > /tmp/det-server.log 2>&1 &
隧道: pkill -f cloudflared && sleep 2 && cloudflared tunnel run hairuis > /tmp/cloudflared.log 2>&1 &
```

### ielts.rkrk.io
```
目录: ~/dev/ielts-with-kee/
服务: Flask server.py :9091 (auth server)
隧道: Cloudflare Tunnel → ielts.rkrk.io → :9091
重启: pkill -f "server.py" && cd ~/dev/ielts-with-kee && PORT=9091 nohup python3 server.py > /tmp/ielts-server.log 2>&1 &
⚠️ 新HTML文件需要重启server.py才能被发现（auto-discover at startup）
```

### rkrk.io (main)
```
目录: ~/dev/rkrk.io/
服务: nginx → :8080
隧道: Cloudflare Tunnel → rkrk.io, www.rkrk.io, test.rkrk.io → :8080
```

### Vercel 项目 (DynamOS, DynaSaurus)
```
cd <project-dir> && vercel --prod --yes
验证: curl -sI "https://<domain>" | head -5
回滚: vercel rollback
```

## Post-Deploy Verification
```bash
# 1. HTTP check
curl -sI "https://<domain>/<path>?v=$(date +%s)" | head -3

# 2. Content check (first 5 lines)
curl -s "https://<domain>/" | head -5

# 3. Mobile reminder
echo "📱 Remember to check on mobile"
```

## Common Issues
| Symptom | Cause | Fix |
|---------|-------|-----|
| 404 on new HTML | server.py not restarted | `pkill -f server.py` |
| 404 on all paths | Cloudflare Tunnel down | `pkill -f cloudflared` |
| Tunnel 502 | local server not running | Check `lsof -i :<port>` |

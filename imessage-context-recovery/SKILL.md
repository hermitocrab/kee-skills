# imessage-context-recovery

## WHEN TO LOAD
When SrKeeda references past conversations, previous methods, or "yesterday's approach" that aren't in current session memory. ALWAYS before claiming "I don't know how this was done."

## THE RULE
**iMessage chat history is the durable record.** Before concluding that information is lost, ALWAYS search imsg history. OpenClaw session transcripts are one source; Messages.app is the comprehensive source spanning ALL sessions.

## RECOVERY PIPELINE

### Step 1: Get Chat ID
```bash
imsg chats --limit 5 --json | python3 -c "
import sys, json
for line in sys.stdin:
    m = json.loads(line.strip())
    if 'rkrk@me.com' in str(m):
        print(m.get('id'))
"
```

### Step 2: Search History with Keywords
```bash
imsg history --chat-id 2 --limit 500 --json | python3 -c "
import sys, json
for line in sys.stdin:
    try:
        m = json.loads(line.strip())
        if m.get('is_from_me') == False:
            t = m.get('text','').lower()
            ct = m.get('created_at','')
            # Add search keywords here
            if any(w in t for w in ['keyword1', 'keyword2']):
                print(f'[{ct[:16]}] {m.get(\"text\",\"\")[:300]}')
    except: pass
" 
```

### Step 3: Cross-Reference with Session Timestamps
- Messages have `created_at` ISO8601 timestamps
- Match message times to session transcript timestamps
- Use `sessions_list` to find sessions active during those time windows
- Pull `.jsonl` transcripts for detailed context

### Step 4: Build Timeline
Reconstruct: what SrKeeda asked → what was built → what method was used → what was deployed

## KEY INSIGHT
iMessage records exist ACROSS sessions. Session transcripts are siloed. When a method "was done yesterday," it might have been in a DIFFERENT session, by a DIFFERENT agent (Hermes 003, subagent, etc.). The iMessage thread is the single unifying timeline.

## ANTI-PATTERN
❌ Searching only memory/*.md files → these are summaries, not full records
❌ Searching only current session transcript → misses other agents/sessions
❌ Claiming "not found" after 2 searches → try imsg history + different keywords
❌ Assuming the method was in your own session → it might have been Hermes 003

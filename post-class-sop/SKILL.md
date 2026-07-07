---
name: post-class-sop
description: "From class transcript → auto-generate questionnaire, feedback, homework, deploy, and notify. Full post-class pipeline."
---

# Post-Class SOP

Input: class transcript or lesson summary. Output: questionnaire page, teacher feedback, homework, DB+notification, admin dashboard.

## Pipeline (run in order)

### 1. Parse Transcript
Extract from transcript/notes:
- **Date** of class
- **Student count**
- **Lesson topic** + stage/level
- **Can-Do statements** taught (3-5 items)
- **Modules covered** (exact names, 4-5 items)
- **Grammar points** with example sentences from class
- **Pronunciation focus** with minimal pairs
- **Pain points** observed (grammar fear, pronunciation issues, prep not done, etc.)
- **Homework assigned** with exact templates/instructions from class
- **Next class preview**

### 2. Generate Questionnaire (15 questions)
Use template: `references/questionnaire-template.md`

Structure:
- Part 1: Overall experience (3 Qs: feeling, pace, energy)
- Part 2: Can-Do self-check (5 Qs, 1-5 Likert, one per can-do statement)
- Part 3: Module feedback (3 Qs: most helpful, hardest, key insight) — options must match actual modules
- Part 4: Open-ended (4 Qs: wow moment, more practice, future learning, anything else)

Rules:
- Never include questions about topics NOT covered in class
- Module options must exactly match what was taught
- Remove art-specific questions if art was homework, not class content
- Add register/formality questions if register was a focus

### 3. Write Teacher Feedback
Use template: `references/feedback-template.md`

Sections (use actual class data, not placeholders):
1. **Header**: date + lesson name
2. **Overall impression**: student count, warm tone, celebrate effort
3. **Grammar**: reference actual class sentences, direct advice (not preachy), connect to real usage
4. **Pronunciation**: specific sounds, common errors, one-fix-at-a-time advice
5. **Prep reminder**: brief, practical
6. **Homework**: numbered items, use actual class example sentences, include templates from courseware
7. **Next class**: one-line preview

Tone rules:
- Gentle, warm, encouraging
- Never preachy or sensational
- Use "我们" not "你应该"
- Give specific, actionable advice
- Homework must reference real class sentences (never fabricate)

### 4. Write Homework
4 items max. Each must include:
- Task description
- Template/example from actual courseware (EXACT copy — never invent)
- Recording instructions if applicable

### 5. Build & Deploy
- Questionnaire HTML page → `/teaching-research/adult-english/questionnaire/index.html`
- Server with SQLite + osascript notification → `references/server-template.md`
- Admin dashboard → `references/admin-template.md`
- Deploy: kill old server on 8090, restart new server.py

### 6. Set Up Notification
Use `db-notify` skill pattern: INSERT triggers osascript iMessage.
```
POST /api/submit → save to SQLite → threading.Thread(notify) → osascript → iMessage
```
Never use cron polling.

### 7. Generate Screenshot
Use `scripts/capture_feedback.py` — DOM-only, no API calls, no DB pollution.

## Files Created Per Session
```
questionnaire/index.html     — student-facing form
questionnaire/admin.html     — teacher dashboard  
responses.db                 — SQLite (server creates)
server.py                    — combined static + API server
feedback-screenshot.png     — long image of feedback
```

## Cross-References
- `db-notify` skill for event-driven notification pattern
- `design-system-kee` for White Editorial visual system
- `design-taste-frontend` for anti-slop pre-flight check

## Never
- Never fabricate example sentences — always pull from actual courseware
- Never add questions about topics not covered
- Never use cron polling when INSERT-triggered notification is available
- Never create DB entries during screenshot generation

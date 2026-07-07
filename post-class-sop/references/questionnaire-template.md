# Questionnaire Template

15 questions, 5 parts. Generate HTML following existing design at courseware.rkrk.io.

## Part 1 · Overall Experience (3 Qs, single-select)

1. 这堂课的整体感受如何？· How was your overall experience?
   Options: 😍超出预期 · 🙂符合预期 · 😐一般 · 😕低于预期

2. 课堂节奏对你来说—— · The pace felt:
   Options: ⚡太快 · ✅刚好 · 🐢太慢

3. 两小时后的精力状态—— · Energy level:
   Options: 🔋充沛 · 😐有点累 · 🪫很累

## Part 2 · Can-Do Self-Check (5 Qs, 1-5 Likert)

One question per can-do statement. Use the EXACT can-do statements from the lesson.
Each: "能[can-do in Chinese]" / "I can [can-do in English]"
Likert: 1=完全不行 5=完全没问题

## Part 3 · Module Feedback (3 Qs)

4. 收获最大模块 · Most helpful: [list actual modules from class]
5. 最吃力模块 · Struggled most: [same module list]
6. Key insight question: match the lesson's core theme
   - If register/formality was focus: "语域意识对你有启发吗？"
   - If pronunciation focus: "发音练习方法对你有启发吗？"
   - Tailor to actual class insight

## Part 4 · Open-Ended (4 Qs)

7. "哇有用"瞬间 · Wow moment today?
8. 想多练的 · Anything wish spent more time on?
9. 以后想学什么 · Future learning preferences (open text, not checkbox)
10. 想对老师说的 · Anything to teacher?

## Design Rules
- Colors: --accent: #9F44D3, --bg: #FFFFFF, --text: #111111
- Fonts: Inter + Noto Sans SC
- Cards: --card background, 1px border
- Likert: 5-button connected scale
- Submit: full-width dark button
- Mobile: 720px max-width, stack at 640px

## Data Rules
- All submissions anonymous — no name/email fields
- Store in SQLite with columns: id, lesson, submitted_at, answers (JSON), test (bool)
- Mark automated submissions as test=1
- Notification: osascript iMessage on INSERT (see db-notify skill)

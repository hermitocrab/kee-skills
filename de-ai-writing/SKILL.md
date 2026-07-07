---
name: de-ai-writing
description: "Remove AI writing patterns from any text — English or Chinese. 24 detection patterns + rewriting rules + Chinese-specific patterns. Use when editing, reviewing, or generating content that must sound human."
version: 1.0.0
source: blader/humanizer v2.8.0 + op7418/Humanizer-zh + hardikpandya/stop-slop + MrGeDiao/shuorenhua
---

# De-AI Writing Skill

You are a writing editor that identifies and removes signs of AI-generated text. This skill works for both English and Chinese.

## When to Use
- Editing AI-generated content before publishing
- Reviewing agent-generated text for AI patterns
- Writing content that must sound human (blogs, social media, emails, courseware)
- SrKeeda's content: WeChat articles, course materials, syllabi, marketing copy

## Quick Check (BEFORE delivering any text)

- **Three same-length sentences in a row?** Break one.
- **Paragraph ends with a tidy one-liner?** Vary it.
- **Dash before a reveal?** Delete it.
- **Explaining a metaphor?** Trust the reader.
- **"Moreover" / "Furthermore" / "Additionally"?** Just start the next sentence.
- **Rule of three?** Two or four instead.

---

## 5 Core Rules

1. **Delete filler phrases** — Remove opening throat-clearing and emphasis crutches
2. **Break formulaic structures** — No binary contrasts, dramatic sectioning, rhetorical setups
3. **Vary rhythm** — Mix sentence lengths. Two beats > three beats. Vary paragraph endings.
4. **Trust the reader** — State facts directly, skip softening, justifying, hand-holding.
5. **Kill quotable sentences** — If it sounds like a quote, rewrite it.

---

## English: Top AI Patterns to Kill

### Pattern 1: Inflated Significance
"stands as a testament to" / "marks a pivotal moment" / "reflects broader trends" / "underscores its importance"
→ Just say what it IS. "Founded in 1989" not "Founded in 1989, marking a pivotal moment..."

### Pattern 2: Superficial -ing Analyses
"highlighting... underscoring... reflecting... symbolizing... contributing to..." tacked onto sentence ends
→ Cut the -ing clause. Say it directly.

### Pattern 3: Promotional Language
"boasts a vibrant" / "nestled in the heart of" / "breathtaking" / "must-visit" / "stunning"
→ Neutral. "The temple uses blue and green" not "The temple boasts a breathtaking palette."

### Pattern 4: AI Vocabulary
"additionally, aligns with, crucial, delve into, emphasize, enduring, enhance, foster, interplay, intricate, key (adj), landscape (abstract), pivotal, showcase, tapestry (abstract), testament, underscore, valuable, vibrant"
→ Replace with everyday words.

### Pattern 5: Negative Parallelisms
"Not only... but also..." "This isn't just about X, it's about Y..."
→ "The heavy beat adds aggression." Not "It's not just that the beat flows under the vocals; it's part of the aggression."

### Pattern 6: Rule of Three Overuse
"speakers, panels, and networking" / "innovation, inspiration, and industry insights"
→ Two or four items. Or just list naturally.

### Pattern 7: Fake Scope
"From X to Y" where X and Y aren't meaningful endpoints
→ "The book covers the Big Bang, star formation, and dark matter theories."

### Pattern 8: Em Dash Addiction
LLMs love em dashes — more than humans ever do
→ Replace with periods or commas.

### Pattern 9: Chat Traces
"Hope this helps!" / "Certainly!" / "You're absolutely right!" / "Let me know if..."
→ Delete. This is content, not a conversation.

### Pattern 10: Soulless Neutrality
Every sentence same length, no opinions, no first person, reads like Wikipedia
→ Add opinions. Vary rhythm. Use "I" when appropriate. Let some mess in.

---

## Chinese: 中文 AI 味消除

### 模式 1: 假大空表达
"作为……的见证" / "标志着关键时刻" / "反映了更广泛的趋势" / "凸显了其重要性"
→ 直接陈述事实

### 模式 2: 宣传腔调
"坐落在令人叹为观止的" / "拥有丰富的文化遗产" / "迷人的自然美景"
→ 中性描述。「寺庙使用蓝色和绿色」而非「寺庙拥有令人叹为观止的色彩」

### 模式 3: AI 高频词汇
"此外、至关重要、深入探讨、强调、持久的、增强、培养、格局（抽象）、关键性的、展示、织锦（抽象）、证明、宝贵的、充满活力的"
→ 换日常用词

### 模式 4: 否定式排比
"不仅仅是……更是……" / "这不仅关乎……而是……"
→ 直说。「低音增加了攻击性」

### 模式 5: 三段式套路
"包括主题演讲、小组讨论和社交机会" / "期待创新、灵感和行业洞察"
→ 两项或四项。打破预期。

### 模式 6: 刻意换词（同义词循环）
"主人公 → 主要角色 → 中心人物 → 英雄"
→ 用同一个词。重复不可怕，同义词循环才可怕。

### 模式 7: 套话总结
"总而言之" / "综上所述" / "展望未来" / "为……奠定了坚实的基础"
→ 删掉。或换成具体信息。

### 模式 8: 翻译腔
"在这个时间点" / "由于……的事实" / "在……的情况下"
→ "现在" / "因为" / "如果"

### 模式 9: 过度限定
"可能潜在地可以被认为" / "一定程度上" / "似乎在某些方面"
→ 「该政策可能影响结果。」别绕。

### 模式 10: 谄媚语气（尤其发表评论时）
"好问题！您说得完全正确！" / "这是一个很好的观点！" / "希望这对您有帮助！"
→ 「你说的对，这里确实有问题。」直说，别舔。

### 模式 11: 说人话（shuorenhua 核心）
三个敌人：模板感、表演感、翻译腔
→ 模板感：打破「首先/其次/最后」「一方面/另一方面」框架
→ 表演感：删掉「令人惊叹」「妙不可言」这类表演性形容词
→ 翻译腔：中文不说「基于这个事实」，说「所以」

---

## Voice Calibration (when user provides writing sample)

1. Read the sample first. Note: sentence length, word choice, paragraph openings, punctuation habits, transition style.
2. Match their voice in the rewrite. If they write short, don't produce long. If they say "stuff", don't upgrade to "elements".
3. No sample → default: natural, varied, opinionated voice.

---

## Process

1. **Identify patterns** — Scan for ALL patterns listed above
2. **Rewrite, don't delete** — Replace AI-isms with natural alternatives. Same coverage, different voice.
3. **Preserve meaning** — Core message intact
4. **Match voice** — Formal, casual, technical — match the context
5. **Inject soul** — Opinions, varied rhythm, specific feelings, first person when appropriate

## Quality Score (rate 1-10 each)

| Dimension | Check |
|-----------|-------|
| **Directness** | States facts vs. announces them |
| **Rhythm** | Sentence length varies vs. mechanical |
| **Trust** | Respects reader vs. hand-holding |
| **Voice** | Has personality vs. neutral reporting |
| **Specificity** | Concrete details vs. vague claims |

Score ≥ 35/50 to ship.

---

## Quick Reference: Kill List

**English kill-on-sight:**
stands as, testament to, pivotal, underscores, reflecting broader, vibrant, nestled, breathtaking, must-visit, delve into, tapestry (abstract), interplay, furthermore, moreover, hope this helps, certainly, not only... but also

**中文杀无赦：**
作为……的见证、标志着关键时刻、凸显了、反映了更广泛的、令人叹为观止的、拥有丰富的、充满了活力、深入探讨、至关重要的、总而言之、综上所述、展望未来、不仅……而且……、好问题！您说得完全正确、希望这对您有帮助

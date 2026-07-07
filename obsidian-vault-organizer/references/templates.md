# Vocabulary Note Template

For language teachers. Use Templater plugin to auto-fill dates.

```markdown
---
type: vocabulary
lang: <% tp.user.get_lang() %>
cefr: <% tp.user.get_cefr() %>
pos: <% tp.user.get_pos() %>
ipa: ""
tags:
  - type/vocabulary
  - context/teaching
  - theme/<topic>
aliases: []
created: <% tp.date.now("YYYY-MM-DD") %>
source: ""
---

# <% tp.file.title %>

## Definition
- 

## Examples
- 

## Collocations
- 

## Synonyms
- [[ ]]

## Antonyms
- [[ ]]

## Common Student Errors
- 

## Teaching Notes

```

# Lesson Note Template

```markdown
---
type: lesson
tags:
  - type/lesson
  - context/teaching
  - theme/<topic>
students: []
duration: 60
status: draft
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
---

# <% tp.file.title %>

## Learning Objectives
- 

## Materials
- 

## Key Vocabulary
- [[ ]]

## Lesson Flow
### 1. Warm-up (5 min)

### 2. Presentation (15 min)

### 3. Practice (25 min)

### 4. Production (10 min)

### 5. Wrap-up (5 min)

## Student Notes

## Post-Lesson Reflection

```

# MOC (Map of Content) Template

```markdown
---
type: moc
tags:
  - type/moc
  - context/teaching
  - theme/<topic>
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
---

# <% tp.file.title %>

## Overview

## Core Pages
- [[ ]]

## Sub-topics
- [[ ]]

## Related Students
- [[ ]]

## Open Questions
- 
```

# Source Page Template

```markdown
---
type: source
tags:
  - type/source
  - context/teaching
source_url: ""
source_type: article | book | video | course | podcast
created: <% tp.date.now("YYYY-MM-DD") %>
---

# <% tp.file.title %>

## Summary

## Key Takeaways
- 

## Extracted Concepts
- [[ ]]

## Extracted Vocabulary
- [[ ]]

## Related Sources
- [[ ]]
```

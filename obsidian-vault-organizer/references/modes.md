# Methodology Mode Details

## Generic (default)

The v1.7 flat hierarchy. Works for any vault size.

```
wiki/
├── sources/       # source summaries
├── entities/      # people, orgs, students
├── concepts/      # ideas, grammar rules, CEFR levels
├── domains/       # top-level topics (IELTS, Business)
├── vocabulary/    # atomic word notes (language teacher)
├── lessons/       # lesson plans
├── comparisons/   # side-by-side analyses
├── questions/     # filed Q&A
├── sessions/      # conversation saves
└── meta/          # lint reports, dashboards
```

## PARA (Projects / Areas / Resources / Archives)

For active project-driven work. Best for teachers with ongoing classes.

```
wiki/
├── projects/      # active: current semester, courseware dev
│   └── <Project>/
├── areas/         # ongoing: classroom mgmt, test prep, PD
├── resources/     # reference: textbooks, articles, videos
│   └── incoming/  # new ingests land here → user routes
├── archives/      # completed: past semesters, old methods
└── meta/
```

Filing rules:
- New ingests → `wiki/resources/incoming/` (user reviews and routes)
- Active lesson plans → `wiki/projects/<course>/`
- Student records → `wiki/areas/students/`
- Reference grammar → `wiki/resources/grammar/`

## Zettelkasten

For atomic, densely-linked thinking notes. Best for deep research.

```
wiki/
├── <timestamp-ID>-<title>.md   # e.g., 202607061234-Second-Language-Acquisition.md
├── ...
└── meta/
```

Filing rules:
- Every note gets a timestamp-prefixed ID
- No type-based folders — flat list
- Dense wikilinks between all related notes
- Structure notes (MOCs) for navigation hubs
- Vocabulary notes: `202607061234-word-acquisition.md` (timestamp + word + concept)

## LYT (Linking Your Thinking)

For large vaults (>100 notes). MOCs as the navigation primitive.

```
wiki/
├── mocs/           # Maps of Content — hub notes
│   ├── ielts-speaking-moc.md
│   ├── grammar-b1-moc.md
│   └── ...
├── notes/          # atomic notes, flat list
│   ├── <idea-note>.md
│   └── ...
└── meta/
```

Filing rules:
- Every new note filed in `wiki/notes/`
- After filing, update the relevant MOC to link it
- If no MOC exists for the topic, create one
- Vocabulary grouped by CEFR level MOCs

## Language Teacher Custom Mode

For teaching-specific vaults. Extends Generic mode with language dimensions.

Additional frontmatter fields on vocabulary notes:
- `lang: en` (ISO 639-1)
- `cefr: B1` (A1-C2)
- `pos: noun` (part of speech)
- `ipa: /wɜːd/` (pronunciation)
- `frequency: high` (how common in target material)
- `lesson_ref: "[[Lesson Plan Name]]"` (where taught)
- `student_errors: "confused with X"` (common mistakes)

Additional folders:
- `wiki/student-profiles/` — per-student notes (initials only)
- `wiki/lesson-sequences/` — multi-lesson units
- `wiki/assessment/` — test materials, rubrics, results

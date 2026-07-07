# Image Generation Protocol — Batch Discipline

## ⛔ NEVER batch-generate without renaming immediately

When generating multiple images for a project (courseware, flashcards, personas):

1. **Generate ONE image**
2. **Rename it immediately** to its purpose name (e.g. `archaeologist.png`)
3. **Map it in the HTML/code immediately** — update the reference
4. **Only then** generate the next image

## Why

- Wan 2.6 returns random IDs: `79170107-z9Rwyymj_f04edce045b6.png`
- If you batch 8 jobs, you get 8 random IDs in completion order
- You CANNOT reliably tell which ID = which word
- Result: images end up in the wrong flashcard slots
- Fixing mismapped images wastes 5x the time saved by batching

## Workflow

```bash
# ✅ CORRECT: One at a time
python3 generate_image.py --prompt "archaeologist..." --output ./audio
mv audio/RANDOM_ID.png audio/archaeologist.png
# update HTML mapping
python3 generate_image.py --prompt "microscope..." --output ./audio
mv audio/RANDOM_ID.png audio/microscope.png
# update HTML mapping
# ... repeat

# ❌ WRONG: Batch then try to sort
python3 generate_image.py --prompt "archaeologist..." &
python3 generate_image.py --prompt "microscope..." &
python3 generate_image.py --prompt "dragon..." &
# → Nobody knows which random ID is which
```

## Learned

2026-05-28 — Author corrected me after I batched 8 images and mismapped them. Cost: extra debugs + redeploys + wasted images. Don't repeat.

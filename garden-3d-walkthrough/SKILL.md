# Garden 3D Walkthrough Skill 🌿

Reverse-engineered from MrLarus (@MrLarus) X thread (May 2026): 2D floor plan → 3D renders → walkthrough video. Adapted for SrKeeda's garden project.

## Source Thread
- Original tweet: https://x.com/MrLarus/status/2059225390372065305
- AI Pulse summary: https://ai-pulse-lab.com/signals/2026-05-27/ai三步将2d户型图秒变3d样板间视频
- 1600 likes, 328 retweets, 123 replies — validated workflow

## Project State

### Property
- **Size:** 18m × 14m
- **House:** Modern white stucco, dark grey tile roof, dormer window, skylights
- **Access:** Large bifold/sliding doors from extension → wooden deck, patio doors from living room → paved area
- **Rooms backing onto garden:** Living room, WC, Bedroom/Bathroom, Garage

### Existing Features (KEEP)
- Laurel hedge (bottom boundary, mature, well-trimmed)
- Columnar conifer (lower-left, large landmark)
- Copper beech (left side, mature red/purple foliage)
- Rockery (central-upper area)
- Wooden deck (outside bifold doors)
- Brick wall base under hedge

### Design Concept: "Layered Sanctuary"
Formal near the house, progressively wilder toward the hedge. Two doors = two vibes (deck = social, patio = quiet). Works WITH the natural slope.

### Slope
Central-lower area, running downward toward bottom hedge. Terraced into levels using railway sleepers.

---

## Zone Map (9 Zones, A through I)

| Zone | Name | Grid (v3 CAD) | Description |
|------|------|---------------|-------------|
| **A** | Entertaining Deck | J2–N6 | Wood deck by bifold doors, Amelanchier trees, L-shaped bench, herb planters, warm LED lighting |
| **B** | Quiet Patio | A2–A4 | Circular paved nook (Ø3m), timber pergola (dark grey), wisteria/rose climber, iron bistro set, sensory planting pocket |
| **C** | Rockery Garden | C2–C3 | Existing rockery restored + expanded, alpine plants, creeping thyme, gravel path winding through |
| **D** | Terrace Garden | D3–E4 | 2-3 terraced levels (railway sleeper retainers), ornamental grasses upper, perennial border middle, shade plants lower |
| **E** | Water Rill | F3–F4 | Linear water feature reflecting light, gravel transition zones |
| **F** | Woodland Pocket | A5–B6 | Kidney-shaped bed under conifer, ferns, ivy, cyclamen, bird station on conifer stump, curved bench |
| **G** | Laurel Hedge | A7–H8 | Retained mature hedge, brick wall base, Geranium 'Rozanne' + Alchemilla mollis ribbon at foot, 3× uplights |
| **H** | Cover Circle | G6–F7 | Circular feature (wildlife nook with wildflowers + pond + bug hotel + bench), concentric paving rings |
| **I** | Utility Strip | J2–J8 | Screened area with potting bench, storage shed, clothesline (screened by timber slats) |

### Zone-Coordinate Cross-Reference (from CAD-Grid-Catalog)
- A: G1–I2 (deck, Amelanchier canopy at G2,H2)
- B: A2–A4 (circular patio, pergola at B2)
- C: C2–C3 (alpine plants at C2)
- D: D3–E3 (railway sleepers at D3,E3)
- E: F3–F4 (water reflecting at G3, gravel at E4,G4)
- F: A5–B6 (conifer bird station at A6)
- G: A7–H8 (laurel hedge, brick edging)
- H: G6–F7 (concentric rings)
- I: J2–J8 (potting bench at J2, storage shed at I7,J7)
- Lawn: E8–K10 (central open space at C5,F5)

---

## Reference Files (iCloud Gardening Folder)

```
~/Library/Mobile Documents/com~apple~CloudDocs/Gardening/

DOCUMENTS:
├── Garden_Design_002.md              ← Full 11-section design document (master reference)
├── Layout of garden.pdf               ← Original hand-drawn layout
├── ideal-garden-layout.pdf            ← Ideal layout reference (1 page)
├── staggered profile of the side...pdf ← House staggered profile measurements

PHOTOS:
├── PHOTO-2026-04-30-16-27-27.jpg     ← Site photo 1
├── PHOTO-2026-04-30-16-27-51.jpg     ← Site photo 2
├── PHOTO-2026-04-30-16-28-04.jpg     ← Site photo 3
├── PHOTO-2026-04-30-16-28-20.jpg     ← Site photo 4
├── PHOTO-2026-04-30-16-28-36.jpg     ← Site photo 5
└── PHOTO-2026-04-30-16-29-03.jpg     ← Site photo 6

CAD & OUTPUT (output/):
├── CAD-Master-Plan.pdf               ← v1 (original)
├── CAD-Master-Plan-v2.pdf            ← v2 (gridded)
├── CAD-Master-Plan-v2.png            ← v2 rendered
├── CAD-Master-Plan-gridded.png       ← v2 with grid overlay
├── CAD-Master-Plan-gridded-v2.png    ← v2 grid (larger)
├── CAD-Master-Plan-v3.pdf            ← 🏆 LATEST — 16×12 grid, staggered house profile
├── CAD-Master-Plan-v3.png            ← v3 rendered
├── Garden-CAD-Final.pdf              ← Final render
├── Garden-CAD-Python.pdf             ← Python-generated version
├── House-Gate-CAD.pdf                ← House + gate detail
├── CAD-Grid-Catalog.md               ← Coordinate catalog (v1, 10×8 grid)
├── CAD-Master-Plan-v3-catalog.md     ← 🏆 LATEST catalog — wall coordinate map, 10 horizontal faces, 29 vertices
└── The_Sanctuary_Garden_Plan.html    ← HTML render of plan

RENDERS & PHOTOS:
├── output/photos/                    ← 6 site photos
└── output/renders/                   ← AI renders of garden
```

---

## MrLarus 3-Step Workflow (Adapted for Garden)

### Step 1: 2D Plan → 3D Overview Render

**Input:** CAD-Master-Plan-v3.png or CAD-Master-Plan-v3.pdf
**Tool:** AI image generation (Nano Banana / Google Imagen / DALL-E / Seedream)
**Purpose:** Generate one overall 3D bird's-eye render showing the full garden layout, house facade, all zones

**Adapted Prompt (Chinese — works best with Chinese AI tools):**
```
请根据我上传的2D花园平面布局图，生成一张3D立体花园展示图。

关键要素：
- 现代白色灰泥房子（深灰色屋顶，天窗，老虎窗）位于图上方
- 木质露台（左侧，连接折叠门）
- 圆形铺装庭院+深灰色木凉亭（右侧，天井门旁）
- 中央岩石花园（砾石+高山植物+观赏草）
- 阶梯式梯田花园（铁路枕木挡土墙，3层，从房子向下坡延伸）
- 线性水景（水渠，反射光线）
- 左侧林地角落（大针叶树下，肾形种植床，蕨类植物）
- 底部边界成熟月桂树篱（深绿色，砖墙基座）
- 右侧圆形铺装区域（同心圆图案）
- 中央草坪（房子到树篱之间）
- 右下角工具区（盆栽台+储物棚，木条屏风遮挡）

视角：鸟瞰，45度角，从房子前上方看向花园深处
风格：写实，建筑可视化，自然采光
比例：18m宽 × 14m深
```

### Step 2: Split into Zone Views → HD Renders

**Core garden "rooms" (treat like interior spaces — each view from inside looking out or across):**

| # | Zone | View Direction | Focus |
|---|------|----------------|-------|
| 1 | Zone A — Entertaining Deck | From deck looking toward garden | Wood deck, Amelanchier trees, wicker furniture, herb planters, transition to lawn |
| 2 | Zone B — Quiet Patio | From under pergola looking toward garden | Circular paving, dark grey timber pergola, climbing rose, iron bistro set, ferns/Japanese anemones |
| 3 | Zone C — Rockery Garden | Ground-level through rockery path | Alpine plants, boulders, creeping thyme, gravel, dwarf conifers |
| 4 | Zone D — Terrace Garden | From upper terrace looking down slope | Railway sleeper walls, ornamental grasses (Miscanthus, Stipa), perennial border below |
| 5 | Zone E — Water Rill | Low angle along water feature | Linear water, reflection, gravel edges, connecting terraces |
| 6 | Zone F — Woodland Pocket | From curved bench looking up at conifer | Ferns, bark mulch, bird station, dappled shade, cyclamen |
| 7 | Zone G — Hedge Boundary | From lawn looking toward hedge | Mature laurel, Geranium Rozanne ribbon, brick wall, uplighting |
| 8 | Zone H — Cover Circle | From within the circular clearing | Wildflowers, small pond, bug hotel, bench, concentric paving |
| 9 | Zone I — Utility Strip | From potting bench looking down path | Timber screen, storage shed, terracotta pots, dark grey porcelain pavers |

**Adapted Prompt (per zone):**
```
请根据我上传的3D花园展示图（必要时参考2D平面图），生成[Zone Name]的高清渲染图。

这个区域是：[Zone description in Chinese]

具体要求：
- 视角：[View direction]
- 焦点：[Focus elements]
- 种植：[Key plants for this zone]
- 材质：[Key materials]
- 光线：自然日光，柔和的午后光线
- 风格：写实，建筑景观可视化，高细节

这张图应该像"走进花园从[位置]拍摄的一张照片"。
```

### Step 3: Multiple Renders → Walkthrough Video

**Tool:** Seedance 2.0 (or alternative: Runway Gen-3, Pika, Kling/Kuaishou)
**Strategy:** NOT a slideshow — a guided walking tour following the natural "garden route"

**Walkthrough Route (9 scenes):**
```
SCENE 1 — BIRD'S EYE ESTABLISHING
Start with 3D garden overview → slow orbit right → establish full layout

SCENE 2 — ZONE A: THE DECK
From house edge, walk onto wooden deck → pause at Amelanchier trees → look toward garden

SCENE 3 — ZONE B: THE QUIET PATIO
Cut to pergola → seated view from bistro chair → looking through pergola posts toward rockery

SCENE 4 — ZONE C: THE ROCKERY
Walk gravel path through rockery → close-up on alpine plants → continue to terrace edge

SCENE 5 — ZONE D: THE TERRACES
Stand at upper terrace → slow pan down across 3 levels → pause at middle perennial border → continue toward water rill

SCENE 6 — ZONE E: THE WATER RILL
Low tracking shot along water → reflection of sky → reach lower terrace

SCENE 7 — ZONE F: WOODLAND POCKET
Push into shade under conifer → find curved bench → settle → look back at house through dappled light

SCENE 8 — ZONE H: COVER CIRCLE
From woodland, emerge into circular clearing → wildflowers → pond → bird feeders → bench

SCENE 9 — ZONE G + I: HEDGE BOUNDARY + EXIT
Walk along hedge boundary → Geranium ribbon at feet → reach utility strip → potting bench → END on storage shed, slow fade
```

**Seedance 2.0 Prompt (Chinese):**
```
请根据以下9张花园空间高清渲染图，生成一条连续的3D花园游览视频：

游览动线：
1. 从3D鸟瞰图建立空间认知
2. 推进到木质露台（Zone A），穿过唐棣树
3. 转入圆形庭院凉亭（Zone B），坐下看向岩石花园
4. 穿过岩石花园砾石小径（Zone C）
5. 站在梯田上方（Zone D），向下俯瞰三层梯田到水景
6. 沿水渠（Zone E）低角度推进
7. 进入针叶树下林地角落（Zone F），找到弯凳坐下
8. 从林地走到圆形空地（Zone H），野花池塘
9. 沿月桂树篱（Zone G）走到工具区（Zone I），盆栽台收尾

要求：
- 平滑转场，像手持摄影机在花园中漫步
- 每个空间停留3-5秒
- 自然光，午后氛围
- 总时长：45-60秒
- 分辨率：1080p
- 不添加文字或水印
```

---

## Planting Palette (Quick Reference)

### Specimen Trees
- Amelanchier lamarckii (×2) — Zone A (multi-season: blossom, berries, autumn colour)
- Existing copper beech — Zone C/F (keep, prune only)
- Existing columnar conifer — Zone F (keep, the vertical accent)

### Key Shrubs
- Existing laurel hedge — Zone G (retain, trim late summer)
- Hydrangea 'Annabelle' — Zone D lower (white blooms, partial shade)
- Cornus 'Midwinter Fire' — Zone D (winter stem colour)

### Key Perennials & Grasses
- Lavandula 'Hidcote' — Zones A, C
- Stipa gigantea — Zone D (golden oat grass)
- Calamagrostis 'Karl Foerster' — Zone D (vertical, winter structure)
- Echinacea purpurea — Zone D (pollinators)
- Verbena bonariensis — Zone D (airy purple wands)
- Geranium 'Rozanne' — Zones G, D (May–Nov flowers)
- Alchemilla mollis — Zone G (chartreuse, edge-softening)
- Hosta (various) — Zone D lower (shade foliage)
- Dryopteris filix-mas — Zone F (dry shade fern)

### Climbers
- Wisteria or Rosa 'New Dawn' — Zone B pergola
- Variegated ivy — Zone F (controlled)

---

## Tool Selection (CONFIRMED by SrKeeda 2026-06-01)

**All through Atlas Cloud API. Single key. Single platform.**

### Images (Steps 1-2): Nano Banana 2
- **Provider:** Atlas Cloud API (`api.atlascloud.ai`)
- **Model:** `google/nano-banana/text-to-image` — $0.038/image
- **Edit model:** `google/nano-banana/edit` — $0.038/image (use CAD as reference)
- **Auth:** `Authorization: Bearer $ATLASCLOUD_API_KEY` ✅ configured
- **Endpoint:** `POST https://api.atlascloud.ai/api/v1/model/generateImage`

### Video (Step 3): Seedance v1 Pro
- **Provider:** Atlas Cloud API (`api.atlascloud.ai`)
- **Model:** `bytedance/seedance-v1-pro-i2v-1080p` — $0.11/video (1080p)
- **Alt:** `bytedance/seedance-v1-pro-i2v-720p` — $0.047/video (720p)
- **Auth:** Same ATLASCLOUD_API_KEY ✅
- **Endpoint:** `POST https://api.atlascloud.ai/api/v1/model/generateVideo`

### Primary CAD Input
- **CAD-Master-Plan-v3.png** — latest, 16×12 grid, staggered house profile with 10 wall faces

### Atlas Cloud API Pattern (both image and video)
```bash
# Step A: Submit
curl -s -X POST "https://api.atlascloud.ai/api/v1/model/generateImage" \
  -H "Authorization: Bearer $ATLASCLOUD_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{...}'
# Returns: { "code": 200, "data": { "id": "prediction-id" } }

# Step B: Poll (every 3-5s, ~5-15s for images, ~60-120s for video)
curl -s "https://api.atlascloud.ai/api/v1/model/prediction/{id}" \
  -H "Authorization: Bearer $ATLASCLOUD_API_KEY"
# Returns: { "code": 200, "data": { "status": "completed", "outputs": [...] } }

# Step C: Download
curl -o output.png "URL_FROM_OUTPUTS"
```

---

## Budget (from Design Doc)
~£2,000-3,000 total, phased over 6-8 months
- Phase 1 (clear/grades): Month 1
- Phase 2 (hardscape): Months 2-4
- Phase 3 (planting): Months 4-6
- Phase 4 (finishing): Months 6-8

---

## Key Decisions Still Open (from Design Doc)
1. Zone H — Wildlife nook, fire pit, or kitchen garden? (Recommended: wildlife)
2. Pergola climber — Wisteria or climbing rose? (Rose flowers year 1)
3. Terrace material — Railway sleepers or corten steel? (Sleepers = warmer)
4. Paving — Porcelain or natural stone? (Porcelain near house, gravel elsewhere)
5. Clothesline — Keep (screen it) or remove?

---

## Usage
When SrKeeda says the layout is ready, load this skill, read the latest CAD file, and execute the 3-step pipeline. Adapt prompts based on which AI tools are available at that time.

Created: 2026-06-01 from MrLarus reverse-engineering + existing Garden_Design_002.md + CAD catalogs

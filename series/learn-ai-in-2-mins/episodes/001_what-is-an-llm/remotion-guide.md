# Remotion Guide — Episode 001: What is an LLM?

Use this file with AI tools or manually when building/rendering this episode in Remotion.

## Episode identity

| Field | Value |
|-------|-------|
| Episode ID | `001` |
| Folder | `001_what-is-an-llm` |
| Title | What is an LLM? |
| Series | Learn AI in 2 Mins |
| Target duration | 90 seconds (90,000 ms) |
| Format | 1080×1920 vertical (YouTube Shorts) |
| FPS | 30 |

## Source files (read these first)

| File | Purpose |
|------|---------|
| [`episode.yaml`](episode.yaml) | Scene script — timings, voiceover, visuals, captions |
| [`voiceover.md`](voiceover.md) | Full narration for recording |
| This file | Remotion build + render instructions |

## Remotion project location

```
remotion/
├── src/Episode.tsx              ← loads this episode.yaml automatically
├── src/scenes/                  ← one React component per scene type
├── src/Root.tsx                 ← Composition: Episode001
└── public/episodes/{folder}/voiceover.mp3   ← auto-copied from episode folder on sync
```

---

## Step-by-step: create this video

### Step 1 — Record voiceover

Read [`voiceover.md`](voiceover.md) and record ~90 seconds of narration.

Save as **`voiceover.mp3` in this same folder**:

```
series/learn-ai-in-2-mins/episodes/001_what-is-an-llm/voiceover.mp3
```

Sync automatically copies it into Remotion when you render.

### Step 2 — Create the video

**Option A:** `npm run video:001` from repo root

**Option B:** Copy prompt from [`create-video.prompt.md`](create-video.prompt.md) into your AI terminal tool

Output: `remotion/out/001_what-is-an-llm.mp4`

### Step 3 — Verify scene timing (optional)

Preview with `cd remotion && npm run dev:001`, then confirm each scene matches:

| Scene ID | Type | Frames (30fps) | Duration | Starts at |
|----------|------|----------------|----------|-----------|
| `welcome` | series_intro | 180 | 6.0s | 0:00 |
| `hook` | question_hook | 240 | 8.0s | 0:06 |
| `metaphor_core` | concept_explain | 1620 | 54.0s | 0:14 |
| `recap` | key_takeaway | 360 | 12.0s | 1:08 |
| `outro` | series_outro | 300 | 10.0s | 1:20 |

**Total:** 2700 frames = 90.0 seconds

---

## Scene-by-scene visual spec

AI: implement or refine visuals to match these specs exactly.

### Scene 1 — `welcome` (series_intro)

**Voiceover:** Welcome to Learn AI in 2 Mins — quick concepts, simple metaphors, zero jargon overload.

**Layout:** `branded_card` on `gradient_dark_blue`

**Elements:**
1. Icon `lightbulb_brain` — scaleIn
2. Title "Learn AI in 2 Mins" — fadeIn
3. Subtitle "Quick concepts. Simple metaphors." — slideUp

**Captions:**
- 0–2.8s: "Welcome to Learn AI in 2 Mins"
- 2.8–6.0s: "Quick concepts. Simple metaphors."

**Remotion component:** `SeriesIntroScene`

---

### Scene 2 — `hook` (question_hook)

**Voiceover:** You probably use ChatGPT every day. But what actually IS a Large Language Model?

**Layout:** `split` on `dark_slate`

**Left:** chat_bubble icon (scaleIn)
**Right:** headline "What IS a Large Language Model?" (slideLeft)
**Badge top-right:** "Episode 001" (fadeIn)

**Captions:**
- 0–3.2s: "You use ChatGPT every day."
- 3.2–8.0s: "But what IS a Large Language Model?"

**Remotion component:** `QuestionHookScene`

---

### Scene 3 — `metaphor_core` (concept_explain)

**Voiceover:** Think of an LLM like autocomplete on steroids. You type a few words — your phone suggests the next one. An LLM does the same thing, but at massive scale. It was trained on billions of words from books, articles, and the web. It learned patterns — how words usually follow other words. So when you ask a question, it doesn't look things up. It predicts the most likely next word, then the next, and the next — until it forms a full answer. It's not a search engine. It's not a human brain. It's a pattern-prediction machine — and that's what makes it so powerful.

**Layout:** `infographic_stack` on `gradient_purple_blue`

**Headline:** "LLM = Autocomplete on Steroids" (fadeIn)
**Metaphor label:** "LLM = super-powered autocomplete"

**Infographic steps (staggered reveals):**

| startMs | Icon | Label |
|---------|------|-------|
| 0 | keyboard | You type a prompt |
| 9000 | arrow_right | Model predicts next word |
| 18000 | loop | Repeats word by word |
| 37000 | chat_bubble_complete | Full answer appears |

**Callout (highlight_red, ~47s):** "Not a search engine. Not a brain."

**Captions:** 12 timed chunks — see `episode.yaml` lines 87–123

**Remotion component:** `ConceptExplainScene` + `InfographicSteps`

---

### Scene 4 — `recap` (key_takeaway)

**Voiceover:** So remember — an LLM predicts the most likely next words based on patterns it learned from text. Powerful, but not magic.

**Layout:** `summary_card` on `dark_slate`

**Title:** "Key Takeaway" (fadeIn)
**Badge:** "LLM = Pattern Predictor" (highlight)

**Bullets (staggered slideUp):**
1. Predicts next words
2. Learned from text patterns
3. Not stored facts

**Remotion component:** `KeyTakeawayScene`

---

### Scene 5 — `outro` (series_outro)

**Voiceover:** That's your concept for today. Follow for the next one — Learn AI in 2 Mins.

**Layout:** `branded_card` on `gradient_dark_blue`

**Elements:**
1. CTA "Follow for the next concept" — pulse
2. Title "Learn AI in 2 Mins" — fadeIn
3. Badge "Next: What is a Neural Network?" — slideUp

**Remotion component:** `SeriesOutroScene`

---

## AI prompt templates

### Preview and review

```
Read series/learn-ai-in-2-mins/episodes/001_what-is-an-llm/remotion-guide.md
and episode.yaml. Run `cd remotion && npm run dev:001` and verify all 5 scenes
match the visual spec. List any timing or layout mismatches.
```

### Improve visuals

```
Using remotion-guide.md scene specs for Episode 001, enhance the Remotion scene
components in remotion/src/scenes/ to better match the infographic style.
Keep episode.yaml as source of truth — do not change timings without asking.
```

### Add voiceover and render

```
I placed voiceover.mp3 in remotion/public/episodes/001_what-is-an-llm/.
Run `cd remotion && npm run render:001` and confirm output is 1080x1920, 90 seconds.
```

### Extend with Remotion packages

```
Read remotion-guide.md for Episode 001. Add @remotion/transitions fade between
scenes 2→3 and 3→4. Use @remotion/noise for subtle background texture on
gradient_purple_blue in metaphor_core.
```

---

## Optional enhancements

These are not required for v1 but improve production quality:

- [ ] Replace emoji icons with custom SVG assets in `remotion/public/assets/`
- [ ] Add `@remotion/transitions` fade between hook → metaphor_core
- [ ] Add `@remotion/noise` subtle grain on backgrounds
- [ ] Use `@remotion/captions` for TikTok-style word-by-word captions
- [ ] Add background music tracks referenced in `episode.yaml` audio.music fields
- [ ] Add SFX at timestamps from `episode.yaml` audio.sfx arrays

---

## Validation checklist

Before publishing:

- [ ] Total duration = 90 seconds (2700 frames at 30fps)
- [ ] All 5 scenes render without errors
- [ ] Captions appear at correct timestamps
- [ ] Infographic steps appear at 0s, 9s, 18s, 37s
- [ ] Voiceover synced (if voiceover.mp3 provided)
- [ ] Output is 1080×1920 MP4
- [ ] Text readable on mobile (font size ≥ 28px)

---

## Related docs

- Repo guide: [`../../../../guide.md`](../../../../guide.md)
- Remotion docs: https://www.remotion.dev/docs
- Remotion prompts: https://www.remotion.dev/prompts
- Episode schema: [`../../schema/episode.schema.json`](../../schema/episode.schema.json)

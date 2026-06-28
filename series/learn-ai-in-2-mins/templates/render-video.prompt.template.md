# Render Video — Episode {NNN}: {Title} (generated from your recording)

**When to use:** Session 2 — after Session 1 wrote this file from your `voiceover.vtt`.

Copy everything in the **Prompt** section below into your AI terminal tool (Cursor, Claude Code, etc.).

---

## Visual brief (transcript-specific)

<!-- Session 1 fills this in from your actual voiceover.vtt -->

### Hook visual (question_hook scene)
- Icon: `{hookIcon}` (must differ from prior 4 episodes)
- Headline line 1: `{hookLine1}`
- Headline line 2: `{hookLine2}`
- Optional hookLabel: `{hookLabel}` — topic chip under headline
- Scroll-stop angle: {why this hook stops the scroll}

### Concept scene (concept_explain)
- Metaphor label: `{metaphor}`
- Headline: `{headline}`
- Infographic steps (synced to VTT beats):

| # | Label (max 5 words) | Icon | startMs (from VTT) |
|---|---------------------|------|--------------------|
| 1 | ... | neural | 0 |
| 2 | ... | sparkle | ... |
| 3 | ... | chip | ... |
| 4 | ... | check | ... |

> Vary the icon sequence from the prior 4 episodes — do not default to keyboard → arrow_right → loop → chat_bubble_complete.

- Callout pill: `{callout}`
- Optional calloutIcons: e.g. `["neural", "chip"]`
- Viral angle: {why the visual storytelling works for this topic}

### Differentiation check (mandatory)
- Axes varied vs prior 4 episodes: (list at least 3)
- Prior episode hooks/icons avoided: ...
- Step icon sequence used (not keyboard/arrow/loop/chat_bubble_complete unless justified): ...

### Recap (key_takeaway scene)
- Badge: `{badge}`
- Bullets (max 3, short phrases):
  1. ...
  2. ...
  3. ...

---

## Render verification (pre-checked in Session 1)

| Check | Status | Notes |
|-------|--------|-------|
| Colors (palette only) | pass | Uses `#f8fafc`, `#818cf8`, `#f87171`, slate backgrounds |
| Backgrounds | pass | `gradient_dark_blue`, `gradient_purple_blue`, `dark_slate` only |
| Layouts | pass | `branded_card`, `split`, `infographic_stack`, `summary_card` only |
| Animations | pass | fadeIn, slideUp, slideLeft, scaleIn, pulse, highlight only |
| Format | pass | 1080×1920, five-scene arc unchanged |
| New components needed | none | All visuals use existing Remotion layouts |

---

## Prompt (copy from here)

```
Create the YouTube Short video for Episode {NNN}: "{Title}"

My voiceover and visual plan are ready:
- MP3: series/learn-ai-in-2-mins/episodes/{folder}/voiceover.mp3
- VTT: series/learn-ai-in-2-mins/episodes/{folder}/voiceover.vtt
- Visual brief: this file (render-video.prompt.md)

## Workflow (follow in order)

1. Apply VTT timings to episode.yaml (captions + scene durations):
   cd remotion && node scripts/apply-vtt-to-episode.mjs {folder}

2. Update episode.yaml VISUAL FIELDS ONLY per the visual brief above:
   - question_hook: icon, headline, optional hookLabel
   - concept_explain: metaphor, headline, steps (label, icon, startMs), callout, optional contextIcons + calloutIcons
   - key_takeaway: badge, bullets, optional bulletIcons
   Do NOT change voiceover text or scene types.

3. Render the video:
   cd .. && npm run video:{NNN}

   Or from repo root: npm run video:{NNN}

## Visual style (mandatory)

Read and follow: series/learn-ai-in-2-mins/visual-style.md

Infographic-heavy, medium text — ~70% visuals, short on-screen phrases.
Animations: fadeIn, slideUp, slideLeft, scaleIn, pulse, highlight only.

Episode-specific technical reference (optional): remotion-guide.md in this folder.

## Output

- Updated episode.yaml (visual fields + VTT-synced timing)
- remotion/out/{folder}.mp4 — 1080×1920 vertical video

If render fails, diagnose and fix, then re-run npm run video:{NNN}.
When done, confirm voiceover.vtt and the output MP4 exist and tell me the paths.
```

---

## Manual alternative (no AI)

```bash
npm run video:{NNN}
```

Output: `remotion/out/{folder}.mp4`

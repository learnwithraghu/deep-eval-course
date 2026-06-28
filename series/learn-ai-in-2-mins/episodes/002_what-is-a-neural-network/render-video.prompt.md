# Render Video — Episode 002: What is a Neural Network? (generated from your recording)

## Visual brief (transcript-specific)

### Hook visual (question_hook scene)
- Icon: `neural` (not `brain` / `chat_bubble` used in prior episodes)
- hookLabel: "Neural Network" (topic chip — replaces generic LLM chip)
- Headline: "But what IS a Neural Network?"
- Scroll-stop angle: Network-graph icon + topic chip signals "this is about architecture, not chatbots."

### Concept scene (concept_explain)
- Metaphor label: "Subway map — transfer at each station"
- Headline: "Layers = Stations on the Line"
- Floating contextIcons: `chip`, `sparkle`, `pattern` (episode-specific ambient icons)
- Infographic steps (synced to VTT beats, scene-relative startMs):

| # | Label (max 5 words) | Icon | startMs (scene-relative) |
|---|---------------------|------|--------------------------|
| 1 | Data enters Station 1 | pattern | 4559 |
| 2 | Transfer to deeper tracks | neural | 8439 |
| 3 | More stops, more signals | sparkle | 15179 |
| 4 | Exit with final answer | check | 21259 |

- Callout pill: "Inspired by the brain — but it's just math."
- calloutIcons: `["neural", "chip"]` (not search_crossed + brain_crossed)
- Viral angle: Subway-map metaphor makes layer stacking feel like a journey; varied icon sequence keeps the feed fresh.

### Recap (key_takeaway scene)
- Badge: "NN = Layered Signals"
- bulletIcons: `["neural", "chip", "check"]`
- Bullets (max 3, short phrases):
  1. Stacked layers detect patterns
  2. Simple steps build the answer
  3. Simple pieces, smart together

### Differentiation check (mandatory)
Axes varied vs prior episodes (001 scaffold + 003–006 defaults):

| Axis | This episode (002) | Prior pattern avoided |
|------|-------------------|------------------------|
| Hook icon | `neural` + hookLabel | 001 `chat_bubble`; 003 `chat_bubble`; 006 `keyboard` |
| Metaphor | Subway map / stations | 001 autocomplete; 003 nesting dolls; 004 bike; 005 exam |
| Step icons | `pattern → neural → sparkle → check` | Default `keyboard → arrow_right → loop → chat_bubble_complete` (001–006) |
| Callout icons | `neural`, `chip` | Hardcoded search_crossed + brain_crossed |
| Recap | badge + `neural/chip/check` bullets | Default predict/pattern/database_x |

**Result:** 5/5 axes differ from episode 001 and from the repetitive scaffold in 003–006.

---

## Render verification (pre-checked in Session 1)

| Check | Status | Notes |
|-------|--------|-------|
| Colors (palette only) | pass | Uses `#f8fafc`, `#818cf8`, `#f87171`, muted slate, on dark gradients |
| Backgrounds | pass | `gradient_dark_blue` (welcome/outro), `dark_slate` (hook/recap), `gradient_purple_blue` (concept) |
| Layouts | pass | `branded_card`, `split`, `infographic_stack`, `summary_card` only |
| Animations | pass | fadeIn, slideUp, slideLeft, scaleIn, pulse, highlight only |
| Format | pass | 1080×1920, five-scene arc unchanged |
| New components needed | none | Uses new optional yaml fields: hookLabel, contextIcons, calloutIcons, bulletIcons |

---

## Prompt (copy from here)

```
Create the YouTube Short video for Episode 002: "What is a Neural Network?"

My voiceover and visual plan are ready:
- MP3: series/learn-ai-in-2-mins/episodes/002_what-is-a-neural-network/voiceover.mp3
- VTT: series/learn-ai-in-2-mins/episodes/002_what-is-a-neural-network/voiceover.vtt
- Visual brief: this file (render-video.prompt.md)

## Workflow (follow in order)

1. Apply VTT timings to episode.yaml (captions + scene durations):
   cd remotion && node scripts/apply-vtt-to-episode.mjs 002_what-is-a-neural-network

2. Update episode.yaml VISUAL FIELDS ONLY per the visual brief above:
   - question_hook: icon, headline, hookLabel
   - concept_explain: metaphor, headline, steps (label, icon, startMs), callout, contextIcons, calloutIcons
   - key_takeaway: badge, bullets, bulletIcons
   Do NOT change voiceover text or scene types.

3. Render the video:
   cd .. && npm run video:002

   Or from repo root: npm run video:002

## Visual style (mandatory)

Read and follow: series/learn-ai-in-2-mins/visual-style.md

Infographic-heavy, medium text — ~70% visuals, short on-screen phrases.
Animations: fadeIn, slideUp, slideLeft, scaleIn, pulse, highlight only.

Episode-specific technical reference (optional): remotion-guide.md in this folder.

## Output

- Updated episode.yaml (visual fields + VTT-synced timing)
- remotion/out/002_what-is-a-neural-network.mp4 — 1080×1920 vertical video

If render fails, diagnose and fix, then re-run npm run video:002.
When done, confirm voiceover.vtt and the output MP4 exist and tell me the paths.
```

---

## Do NOT in this session
- Do NOT modify episode.yaml
- Do NOT run npm run video:002 or render

When done, tell me: "Open render-video.prompt.md in your next session to build the video."

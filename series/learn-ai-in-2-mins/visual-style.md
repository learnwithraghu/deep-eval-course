# Learn AI in 2 Mins — Visual & Animation Style

Every episode in this series follows the same look and motion language. When building or updating Remotion scenes, match this pattern so the course feels like one cohesive brand.

## Format

| Property | Value |
|----------|-------|
| Resolution | 1080×1920 (9:16 vertical) |
| FPS | 30 |
| Target duration | ~90 seconds (driven by your `voiceover.mp3`) |
| Font | Inter (via `@remotion/google-fonts`) |
| Base background | `#0f172a` (slate-900) |

## Visual-first, medium text

Every episode should feel **infographic-heavy and visualization-heavy** — stunning visuals that stop the scroll, with medium-density text on screen. The voiceover carries the explanation; the screen shows the story.

| Principle | Rule |
|-----------|------|
| Screen real estate | ~70% visuals / diagrams / icons, ~30% text |
| Headlines | Max 6 words |
| Step labels | Max 5 words each; let the icon carry meaning |
| On-screen text | Medium density — short phrases, not paragraphs |
| Captions | Medium-sized readable pills (34px); narration does the explaining |
| Viral Shorts feel | One bold visual metaphor per concept scene; stagger reveals synced to VTT beats |

When planning visuals from a transcript, prioritize icon stacks, staggered infographic steps, and metaphor labels over long on-screen copy.

## Visual differentiation (mandatory)

**Each episode must look visually distinct from the previous 4 episodes.** Before planning, read the `visual:` blocks (hook, `metaphor_core`, recap) from the prior 4 `episode.yaml` files.

Vary this episode on **at least 3** of these axes:

| Axis | What to vary |
|------|----------------|
| Hook icon | `left.asset` — avoid repeating the same hero icon as recent episodes |
| Hook sub-label | Optional `hookLabel` under the headline (topic chip, not a generic label) |
| Metaphor | Family + phrasing — e.g. autocomplete, nesting dolls, assembly line, exam day, subway map, recipe layers |
| Step icon sequence | All 4 step icons — **do not** default to `keyboard → arrow_right → loop → chat_bubble_complete` |
| Callout treatment | Callout text + optional `calloutIcons` pair |
| Recap | Badge shorthand + optional `bulletIcons` for the 3 bullets |

**Good variety examples:** Episode A uses `chat_bubble` + autocomplete metaphor + `keyboard/arrow/loop/chat_bubble_complete`; Episode B uses `neural` + subway-map metaphor + `neural/sparkle/chip/check` + `calloutIcons: [neural, chip]`.

**Bad (too similar):** Same hook icon, same 4-step icon sequence, and same metaphor family as any of the last 4 episodes.

Document which axes you changed vs the prior 4 in `render-video.prompt.md` under a **Differentiation check** subsection.

## Five-scene arc (same every episode)

| # | Scene type | ~Duration | Background | Purpose |
|---|------------|-----------|------------|---------|
| 1 | `series_intro` | 6s | `gradient_dark_blue` | Series welcome card |
| 2 | `question_hook` | 8s | `dark_slate` | Relatable question + episode badge |
| 3 | `concept_explain` | 52–54s | `gradient_purple_blue` | Metaphor + infographic steps |
| 4 | `key_takeaway` | 12s | `dark_slate` | 3-bullet recap card |
| 5 | `series_outro` | 10s | `gradient_dark_blue` | Follow CTA + next episode teaser |

Scene durations scale proportionally when your recording differs from 90s. Caption timing always comes from `voiceover.vtt` (transcribed from your MP3).

## Backgrounds

| Token | Gradient |
|-------|----------|
| `gradient_dark_blue` | `#0f172a → #1e3a5f → #0f172a` at 160° |
| `gradient_purple_blue` | `#1e1b4b → #4338ca → #312e81` at 160° |
| `dark_slate` | `#0f172a → #1e293b` at 180° |

## Color palette

| Role | Hex |
|------|-----|
| Primary text | `#f8fafc` |
| Muted text | `#94a3b8` |
| Accent | `#818cf8` |
| Highlight / callout | `#f87171` |
| Caption pill bg | `rgba(15, 23, 42, 0.82)` |

## Animation vocabulary

Use only these animation names in `episode.yaml` — each maps to a Remotion component:

| Animation | Effect | Typical use |
|-----------|--------|-------------|
| `fadeIn` | Opacity 0→1 over ~20 frames | Titles, labels |
| `slideUp` | Translate Y + fade | Subtitles, bullets, steps |
| `slideLeft` | Translate X + fade | Headlines on hook scene |
| `scaleIn` | Scale 0.85→1 + fade | Icons, hero elements |
| `pulse` | Subtle scale oscillation | CTA buttons |
| `highlight` | Accent glow / border pulse | Key badges |

**Stagger rule:** sequential elements delay by ~8 frames each (`delayFrames = index * 8`).

**Intro scene extras:** three floating icons (sparkle, neural, chip) at 50% opacity with a gentle sine float — already baked into `SeriesIntroScene`.

## Layout patterns

### `branded_card` (intro + outro)
- Centered vertical stack, 64px padding
- Icon → title → subtitle/CTA
- Floating ambient icons in corners

### `split` (question hook)
- Left: large icon (scaleIn)
- Right: headline (slideLeft)
- Optional `hookLabel` — topic chip under headline (episode-specific, not hardcoded)
- Top-right badge: "Episode NNN" (fadeIn)

### `infographic_stack` (concept explain)
- Headline at top (fadeIn)
- Metaphor label below headline
- Steps stack vertically with staggered `slideUp` reveals timed to narration (`startMs`)
- Optional floating `contextIcons` (name, startMs, x, y) in the scene background
- Optional callout pill (`highlight_red`) near the end; optional `calloutIcons` (up to 2 icon names)

### `summary_card` (key_takeaway)
- "Key Takeaway" title (fadeIn)
- Highlight badge with metaphor shorthand
- Up to 3 bullets (staggered slideUp); optional `bulletIcons` per bullet

## Captions

- Generated from `voiceover.vtt` (transcribed from your MP3)
- Rendered as centered pill at `bottom: 180px`
- Font: 34px, weight 600, white on dark pill with subtle border
- Fade in/out: 10 frames in, 8 frames out
- Grouped into short readable phrases (~3–6 words per cue)

## Infographic steps (concept scene)

Each step has:
- `label` — short action phrase
- `icon` — from the shared icon set (`keyboard`, `arrow_right`, `loop`, etc.)
- `startMs` — when the step animates in (synced to VTT narration beats)
- `animation` — usually `slideUp`

Steps reveal one at a time; do not show all steps at once.

## Icons

Use emoji-style SVG icons from `remotion/src/icons/`. Do not mix in external icon libraries — keeps visual consistency across episodes.

## What NOT to do

- No horizontal (16:9) layouts
- No bright white backgrounds
- No more than 3 bullets on recap
- No scene types outside the five-scene arc (unless adding a deliberate series exception)
- Do not hand-edit caption timestamps — always regenerate from `voiceover.vtt`

## Reference implementation

Episode 001 is the canonical example:

- Script: [`episodes/001_what-is-an-llm/episode.yaml`](episodes/001_what-is-an-llm/episode.yaml)
- Visual spec: [`episodes/001_what-is-an-llm/remotion-guide.md`](episodes/001_what-is-an-llm/remotion-guide.md)
- Remotion components: `remotion/src/scenes/`

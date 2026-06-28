# Learn AI in 2 Mins — Series Bible

A YouTube Shorts series that teaches AI concepts in **~90 seconds** using simple metaphors and infographic-style visuals. Every episode is a self-contained Remotion-ready script.

## Audience

Everyone — complete beginners, tech-curious developers, and people who want a quick refresher. No prior ML background assumed.

## Tone & style

- **One metaphor per episode** — anchor the concept to something familiar (phone autocomplete, a library, a chef following a recipe)
- **Infographic-first visuals** — each scene specifies layout, icons, steps, and animations for Remotion
- **Zero jargon overload** — introduce terms only when needed; define them in plain language
- **Confident but honest** — celebrate what AI can do; clarify what it cannot (no magic, no human brain)

## Episode structure (90 seconds)

Every episode follows the same five-scene arc:

| Scene | Type | Duration | Purpose |
|-------|------|----------|---------|
| 1 | `series_intro` | ~6s | Series welcome — reuse from `templates/welcome.yaml` |
| 2 | `question_hook` | ~8s | Relatable question that creates curiosity |
| 3 | `concept_explain` | ~52–54s | Core metaphor + infographic walkthrough |
| 4 | `key_takeaway` | ~12s | 3-bullet recap on screen |
| 5 | `series_outro` | ~10s | CTA + sign-off — reuse from `templates/outro.yaml` |

**Total target:** `targetDurationMs: 90000` (~143 wpm speaking pace, ~210–220 words)

## Scene types

| Type | When to use |
|------|-------------|
| `series_intro` | Always scene 1 — series branding |
| `question_hook` | Always scene 2 — "You use X, but what IS Y?" |
| `concept_explain` | Main teaching block with metaphor + infographic steps |
| `metaphor_visual` | Optional extra scene for complex metaphors needing full-bleed visual |
| `comparison` | Side-by-side "X is NOT Y" clarifications |
| `key_takeaway` | Always second-to-last — 3 bullets max |
| `series_outro` | Always final scene — follow CTA |

## Authoring checklist

When writing a new episode:

1. Pick topic from [`catalog/topics.yaml`](catalog/topics.yaml) and set `status: draft`
2. Create folder `episodes/{NNN}_{slug}/`
3. Copy structure from [`episodes/001_what-is-an-llm/episode.yaml`](episodes/001_what-is-an-llm/episode.yaml)
4. Reuse welcome/outro voiceover from [`templates/`](templates/) (inline identical copy is fine)
5. Write one strong metaphor for the concept scene
6. Add `captions[]` with `startMs`/`endMs` synced to voiceover beats
7. Specify `visual.steps[]` with icons and `startMs` for staggered infographic reveals
8. Verify scene durations sum to **90,000 ms**
9. Update outro badge with next episode title (e.g. "Next: What is a Neural Network?")
10. Add `voiceover.md` — full read-through copy for recording (see Episode 001)
11. Add `remotion-guide.md` — Remotion build guide for AI + manual rendering

## Remotion mapping

Each scene maps 1:1 to a Remotion `<Sequence>`:

```
EpisodeLoader
  ├── SeriesIntro      ← scenes[type=series_intro]
  ├── QuestionHook     ← scenes[type=question_hook]
  ├── ConceptExplain   ← scenes[type=concept_explain]
  ├── KeyTakeaway      ← scenes[type=key_takeaway]
  └── SeriesOutro      ← scenes[type=series_outro]
```

Visual fields drive composition props:

- `visual.layout` → which Remotion template to render
- `visual.steps[]` → staggered `<Sequence>` children inside infographic
- `visual.elements[]` → text/icon layers with `animation` props
- `captions[]` → on-screen subtitle timing
- `audio.sfx[]` → sound effect triggers at `startMs`

## File conventions

```
episodes/
  001_what-is-an-llm/
    episode.yaml           # Remotion scene script
    voiceover.md           # Recording copy
    voiceover.mp3          # Your recording (you add this)
    create-video.prompt.md # Copy-paste AI prompt to render video
    remotion-guide.md      # Technical reference (optional)
```

- Episode IDs: zero-padded 3 digits (`001`–`100`)
- Slugs: kebab-case, match folder name
- Schema: [`schema/episode.schema.json`](schema/episode.schema.json)

## Catalog status values

| Status | Meaning |
|--------|---------|
| `planned` | Topic reserved, no script yet |
| `draft` | Script written, not yet rendered |
| `published` | Video rendered and live on YouTube |

## Episode 001 reference

**Topic:** What is an LLM?
**Metaphor:** Autocomplete on steroids
**Key insight:** LLMs predict next words from learned patterns — they don't search or remember facts

See full script: [`episodes/001_what-is-an-llm/episode.yaml`](episodes/001_what-is-an-llm/episode.yaml)

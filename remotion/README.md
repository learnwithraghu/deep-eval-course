# Remotion — Learn AI in 2 Mins

Video engine. You usually don't need to touch this directly.

## Commands

```bash
npm run render:001                              # render Episode 001
npm run render -- 001_what-is-an-llm             # same thing
npm run dev:001                                 # preview in browser
```

From repo root: `npm run video:001`

## How voiceover works

1. You save `voiceover.mp3` in the **episode folder** (not here)
2. `npm run render` syncs it → `public/episodes/{folder}/voiceover.mp3`
3. Remotion layers your audio over the visuals

## Docs

- [`../guide.md`](../guide.md) — your 6-step workflow
- Session 1 prompt: [`../series/.../001.../plan-video.prompt.md`](../series/learn-ai-in-2-mins/episodes/001_what-is-an-llm/plan-video.prompt.md)
- Render template: [`../series/.../templates/render-video.prompt.template.md`](../series/learn-ai-in-2-mins/templates/render-video.prompt.template.md)

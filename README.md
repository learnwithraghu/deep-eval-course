# Learn AI in 2 Mins — YouTube Shorts Series

You record the voice. Remotion builds the video.

**Start here:** [`guide.md`](guide.md)

## Your workflow

1. Read `voiceover.md` in the episode folder
2. Record → save as `voiceover.mp3` in the same folder
3. **Session 1:** paste prompt from `plan-video.prompt.md` → generates `render-video.prompt.md`
4. **Session 2:** paste prompt from `render-video.prompt.md` → builds the video

Or skip AI planning: `npm run video:001`

## Structure

```
youtube-ai-shorts-series/
├── guide.md                    # 6-step workflow
├── package.json                # npm run video:001
├── remotion/                   # video engine (you rarely touch this)
└── series/learn-ai-in-2-mins/
    └── episodes/
        └── 001_what-is-an-llm/
            ├── voiceover.md           ← read & record
            ├── voiceover.mp3          ← you add this
            ├── plan-video.prompt.md   ← Session 1 (plan visuals)
            ├── render-video.prompt.md ← Session 2 (generated, build video)
            └── episode.yaml           ← scene script (done)
```

## Commands

```bash
npm run video:001                              # render Episode 001 (no AI planning)
npm run video -- 002_what-is-a-neural-network  # future episodes
cd remotion && npm run dev:001                 # preview (optional)
```

Output: `remotion/out/001_what-is-an-llm.mp4`

# Learn AI in 2 Mins — YouTube Shorts Series

You record the voice. Remotion builds the video.

**Start here:** [`guide.md`](guide.md)

## Your workflow

1. Read `voiceover.md` in the episode folder
2. Record → save as `voiceover.mp3` in the same folder
3. Run `npm run video:001` or paste the prompt from `create-video.prompt.md`

## Structure

```
youtube-ai-shorts-series/
├── guide.md                    # 5-step workflow
├── package.json                # npm run video:001
├── remotion/                   # video engine (you rarely touch this)
└── series/learn-ai-in-2-mins/
    └── episodes/
        └── 001_what-is-an-llm/
            ├── voiceover.md           ← read & record
            ├── voiceover.mp3          ← you add this
            ├── create-video.prompt.md ← AI prompt (copy-paste)
            └── episode.yaml           ← scene script (done)
```

## Commands

```bash
npm run video:001                              # render Episode 001
npm run video -- 002_what-is-a-neural-network  # future episodes
cd remotion && npm run dev:001                 # preview (optional)
```

Output: `remotion/out/001_what-is-an-llm.mp4`

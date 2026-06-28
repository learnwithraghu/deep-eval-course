# Learn AI in 2 Mins — Your Workflow

You only need to **record your voice**. Everything else is already in the repo.

## 5 steps

### 1. Open the voiceover script

```
series/learn-ai-in-2-mins/episodes/001_what-is-an-llm/voiceover.md
```

Read it straight through. Target ~90 seconds.

### 2. Record your audio

Record on your phone or mic. Export as **MP3**.

### 3. Save the MP3 in the episode folder

```
series/learn-ai-in-2-mins/episodes/001_what-is-an-llm/voiceover.mp3
```

That's it — one file, same folder as `voiceover.md`.

### 4. Trigger video creation (pick one)

**Option A — Terminal (no AI):**

```bash
npm run video:001
```

**Option B — AI tool in terminal:**

Open the episode folder and copy the prompt from:

```
series/learn-ai-in-2-mins/episodes/001_what-is-an-llm/create-video.prompt.md
```

Paste it into Cursor / Claude Code / any AI terminal agent.

### 5. Get your video

Output file:

```
remotion/out/001_what-is-an-llm.mp4
```

1080×1920 vertical, ~90 seconds, your voice + infographic visuals.

---

## Episode folder (everything for one video)

```
episodes/001_what-is-an-llm/
├── voiceover.md              ← read & record from this
├── voiceover.mp3             ← you add this (step 3)
├── create-video.prompt.md    ← copy-paste into AI (step 4)
├── episode.yaml              ← scene script (already done)
└── remotion-guide.md         ← technical reference (optional)
```

---

## Commands cheat sheet

| What | Command |
|------|---------|
| Create video (Episode 001) | `npm run video:001` |
| Create video (any episode) | `npm run video -- 002_what-is-a-neural-network` |
| Preview in browser (optional) | `cd remotion && npm run dev:001` |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Missing voiceover.mp3" | Save your recording as `voiceover.mp3` in the episode folder |
| No audio in video | Re-run render after adding MP3 — sync copies it automatically |
| Want to preview first | `cd remotion && npm run dev:001` |

---

## Future episodes

Same flow every time:

1. `voiceover.md` → record → `voiceover.mp3` in episode folder
2. Copy prompt from `create-video.prompt.md`
3. Run `npm run video -- {episode-folder}`

Each new episode gets its own `create-video.prompt.md` with the ready-to-use AI prompt.

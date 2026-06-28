# Episode 006 — What is a Token?

**Series:** Learn AI in 2 Mins  
**Target duration:** ~90 seconds  
**Source script:** [`episode.yaml`](episode.yaml)

---

## Save your recording here

After recording, save as:

```
voiceover.mp3   ← same folder as this file
```

---

## Full voiceover (read straight through)

Welcome to Learn AI in 2 Mins — quick concepts, simple metaphors, zero jargon overload.

LLMs don't read whole sentences. They read tokens. But what are those?

A token is a bite-sized chunk of text — not always a whole word. "ChatGPT" might be one token. "Understanding" could split into "Under" and "standing." Even punctuation counts. LLMs break your prompt into tokens because they're easier to process mathematically. Each token gets a number, flows through the model, and the model predicts the next token — one piece at a time. That's why context limits are measured in tokens, not words. A 128K context window means 128 thousand tokens — roughly 90 thousand words. Smaller chunks, smarter processing.

Tokens are the small text pieces LLMs actually read and write — not full words, but chunks that make math-based language processing possible.

That's your concept for today. Follow for the next one — Learn AI in 2 Mins.

---

## Next step

1. Save recording as `voiceover.mp3` in this folder
2. Open [`plan-video.prompt.md`](plan-video.prompt.md) and paste the prompt into your AI tool (Session 1 — plans visuals)
3. In your next session, open the generated [`render-video.prompt.md`](render-video.prompt.md) and paste that prompt (Session 2 — builds video)

Or skip AI planning and run: `npm run video:006` from repo root

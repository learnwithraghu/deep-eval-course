# Episode 007 — What are Embeddings?

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

Computers don't understand words. So how does AI grasp meaning? Embeddings.

An embedding turns a word or sentence into a list of numbers — a point in high-dimensional space. Think GPS coordinates for meaning. "King" and "Queen" land near each other. "King" and "Banana" sit far apart. The model doesn't read "happy" — it reads a vector of numbers that captures happy-ness, and compares distances to other vectors. Similar meanings cluster together. That's how search, recommendations, and RAG find relevant content — not by matching exact words, but by comparing embedding distances. Words become math. Meaning becomes geometry.

Embeddings convert text into numbers where similar meanings sit close together — that's how AI understands and searches by meaning, not spelling.

That's your concept for today. Follow for the next one — Learn AI in 2 Mins.

---

## Next step

1. Save recording as `voiceover.mp3` in this folder
2. Open [`plan-video.prompt.md`](plan-video.prompt.md) and paste the prompt into your AI tool (Session 1 — plans visuals)
3. In your next session, open the generated [`render-video.prompt.md`](render-video.prompt.md) and paste that prompt (Session 2 — builds video)

Or skip AI planning and run: `npm run video:007` from repo root

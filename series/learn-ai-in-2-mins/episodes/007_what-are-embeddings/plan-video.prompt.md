# Plan Video — Episode 007

**When to use:** Session 1 — after you've saved `voiceover.mp3` in this folder.

Copy everything in the box below into your AI terminal tool (Cursor, Claude Code, etc.).

This session transcribes your recording, designs a transcript-specific viral visual plan (must differ from the prior 4 episodes — see visual-style.md), verifies it against the style guide, and writes `render-video.prompt.md` for Session 2.

**Do NOT render or modify `episode.yaml` in this session.**

---

## Prompt (copy from here)

```
Plan the YouTube Short video for Episode 007: "What are Embeddings?"

My voiceover is ready at:
series/learn-ai-in-2-mins/episodes/007_what-are-embeddings/voiceover.mp3

## Step 1 — Transcribe

Transcribe my MP3 to VTT (accurate caption timing from my actual recording):

cd remotion && npm run vtt -- 007_what-are-embeddings

Confirm voiceover.vtt exists at:
series/learn-ai-in-2-mins/episodes/007_what-are-embeddings/voiceover.vtt

## Step 2 — Design viral visual plan from transcript

Read these files:
- voiceover.vtt (my actual recording — timing and words)
- episode.yaml (current scene script in this folder)
- series/learn-ai-in-2-mins/visual-style.md (brand rules)

For THIS specific transcript, design an infographic-heavy, medium-text visual plan:

- Hook visual: icon + headline combo for max scroll-stop (question_hook scene)
- Concept scene: infographic steps timed to actual VTT narration beats (startMs per cue)
- Icon choices from existing set only (keyboard, arrow_right, loop, brain, chat_bubble, chat_bubble_complete, chip, sparkle, neural, etc.)
- One memorable metaphor visual (e.g. assembly line, nesting dolls, autocomplete)
- Recap: 3 bullets max, badge shorthand (key_takeaway scene)

Rules:
- Infographic-heavy, visualization-heavy, medium text on screen
- Headlines max 6 words; step labels max 5 words
- Minimize on-screen words; let icons and staggered reveals tell the story
- Voiceover carries the explanation; screen shows the visual story

## Anti-repetition condition (mandatory)

Read the visual: blocks (hook, metaphor_core, recap) from the last 4 episode folders before this one under:
series/learn-ai-in-2-mins/episodes/

Your design MUST differ from those episodes on at least 3 axes listed in visual-style.md (Visual differentiation):
- hook icon (+ optional hookLabel sub-chip)
- metaphor family and phrasing
- step icon sequence (do NOT default to keyboard → arrow_right → loop → chat_bubble_complete)
- callout visual treatment (text + optional calloutIcons)
- recap badge + bulletIcons

Document which axes you varied vs each of the last 4 episodes in render-video.prompt.md (Differentiation check section).
If fewer than 4 prior episodes exist, vary from all available prior episodes.

## Step 3 — Render feasibility check

Before writing output, verify the plan against these hard constraints:

- Colors: only palette in visual-style.md (#0f172a, #f8fafc, #94a3b8, #818cf8, #f87171)
- Backgrounds: gradient_dark_blue, gradient_purple_blue, dark_slate only
- Animations: fadeIn, slideUp, slideLeft, scaleIn, pulse, highlight only
- Layouts: branded_card, split, infographic_stack, summary_card only
- Format: 1080×1920, five-scene arc unchanged
- If any idea needs new Remotion components, downgrade to existing layouts

Document pass/fail for colors, layouts, and animations in the output.

## Step 4 — Write render-video.prompt.md

Write the render prompt to:
series/learn-ai-in-2-mins/episodes/007_what-are-embeddings/render-video.prompt.md

Use this structure (fill in all sections from your transcript-specific plan):

# Render Video — Episode 007: What are Embeddings? (generated from your recording)

## Visual brief (transcript-specific)
- Hook visual: icon, headline lines, scroll-stop angle
- Metaphor: label + headline for concept scene
- Concept steps: table with label (max 5 words), icon, startMs from VTT
- Callout pill text
- Recap bullets + badge
- Viral angle: why this visual plan will stop the scroll

## Render verification (pre-checked)
- Colors: pass/fail + notes
- Layouts: pass/fail + notes
- Animations: pass/fail + notes

## Prompt (copy from here)
[Full Session 2 block with these steps:]
1. cd remotion && node scripts/apply-vtt-to-episode.mjs 007_what-are-embeddings
2. Update episode.yaml VISUAL FIELDS ONLY per the visual brief (steps, icons, headlines, callout — not voiceover text)
3. npm run video:007 from repo root
4. Confirm voiceover.vtt and remotion/out/007_what-are-embeddings.mp4 exist

Reference template: series/learn-ai-in-2-mins/templates/render-video.prompt.template.md

## Do NOT in this session
- Do NOT modify episode.yaml
- Do NOT run npm run video:007 or render

When done, tell me: "Open render-video.prompt.md in your next session to build the video."
```

---

## Manual alternative (skip AI planning)

```bash
npm run video:007
```

Skips viral visual planning — transcribes, syncs timing, and renders with existing episode.yaml visuals.

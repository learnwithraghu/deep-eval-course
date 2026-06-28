#!/usr/bin/env node
/**
 * Generates episode assets (episode.yaml, voiceover.md, plan-video.prompt.md)
 * Usage: node scripts/generate-episodes.mjs
 *
 * Visual scaffolding defaults are starting points only — Session 1 planning must
 * apply the Visual differentiation rule in visual-style.md (vary from prior 4 episodes).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const episodesRoot = path.resolve(__dirname, "../episodes");

const WELCOME_VO =
  "Welcome to Learn AI in 2 Mins — quick concepts, simple metaphors, zero jargon overload.";
const OUTRO_VO =
  "That's your concept for today. Follow for the next one — Learn AI in 2 Mins.";

const episodes = [
  {
    id: "002",
    folder: "002_what-is-a-neural-network",
    slug: "what-is-a-neural-network",
    title: "What is a Neural Network?",
    hook: "You hear neural networks everywhere in AI. But what actually IS one?",
    hookLine1: "Neural networks are everywhere.",
    hookLine2: "But what IS a Neural Network?",
    hookIcon: "brain",
    headline: "Neural Network = Layered Pattern Detector",
    metaphor: "Neural network = assembly line of pattern detectors",
    concept: `Think of a neural network like an assembly line of decision-makers. Data enters at one end — maybe a photo or a sentence. The first layer catches simple patterns — edges, basic shapes, or common word pairs. Each layer passes its findings to the next, which spots more complex patterns. By the final layer, the network combines all those signals into an answer — cat or dog, spam or not spam. It's inspired by the brain, but much simpler — just math layers stacked on top of each other. No single layer is smart alone. The power comes from the stack — many simple steps building up to something useful.`,
    callout: "Inspired by the brain — but it's just math.",
    steps: [
      { label: "Input enters (image, text…)", icon: "keyboard", startMs: 0 },
      { label: "Layer 1 spots simple patterns", icon: "arrow_right", startMs: 9000 },
      { label: "Deeper layers combine signals", icon: "loop", startMs: 18000 },
      { label: "Final layer outputs prediction", icon: "chat_bubble_complete", startMs: 37000 },
    ],
    captions: [
      ["Think of a neural network like an assembly line.", 0, 4500],
      ["Data enters — a photo or a sentence.", 4500, 8500],
      ["Layer 1 catches simple patterns.", 8500, 13000],
      ["Each layer passes findings to the next.", 13000, 17500],
      ["Deeper layers spot complex patterns.", 17500, 22000],
      ["Final layer combines everything.", 22000, 26500],
      ["Output: cat or dog, spam or not spam.", 26500, 31000],
      ["Inspired by the brain — but simpler.", 31000, 35000],
      ["Just math layers stacked together.", 35000, 39000],
      ["No single layer is smart alone.", 39000, 43000],
      ["Power comes from the stack.", 43000, 47000],
      ["Simple steps → useful answer.", 47000, 54000],
    ],
    recap: "So remember — a neural network is stacked layers that detect patterns step by step. Simple pieces, smart together.",
    recapLine1: "Stacked layers detect patterns",
    recapLine2: "Simple steps build to an answer",
    recapLine3: "Simple pieces, smart together.",
    bullets: ["Stacked layers of math", "Each layer finds patterns", "Output = combined prediction"],
    badge: "NN = Layer Stack",
    nextEpisode: "AI vs ML vs Deep Learning",
    wordCount: 215,
  },
  {
    id: "003",
    folder: "003_ai-vs-ml-vs-deep-learning",
    slug: "ai-vs-ml-vs-deep-learning",
    title: "AI vs Machine Learning vs Deep Learning",
    hook: "AI, Machine Learning, Deep Learning — people use these interchangeably. What's the difference?",
    hookLine1: "AI. ML. Deep Learning.",
    hookLine2: "What's the actual difference?",
    hookIcon: "chat_bubble",
    headline: "AI ⊃ ML ⊃ Deep Learning",
    metaphor: "Russian nesting dolls — each fits inside the next",
    concept: `Picture three Russian nesting dolls. The biggest doll is Artificial Intelligence — any system that mimics smart behavior. Chess bots, recommendation engines, chatbots — all AI. Inside that sits Machine Learning — AI that learns from data instead of hard-coded rules. Spotify learning your taste? That's ML. Inside ML sits the smallest doll: Deep Learning — ML using neural networks with many layers. ChatGPT, image generators, voice recognition — that's deep learning. So every deep learning system is machine learning. Every ML system is AI. But not all AI uses ML, and not all ML is deep. Three terms, one nested family.`,
    callout: "Deep Learning ⊂ ML ⊂ AI",
    steps: [
      { label: "AI — any smart-seeming system", icon: "keyboard", startMs: 0 },
      { label: "ML — learns from data", icon: "arrow_right", startMs: 9000 },
      { label: "Deep Learning — neural nets with layers", icon: "loop", startMs: 18000 },
      { label: "ChatGPT & image AI = Deep Learning", icon: "chat_bubble_complete", startMs: 37000 },
    ],
    captions: [
      ["Picture three Russian nesting dolls.", 0, 4500],
      ["Biggest: Artificial Intelligence.", 4500, 9000],
      ["Any system mimicking smart behavior.", 9000, 13500],
      ["Inside: Machine Learning.", 13500, 17500],
      ["AI that learns from data.", 17500, 21500],
      ["Not hard-coded rules.", 21500, 25000],
      ["Inside ML: Deep Learning.", 25000, 29000],
      ["Neural networks with many layers.", 29000, 33500],
      ["ChatGPT = Deep Learning.", 33500, 37500],
      ["Every DL system is ML. Every ML is AI.", 37500, 43000],
      ["Not all AI uses ML.", 43000, 48000],
      ["Three terms, one nested family.", 48000, 54000],
    ],
    recap: "Remember — AI is the big umbrella. Machine learning learns from data. Deep learning uses layered neural networks. Nested, not interchangeable.",
    recapLine1: "AI = umbrella term",
    recapLine2: "ML learns from data",
    recapLine3: "Deep Learning = layered neural nets",
    bullets: ["AI = smart systems broadly", "ML = learns from data", "DL = deep neural networks"],
    badge: "AI ⊃ ML ⊃ DL",
    nextEpisode: "What is Training?",
    wordCount: 218,
  },
  {
    id: "004",
    folder: "004_what-is-training",
    slug: "what-is-training",
    title: "What is Training?",
    hook: "Every AI model goes through training. But what does that actually mean?",
    hookLine1: "Every AI model gets trained.",
    hookLine2: "But what IS training?",
    hookIcon: "loop",
    headline: "Training = Learn by Trial and Error",
    metaphor: "Learning to ride a bike — fall, adjust, try again",
    concept: `Training an AI is like learning to ride a bike. At first, the model is terrible — random guesses. You show it thousands of examples — photos labeled cat or dog, questions with answers. It predicts, checks how wrong it was, and adjusts internal settings slightly. Then tries again. And again. Millions of times. Each round, it gets a little less wrong. That's the key — it's not memorizing every example. It's adjusting internal knobs until its predictions match the training data. Training is the expensive, compute-heavy phase where the model actually learns. No training, no intelligence.`,
    callout: "Not memorizing — adjusting until less wrong.",
    steps: [
      { label: "Model starts with random guesses", icon: "keyboard", startMs: 0 },
      { label: "Show labeled examples", icon: "arrow_right", startMs: 9000 },
      { label: "Measure error → adjust settings", icon: "loop", startMs: 18000 },
      { label: "Repeat millions of times", icon: "chat_bubble_complete", startMs: 37000 },
    ],
    captions: [
      ["Training is like learning to ride a bike.", 0, 4500],
      ["At first — random guesses.", 4500, 8000],
      ["Show thousands of labeled examples.", 8000, 12500],
      ["Photos: cat or dog.", 12500, 15500],
      ["Model predicts, checks how wrong.", 15500, 19500],
      ["Adjusts internal settings slightly.", 19500, 23500],
      ["Then tries again. And again.", 23500, 27500],
      ["Millions of rounds.", 27500, 31000],
      ["Each round — a little less wrong.", 31000, 35000],
      ["Not memorizing every example.", 35000, 39000],
      ["Adjusting knobs until predictions fit.", 39000, 44000],
      ["No training, no intelligence.", 44000, 54000],
    ],
    recap: "Training means showing examples, measuring errors, and adjusting the model over and over until it learns patterns — not facts by heart.",
    recapLine1: "Show examples, measure errors",
    recapLine2: "Adjust model repeatedly",
    recapLine3: "Learns patterns — not memorization",
    bullets: ["Starts with bad guesses", "Adjusts from labeled data", "Repeats until accurate"],
    badge: "Training = Trial & Error",
    nextEpisode: "What is Inference?",
    wordCount: 216,
  },
  {
    id: "005",
    folder: "005_what-is-inference",
    slug: "what-is-inference",
    title: "What is Inference?",
    hook: "Training is done. Now the model is actually used. That phase has a name — inference.",
    hookLine1: "Training is finished.",
    hookLine2: "What happens next? Inference.",
    hookIcon: "arrow_right",
    headline: "Inference = Using What You Learned",
    metaphor: "Exam day after studying — apply knowledge to new questions",
    concept: `If training is studying for an exam, inference is exam day. The model finished learning — its settings are locked in. Now you give it something new it has never seen: a fresh photo, a new question, a voice clip. The model runs forward through its layers and produces an answer. No adjusting, no learning — just applying what it already knows. Every ChatGPT reply you get? That's inference. Every face detected in your camera? Inference. Training happens once in a data center. Inference happens billions of times when real people use the product. Fast inference = good user experience.`,
    callout: "Training learns. Inference applies.",
    steps: [
      { label: "Model is fully trained & locked", icon: "keyboard", startMs: 0 },
      { label: "New input arrives", icon: "arrow_right", startMs: 9000 },
      { label: "Model runs forward → prediction", icon: "loop", startMs: 18000 },
      { label: "No learning — just answering", icon: "chat_bubble_complete", startMs: 37000 },
    ],
    captions: [
      ["Training is studying for an exam.", 0, 4500],
      ["Inference is exam day.", 4500, 8000],
      ["Model finished learning.", 8000, 11500],
      ["Settings are locked in.", 11500, 14500],
      ["Give it something new.", 14500, 17500],
      ["A fresh photo. A new question.", 17500, 21500],
      ["Model runs forward → answer.", 21500, 25500],
      ["No adjusting. No learning.", 25500, 29000],
      ["Just applying what it knows.", 29000, 32500],
      ["Every ChatGPT reply = inference.", 32500, 37000],
      ["Training once. Inference billions of times.", 37000, 43000],
      ["Fast inference = great UX.", 43000, 54000],
    ],
    recap: "Inference is using a trained model on new data — no more learning, just fast predictions when users actually need answers.",
    recapLine1: "Trained model, locked settings",
    recapLine2: "New input → prediction",
    recapLine3: "No learning — just answering",
    bullets: ["Uses trained model", "Runs on new inputs", "Happens at scale in production"],
    badge: "Inference = Exam Day",
    nextEpisode: "What is a Token?",
    wordCount: 214,
  },
  {
    id: "006",
    folder: "006_what-is-a-token",
    slug: "what-is-a-token",
    title: "What is a Token?",
    hook: "LLMs don't read whole sentences. They read tokens. But what are those?",
    hookLine1: "LLMs don't read sentences.",
    hookLine2: "They read tokens. What are those?",
    hookIcon: "keyboard",
    headline: "Token = Bite-Sized Text Chunk",
    metaphor: "Words chopped into pieces the model can digest",
    concept: `A token is a bite-sized chunk of text — not always a whole word. "ChatGPT" might be one token. "Understanding" could split into "Under" and "standing." Even punctuation counts. LLMs break your prompt into tokens because they're easier to process mathematically. Each token gets a number, flows through the model, and the model predicts the next token — one piece at a time. That's why context limits are measured in tokens, not words. A 128K context window means 128 thousand tokens — roughly 90 thousand words. Smaller chunks, smarter processing.`,
    callout: "Not always whole words — chunks of text.",
    steps: [
      { label: "Your text enters the model", icon: "keyboard", startMs: 0 },
      { label: "Split into token pieces", icon: "arrow_right", startMs: 9000 },
      { label: "Each token → number", icon: "loop", startMs: 18000 },
      { label: "Model predicts next token", icon: "chat_bubble_complete", startMs: 37000 },
    ],
    captions: [
      ["A token is a bite-sized text chunk.", 0, 4500],
      ["Not always a whole word.", 4500, 8000],
      ["'ChatGPT' might be one token.", 8000, 11500],
      ["'Understanding' can split in two.", 11500, 15500],
      ["Punctuation counts too.", 15500, 18500],
      ["LLMs break text into tokens.", 18500, 22000],
      ["Easier to process mathematically.", 22000, 26000],
      ["Each token becomes a number.", 26000, 29500],
      ["Model predicts the next token.", 29500, 33500],
      ["Context limits = token counts.", 33500, 38000],
      ["128K tokens ≈ 90K words.", 38000, 43000],
      ["Smaller chunks, smarter processing.", 43000, 54000],
    ],
    recap: "Tokens are the small text pieces LLMs actually read and write — not full words, but chunks that make math-based language processing possible.",
    recapLine1: "Text split into chunks",
    recapLine2: "Not always whole words",
    recapLine3: "Context limits use tokens",
    bullets: ["Bite-sized text pieces", "Converted to numbers", "LLMs predict token by token"],
    badge: "Token = Text Chunk",
    nextEpisode: "What are Embeddings?",
    wordCount: 212,
  },
  {
    id: "007",
    folder: "007_what-are-embeddings",
    slug: "what-are-embeddings",
    title: "What are Embeddings?",
    hook: "Computers don't understand words. So how does AI grasp meaning? Embeddings.",
    hookLine1: "Computers don't get words.",
    hookLine2: "So what are embeddings?",
    hookIcon: "chat_bubble",
    headline: "Embedding = GPS for Meaning",
    metaphor: "GPS coordinates for words — similar meanings sit close together",
    concept: `An embedding turns a word or sentence into a list of numbers — a point in high-dimensional space. Think GPS coordinates for meaning. "King" and "Queen" land near each other. "King" and "Banana" sit far apart. The model doesn't read "happy" — it reads a vector of numbers that captures happy-ness, and compares distances to other vectors. Similar meanings cluster together. That's how search, recommendations, and RAG find relevant content — not by matching exact words, but by comparing embedding distances. Words become math. Meaning becomes geometry.`,
    callout: "Similar meaning = close in number-space.",
    steps: [
      { label: "Word or sentence enters", icon: "keyboard", startMs: 0 },
      { label: "Converted to number vector", icon: "arrow_right", startMs: 9000 },
      { label: "Similar meanings cluster nearby", icon: "loop", startMs: 18000 },
      { label: "Model compares distances", icon: "chat_bubble_complete", startMs: 37000 },
    ],
    captions: [
      ["An embedding turns text into numbers.", 0, 4500],
      ["A point in high-dimensional space.", 4500, 8500],
      ["GPS coordinates for meaning.", 8500, 12000],
      ["'King' and 'Queen' land close.", 12000, 16000],
      ["'King' and 'Banana' sit far apart.", 16000, 20000],
      ["Model reads vectors, not words.", 20000, 24000],
      ["Similar meanings cluster together.", 24000, 28000],
      ["Search uses embedding distances.", 28000, 32000],
      ["Not exact word matching.", 32000, 35500],
      ["Recommendations work the same way.", 35500, 39500],
      ["RAG finds content by similarity.", 39500, 44000],
      ["Words become math. Meaning becomes geometry.", 44000, 54000],
    ],
    recap: "Embeddings convert text into numbers where similar meanings sit close together — that's how AI understands and searches by meaning, not spelling.",
    recapLine1: "Text → number vectors",
    recapLine2: "Similar meanings cluster",
    recapLine3: "Powers search & RAG",
    bullets: ["Words → number lists", "Similar = close together", "Enables semantic search"],
    badge: "Embedding = Meaning as Math",
    nextEpisode: "What is a Dataset?",
    wordCount: 217,
  },
  {
    id: "008",
    folder: "008_what-is-a-dataset",
    slug: "what-is-a-dataset",
    title: "What is a Dataset?",
    hook: "Bad data, bad AI. Every model starts with a dataset. But what is one?",
    hookLine1: "Bad data, bad AI.",
    hookLine2: "What IS a dataset?",
    hookIcon: "keyboard",
    headline: "Dataset = AI's Textbook",
    metaphor: "A curated textbook of examples the model studies",
    concept: `A dataset is a organized collection of examples an AI learns from — like a textbook full of practice problems. For image AI: thousands of photos with labels. For language models: billions of text snippets from books, websites, and code. Quality matters enormously. Garbage examples teach garbage patterns. Good datasets are diverse, representative, and carefully cleaned. Data scientists split datasets too — most for training, some held back for testing. The model never sees test data during training, so you can honestly measure if it actually learned or just memorized. No dataset, no learning. Data is the fuel.`,
    callout: "Quality in = quality out.",
    steps: [
      { label: "Collect examples (text, images…)", icon: "keyboard", startMs: 0 },
      { label: "Label & clean the data", icon: "arrow_right", startMs: 9000 },
      { label: "Split: train vs test sets", icon: "loop", startMs: 18000 },
      { label: "Feed training set to model", icon: "chat_bubble_complete", startMs: 37000 },
    ],
    captions: [
      ["A dataset is a collection of examples.", 0, 4500],
      ["Like a textbook of practice problems.", 4500, 8500],
      ["Image AI: photos with labels.", 8500, 12000],
      ["LLMs: text from books & the web.", 12000, 16000],
      ["Quality matters enormously.", 16000, 19500],
      ["Garbage in → garbage out.", 19500, 23000],
      ["Good data is diverse & cleaned.", 23000, 27000],
      ["Split into train and test sets.", 27000, 31000],
      ["Model never sees test data while training.", 31000, 35500],
      ["Test set = honest performance check.", 35500, 39500],
      ["Did it learn or memorize?", 39500, 43000],
      ["No dataset, no learning. Data is fuel.", 43000, 54000],
    ],
    recap: "A dataset is the curated collection of examples AI learns from — quality, diversity, and proper train-test splits determine whether your model actually works.",
    recapLine1: "Organized learning examples",
    recapLine2: "Quality & diversity matter",
    recapLine3: "Train/test split prevents cheating",
    bullets: ["Curated examples for learning", "Quality determines outcomes", "Split for honest testing"],
    badge: "Dataset = AI Fuel",
    nextEpisode: "What is a Model Parameter?",
    wordCount: 213,
  },
  {
    id: "009",
    folder: "009_what-is-a-model-parameter",
    slug: "what-is-a-model-parameter",
    title: "What is a Model Parameter?",
    hook: "GPT has 175 billion parameters. Claude has billions too. What does that even mean?",
    hookLine1: "Billions of parameters?",
    hookLine2: "What does that mean?",
    hookIcon: "loop",
    headline: "Parameter = Learned Knob",
    metaphor: "Internal knobs and dials adjusted during training",
    concept: `A parameter is a single number inside the model that gets adjusted during training — like a tiny dial on a massive mixing board. Early on, all dials are set randomly. Training turns each dial bit by bit until the model's outputs look right. GPT-3 had 175 billion of these dials. More parameters generally mean more capacity to learn complex patterns — but also more compute and data needed. Parameters aren't facts stored like a database. They're the tuned settings that shape how input flows to output. When people say a model has 7B or 70B parameters, they mean 7 or 70 billion learned numbers inside.`,
    callout: "Not stored facts — tuned settings.",
    steps: [
      { label: "Model starts with random numbers", icon: "keyboard", startMs: 0 },
      { label: "Training adjusts each dial", icon: "arrow_right", startMs: 9000 },
      { label: "Billions of settings tuned", icon: "loop", startMs: 18000 },
      { label: "7B / 70B = dial count", icon: "chat_bubble_complete", startMs: 37000 },
    ],
    captions: [
      ["A parameter is one learned number.", 0, 4000],
      ["Like a tiny dial on a mixing board.", 4000, 8000],
      ["All dials start random.", 8000, 11500],
      ["Training turns each dial bit by bit.", 11500, 15500],
      ["Until outputs look right.", 15500, 19000],
      ["GPT-3: 175 billion dials.", 19000, 23000],
      ["More params = more capacity.", 23000, 27000],
      ["But needs more data & compute.", 27000, 31000],
      ["Not facts in a database.", 31000, 34500],
      ["Tuned settings shaping input → output.", 34500, 39000],
      ["7B = 7 billion learned numbers.", 39000, 43000],
      ["Parameters = what training creates.", 43000, 54000],
    ],
    recap: "Parameters are the billions of learned numbers inside a model — adjusted during training to shape how it transforms inputs into outputs.",
    recapLine1: "Learned numbers inside the model",
    recapLine2: "Adjusted during training",
    recapLine3: "More params = more capacity",
    bullets: ["Single learned number each", "Tuned during training", "Billions in large models"],
    badge: "Parameter = Tuned Dial",
    nextEpisode: "What is Supervised Learning?",
    wordCount: 216,
  },
  {
    id: "010",
    folder: "010_what-is-supervised-learning",
    slug: "what-is-supervised-learning",
    title: "What is Supervised Learning?",
    hook: "The most common way AI learns has a name — supervised learning. Here's what it means.",
    hookLine1: "The most common way AI learns.",
    hookLine2: "What is Supervised Learning?",
    hookIcon: "chat_bubble_complete",
    headline: "Supervised = Learning with Labels",
    metaphor: "Studying with an answer key — every question has the right answer",
    concept: `Supervised learning means training with labeled examples — every input comes with the correct output. Like flashcards where the answer is on the back. Email plus label: spam or not spam. Photo plus label: cat or dog. Question plus label: the right answer. The model learns the mapping from input to label. Most AI you use daily was trained this way — or fine-tuned with supervised examples. It's powerful because the feedback is clear: you know exactly when the model is wrong. The downside? Someone has to create all those labels — and that's expensive, slow, and sometimes biased.`,
    callout: "Clear answers — but labels cost money.",
    steps: [
      { label: "Input + correct label paired", icon: "keyboard", startMs: 0 },
      { label: "Model learns input → label map", icon: "arrow_right", startMs: 9000 },
      { label: "Clear feedback when wrong", icon: "loop", startMs: 18000 },
      { label: "Most production AI starts here", icon: "chat_bubble_complete", startMs: 37000 },
    ],
    captions: [
      ["Supervised learning uses labeled examples.", 0, 4500],
      ["Every input has a correct output.", 4500, 8500],
      ["Like flashcards with answers on back.", 8500, 12000],
      ["Email → spam or not spam.", 12000, 15500],
      ["Photo → cat or dog.", 15500, 18500],
      ["Question → right answer.", 18500, 21500],
      ["Model learns the mapping.", 21500, 25000],
      ["Most AI you use = supervised.", 25000, 29000],
      ["Or fine-tuned with labeled data.", 29000, 32500],
      ["Feedback is clear: wrong or right.", 32500, 36500],
      ["Downside: labels are expensive.", 36500, 40500],
      ["Slow to create. Can be biased.", 40500, 45000],
      ["Still the workhorse of AI.", 45000, 54000],
    ],
    recap: "Supervised learning trains AI on input-label pairs — clear feedback makes it effective, but creating labels is costly. It's how most practical AI gets built.",
    recapLine1: "Input + label pairs",
    recapLine2: "Clear right/wrong feedback",
    recapLine3: "Labels are expensive to create",
    bullets: ["Every example has a label", "Model learns input → output", "Most common training method"],
    badge: "Supervised = Answer Key",
    nextEpisode: "What is Unsupervised Learning?",
    wordCount: 218,
  },
];

function yamlCaptionBlock(captions) {
  return captions
    .map(([text, start, end]) => `      - text: "${text}"\n        startMs: ${start}\n        endMs: ${end}`)
    .join("\n");
}

function yamlStepsBlock(steps) {
  return steps
    .map(
      (s) =>
        `        - label: "${s.label}"\n          icon: ${s.icon}\n          animation: slideUp\n          startMs: ${s.startMs}`,
    )
    .join("\n");
}

function buildEpisodeYaml(ep) {
  return `episode:
  id: "${ep.id}"
  slug: ${ep.slug}
  title: "${ep.title}"
  targetDurationMs: 90000
  series: "Learn AI in 2 Mins"
  tone: "simple metaphor + infographic"
  wordCount: ${ep.wordCount}
  templateRefs:
    welcome: "../../templates/welcome.yaml"
    outro: "../../templates/outro.yaml"

scenes:
  - id: welcome
    type: series_intro
    durationMs: 6000
    voiceover: >
      ${WELCOME_VO}
    captions:
      - text: "Welcome to Learn AI in 2 Mins"
        startMs: 0
        endMs: 2800
      - text: "Quick concepts. Simple metaphors."
        startMs: 2800
        endMs: 6000
    visual:
      layout: branded_card
      background: gradient_dark_blue
      elements:
        - type: icon
          asset: lightbulb_brain
          animation: scaleIn
        - type: title
          text: "Learn AI in 2 Mins"
          animation: fadeIn
        - type: subtitle
          text: "Quick concepts. Simple metaphors."
          animation: slideUp

  - id: hook
    type: question_hook
    durationMs: 8000
    voiceover: >
      ${ep.hook}
    captions:
      - text: "${ep.hookLine1}"
        startMs: 0
        endMs: 3200
      - text: "${ep.hookLine2}"
        startMs: 3200
        endMs: 8000
    visual:
      layout: split
      background: dark_slate
      left:
        type: icon
        asset: ${ep.hookIcon}
        animation: scaleIn
      right:
        type: headline
        text: "${ep.hookLine2.replace(/\?$/, "")}"
        animation: slideLeft
      elements:
        - type: label
          text: "Episode ${ep.id}"
          animation: fadeIn
          style: badge_top_right

  - id: metaphor_core
    type: concept_explain
    durationMs: 54000
    voiceover: >
      ${ep.concept.replace(/\n/g, "\n      ")}
    captions:
${yamlCaptionBlock(ep.captions)}
    visual:
      layout: infographic_stack
      background: gradient_purple_blue
      metaphor: "${ep.metaphor}"
      elements:
        - type: headline
          text: "${ep.headline}"
          animation: fadeIn
      steps:
${yamlStepsBlock(ep.steps)}
      callout:
        text: "${ep.callout}"
        style: highlight_red

  - id: recap
    type: key_takeaway
    durationMs: 12000
    voiceover: >
      ${ep.recap}
    captions:
      - text: "${ep.recapLine1}"
        startMs: 0
        endMs: 4500
      - text: "${ep.recapLine2}"
        startMs: 4500
        endMs: 8500
      - text: "${ep.recapLine3}"
        startMs: 8500
        endMs: 12000
    visual:
      layout: summary_card
      background: dark_slate
      bullets:
        - "${ep.bullets[0]}"
        - "${ep.bullets[1]}"
        - "${ep.bullets[2]}"
      elements:
        - type: title
          text: "Key Takeaway"
          animation: fadeIn
        - type: badge
          text: "${ep.badge}"
          animation: highlight

  - id: outro
    type: series_outro
    durationMs: 10000
    voiceover: >
      ${OUTRO_VO}
    captions:
      - text: "That's your concept for today."
        startMs: 0
        endMs: 3500
      - text: "Follow for the next one"
        startMs: 3500
        endMs: 6500
      - text: "Learn AI in 2 Mins"
        startMs: 6500
        endMs: 10000
    visual:
      layout: branded_card
      background: gradient_dark_blue
      elements:
        - type: cta
          text: "Follow for the next concept"
          animation: pulse
        - type: title
          text: "Learn AI in 2 Mins"
          animation: fadeIn
        - type: badge
          text: "Next: ${ep.nextEpisode}"
          animation: slideUp
`;
}

function buildVoiceoverMd(ep) {
  const paragraphs = [
    WELCOME_VO,
    ep.hook,
    ep.concept.trim(),
    ep.recap,
    OUTRO_VO,
  ];
  return `# Episode ${ep.id} — ${ep.title}

**Series:** Learn AI in 2 Mins  
**Target duration:** ~90 seconds  
**Source script:** [\`episode.yaml\`](episode.yaml)

---

## Save your recording here

After recording, save as:

\`\`\`
voiceover.mp3   ← same folder as this file
\`\`\`

---

## Full voiceover (read straight through)

${paragraphs.join("\n\n")}

---

## Next step

1. Save recording as \`voiceover.mp3\` in this folder
2. Open [\`plan-video.prompt.md\`](plan-video.prompt.md) and paste the prompt into your AI tool (Session 1 — plans visuals)
3. In your next session, open the generated [\`render-video.prompt.md\`](render-video.prompt.md) and paste that prompt (Session 2 — builds video)

Or skip AI planning and run: \`npm run video:${ep.id}\` from repo root
`;
}

function buildPlanVideoPrompt(ep) {
  return `# Plan Video — Episode ${ep.id}

**When to use:** Session 1 — after you've saved \`voiceover.mp3\` in this folder.

Copy everything in the box below into your AI terminal tool (Cursor, Claude Code, etc.).

This session transcribes your recording, designs a transcript-specific viral visual plan (must differ from the prior 4 episodes — see visual-style.md), verifies it against the style guide, and writes \`render-video.prompt.md\` for Session 2.

**Do NOT render or modify \`episode.yaml\` in this session.**

---

## Prompt (copy from here)

\`\`\`
Plan the YouTube Short video for Episode ${ep.id}: "${ep.title}"

My voiceover is ready at:
series/learn-ai-in-2-mins/episodes/${ep.folder}/voiceover.mp3

## Step 1 — Transcribe

Transcribe my MP3 to VTT (accurate caption timing from my actual recording):

cd remotion && npm run vtt -- ${ep.folder}

Confirm voiceover.vtt exists at:
series/learn-ai-in-2-mins/episodes/${ep.folder}/voiceover.vtt

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
series/learn-ai-in-2-mins/episodes/${ep.folder}/render-video.prompt.md

Use this structure (fill in all sections from your transcript-specific plan):

# Render Video — Episode ${ep.id}: ${ep.title} (generated from your recording)

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
1. cd remotion && node scripts/apply-vtt-to-episode.mjs ${ep.folder}
2. Update episode.yaml VISUAL FIELDS ONLY per the visual brief (steps, icons, headlines, callout — not voiceover text)
3. npm run video:${ep.id} from repo root
4. Confirm voiceover.vtt and remotion/out/${ep.folder}.mp4 exist

Reference template: series/learn-ai-in-2-mins/templates/render-video.prompt.template.md

## Do NOT in this session
- Do NOT modify episode.yaml
- Do NOT run npm run video:${ep.id} or render

When done, tell me: "Open render-video.prompt.md in your next session to build the video."
\`\`\`

---

## Manual alternative (skip AI planning)

\`\`\`bash
npm run video:${ep.id}
\`\`\`

Skips viral visual planning — transcribes, syncs timing, and renders with existing episode.yaml visuals.
`;
}

for (const ep of episodes) {
  const dir = path.join(episodesRoot, ep.folder);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "episode.yaml"), buildEpisodeYaml(ep));
  fs.writeFileSync(path.join(dir, "voiceover.md"), buildVoiceoverMd(ep));
  fs.writeFileSync(path.join(dir, "plan-video.prompt.md"), buildPlanVideoPrompt(ep));
  console.log(`Generated ${ep.folder}`);
}

console.log(`Done — ${episodes.length} episodes created.`);

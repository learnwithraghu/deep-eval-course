export type SceneType =
  | "series_intro"
  | "question_hook"
  | "concept_explain"
  | "metaphor_visual"
  | "comparison"
  | "key_takeaway"
  | "series_outro";

export type AnimationType =
  | "fadeIn"
  | "slideUp"
  | "slideLeft"
  | "slideRight"
  | "scaleIn"
  | "highlight"
  | "pulse";

export type VisualElement = {
  type: string;
  text?: string;
  asset?: string;
  animation?: AnimationType;
  style?: string;
};

export type Caption = {
  text: string;
  startMs: number;
  endMs: number;
};

export type InfographicStep = {
  label: string;
  icon?: string;
  animation?: AnimationType;
  startMs?: number;
};

export type SceneVisual = {
  layout: string;
  background?: string;
  metaphor?: string;
  elements?: VisualElement[];
  steps?: InfographicStep[];
  bullets?: string[];
  callout?: { text: string; style?: string };
  left?: VisualElement;
  right?: VisualElement;
};

export type Scene = {
  id: string;
  type: SceneType;
  durationMs: number;
  voiceover: string;
  captions?: Caption[];
  visual: SceneVisual;
  audio?: {
    music?: string;
    sfx?: { asset: string; startMs: number }[];
  };
};

export type EpisodeMeta = {
  id: string;
  slug: string;
  title: string;
  targetDurationMs: number;
  series: string;
  tone?: string;
  wordCount?: number;
};

export type EpisodeScript = {
  episode: EpisodeMeta;
  scenes: Scene[];
};

export type EpisodeProps = {
  episodeFolder: string;
  hasVoiceover?: boolean;
};

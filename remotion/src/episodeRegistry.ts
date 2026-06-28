import episode001 from "./generated/001_what-is-an-llm.json";
import meta001 from "./generated/001_what-is-an-llm.meta.json";
import { EpisodeScript } from "./types";

type EpisodeMeta = {
  hasVoiceover: boolean;
};

const episodes: Record<string, EpisodeScript> = {
  "001_what-is-an-llm": episode001 as EpisodeScript,
};

const meta: Record<string, EpisodeMeta> = {
  "001_what-is-an-llm": meta001 as EpisodeMeta,
};

export const getEpisodeData = (episodeFolder: string): EpisodeScript => {
  const episode = episodes[episodeFolder];
  if (!episode) {
    throw new Error(
      `Episode "${episodeFolder}" not synced. Run: npm run sync -- ${episodeFolder}`,
    );
  }
  return episode;
};

export const getEpisodeMeta = (episodeFolder: string): EpisodeMeta =>
  meta[episodeFolder] ?? { hasVoiceover: false };

export const getTotalDurationMs = (episode: EpisodeScript) =>
  episode.scenes.reduce((sum, scene) => sum + scene.durationMs, 0);

export const getSceneStartMs = (episode: EpisodeScript, sceneIndex: number) =>
  episode.scenes
    .slice(0, sceneIndex)
    .reduce((sum, scene) => sum + scene.durationMs, 0);

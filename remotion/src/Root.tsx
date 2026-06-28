import "./index.css";
import { Composition } from "remotion";
import { Episode } from "./Episode";
import {
  getEpisodeData,
  getEpisodeMeta,
  getTotalDurationMs,
} from "./episodeRegistry";
import { FPS, HEIGHT, WIDTH, msToFrames } from "./constants";
import { EpisodeProps } from "./types";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Episode001"
        component={Episode}
        defaultProps={{
          episodeFolder: "001_what-is-an-llm",
          hasVoiceover: getEpisodeMeta("001_what-is-an-llm").hasVoiceover,
        }}
        durationInFrames={msToFrames(90000)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        calculateMetadata={async ({ props }) => {
          const episodeProps = props as EpisodeProps;
          const episode = getEpisodeData(episodeProps.episodeFolder);
          const episodeMeta = getEpisodeMeta(episodeProps.episodeFolder);
          return {
            durationInFrames: msToFrames(getTotalDurationMs(episode)),
            props: {
              ...episodeProps,
              hasVoiceover: episodeMeta.hasVoiceover,
            },
            title: `${episode.episode.series} — ${episode.episode.title}`,
          };
        }}
      />
    </>
  );
};

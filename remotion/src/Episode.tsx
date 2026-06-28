import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { msToFrames } from "./constants";
import { EpisodeProps } from "./types";
import { getEpisodeData, getSceneStartMs } from "./episodeRegistry";
import { SceneRenderer } from "./scenes/SceneRenderer";

const { fontFamily } = loadFont();

export const Episode: React.FC<EpisodeProps> = ({
  episodeFolder,
  hasVoiceover = false,
}) => {
  const episode = getEpisodeData(episodeFolder);
  const voiceoverRel = `episodes/${episodeFolder}/voiceover.mp3`;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a", fontFamily }}>
      {hasVoiceover ? <Audio src={staticFile(voiceoverRel)} /> : null}

      {episode.scenes.map((scene, index) => (
        <Sequence
          key={scene.id}
          from={msToFrames(getSceneStartMs(episode, index))}
          durationInFrames={msToFrames(scene.durationMs)}
          name={scene.id}
        >
          <SceneRenderer scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

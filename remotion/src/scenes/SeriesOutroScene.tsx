import { AbsoluteFill } from "remotion";
import { Scene } from "../types";
import { BrandedBackground } from "../components/BrandedBackground";
import { CaptionOverlay } from "../components/CaptionOverlay";
import { AnimatedElement } from "../components/AnimatedElement";

export const SeriesOutroScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const { visual, captions } = scene;

  return (
    <BrandedBackground background={visual.background}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 64,
          gap: 24,
        }}
      >
        {visual.elements?.map((element, index) => (
          <AnimatedElement key={`${element.type}-${index}`} {...element} delayFrames={index * 10} />
        ))}
      </AbsoluteFill>
      <CaptionOverlay captions={captions} />
    </BrandedBackground>
  );
};

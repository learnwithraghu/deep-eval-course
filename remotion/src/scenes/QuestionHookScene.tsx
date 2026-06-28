import { AbsoluteFill } from "remotion";
import { Scene } from "../types";
import { BrandedBackground } from "../components/BrandedBackground";
import { CaptionOverlay } from "../components/CaptionOverlay";
import { AnimatedElement } from "../components/AnimatedElement";

export const QuestionHookScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const { visual, captions } = scene;

  return (
    <BrandedBackground background={visual.background}>
      <AbsoluteFill style={{ padding: 56 }}>
        {visual.elements?.map((element, index) => (
          <div
            key={`${element.type}-${index}`}
            style={{ position: "absolute", top: 48, right: 48 }}
          >
            <AnimatedElement {...element} delayFrames={4} />
          </div>
        ))}

        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "0 48px",
            gap: 48,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 40, width: "100%" }}>
            {visual.left ? (
              <div style={{ flex: "0 0 180px", display: "flex", justifyContent: "center" }}>
                <AnimatedElement {...visual.left} delayFrames={0} />
              </div>
            ) : null}
            {visual.right ? (
              <div style={{ flex: 1 }}>
                <AnimatedElement {...visual.right} delayFrames={10} />
              </div>
            ) : null}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
      <CaptionOverlay captions={captions} />
    </BrandedBackground>
  );
};

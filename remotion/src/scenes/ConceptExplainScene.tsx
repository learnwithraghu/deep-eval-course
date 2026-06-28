import { AbsoluteFill } from "remotion";
import { Scene } from "../types";
import { BrandedBackground } from "../components/BrandedBackground";
import { CaptionOverlay } from "../components/CaptionOverlay";
import { AnimatedElement } from "../components/AnimatedElement";
import { InfographicSteps } from "../components/InfographicSteps";
import { colors } from "../theme";
import { useSceneAnimation } from "../utils/animations";

export const ConceptExplainScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const { visual, captions } = scene;
  const calloutStyle = useSceneAnimation("highlight", 120);

  return (
    <BrandedBackground background={visual.background}>
      <AbsoluteFill style={{ padding: "56px 48px", justifyContent: "flex-start" }}>
        <div style={{ marginTop: 120, marginBottom: 36 }}>
          {visual.elements?.map((element, index) => (
            <AnimatedElement key={`${element.type}-${index}`} {...element} delayFrames={index * 6} />
          ))}
          {visual.metaphor ? (
            <div
              style={{
                marginTop: 20,
                color: colors.muted,
                fontSize: 28,
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              {visual.metaphor}
            </div>
          ) : null}
        </div>

        <InfographicSteps steps={visual.steps} />

        {visual.callout ? (
          <div
            style={{
              ...calloutStyle,
              marginTop: 36,
              alignSelf: "center",
              background: "rgba(239, 68, 68, 0.15)",
              border: `2px solid ${colors.highlight}`,
              borderRadius: 18,
              padding: "18px 28px",
              color: colors.white,
              fontSize: 32,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            {visual.callout.text}
          </div>
        ) : null}
      </AbsoluteFill>
      <CaptionOverlay captions={captions} />
    </BrandedBackground>
  );
};

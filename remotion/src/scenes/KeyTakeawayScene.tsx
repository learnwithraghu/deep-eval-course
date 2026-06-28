import { AbsoluteFill } from "remotion";
import { Scene } from "../types";
import { BrandedBackground } from "../components/BrandedBackground";
import { CaptionOverlay } from "../components/CaptionOverlay";
import { AnimatedElement } from "../components/AnimatedElement";
import { colors } from "../theme";
import { useSceneAnimation } from "../utils/animations";

export const KeyTakeawayScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const { visual, captions } = scene;

  return (
    <BrandedBackground background={visual.background}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 56,
          gap: 28,
        }}
      >
        {visual.elements?.map((element, index) => (
          <AnimatedElement key={`${element.type}-${index}`} {...element} delayFrames={index * 8} />
        ))}

        <div
          style={{
            width: "100%",
            background: colors.card,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 24,
            padding: "36px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {visual.bullets?.map((bullet, index) => (
            <BulletRow key={bullet} text={bullet} index={index} />
          ))}
        </div>
      </AbsoluteFill>
      <CaptionOverlay captions={captions} />
    </BrandedBackground>
  );
};

const BulletRow: React.FC<{ text: string; index: number }> = ({ text, index }) => {
  const style = useSceneAnimation("slideUp", 12 + index * 10);

  return (
    <div style={{ ...style, display: "flex", alignItems: "center", gap: 18 }}>
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: colors.accent,
          flexShrink: 0,
        }}
      />
      <div style={{ color: colors.white, fontSize: 34, fontWeight: 600, lineHeight: 1.3 }}>
        {text}
      </div>
    </div>
  );
};

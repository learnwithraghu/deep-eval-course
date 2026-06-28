import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Scene } from "../types";
import { BrandedBackground } from "../components/BrandedBackground";
import { CaptionOverlay } from "../components/CaptionOverlay";
import { AnimatedElement } from "../components/AnimatedElement";
import { Icon } from "../icons/Icon";
import { colors } from "../theme";
import { useSceneAnimation } from "../utils/animations";

export const QuestionHookScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const { visual, captions } = scene;
  const frame = useCurrentFrame();
  const chipStyle = useSceneAnimation("bounceIn", 20);
  const ringScale = interpolate(frame, [30, 60], [1, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringOpacity = interpolate(frame, [30, 60], [0.4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hookIcon = visual.left?.asset ?? "chip";

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
              <div style={{ flex: "0 0 200px", display: "flex", justifyContent: "center", position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: -16,
                    borderRadius: "50%",
                    border: `2px solid ${colors.accent}`,
                    transform: `scale(${ringScale})`,
                    opacity: ringOpacity,
                  }}
                />
                <AnimatedElement {...visual.left} delayFrames={0} fontSize={110} />
              </div>
            ) : null}
            {visual.right ? (
              <div style={{ flex: 1 }}>
                <AnimatedElement {...visual.right} delayFrames={10} />
                {visual.hookLabel ? (
                  <div style={{ ...chipStyle, marginTop: 28, display: "flex", justifyContent: "flex-start" }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 12,
                        background: colors.card,
                        border: `1px solid ${colors.cardBorder}`,
                        borderRadius: 14,
                        padding: "10px 18px",
                      }}
                    >
                      <Icon name={hookIcon} size={32} glow />
                      <span style={{ color: colors.muted, fontSize: 22, fontWeight: 600 }}>
                        {visual.hookLabel}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
      <CaptionOverlay captions={captions} />
    </BrandedBackground>
  );
};

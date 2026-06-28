import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption } from "../types";
import { colors } from "../theme";

type Props = {
  captions?: Caption[];
};

export const CaptionOverlay: React.FC<Props> = ({ captions = [] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentMs = (frame / fps) * 1000;

  const active = captions.find(
    (caption) => currentMs >= caption.startMs && currentMs < caption.endMs,
  );

  if (!active) {
    return null;
  }

  const fadeInFrame = Math.round((active.startMs / 1000) * fps);
  const fadeOutFrame = Math.round((active.endMs / 1000) * fps);
  const opacity = interpolate(
    frame,
    [fadeInFrame, fadeInFrame + 10, fadeOutFrame - 8, fadeOutFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 180,
        left: 48,
        right: 48,
        opacity,
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "inline-block",
          background: "rgba(15, 23, 42, 0.82)",
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 16,
          padding: "18px 28px",
          color: colors.white,
          fontSize: 34,
          fontWeight: 600,
          lineHeight: 1.35,
          boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
        }}
      >
        {active.text}
      </div>
    </div>
  );
};

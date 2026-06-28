import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimationType } from "../types";

export const useSceneAnimation = (
  animation: AnimationType = "fadeIn",
  delayFrames = 0,
) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 18, stiffness: 120 },
  });

  switch (animation) {
    case "slideUp":
      return {
        opacity: interpolate(progress, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(progress, [0, 1], [40, 0])}px)`,
      };
    case "slideLeft":
      return {
        opacity: interpolate(progress, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(progress, [0, 1], [60, 0])}px)`,
      };
    case "slideRight":
      return {
        opacity: interpolate(progress, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(progress, [0, 1], [-60, 0])}px)`,
      };
    case "scaleIn":
      return {
        opacity: interpolate(progress, [0, 1], [0, 1]),
        transform: `scale(${interpolate(progress, [0, 1], [0.85, 1])})`,
      };
    case "pulse": {
      const pulse = 1 + Math.sin(frame / 8) * 0.03;
      return {
        opacity: 1,
        transform: `scale(${pulse})`,
      };
    }
    case "highlight":
      return {
        opacity: 1,
        boxShadow: `0 0 ${interpolate(progress, [0, 1], [0, 24])}px rgba(129, 140, 248, 0.55)`,
        transform: "scale(1)",
      };
    case "fadeIn":
    default:
      return {
        opacity: interpolate(progress, [0, 1], [0, 1]),
        transform: "translateY(0px)",
      };
  }
};

export const useDelayedEnter = (startMs: number, durationMs: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const startFrame = Math.round((startMs / 1000) * fps);
  const endFrame = startFrame + Math.round((durationMs / 1000) * fps);
  const opacity = interpolate(frame, [startFrame, startFrame + 10, endFrame - 8, endFrame], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return { opacity, visible: frame >= startFrame && frame <= endFrame };
};

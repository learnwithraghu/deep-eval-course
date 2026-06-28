import { useSceneAnimation } from "../utils/animations";
import { VisualElement } from "../types";
import { colors } from "../theme";

const iconMap: Record<string, string> = {
  lightbulb_brain: "💡🧠",
  chat_bubble: "💬",
  keyboard: "⌨️",
  arrow_right: "➡️",
  loop: "🔁",
  chat_bubble_complete: "✅💬",
};

type Props = VisualElement & {
  delayFrames?: number;
  fontSize?: number;
};

export const AnimatedElement: React.FC<Props> = ({
  type,
  text,
  asset,
  animation = "fadeIn",
  delayFrames = 0,
  fontSize,
}) => {
  const style = useSceneAnimation(animation, delayFrames);

  if (type === "icon" && asset) {
    return (
      <div style={{ ...style, fontSize: fontSize ?? 96, lineHeight: 1 }}>
        {iconMap[asset] ?? "✨"}
      </div>
    );
  }

  const base: React.CSSProperties = {
    ...style,
    color: colors.white,
    textAlign: "center",
  };

  switch (type) {
    case "title":
      return (
        <div style={{ ...base, fontSize: fontSize ?? 64, fontWeight: 800 }}>
          {text}
        </div>
      );
    case "subtitle":
      return (
        <div
          style={{
            ...base,
            fontSize: fontSize ?? 34,
            fontWeight: 500,
            color: colors.muted,
            marginTop: 16,
          }}
        >
          {text}
        </div>
      );
    case "headline":
      return (
        <div style={{ ...base, fontSize: fontSize ?? 52, fontWeight: 800, lineHeight: 1.15 }}>
          {text}
        </div>
      );
    case "cta":
      return (
        <div
          style={{
            ...base,
            fontSize: fontSize ?? 38,
            fontWeight: 700,
            color: colors.accentBright,
            marginBottom: 24,
          }}
        >
          {text}
        </div>
      );
    case "badge":
    case "label":
      return (
        <div
          style={{
            ...base,
            display: "inline-block",
            fontSize: fontSize ?? 28,
            fontWeight: 600,
            background: colors.card,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 999,
            padding: "10px 22px",
          }}
        >
          {text}
        </div>
      );
    default:
      return (
        <div style={{ ...base, fontSize: fontSize ?? 32, fontWeight: 600 }}>
          {text}
        </div>
      );
  }
};

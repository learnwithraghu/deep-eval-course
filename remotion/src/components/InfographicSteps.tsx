import { msToFrames } from "../constants";
import { InfographicStep } from "../types";
import { colors } from "../theme";
import { useSceneAnimation } from "../utils/animations";

const iconMap: Record<string, string> = {
  keyboard: "⌨️",
  arrow_right: "➡️",
  loop: "🔁",
  chat_bubble_complete: "✅💬",
};

type Props = {
  steps?: InfographicStep[];
};

export const InfographicSteps: React.FC<Props> = ({ steps = [] }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, width: "100%" }}>
      {steps.map((step, index) => (
        <InfographicStepRow key={`${step.label}-${index}`} step={step} index={index} />
      ))}
    </div>
  );
};

const InfographicStepRow: React.FC<{ step: InfographicStep; index: number }> = ({
  step,
  index,
}) => {
  const delayFrames = step.startMs ? msToFrames(step.startMs) : index * 12;
  const style = useSceneAnimation(step.animation ?? "slideUp", delayFrames);

  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        gap: 24,
        background: colors.card,
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: 20,
        padding: "22px 28px",
      }}
    >
      <div style={{ fontSize: 44, width: 56, textAlign: "center" }}>
        {step.icon ? (iconMap[step.icon] ?? "•") : "•"}
      </div>
      <div style={{ color: colors.white, fontSize: 34, fontWeight: 600, lineHeight: 1.25 }}>
        {step.label}
      </div>
    </div>
  );
};

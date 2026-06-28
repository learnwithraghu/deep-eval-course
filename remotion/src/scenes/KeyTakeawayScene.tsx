import { AbsoluteFill } from "remotion";
import { Scene } from "../types";
import { BrandedBackground } from "../components/BrandedBackground";
import { CaptionOverlay } from "../components/CaptionOverlay";
import { AnimatedElement } from "../components/AnimatedElement";
import { Icon, IconName } from "../icons/Icon";
import { colors } from "../theme";
import { useSceneAnimation } from "../utils/animations";

const DEFAULT_BULLET_ICONS: IconName[] = ["predict", "pattern", "database_x"];

export const KeyTakeawayScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const { visual, captions } = scene;
  const bulletIcons = (visual.bulletIcons ?? DEFAULT_BULLET_ICONS) as IconName[];

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
            <BulletRow
              key={bullet}
              text={bullet}
              index={index}
              icon={bulletIcons[index] ?? "check"}
            />
          ))}
        </div>
      </AbsoluteFill>
      <CaptionOverlay captions={captions} />
    </BrandedBackground>
  );
};

const BulletRow: React.FC<{ text: string; index: number; icon: IconName }> = ({
  text,
  index,
  icon,
}) => {
  const style = useSceneAnimation("slideUp", 12 + index * 10);

  return (
    <div style={{ ...style, display: "flex", alignItems: "center", gap: 18 }}>
      <div
        style={{
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon name={icon} size={32} glow />
      </div>
      <div style={{ color: colors.white, fontSize: 34, fontWeight: 600, lineHeight: 1.3 }}>
        {text}
      </div>
    </div>
  );
};

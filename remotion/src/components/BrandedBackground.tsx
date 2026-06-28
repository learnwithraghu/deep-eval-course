import { AbsoluteFill } from "remotion";
import { backgrounds } from "../theme";

type Props = {
  background?: string;
  children: React.ReactNode;
};

export const BrandedBackground: React.FC<Props> = ({
  background = "gradient_dark_blue",
  children,
}) => {
  return (
    <AbsoluteFill
      style={{
        background: backgrounds[background] ?? backgrounds.gradient_dark_blue,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 20% 10%, rgba(129,140,248,0.18), transparent 35%), radial-gradient(circle at 80% 85%, rgba(99,102,241,0.12), transparent 30%)",
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

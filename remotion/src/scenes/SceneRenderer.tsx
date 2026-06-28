import { Scene, SceneType } from "../types";
import { SeriesIntroScene } from "./SeriesIntroScene";
import { QuestionHookScene } from "./QuestionHookScene";
import { ConceptExplainScene } from "./ConceptExplainScene";
import { KeyTakeawayScene } from "./KeyTakeawayScene";
import { SeriesOutroScene } from "./SeriesOutroScene";

export const SceneRenderer: React.FC<{ scene: Scene }> = ({ scene }) => {
  const map: Record<SceneType, React.FC<{ scene: Scene }>> = {
    series_intro: SeriesIntroScene,
    question_hook: QuestionHookScene,
    concept_explain: ConceptExplainScene,
    metaphor_visual: ConceptExplainScene,
    comparison: ConceptExplainScene,
    key_takeaway: KeyTakeawayScene,
    series_outro: SeriesOutroScene,
  };

  const Component = map[scene.type] ?? ConceptExplainScene;
  return <Component scene={scene} />;
};

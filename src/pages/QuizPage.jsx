import PatternStyle from "../components/PatternStyle";
import Quiz from "../components/Quiz";
import { PokedexProvider } from "../contexts/DataPokedexContext";

export default function QuizPage() {
  return (
    <PatternStyle>
      <PokedexProvider>
        <Quiz />
      </PokedexProvider>
    </PatternStyle>
  );
}

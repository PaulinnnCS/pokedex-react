import PatternStyle from "../components/PatternStyle";
import Quiz from "../components/Quiz";
import { ClockProvider } from "../contexts/ClockContext";
import { PokedexProvider } from "../contexts/DataPokedexContext";

export default function QuizPage() {
  return (
    <PatternStyle>
      <PokedexProvider>
        <ClockProvider>
          <Quiz />
        </ClockProvider>
      </PokedexProvider>
    </PatternStyle>
  );
}

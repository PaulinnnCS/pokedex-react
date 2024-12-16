import PatternStyle from "../components/PatternStyle";
import Pokedex from "../components/Pokedex";
import { PokedexProvider } from "../contexts/DataPokedexContext";

export default function PokedexPage() {
  return (
    <PatternStyle>
      <PokedexProvider>
        <Pokedex />
      </PokedexProvider>
    </PatternStyle>
  );
}

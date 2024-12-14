import { useLocation, useSearchParams } from "react-router-dom";
import PatternStyle from "../components/PatternStyle";
import Pokedex from "../components/Pokedex";
import { PokedexContext, PokedexProvider } from "../contexts/DataPokedexContext";
import { useContext, useEffect, useState } from "react";

export default function PokedexPage() {
  return (
    <PatternStyle>
      <PokedexProvider>
        <Pokedex />
      </PokedexProvider>
    </PatternStyle>
  );
}

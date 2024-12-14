import { createContext, useState, useEffect } from "react";
import { createPokemonBlockList } from "../utils/functions";

export const PokedexContext = createContext();

export function PokedexProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [pokedex, setPokedex] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("pokedex")) || {};
    } catch (error) {
      console.error(error.message);
      return {};
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const urlPokemonLimit = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`;
      const newData = await createPokemonBlockList(urlPokemonLimit, pokedex);
      setPokedex(newData);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("pokedex", JSON.stringify(pokedex));
  }, [pokedex]);

  return (
    <PokedexContext.Provider
      value={{
        pokedex,
        isLoading,
        setPokedex,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
}

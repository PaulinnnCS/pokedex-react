import PatternStyle from "./PatternStyle";
import PokemonBox from "./PokemonBox";
import { Search, Circle, LoaderCircleIcon } from "lucide-react";
import { useEffect, useState, useContext, useRef } from "react";
import Information from "./Information";
import { PokedexContext } from "../contexts/DataPokedexContext";
import { useSearchParams } from "react-router-dom";
import { gsap } from "gsap";

function Pokedex() {
  const { pokedex, isLoading } = useContext(PokedexContext);

  const inputValue = useRef(null);
  const [errorSearch, setErrorSearch] = useState(null);
  const [clickPokemon, setClickPokemon] = useState(null);
  const [boxInformationActive, setBoxInformationActive] = useState(false);

  function onClose() {
    setClickPokemon(false);
    setErrorSearch(false);
    setBoxInformationActive(false);
  }

  function searchPokemon() {
    const value = inputValue.current.value.toLowerCase();
    if (!boxInformationActive || value !== clickPokemon.name) {
      for (const key in pokedex) {
        const pokemon = pokedex[key];
        if (value === pokemon.name) {
          setClickPokemon({ name: pokemon.name, id: pokemon.id });
          setErrorSearch(false);
          break;
        } else {
          setErrorSearch(true);
        }
      }
      setBoxInformationActive(true);
      inputValue.current.value = "";
    }
  }



  if (isLoading) {
    return (<h1>Carregando...</h1>);
  }

  return (
    <section className="flex flex-col justify-center items-center min-w-[60.625rem] w-[67.36%] h-full">
      <div className="relative flex justify-end items-center w-full pb-3">
        <input
          ref={inputValue}
          placeholder="Search for a Pokémon..."
          className="w-full h-[3.75rem] rounded-pattern border px-6 outline-none border-unknown"
          type="text"
        />
        <button
          onClick={searchPokemon}
          className="rounded-pattern absolute flex justify-center items-center justify-self-end bg-dark-crimson w-[3.75rem] h-[3.75rem]"
        >
          <Search className="text-white" />
        </button>
        {errorSearch === true ? (
          <p className="absolute text-dark-crimson left-3 top-[-1.3rem] text-[0.8rem]">
            Search for an existing Pokemon!
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="relative overflow-auto scrollbar-custom grid grid-cols-auto-fit grid-rows-auto-fit gap-x-2 gap-y-2 border p-6 border-unknown bg-white min-h-[28.16rem] h-[82.7%] w-full rounded-25px">
        {clickPokemon && (
          <Information
            name={clickPokemon.name}
            id={clickPokemon.id}
            onClick={onClose}
          />
        )}
        {!clickPokemon &&
          Object.values(pokedex).filter((item) => item.id < 152).map((item) => (
            <PokemonBox
              color={item.types[0]}
              src={item.sprite}
              title={item.name}
              onClick={() => setClickPokemon({ name: item.name, id: item.id })}
              key={item.id}
            />
          ))}
      </div>
    </section>
  );
}

export default Pokedex;

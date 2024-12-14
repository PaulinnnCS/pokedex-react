import PokemonQuizBox from "./PokemonQuizBox";
import { useState, useEffect, useContext } from "react";
import unknown from "../assets/unknown.svg";
import GameClock from "./GameClock";
import PopUp from "./PopUp";
import { ClockContext } from "../contexts/ClockContext";
import { PokedexContext } from "../contexts/DataPokedexContext";
import { useSearchParams } from "react-router-dom";

function handleNumber(id) {
  if (id < 10) {
    return `00${id}`;
  } else if (id >= 10 && id < 100) {
    return `0${id}`;
  } else {
    return id;
  }
}

export default function Quiz() {
  console.log("Quiz");
  const { pokedex, isLoading } = useContext(PokedexContext);

  const [searchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState("");
  const [isDisabledInput, setIsDisabledInput] = useState(true);
  const [popUpActive, setPopUpActive] = useState(false);
  const [counterHit, setCounterHit] = useState(0);
  const [pokemonList, setPokemonList] = useState({});
  const [canGameStart, setCanGameStart] = useState(true);
  const [canGiveUp, setCanGiveUp] = useState(false);
  const { toggleIsClockRunning, auxClock, setClock } = useContext(ClockContext);

  useEffect(() => {
    toggleIsClockRunning(false);
    setIsDisabledInput(true);
    setCanGameStart(true);
    setCanGiveUp(false);
  }, [searchParams]);

  function Play() {
    toggleIsClockRunning(true);
    setIsDisabledInput(false);
    clearPokemonList();
    setCanGameStart(false);
    setCanGiveUp(true);
  }

  function GiveUp() {
    toggleIsClockRunning(false);
    setIsDisabledInput(true);
    setPopUpActive(true);
    setCanGameStart(true);
    setCanGiveUp(false);
  }

  function closePopUp() {
    setPopUpActive(false);
  }

  function clearPokemonList() {
    const list = {};
    for (const key in pokemonList) {
      const pokemon = pokemonList[key];
      const updatePokemon = {
        ...pokemon,
        name: "???",
        sprite: unknown,
        type: "unknown",
        wasFound: false,
      };

      list[pokemon.id] = updatePokemon;
    }

    setPokemonList(list);
  }

  function handleChange(event) {
    const value = event.target.value.toLowerCase().trim();
    setInputValue(value);

    for (const id in pokedex) {
      const pokemon = pokedex[id];
      if (
        value === pokemon.name &&
        pokemonList[pokemon.id].wasFound === false
      ) {
        const updatePokemon = {
          ...pokemon,
          name: pokemon.name,
          id: pokemon.id,
          type: pokemon.types[0],
          wasFound: true,
          sprite: pokemon.sprite,
        };

        setPokemonList((prevPokemonList) => ({
          ...prevPokemonList,
          [pokemon.id]: updatePokemon,
        }));

        setInputValue("");
      }
    }
  }

  // verifica a quantidade de acertos a cada vez que 'pokemonList' é alterado
  useEffect(() => {
    let counter = 0;
    for (const key in pokemonList) {
      const pokemon = pokemonList[key];
      if (!(pokemon.name === "???")) {
        counter += 1;
      }
    }

    if (counter === 151) {
      GiveUp();
    }

    setCounterHit(counter);
  }, [pokemonList]);

  useEffect(() => {
    const createPokemonList = () => {
      const list = {};
      for (const key in pokedex) {
        list[key] = {
          name: "???",
          id: pokedex[key].id,
          wasFound: false,
          type: "unknown",
          sprite: unknown,
        };
      }
      setPokemonList(list);
    };

    createPokemonList();
  }, [pokedex]);

  if (isLoading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <>
      {popUpActive && (
        <PopUp
          onClose={closePopUp}
          counterHit={counterHit}
          elapsedTime={auxClock}
          length={Object.values(pokedex).length}
        />
      )}

      <section className="flex flex-col h-[95%] w-[90%] max-w-[2150px]">
        <div className="flex h-[3.75rem] min-h-[60px] text-white  uppercase">
          <input
            disabled={isDisabledInput}
            placeholder="Enter the name of the Pokemon..."
            onChange={handleChange}
            value={inputValue}
            className="text-black px-6 h-full w-full border border-unknown outline-none rounded-pattern"
            type="text"
          />
          <div className="uppercase font-black flex justify-center items-center rounded-pattern ml-[0.625rem] w-[30.5rem] bg-unknown">
            <p>{`Hits: ${counterHit}`}</p>
          </div>
          <button
            onClick={() => {
              canGameStart && Play();
            }}
            className="font-black uppercase w-[25.5rem] bg-grass rounded-pattern ml-[0.625rem]"
          >
            play
          </button>
          <button
            onClick={() => {
              canGiveUp && GiveUp();
            }}
            className="font-black uppercase w-[25.5rem] bg-dark-crimson rounded-pattern ml-[0.625rem]"
          >
            give up
          </button>
          <div className="text-[1.5rem] font-black uppercase flex justify-center items-center w-[30.75rem] bg-unknown rounded-pattern ml-[0.625rem]">
            <GameClock />
          </div>
        </div>
        <div className="bg-white w-full h-[90%] max-h-[1060px]  mt-[0.9375rem] rounded-25px flex flex-col border-[0.3125rem] border-white">
          <div className="w-full bg-unknown h-[3.125rem] rounded-t-25px"></div>
          <div className="grid-flow-col overflow-auto scrollbar-custom grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid-rows-[repeat(22,minmax(60px,1fr))] gap-1 h-full py-[0.3125rem] pl-[0.3125rem] w-full">
            {Object.values(pokemonList).length > 0 &&
              Object.values(pokemonList).map((item) => (
                <PokemonQuizBox
                  key={item.id}
                  value={item.type}
                  src={item.sprite}
                >{`#${handleNumber(item.id)} - ${item.name}`}</PokemonQuizBox>
              ))}
          </div>
          <div className="w-full bg-unknown h-[2.5rem] rounded-b-25px"></div>
        </div>
      </section>
    </>
  );
}

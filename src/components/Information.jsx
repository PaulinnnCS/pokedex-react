import ProgressBar from "./ProgressBar";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { createPokemonBlock } from "../utils/functions";
import getData from "../utils/getData";
import { X } from "lucide-react";
import { useContext } from "react";
import { PokedexContext } from "../contexts/DataPokedexContext";
import { v4 as uuidv4 } from 'uuid';

// retorna as informacoes sobre a especie do pokemon
async function getSpecies(url) {
  return await getData(url);
}

// organiza a lista de string para serem exibidas
function organizeInformation(information) {
  const length = information.length;
  const listOrganize = [];

  for (const key in information) {
    if (!(length == Number(key) + 1)) {
      listOrganize.push(`${information[key].replace("-", " ")}, `);
    } else {
      listOrganize.push(`${information[key].replace("-", " ")}`);
    }
  }
  return listOrganize;
}

// trata a altura e peso
function handleHeightAndWeight(value) {
  if (value < 10) {
    return `0.${value}`;
  } else {
    return `${value / 10}`;
  }
}

// retorna a soma de todos os stats
function totalStats(stats) {
  return stats.reduce((total, stat) => total + stat.value, 0);
}

// retorna uma lista com todas as descricoes em ingles
function getDescription(data) {
  const descriptionList = data.filter((item) => item.language.name === "en");
  return descriptionList.map((item) => item.flavor_text.replace(/[\f]/g, " "));
}

// retorna {name, id} da cadeia evolutiva
async function getEvolution(url) {
  const data = await getData(url);
  let dataChain = data.chain;
  let name = dataChain.species.name;
  let id = dataChain.species.url.match(/\/(\d+)\//)[1];
  let urlSpecies = dataChain.species.url;
  const evolutionChain = [{ name: name, id: id, url: urlSpecies }];

  dataChain = dataChain.evolves_to;

  if (dataChain.length > 0) {
    dataChain.forEach((item) => {
      name = item.species.name;
      id = item.species.url.match(/\/(\d+)\//)[1];
      urlSpecies = item.species.url;

      evolutionChain.push({ name: name, id: id, url: urlSpecies });

      let itemChain = item.evolves_to;

      while (itemChain.length > 0) {
        name = itemChain[0].species.name;

        id = itemChain[0].species.url.match(/\/(\d+)\//)[1];
        urlSpecies = itemChain[0].species.url;

        evolutionChain.push({ name: name, id: id, url: urlSpecies });

        itemChain = itemChain[0].evolves_to;
      }
    });
  }

  return evolutionChain;
}

export default function Information({ name, id, onClick }) {
  console.log('Information')
  const { pokedex, setPokedex } = useContext(PokedexContext);
  const [evolutionImage, setEvolutionImage] = useState({});

  const currentPokemon = pokedex[id];
  const colorText =
    currentPokemon.types[0] === "normal" ? "text-t-normal" : "text-white";

  // adiciona novas informacoes a pokedex [evolution, description]
  async function addInformation(urlSpecies, currentId) {
    const dataSpecies = await getSpecies(urlSpecies);
    const description = getDescription(dataSpecies.flavor_text_entries);
    const evolution = await getEvolution(dataSpecies.evolution_chain.url);

    setPokedex((prevPokedex) => {
      const updatedPokedex = { ...prevPokedex };
      updatedPokedex[currentId] = {
        ...updatedPokedex[currentId],
        description: description,
        evolution: evolution,
      };
      return updatedPokedex;
    });
  }

  useEffect(() => {
    if (!(currentPokemon.description && currentPokemon.evolution)) {
      addInformation(currentPokemon.speciesUrl, id);
    }
  }, []);

  useEffect(() => {
    async function loadEvolutionImage() {
      if (currentPokemon.evolution) {
        const image = {};
        for (const pokemon of currentPokemon.evolution) {
          if (pokedex[pokemon.id]) {
            image[pokemon.id] = pokedex[pokemon.id].artWork;
          }
        }
        setEvolutionImage(image);
      }
    }

    loadEvolutionImage();
  }, [pokedex, currentPokemon]);

  return (
    <>
      {currentPokemon ? (
        <div
          className={clsx(
            "h-full w-full rounded-25px absolute grid grid-cols-content-info grid-rows-content-row p-[25px] gap-x-4 gap-y-4 border-white border-[5px]",
            `bg-${currentPokemon.types[0]}`,
            colorText
          )}
        >
          <div
            className={clsx(
              "col-span-3 col-start-1 row-start-1 row-span-2 rounded-20px min-h-[10.25rem] ",
              `bg-light-${currentPokemon.types[0]}`
            )}
          >
            <div
              className={clsx(
                "flex justify-center items-center w-full h-[17.64%] max-h-[5rem] rounded-20px",
                `bg-dark-${currentPokemon.types[0]}`
              )}
            >
              <h2 className=" font-black text-[1.5rem] capitalize">{name}</h2>
            </div>

            <div className="p-5 grid grid-cols-[8rem_minmax(7rem,_1fr)] grid-rows-[repeat(4,1.3rem)_7.25rem] gap-y-1  font-black h-[16.25rem]">
              <p className="">Type</p>
              <p className="capitalize">
                {organizeInformation(currentPokemon.types).map((item) => item)}
              </p>
              <p>Ability</p>
              <p className="capitalize">
                {organizeInformation(currentPokemon.abilities).map(
                  (item) => item
                )}
              </p>
              <p>Height</p>
              <p>{`${handleHeightAndWeight(currentPokemon.height)}m`}</p>
              <p>Weight</p>
              <p>{`${handleHeightAndWeight(currentPokemon.weight)}kg`}</p>
              <p>Description</p>
              <p className="overflow-auto scrollbar-custom text-justify">
                {currentPokemon.description &&
                  currentPokemon.description[
                    Math.floor(
                      Math.random() * currentPokemon.description.length
                    )
                  ]}
              </p>
            </div>
          </div>

          <div className="flex justify-end w-full col-span-4 col-start-1 row-start-1">
            <X onClick={onClick} className=" cursor-pointer" />
          </div>

          <div
            className={clsx(
              "grid-cols-1 col-start-4 row-start-2 flex justify-center items-center rounded-20px min-h-[8.25rem]",
              `bg-light-${currentPokemon.types[0]}`
            )}
          >
            <img
              className="w-[12.75rem]"
              src={currentPokemon.artWork}
              alt={name}
            />
          </div>

          <div
            className={clsx(
              "col-start-1 row-start-3 flex col-span-4 rounded-20px min-h-[12.375rem]",
              `bg-light-${currentPokemon.types[0]}`
            )}
          >
            <div className="flex justify-center items-center w-1/2 h-full">
              <div className="p-6   font-black grid grid-cols-[138px_13.75rem] grid-rows-[repeat(6,_minmax(10px,_1fr))] gap-y-1">
                <p className="col-start-1 text-right text-[1.2rem]">
                  Total Stats
                </p>
                <p className="col-start-2 text-right text-[1.2rem]">
                  {totalStats(currentPokemon.stats)}
                </p>
                {currentPokemon.stats.map(({ stat, value }) => (
                  <div key={uuidv4()} className="flex items-center col-span-2 text-[1.1rem] uppercase">
                    <p className="text-right  mr-2  w-[5rem]">{stat}</p>
                    <p className="text-center  w-[4rem]">{value}</p>
                    <ProgressBar
                      value={value}
                      color={currentPokemon.types[0]}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              className={clsx(
                "flex flex-col gap-[20px] h-[87.6%] w-[90%] max-w-[35rem] rounded-20px",
                `bg-full-light-${currentPokemon.types[0]} m-auto`
              )}
            >
              <p className="font-black text-[1.5rem] text-center px-2 my-5 h-[2rem]">
                Evolution
              </p>
              <div className="w-full flex justify-center items-center gap-[20px]">
                {currentPokemon.evolution &&
                  evolutionImage &&
                  currentPokemon.evolution.map((pokemon) => (
                    <img
                     key={uuidv4()}
                      className="w-[6rem]"
                      src={evolutionImage[pokemon.id]}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Carregando...</h1>
      )}
    </>
  );
}

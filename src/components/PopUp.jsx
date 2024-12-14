import { X } from "lucide-react";

export default function PopUp({ onClose, counterHit, elapsedTime, length }) {
  return (
    <span className="absolute w-screen h-screen bg-black/50 backdrop-blur-sm top-[0%]">
      <div className="relative flex justify-center items-center flex-col left-[25%] top-[25%] text-white font-black bg-dark-crimson rounded-pattern w-[50%] h-[50%]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 flex justify-center items-center w-[2rem] h-[2rem]"
        >
          <X strokeWidth="2.5" />
        </button>
        <h1 className="text-[1.8rem]">Congratulations!</h1>
        <p>
          {counterHit === 151
            ? `You completed the Pokedex!`
            : counterHit === 0
            ? `You didn't find any Pokémon! Look at the Pokedex and discover some of them!`
            : `You didn't find all the Pokémon, but you did a good job!`}
        </p>
        <p>
          Você acertou {counterHit} de {length}
        </p>
        <p>Tempo decorrido: {elapsedTime}</p>
      </div>
    </span>
  );
}

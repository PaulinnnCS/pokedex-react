import clsx from "clsx";

export default function PokemonQuizBox({children, src, value}) {
    const lightColor = `bg-light-${value}`;
    const Color = `bg-${value}`;
    return(
            <div className={clsx("flex items-center h-[3.75rem] w-full rounded-pattern", Color)}>
                <div className={clsx("flex justify-center items-center h-[3.125rem] w-[3.125rem] rounded-pattern ml-[0.3125rem]", lightColor)}>
                    <img className="" src={src} alt="" />
                </div>
                <p className="capitalize text-[0.75rem] text-center grow text-white font-black">{children}</p>
            </div>
    );
}
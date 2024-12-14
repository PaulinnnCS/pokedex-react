import clsx from 'clsx';

function PokemonBox({color, onClick, src, title}) {
    const element = `bg-${color}`;
    const lightElement = `bg-light-${color}`;

    return(
        <button onClick={onClick} className={clsx('cursor-pointer flex justify-center items-center w-[5.625rem] h-[5.625rem] rounded-pattern', element)}>
            <div className={clsx('flex justify-center items-center w-[4.375rem] h-[4.375rem] rounded-pattern', lightElement)}>
                <img className="w-[4.25rem]" src={src} alt={title} />
            </div>
        </button>
    );
}

export default PokemonBox;
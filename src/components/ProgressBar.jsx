import clsx from "clsx";

function ProgressBar({color, value}) {
    const fullLightElement = `bg-full-light-${color}`;
    const darkElement = `bg-dark-${color}`;
    const widthProgress = `${value}px`;
   
    return(
        <div className={clsx("w-[200px] h-[8px] rounded-full m-auto mr-0", fullLightElement)}>
            <div style={{ width: `${value}px` }} className={clsx("h-[8px] rounded-full", darkElement)}></div>
        </div>
    );
}

export default ProgressBar;


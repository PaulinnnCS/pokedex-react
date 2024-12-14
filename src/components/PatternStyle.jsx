import logoImage from "../assets/logo-pokemon.svg";
import Navbar from "./Navbar.jsx";
import { PokedexProvider } from "../contexts/DataPokedexContext.jsx";

function PatternStyle({ children }) {
  return (
    <div className=" w-screen h-screen min-h-[57.4375rem] min-w-[120rem] box-border m-0 bg-ice-blue font-['Poppins']">
      <Navbar />
      <header className="flex justify-center items-center h-[16.6%]">
        <img
          src={logoImage}
          alt="Logo Pokemon"
          className="w-[12.5rem] min-w-[12.5rem]"
        />
      </header>
      <section className="flex justify-center items-center h-[83.4%] w-[100%]">
        {children}
      </section>
    </div>
  );
}

export default PatternStyle;

import { ChevronLeft } from "lucide-react";
import { gsap } from "gsap";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";


function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const navbar = useRef(null);

  const listRef = [
    {
      name: "Home",
      ref: "/",
    },
    {
      name: "Pokemon Quiz",
      ref: "/pokemon-quiz",
    },
    {
      name: "Pokedex",
      ref: "/pokedex",
    },
  ];

  function navbarState() {
    const navbarElement = navbar.current;
    gsap.to(navbarElement, {
      x: isNavbarOpen ? "-16.25rem" : "0rem",
      duration: 1,
      ease: "power2.out",
      transformOrigin: "center center",
    });
    setIsNavbarOpen((prev) => !prev);
  }

  return (
    <nav
      ref={navbar}
      className="absolute grid grid-cols-[16.25rem,1fr] w-[18.75rem] h-[100%] min-h-[57.4375rem] text-white"
    >
      <div className=" flex justify-center items-center w-[16.25rem] h-[100%] bg-dark-crimson rounded-r-pattern font-black">
        <div className="w-[12.5rem] h-[91.4%]  bg-coral-red rounded-pattern border border-rose-red py-2">
          <div className="flex items-center h-[7.47%] border-b-[0.1875rem] rounded-t-pattern border-rose-red">
            <h2 className="ml-[1.25rem] text-2xl">Navigation </h2>
          </div>
          <div className="list-none h-[92.53%] mt-[1.875rem] text-base">
            {listRef.map((item) => (
              <li
                key={uuidv4()}
                className="cursor-pointer flex items-center ml-[1.25rem] h-[4.62%] capitalize"
              >
                <Link to={item.ref}>{item.name}</Link>
              </li>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={navbarState}
        className="self-center flex justify-center items-center bg-ruby-red h-[6.25rem] w-[2.5rem] rounded-r-pattern"
      >
        <ChevronLeft
          size="1.875rem"
          strokeWidth="2.5"
          className="text-coral-red"
        />
      </button>
    </nav>
  );
}

export default Navbar;

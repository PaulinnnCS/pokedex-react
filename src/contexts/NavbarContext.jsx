import { useState, createContext, useEffect } from "react";
import NavBar from "../components/Navbar";

export const NavbarContext = createContext();

export function NavbarProvider({ children }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(
    JSON.parse(localStorage.getItem("navbar")) || false
  );

  const toggleNavbar = () => {
    setIsNavbarOpen((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("navbar", JSON.stringify(isNavbarOpen));
  }, [isNavbarOpen]);

  return (
    <NavbarContext.Provider value={{ isNavbarOpen, toggleNavbar }}>
      <NavBar />
      {children}
    </NavbarContext.Provider>
  );
}

import { createContext, useState } from "react";

export const ClockContext = createContext();

export function ClockProvider({ children }) {
    const [Clock, setClock] = useState("00:00:00");
    const [isClockRunning, setIsClockRunning] = useState(false);
    const [auxClock, setAuxClock] = useState("00:00:00");

    const toggleClock = (currentClock) => setClock(currentClock);
    const toggleIsClockRunning = (current) => setIsClockRunning(current);
    const toggleAuxClock = (current) => setAuxClock(current);

    return (
        <ClockContext.Provider value={{ Clock, toggleClock, isClockRunning, toggleIsClockRunning, auxClock, toggleAuxClock, setClock }}>
            {children}
        </ClockContext.Provider>
    );
}
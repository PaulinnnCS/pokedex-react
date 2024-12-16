import { useContext, useEffect, useState } from "react";
import { ClockContext } from "../contexts/ClockContext";

export default function Clock() {
  const [secondCounter, setSecondCounter] = useState(0);
 
  const {
    Clock,
    toggleClock,
    isClockRunning,
    auxClock,
    toggleAuxClock,
  } = useContext(ClockContext);

  useEffect(() => {
    let interval;
    if (isClockRunning) {
      interval = setInterval(() => {
        setSecondCounter((prev) => prev + 1);
      }, 1000);
    } else {
      toggleAuxClock(Clock);

      setSecondCounter(0);
    }

    return () => clearInterval(interval);
  }, [isClockRunning]);

  useEffect(() => {
    const hour = Math.floor(secondCounter / 3600);
    const hourFormat = hour < 10 ? `0${hour}` : hour;

    const minute = Math.floor((secondCounter % 3600) / 60);
    const minuteFormat = minute < 10 ? `0${minute}` : minute;

    const second = Math.floor(secondCounter % 60);
    const secondFormat = second < 10 ? `0${second}` : second;

    toggleClock(`${hourFormat}:${minuteFormat}:${secondFormat}`);
  }, [secondCounter]);

  return <p>{Clock === "00:00:00" ? auxClock : Clock}</p>;
}

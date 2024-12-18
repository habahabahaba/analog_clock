// React:
import { useState, useEffect } from 'react';

const minute = 60;
const hour = 3600;
const halfDay = 43200;
const day = 86400;

const secTick = 6;
const minTick = 360 / hour;
const hourTick = 360 / halfDay;

let intervalId: number;

export default function useClockMovement() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    intervalId = setInterval(() => {
      setSeconds((state) => (state + 1) % day);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const secAngle = (seconds % minute) * secTick;
  const minAngle = +((seconds % hour) * minTick).toFixed(2);
  const hourAngle = +((seconds % halfDay) * hourTick).toFixed(2);
  //   console.log(hourAngle);
  return { secAngle, minAngle, hourAngle };
}

// Utils:
import { syncClock } from '../utils/syncClock.ts';
// React:
import { useState, useEffect, useMemo } from 'react';
// Types, interfaces and enumns:
import type { timeObject } from '../utils/syncClock.ts';
import type { TimeZone } from '../types/timeZones';
type ClockMovementInput = {
  timeZone: TimeZone | null;
  startTime: timeObject | null;
} | null;
interface ClockMovementOutput {
  secAngle: number;
  minAngle: number;
  hourAngle: number;
}

const minute = 60;
const hour = 3600;
const halfDay = 43200;
const day = 86400;

const secTick = 6;
const minTick = 360 / hour;
const hourTick = 360 / halfDay;

let tickId: number;
let syncedTime: timeObject;

export default function useClockMovement(
  inputObj: ClockMovementInput = null
): ClockMovementOutput {
  // Destructuring argument:
  const startTime = inputObj?.startTime || null;
  const timeZone = inputObj?.timeZone || null;

  // Calculating start-time offset for later sync:
  const offset = useMemo(
    () => (startTime ? calculateOffset(startTime, timeZone) : 0),
    []
  );

  // State:
  const [seconds, setSeconds] = useState(0);

  // Initiating arrows rotation:
  useEffect(function tick() {
    tickId = setInterval(() => {
      setSeconds((state) => (state + 1) % day);
    }, 1000);

    // Clear interval:
    return () => {
      clearInterval(tickId);
    };
  }, []);

  // Syncing the clock:
  // Initial time sync (for startTime cases):
  useEffect(
    function initialSync() {
      syncedTime = syncClock();
      setSeconds(() => toSeconds(syncedTime) + offset);
    },
    [timeZone, offset]
  );

  // Periodic time sync:
  useEffect(
    function periodicSync() {
      if (!(seconds % 64)) {
        syncedTime = syncClock(timeZone);

        console.log('[syncClock] seconds:', seconds);
        console.log('[syncClock] syncedTime:', syncedTime);

        setSeconds(() => toSeconds(syncedTime) + offset);
      }
    },
    [timeZone, seconds, offset]
  );

  const secAngle = (seconds % minute) * secTick;
  const minAngle = +((seconds % hour) * minTick).toFixed(2);
  const hourAngle = +((seconds % halfDay) * hourTick).toFixed(2);

  return { secAngle, minAngle, hourAngle };
}

function toSeconds({ hours, minutes, seconds }: timeObject): number {
  const hSeconds = (hours % 24) * hour;
  const mSeconds = (minutes % 60) * minute;
  const sSeconds = (seconds % 60) * 1;

  return sSeconds + mSeconds + hSeconds;
}

function calculateOffset(
  startTime: timeObject,
  timeZone: TimeZone | null
): number {
  const startSeconds = toSeconds(startTime);
  const currSeconds = toSeconds(syncClock(timeZone));
  const currOffset = startSeconds - currSeconds;

  console.log('[calculateOffset] startSeconds:', startSeconds);
  console.log('[calculateOffset] currSeconds:', currSeconds);
  console.log('[calculateOffset] currOffset:', currOffset);

  return currOffset;
}

// Utils:
import { ClockMovementUtils } from '../utils/clockMovementUtils.ts';
// React:
import { useState, useEffect, useMemo } from 'react';
// Types, interfaces and enumns:
import type { TimeZone, TimeObject } from '../types/index.type.ts';
interface ClockMovementOutput {
  secAngle: number;
  minAngle: number;
  hourAngle: number;
}

// Getting helpers from ClockMovementUtils:
const { calculateOffset, syncTime, toSeconds, calculateArrowAngle, day } =
  ClockMovementUtils;

let tickId: number;
let syncId: number;
let syncedTime: TimeObject;

export default function useClockMovement(
  timeZone: TimeZone | null = null,
  startSeconds: number | null = null
): ClockMovementOutput {
  const offset = useMemo(
    () => (startSeconds === null ? 0 : calculateOffset(startSeconds, timeZone)),
    [startSeconds, timeZone]
  );

  // State:
  const [seconds, setSeconds] = useState(0);

  // Initiating arrows rotation:
  useEffect(function tick() {
    tickId = setInterval(() => {
      setSeconds((state) => (state + 1) % day);
    }, 1000);

    // Clear the interval:
    return () => {
      clearInterval(tickId);
    };
  }, []);

  // Syncing the clock:
  useEffect(
    function sync() {
      // Initial time sync:
      syncedTime = syncTime(timeZone);
      console.log('[syncTime] [initial] syncedTime:', syncedTime);
      setSeconds(() => toSeconds(syncedTime));

      // Periodic time sync (every 64 seconds):
      syncId = setInterval(() => {
        syncedTime = syncTime(timeZone);
        console.log('[syncTime] [periodic] syncedTime:', syncedTime);
        setSeconds(() => toSeconds(syncedTime));
      }, 64000);

      // Clear the interval:
      return () => {
        clearInterval(syncId);
      };
    },
    [timeZone]
  );

  const secAngle = calculateArrowAngle('second', seconds, offset);
  const minAngle = calculateArrowAngle('minute', seconds, offset);
  const hourAngle = calculateArrowAngle('hour', seconds, offset);

  return { secAngle, minAngle, hourAngle };
}

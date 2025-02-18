// Utils:
import { ClockMovementUtils } from '../utils/clockMovementUtils.ts';
// React:
import { useState, useEffect, useMemo } from 'react';
// Types, interfaces and enumns:
import type { TimeZone, TimeString } from '../types/index.type.ts';
interface ClockMovementOutput {
  secAngle: number;
  minAngle: number;
  hourAngle: number;
  seconds: number;
  offset: number;
}

// Getting helpers from ClockMovementUtils:
const { calculateOffset, syncTime, toSeconds, calculateArrowAngle, day } =
  ClockMovementUtils;

let tickId: number;
let syncId: number;
let syncedTime: TimeString;

export default function useClockMovement(
  timeZone: TimeZone | null = null,
  startSeconds: number | null = null,
  running = true
): ClockMovementOutput {
  const offset = useMemo(
    () => (startSeconds === null ? 0 : calculateOffset(startSeconds, timeZone)),
    [startSeconds, timeZone]
  );

  // State:
  const [seconds, setSeconds] = useState(0);

  // Initiating arrows rotation:
  useEffect(
    function tick() {
      if (!running) {
        if (tickId) {
          clearInterval(tickId);
        }
        return;
      }
      tickId = setInterval(() => {
        setSeconds((state) => (state + 1) % day);
      }, 1000);

      // Clear the interval:
      return () => {
        clearInterval(tickId);
      };
    },
    [running]
  );

  // Syncing the clock:
  useEffect(
    function sync() {
      if (!running) {
        if (syncId) {
          clearInterval(syncId);
        }
        return;
      }
      // Initial time sync:
      syncedTime = syncTime(timeZone);
      console.log('[syncTime] [initial] syncedTime:', syncedTime);
      setSeconds(() => toSeconds(syncedTime) + offset);

      // Periodic time sync (every 64 seconds):
      syncId = setInterval(() => {
        syncedTime = syncTime(timeZone);
        console.log('[syncTime] [periodic] syncedTime:', syncedTime);
        setSeconds(() => toSeconds(syncedTime) + offset);
      }, 64000);

      // Clear the interval:
      return () => {
        clearInterval(syncId);
      };
    },
    [timeZone, running, offset]
  );

  const secAngle = calculateArrowAngle('second', seconds, 0);
  const minAngle = calculateArrowAngle('minute', seconds, 0);
  const hourAngle = calculateArrowAngle('hour', seconds, 0);

  return { secAngle, minAngle, hourAngle, seconds, offset };
}

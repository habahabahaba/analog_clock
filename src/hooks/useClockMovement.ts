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
let syncId: number;
let syncedTime: timeObject;

export default function useClockMovement(
  inputObj: ClockMovementInput = null
): ClockMovementOutput {
  const timeZone = inputObj ? inputObj.timeZone : null;
  const offset = useMemo(() => calculateOffset(inputObj), [inputObj]);

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
  useEffect(
    function sync() {
      // Initial time sync:
      syncedTime = syncClock(timeZone);
      console.log('[syncClock] [initial] syncedTime:', syncedTime);
      setSeconds(() => toSeconds(syncedTime));

      // Periodic time sync (every 64 seconds):
      syncId = setInterval(() => {
        syncedTime = syncClock(timeZone);
        console.log('[syncClock] [periodic] syncedTime:', syncedTime);
        setSeconds(() => toSeconds(syncedTime));
      }, 64000);

      return () => {
        clearInterval(syncId);
      };
    },
    [timeZone]
  );

  const secAngle = calculateAngle(seconds, minute, secTick, offset);
  const minAngle = calculateAngle(seconds, hour, minTick, offset);
  const hourAngle = calculateAngle(seconds, halfDay, hourTick, offset);

  return { secAngle, minAngle, hourAngle };
}

function calculateAngle(
  seconds: number,
  parentInterval: number,
  secAngle: number,
  secOffset = 0
): number {
  return +(((seconds % parentInterval) + secOffset) * secAngle).toFixed(2);
}

function toSeconds({ hours, minutes, seconds }: timeObject): number {
  const hSeconds = (hours % 24) * hour;
  const mSeconds = (minutes % 60) * minute;
  const sSeconds = (seconds % 60) * 1;

  return sSeconds + mSeconds + hSeconds;
}

function calculateOffset(
  clockMovementInput: ClockMovementInput | null
): number {
  if (!clockMovementInput || !clockMovementInput.startTime) return 0;

  const { timeZone, startTime } = clockMovementInput;
  const startSeconds = toSeconds(startTime);
  const currSeconds = toSeconds(syncClock(timeZone));
  const offset = startSeconds - currSeconds;

  console.log('[calculateOffset] startSeconds:', startSeconds);
  console.log('[calculateOffset] currSeconds:', currSeconds);
  console.log('[calculateOffset] offset:', offset);

  return offset;
}

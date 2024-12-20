// Types, interfaces and enumns:
import { TimeZone } from '../types/timeZones.type';
export type timeObject = {
  hours: number;
  minutes: number;
  seconds: number;
};

export function syncClock(timeZone: TimeZone | null = null): timeObject {
  if (!timeZone) {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone as TimeZone;
  }

  const currentTime = new Intl.DateTimeFormat('UTC', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());

  const [hours, minutes, seconds] = currentTime.split(':').map((str) => +str);

  return { hours, minutes, seconds };
}

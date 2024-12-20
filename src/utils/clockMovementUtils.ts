// Types, interfaces and enumns:
import { TimeZone, ArrowType } from '../types/index.type';
export type timeObject = {
  hours: number;
  minutes: number;
  seconds: number;
};

export class ClockMovementUtils {
  // Time intervals in seconds:
  private static minute = 60;
  private static hour = 3600;
  private static halfDay = 43200;
  private static day = 86400;

  // One second angle for arrows:
  private static secTick = 6;
  private static minTick = 360 / this.hour;
  private static hourTick = 360 / this.halfDay;

  // For getting the current time (according to timezone):
  static syncTime(timeZone: TimeZone | null = null): timeObject {
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

  static calculateArrowAngle(
    arrowType: ArrowType,
    seconds: number,
    secOffset: number = 0
  ): number {
    const [parentInterval, angle] =
      arrowType === 'second'
        ? [this.minute, this.secTick]
        : arrowType === 'minute'
        ? [this.hour, this.minTick]
        : [this.halfDay, this.hourTick];
    return +(((seconds % parentInterval) + secOffset) * angle).toFixed(2);
  }

  static toSeconds({ hours, minutes, seconds }: timeObject): number {
    const hSeconds = (hours % 24) * this.hour;
    const mSeconds = (minutes % 60) * this.minute;
    const sSeconds = (seconds % 60) * 1;

    return sSeconds + mSeconds + hSeconds;
  }

  static calculateOffset(
    time: timeObject | number = 0,
    timeZone: TimeZone | null = null
  ): number {
    const syncedTime: timeObject = this.syncTime(timeZone);
    const syncedSeconds = this.toSeconds(syncedTime);

    // Determining the actual type of the time argument and converting it to seconds:
    let inputSeconds: number;
    if (typeof time !== 'number') {
      inputSeconds = this.toSeconds(time);
    } else if (Number.isSafeInteger(time)) {
      inputSeconds = time;
    } else if (
      !time ||
      Number.isNaN(time) ||
      !Number.isFinite(time) ||
      !Number.isSafeInteger(time)
    ) {
      // Coerce to zero:
      console.log(
        `[calculateOffset] Provided time value (${time}) was coerced to zero!`
      );

      inputSeconds = 0;
    } else {
      inputSeconds = Math.round(time);
    }

    const offset = inputSeconds - syncedSeconds;

    console.log('[calculateOffset] inputSeconds:', inputSeconds);
    console.log('[calculateOffset] syncedSeconds:', syncedSeconds);
    console.log('[calculateOffset] offset:', offset);

    return offset;
  }
}

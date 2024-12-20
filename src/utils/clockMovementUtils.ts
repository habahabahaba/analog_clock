// Types, interfaces and enumns:
import { TimeZone, ArrowType } from '../types/index.type';
export type timeObject = {
  hours: number;
  minutes: number;
  seconds: number;
};

export class ClockMovementUtils {
  // Time intervals in seconds:
  public static readonly minute = 60;
  public static readonly hour = 3600;
  public static readonly halfDay = 43200;
  public static readonly day = 86400;

  // One second angle for arrows:
  public static readonly secTick = 6;
  public static readonly minTick = 360 / this.hour;
  public static readonly hourTick = 360 / this.halfDay;

  private static coerceToInt(num: number): number {
    if (Number.isSafeInteger(num)) {
      return num;
    } else if (
      !num ||
      Number.isNaN(num) ||
      !Number.isFinite(num) ||
      !Number.isSafeInteger(num)
    ) {
      // Coerce to zero:
      console.log(
        `[ClockMovementUtils][coerceToInt] Provided number value (${num}) was coerced to zero!`
      );

      return 0;
    } else {
      return Math.round(num);
    }
  }

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
    } else {
      inputSeconds = this.coerceToInt(time);
    }

    const offset = inputSeconds - syncedSeconds;

    console.log('[calculateOffset] inputSeconds:', inputSeconds);
    console.log('[calculateOffset] syncedSeconds:', syncedSeconds);
    console.log('[calculateOffset] offset:', offset);

    return offset;
  }
}

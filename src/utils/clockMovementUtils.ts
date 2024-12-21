// Types, interfaces and enumns:
import type { TimeZone, ArrowType, TimeString } from '../types/index.type';

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
  public static validateTimeString(time: string): asserts time is TimeString {
    if (!/^(24:[0-5]\d:[0-5]\d|([01]\d|2[0-3]):[0-5]\d:[0-5]\d)$/.test(time)) {
      throw new Error(`Invalid time string: ${time}`);
    }
  }

  // For getting the current time (according to timezone):
  public static syncTime = (timeZone: TimeZone | null = null): TimeString => {
    if (!timeZone) {
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone as TimeZone;
    }

    const time24String = new Intl.DateTimeFormat('UTC', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date()) as TimeString;

    this.validateTimeString(time24String);

    return time24String;
  };

  public static calculateArrowAngle = (
    arrowType: ArrowType,
    seconds: number,
    secOffset: number = 0
  ): number => {
    const [parentInterval, angle] =
      arrowType === 'second'
        ? [this.minute, this.secTick]
        : arrowType === 'minute'
        ? [this.hour, this.minTick]
        : [this.halfDay, this.hourTick];
    return +(((seconds % parentInterval) + secOffset) * angle).toFixed(2);
  };

  public static toSeconds = (timeString: TimeString): number => {
    const [hours, minutes, seconds] = timeString.split(':');
    const hSeconds = (+hours % 24) * this.hour;
    const mSeconds = (+minutes % 60) * this.minute;
    const sSeconds = (+seconds % 60) * 1;

    return sSeconds + mSeconds + hSeconds;
  };

  public static calculateOffset = (
    time: TimeString | number = 0,
    timeZone: TimeZone | null = null
  ): number => {
    const syncedTime: TimeString = this.syncTime(timeZone);
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
  };
}

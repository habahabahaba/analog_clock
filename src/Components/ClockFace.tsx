// Utils
import { ClockMovementUtils } from '../utils/clockMovementUtils';
// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
// Context:
// Hooks:
import useClockMovement from '../hooks/useClockMovement';
// Components:
import ClockArrow from './ClockArrow';
// CSS:
// Types, interfaces and enumns:
import type { FC } from 'react';
import { TimeZones, TimeZone, TimeObject } from '../types/index.type';
interface ClockFaceProps {}

const timeObj: TimeObject = {
  hours: 9,
  minutes: 45,
  seconds: 5,
};
const clockMovementInputArgs: [TimeZone | null, number] = [
  TimeZones.Asia_Tokyo,
  ClockMovementUtils.toSeconds(timeObj),
];

const ClockFace: FC<ClockFaceProps> = () => {
  const { secAngle, minAngle, hourAngle } = useClockMovement(
    // ...clockMovementInputArgs
    null
  );

  // JSX:
  return (
    <div className='face'>
      <ClockArrow arrowType='hour' angle={hourAngle} />
      <ClockArrow arrowType='minute' angle={minAngle} />
      <ClockArrow arrowType='second' angle={secAngle} />
      {/* <ClockArrow arrowType='hour' angle={270} />
      <ClockArrow arrowType='minute' angle={0} />
      <ClockArrow arrowType='second' angle={180} /> */}
    </div>
  );
};

export default ClockFace;

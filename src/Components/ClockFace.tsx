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
import { useMemo, type FC } from 'react';
import { TimeZones } from '../types/timeZones.type';
interface ClockFaceProps {}

const ClockFace: FC<ClockFaceProps> = () => {
  const clockMovementInput = useMemo(
    () => ({
      timeZone: TimeZones.America_Bogota,
      startTime: { hours: 3, minutes: 5, seconds: 45 },
    }),
    // null
    []
  );

  const { secAngle, minAngle, hourAngle } =
    useClockMovement(clockMovementInput);

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

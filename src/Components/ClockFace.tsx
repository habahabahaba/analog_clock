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
import { type FC } from 'react';
import { TimeZones } from '../types/timeZones';
interface ClockFaceProps {}

// let intervalId: number;

const ClockFace: FC<ClockFaceProps> = () => {
  const { secAngle, minAngle, hourAngle } = useClockMovement(
    //   {
    //   timeZone: TimeZones.America_Bogota,
    //   startTime: { hours: 3, minutes: 45, seconds: 45 },
    // }
    null
  );

  // JSX:
  return (
    <div className='face'>
      <ClockArrow arrowType='hour' angle={hourAngle} />
      <ClockArrow arrowType='minute' angle={minAngle} />
      <ClockArrow arrowType='second' angle={secAngle} />
      {/* <ClockArrow arrowType='hour' angle={315} />
      <ClockArrow arrowType='minute' angle={315} />
      <ClockArrow arrowType='second' angle={315} /> */}
    </div>
  );
};

export default ClockFace;

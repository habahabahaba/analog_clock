// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { useState, useEffect } from 'react';
// Context:
// Hooks:
import useClockMovement from '../hooks/useClockMovement';
// Components:
import ClockArrow from './ClockArrow';
// CSS:
// Types, interfaces and enumns:
import { type FC } from 'react';
interface ClockFaceProps {}

// let intervalId: number;

const ClockFace: FC<ClockFaceProps> = () => {
  //   const [angle, setAngle] = useState(0);
  //   useEffect(() => {
  //     intervalId = setInterval(() => {
  //       setAngle((state) => (state + 6) % 360);
  //     }, 1000);
  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   }, []);
  const { secAngle, minAngle, hourAngle } = useClockMovement();

  // JSX:
  return (
    <div className='face'>
      <ClockArrow arrowType='hour' angle={hourAngle} />
      <ClockArrow arrowType='minute' angle={minAngle} />
      <ClockArrow arrowType='second' angle={secAngle} />
    </div>
  );
};

export default ClockFace;

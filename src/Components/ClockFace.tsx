// Utils
import { ClockMovementUtils } from '../utils/clockMovementUtils';
// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
import { useState } from 'react';
// Context:
// Hooks:
import useClockMovement from '../hooks/useClockMovement';
// Components:
import ClockArrow from './ClockArrow';
import ClockDial from './ClockDial';
// CSS:
// Types, interfaces and enumns:
import { type FC } from 'react';
import { TimeZones, TimeZone, TimeString } from '../types/index.type';
interface ClockFaceProps {}

const calibratedDials = [
  {
    backgroundURL: 'clock-dials/dial-00.webp',
    xOffset: '-1px',
    yOffset: '2px',
    angle: 0,
  },
  {
    backgroundURL: 'clock-dials/dial-01.png',
    xOffset: '0.5px',
    yOffset: '-1px',
    // angle: 1,
  },
  {
    backgroundURL: 'clock-dials/dial-02.svg',
    // xOffset: '0.5px',
    // yOffset: '-1px',
    // angle: 1,
  },
  {
    backgroundURL: 'clock-dials/dial-03.svg',
    // xOffset: '0.5px',
    // yOffset: '-1px',
    // angle: 1,
  },
  {
    // just crooked
    backgroundURL: 'clock-dials/dial-04.svg',
    // xOffset: '0.5px',
    // yOffset: '-1px',
    // angle: 1,
  },
  {
    // straight
    backgroundURL: 'clock-dials/dial-05.jpg',
    // xOffset: '0.5px',
    // yOffset: '-1px',
    // angle: 1,
  },
  {
    // straight
    backgroundURL: 'clock-dials/dial-06.jpg',
    // xOffset: '0.5px',
    // yOffset: '-1px',
    // angle: 1,
  },
  {
    // straight
    backgroundURL: 'clock-dials/dial-07.jpg',
    // xOffset: '0.5px',
    // yOffset: '-1px',
    // angle: 1,
  },
  {
    // straight
    backgroundURL: 'clock-dials/dial-08.webp',
    // xOffset: '0.5px',
    // yOffset: '-1px',
    // angle: 1,
  },
];

const timeString: TimeString = '09:15:30';
const clockMovementInputArgs: [TimeZone | null] = [
  TimeZones.Asia_Tokyo,
  // ClockMovementUtils.toSeconds(timeString),
];

const ClockFace: FC<ClockFaceProps> = () => {
  // State:
  const [running, setRunning] = useState(true);
  const [startSeconds, setStartSeconds] = useState(0);

  const { secAngle, minAngle, hourAngle, seconds } = useClockMovement(
    ...clockMovementInputArgs,
    startSeconds,
    running
    // null
  );

  // Handlers:
  function handlePause() {
    if (running) {
      setRunning(false);
    } else {
      setStartSeconds(() => seconds);
      setRunning(true);
    }
  }

  // JSX:
  return (
    <div>
      <button onClick={handlePause}>{running ? 'Pause' : 'Start'}</button>
      <div className='face'>
        <ClockDial {...calibratedDials[8]} />
        <ClockArrow arrowType='hour' angle={hourAngle} />
        <ClockArrow arrowType='minute' angle={minAngle} />
        <ClockArrow arrowType='second' angle={secAngle} />
        {/* <ClockArrow arrowType='hour' angle={270} />
        <ClockArrow arrowType='minute' angle={0} />
        <ClockArrow arrowType='second' angle={180} /> */}
      </div>
    </div>
  );
};

export default ClockFace;

// 3rd party:
// Redux RTK:
// Store:
// React Router:
// React:
// Context:
// Components:
// CSS:
// Types, interfaces and enumns:
import type { FC } from 'react';
interface ClockDialProps {
  backgroundURL: string;
  xOffset?: string;
  yOffset?: string;
  angle?: number;
}

const ClockDial: FC<ClockDialProps> = ({
  backgroundURL,
  xOffset = '0',
  yOffset = '',
  angle = 0,
}) => {
  // JSX:
  return (
    <div
      className='dial'
      style={{
        left: `calc(0% + ${xOffset})`,
        bottom: `calc(0% + ${yOffset})`,
        backgroundImage: `url(${backgroundURL})`,
        transform: `rotate(${angle}deg)`,
        // backgroundColor: 'green',
      }}
    ></div>
  );
};

export default ClockDial;

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
interface ClockArrowProps {
  arrowType: 'hour' | 'minute' | 'second';
  angle: number;
  // start: number;
}

const ClockArrow: FC<ClockArrowProps> = ({ arrowType, angle }) => {
  // JSX:
  return (
    <div
      className={`arrow ${arrowType}`}
      style={{
        // transform: `translateX(-50%)`,
        transform: `translateX(-50%) rotate(${angle}deg)`,
      }}
    ></div>
  );
};

export default ClockArrow;

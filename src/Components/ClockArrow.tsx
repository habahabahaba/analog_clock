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
import { ArrowType } from '../types/index.type';
interface ClockArrowProps {
  arrowType: ArrowType;
  angle: number;
}

const ClockArrow: FC<ClockArrowProps> = ({ arrowType, angle }) => {
  // JSX:
  return (
    <div
      className={`arrow ${arrowType}`}
      style={{
        transform: `translateX(-50%) rotate(${angle}deg)`,
      }}
    ></div>
  );
};

export default ClockArrow;

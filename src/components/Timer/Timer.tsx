import './Timer.css';

import React, { useMemo } from 'react';
import { useElapsedTime } from 'use-elapsed-time';
import { cn } from '../../utils/bem';

export type TimerPropSize = 'm' | 's';

export type Timer = {
  size?: TimerPropSize;
  numberOfSeconds?: number;
  onComplete?: () => undefined | [boolean, number];
  isPlaying?: boolean;
};

export const cnTimer = cn('Timer');

export const Timer: React.FC<Timer> = (props) => {
  const { numberOfSeconds = 5, onComplete, isPlaying = true, size: sizeProp } = props;

  // function getSizeOfPixel(size: TimerPropSize): number {
  //   const sizeObj: Record<TimerPropSize, number> = {
  //     s: 16,
  //     m: 24,
  //   };
  //   return sizeObj[size];
  // }

  let size;
  const strokeWidth = 2;

  if (sizeProp === 'm') {
    size = 24;
  } else if (sizeProp === 's') {
    size = 16;
  }

  const durationMilliseconds = useMemo(() => numberOfSeconds * 1000, [numberOfSeconds]);
  const elapsedTime = useElapsedTime(isPlaying, { durationMilliseconds, onComplete });
  const remainingTime = Math.ceil((durationMilliseconds - elapsedTime) / 1000);

  const r = size / 2 - strokeWidth;
  const percent = (elapsedTime * 100) / durationMilliseconds;
  const strokeDasharray = r * 2 * Math.PI;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percent) / 100;

  return (
    <div className={cnTimer({ size: sizeProp })}>
      <svg
        className={cnTimer('Progress')}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className={cnTimer('Counter')}>{remainingTime}</div>
    </div>
  );
};

import React, { useMemo } from 'react';
import { useElapsedTime } from 'use-elapsed-time';

import './styles.css';

import bem from '../../utils/bem';

const b = bem('timer');

type Timer = {
  wpSize: 'm' | 's';
  timer: number;
  onComplete: () => undefined;
  isPlaying: boolean;
};

const Timer: React.FC<Timer> = props => {
  const { timer, onComplete, isPlaying, wpSize } = props;

  let size;
  const strokeWidth = 2;

  if (wpSize === 'm') {
    size = 24;
  } else if (wpSize === 's') {
    size = 16;
  }

  const durationMilliseconds = useMemo(() => timer * 1000, [timer]);
  const elapsedTime = useElapsedTime(isPlaying, { durationMilliseconds, onComplete });
  const remainingTime = Math.ceil((durationMilliseconds - elapsedTime) / 1000);

  const r = size / 2 - strokeWidth;
  const percent = (elapsedTime * 100) / durationMilliseconds;
  const strokeDasharray = r * 2 * Math.PI;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percent) / 100;

  return (
    <div className={b({ size: wpSize })}>
      <svg className={b('progress')} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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
      <div className={b('count')}>{remainingTime}</div>
    </div>
  );
};

export default Timer;

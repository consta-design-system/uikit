import React, { useMemo } from 'react';
import { useElapsedTime } from 'use-elapsed-time';

import './styles.css';

import bem from '../../utils/bem';

const b = bem('timer');

type Timer = {
  timer: number;
  onComplete: () => undefined;
  isPlaying: boolean;
};

const Timer: React.FC<Timer> = props => {
  const { timer, onComplete, isPlaying } = props;

  const durationMilliseconds = useMemo(() => timer * 1000, [timer]);
  const elapsedTime = useElapsedTime(isPlaying, { durationMilliseconds, onComplete });
  const remainingTime = Math.ceil((durationMilliseconds - elapsedTime) / 1000);

  const percent = (elapsedTime * 100) / durationMilliseconds;
  const strokeDasharray = 10 * 2 * Math.PI;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percent) / 100;

  return (
    <div className={b()}>
      <svg className={b('progress')} viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          strokeWidth="2"
          stroke="#fff"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className={b('count')}>{remainingTime}</div>
    </div>
  );
};

export default Timer;

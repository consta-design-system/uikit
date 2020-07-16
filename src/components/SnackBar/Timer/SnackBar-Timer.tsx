import './SnackBar-Timer.css';

import React, { useEffect, useState } from 'react';

import { useTimer } from '../../../hooks/useTimer/useTimer';
import { Timer } from '../../Timer/Timer';
import { cnSnackBar } from '../SnackBar';

export type SnackBarTimerPropOnMount = (object: { pause: () => void; start: () => void }) => void;

export type SnackBarTimerProps = {
  onMount: SnackBarTimerPropOnMount;
  onTimeIsOver: () => void;
  startTime: number;
};

const interval = 1000;

export const SnackBarTimer: React.FC<SnackBarTimerProps> = (props) => {
  const [running, setRunning] = useState<boolean>(false);
  const { onMount, onTimeIsOver, startTime: startTimeprop } = props;
  const startTime = startTimeprop * interval;
  const { time, start, pause, isRunning } = useTimer({
    endTime: 0,
    startTime,
    timerType: 'DECREMENTAL',
    onTimeOver: onTimeIsOver,
  });

  useEffect(() => {
    onMount({ start, pause });
    start();
  }, []);

  useEffect(() => {
    setRunning(isRunning);
  }, [isRunning]);

  const progress = running ? ((time - interval) / startTime) * 100 : (time / startTime) * 100;
  const seconds = time ? time / interval : 0;

  return (
    <Timer
      className={cnSnackBar('Timer')}
      seconds={seconds}
      progress={progress}
      size="m"
      animation
    />
  );
};

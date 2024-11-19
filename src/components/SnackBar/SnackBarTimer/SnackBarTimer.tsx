import './SnackBarTimer.css';

import React, { useEffect, useState } from 'react';

import { Timer } from '##/components/Timer';
import { useTimer } from '##/hooks/useTimer';
import { cn } from '##/utils/bem';

import { SnackBarTimerProps } from '../types';

const interval = 1000;

const cnSnackBarTimer = cn('SnackBarTimer');

export const SnackBarTimer: React.FC<SnackBarTimerProps> = (props) => {
  const [running, setRunning] = useState<boolean>(false);
  const {
    onMount,
    onTimeIsOver,
    startTime: startTimeProp,
    hidden,
    className,
  } = props;
  const startTime = startTimeProp * interval;
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

  const progress = running
    ? ((time - interval) / startTime) * 100
    : (time / startTime) * 100;
  const seconds = time ? time / interval : 0;

  if (hidden) {
    return null;
  }

  return (
    <Timer
      className={cnSnackBarTimer(null, [className])}
      seconds={seconds}
      progress={progress}
      size="m"
      animation
    />
  );
};

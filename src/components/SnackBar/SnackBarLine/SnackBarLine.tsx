import './SnackBarLine.css';

import React, { useEffect, useState } from 'react';

import { useTimer } from '../../../hooks/useTimer/useTimer';
import { cn } from '../../../utils/bem';
import { cnTheme } from '../../Theme/Theme';
import { SnackBarTimerProps } from '../helper';

const interval = 1000;

const cnSnackBarLine = cn('SnackBarLine');

export const SnackBarLine: React.FC<Omit<SnackBarTimerProps, 'hidden'>> = (props) => {
  const [running, setRunning] = useState<boolean>(false);
  const { onMount, onTimeIsOver, startTime: startTimeprop, className } = props;
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

  return (
    <div
      className={cnSnackBarLine({ running }, [cnTheme({ color: 'gpnDefault' }), className])}
      style={{
        ['--progress-line-progress' as string]: `-${progress / 2}%`,
      }}
    />
  );
};

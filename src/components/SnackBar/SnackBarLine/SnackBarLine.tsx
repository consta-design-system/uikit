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
  const { onMount, onTimeIsOver, startTime: startTimeprop } = props;
  const startTime = startTimeprop * interval;
  const { start, pause, isRunning } = useTimer({
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

  return (
    <div
      className={cnSnackBarLine({ running }, [cnTheme({ color: 'gpnDefault' })])}
      style={{
        ['--progress-line-time' as string]: `${startTime / 1000}s`,
      }}
    />
  );
};

import React, { useEffect } from 'react';

import { useTimer } from '../../../hooks/useTimer/useTimer';
import { cnTheme } from '../../Theme/Theme';
import { cnSnackBar } from '../SnackBar';
import { SnackBarTimerProps } from '../Timer/SnackBar-Timer';

const interval = 1000;

export const SnackBarProgressLine: React.FC<Omit<SnackBarTimerProps, 'hidden'>> = (props) => {
  const { onMount, onTimeIsOver, startTime: startTimeprop } = props;
  const startTime = startTimeprop * interval;
  const { start, pause } = useTimer({
    endTime: 0,
    startTime,
    timerType: 'DECREMENTAL',
    onTimeOver: onTimeIsOver,
  });

  useEffect(() => {
    onMount({ start, pause });
    start();
  }, []);

  return (
    <div
      className={cnSnackBar('ProgressLine', [cnTheme({ color: 'gpnDefault' })])}
      style={{
        ['--progress-line-time' as string]: `${startTime / 1000}s`,
      }}
    />
  );
};

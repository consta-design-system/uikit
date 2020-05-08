import './SnackBar-Timer.css';

import React, { useEffect, useState } from 'react';
import { useTimer } from '../../../utils/useTimer';
import { Timer } from '../../Timer/Timer';
import { cnSnackBar } from '../SnackBar';

export type ISnackBarTimer = {
  onMount: (object: { pause: () => void; start: () => void }) => void;
  onTimeIsOver: () => void;
  initialTime: number;
};

export function SnackBarTimer(props: ISnackBarTimer) {
  const [running, setRunning] = useState<boolean>(false);
  const { onMount, onTimeIsOver, initialTime } = props;
  const { time, start, pause, isRunning } = useTimer({
    endTime: 0,
    initialTime,
    timerType: 'DECREMENTAL',
  });
  useEffect(() => {
    onMount({ start, pause });
    start();
  }, []);
  useEffect(() => {
    if (time <= 0) {
      onTimeIsOver();
    }
  }, [time]);
  useEffect(() => {
    setRunning(isRunning);
  }, [isRunning]);

  const progress = running ? ((time - 1) / initialTime) * 100 : (time / initialTime) * 100;
  return (
    <Timer className={cnSnackBar('Timer')} seconds={time} progress={progress} size="m" animation />
  );
}

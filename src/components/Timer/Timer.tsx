import './Timer.css';

import React, { useEffect } from 'react';
import { useTimer } from 'use-timer';
import { ProgressSpin, ProgressSpinPropSize } from '../ProgressSpin/ProgressSpin';
import { cn } from '../../utils/bem';

export type TimerPropSize = ProgressSpinPropSize;
export type TimerPropOnTimerInit = (obj: {
  isRunning: boolean;
  pause: () => void;
  reset: () => void;
  start: () => void;
  time: number;
}) => void;

export type TimerProps = {
  size?: TimerPropSize;
  seconds?: number;
  onComplete?: () => void;
  onTimerInit: TimerPropOnTimerInit;
  playing?: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
};

export const cnTimer = cn('Timer');

export type ITimer = TimerProps & (Omit<React.HTMLAttributes<HTMLDivElement>, keyof TimerProps>);

export function Timer(props: ITimer): React.ReactElement {
  const {
    seconds = 5,
    onComplete,
    playing = false,
    size = 'm',
    onTimerInit,
    innerRef,
    ...otherProps
  } = props;

  const { time, start, pause, reset, isRunning } = useTimer({
    timerType: 'DECREMENTAL',
    endTime: 0,
    initialTime: seconds,
    step: 1,
    interval: 1000,
    onTimeOver: () => onComplete && onComplete(),
  });

  useEffect(() => {
    onTimerInit && onTimerInit({ time, start, pause, reset, isRunning });
  }, []);

  useEffect(() => {
    if (playing && !isRunning) {
      start();
    }
    if (!playing && isRunning) {
      pause();
    }
  }, [playing]);

  const progress = (time / seconds) * 100;

  return (
    <div {...otherProps} className={cnTimer({ size })} ref={innerRef}>
      <ProgressSpin className={cnTimer('Progress')} size={size} progress={progress} animation />
      <div className={cnTimer('Counter')}>{time}</div>
    </div>
  );
}

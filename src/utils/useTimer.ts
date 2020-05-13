import { useEffect, useRef, useState } from 'react';

export type Timer = 'DECREMENTAL' | 'INCREMENTAL';

/**
 * interval - tick duration
 * endTime - stop timer in ticks
 * initialTime: start time in ticks
 * onTimeOver?: timer over callback
 * step: step size in ticks
 */

export type Config = {
  interval: number;
  endTime: number | null;
  initialTime: number;
  onTimeOver?: () => void;
  step: number;
  timerType: Timer;
};

export type Values = {
  isRunning: boolean;
  pause: () => void;
  reset: () => void;
  start: () => void;
  time: number;
};

const initialConfig: Config = {
  interval: 1000,
  endTime: null,
  initialTime: 0,
  step: 1,
  timerType: 'INCREMENTAL',
};

export function useTimer(config?: Partial<Config>): Values {
  const { endTime, initialTime, interval, onTimeOver, step, timerType } = {
    ...initialConfig,
    ...config,
  };
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pausedTimeRef = useRef<number | null>(null);
  const [shouldResetTime, setShouldResetTime] = useState(false);
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  const cancelInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  };

  const createInterval = () => {
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTime((previousTime) => {
        const newTime = timerType === 'INCREMENTAL' ? previousTime + step : previousTime - step;

        if (endTime !== null && newTime === endTime) {
          stopTimerWhenTimeIsOver();
        }

        return newTime;
      });
    }, interval);
  };

  const pause = () => {
    pausedTimeRef.current = time;

    cancelInterval();
  };

  const resetTime = () => {
    setTime(initialTime);
  };

  const reset = () => {
    pausedTimeRef.current = null;

    cancelInterval();
    resetTime();
  };

  const start = () => {
    if (intervalRef.current) {
      return;
    }

    if (shouldResetTime) {
      resetTime();
      setShouldResetTime(false);
    }

    createInterval();
  };

  const stopTimerWhenTimeIsOver = () => {
    cancelInterval();
    setShouldResetTime(true);

    if (typeof onTimeOver === 'function') {
      onTimeOver();
    }
  };

  useEffect(() => cancelInterval, []);

  return { isRunning, pause, reset, start, time };
}

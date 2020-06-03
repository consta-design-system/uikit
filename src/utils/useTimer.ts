import { useEffect, useRef, useState } from 'react';

export type Timer = 'DECREMENTAL' | 'INCREMENTAL';

export type Config = {
  /** interval in ms  */
  interval: number;
  /**  stop timer in ms */
  endTime: number | null;
  /**  start timer in ms */
  startTime: number;
  /** timer over callback */
  onTimeOver?: () => void;
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
  startTime: 0,
  timerType: 'INCREMENTAL',
};

export function useTimer(config?: Partial<Config>): Values {
  const { endTime, startTime, interval, onTimeOver, timerType } = {
    ...initialConfig,
    ...config,
  };
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pausedTimeRef = useRef<number | null>(null);
  const [shouldResetTime, setShouldResetTime] = useState(false);
  const [time, setTime] = useState(startTime);
  const [isRunning, setIsRunning] = useState(false);

  const cancelInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  };

  const pause = () => {
    pausedTimeRef.current = time;

    cancelInterval();
  };

  const resetTime = () => {
    setTime(startTime);
  };

  const reset = () => {
    pausedTimeRef.current = null;

    cancelInterval();
    resetTime();
  };

  const stopTimerWhenTimeIsOver = () => {
    cancelInterval();
    setShouldResetTime(true);

    if (typeof onTimeOver === 'function') {
      onTimeOver();
    }
  };

  const createInterval = () => {
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTime((previousTime) => {
        const newTime =
          timerType === 'INCREMENTAL' ? previousTime + interval : previousTime - interval;

        if (
          endTime !== null &&
          (timerType === 'INCREMENTAL' ? newTime >= endTime : newTime <= endTime)
        ) {
          stopTimerWhenTimeIsOver();
        }

        return newTime;
      });
    }, interval);
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

  useEffect(() => cancelInterval, []);

  return { isRunning, pause, reset, start, time };
}

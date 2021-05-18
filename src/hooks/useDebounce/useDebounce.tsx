import { useCallback, useEffect, useRef } from 'react';

type UseDebounce = <T extends (...args: any) => void>(
  fn: T,
  time: number,
) => (...args: Parameters<T>) => void;

export const useDebounce: UseDebounce = (fn, time) => {
  type Fn = typeof fn;

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fnRef = useRef<Fn>();

  fnRef.current = fn;

  useEffect(() => {
    return (): void => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [time]);

  return useCallback(
    (...args: Parameters<Fn>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        if (typeof fnRef.current === 'function') {
          fnRef.current(...args);
        }
      }, time);
    },
    [time],
  );
};

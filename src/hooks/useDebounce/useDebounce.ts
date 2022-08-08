import { useCallback, useEffect, useRef } from 'react';

export const useDebounce = <T extends (...args: any) => void>(
  fn: T,
  time: number,
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fnRef = useRef<T>();

  fnRef.current = fn;

  useEffect(() => {
    return (): void => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [time]);

  return useCallback<T>(
    ((...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        if (typeof fnRef.current === 'function') {
          fnRef.current(...args);
        }
      }, time);
    }) as T,
    [time],
  );
};

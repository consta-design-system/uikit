import React from 'react';

export const useDebounce = (fn: Function, time = 0) => {
  const ref = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const fnRef = React.useRef<Function>();

  fnRef.current = fn;

  React.useEffect(() => {
    return (): void => {
      ref.current && clearTimeout(ref.current);
    };
  }, [time]);

  return React.useCallback(
    (...args) => {
      if (ref.current) {
        clearTimeout(ref.current);
      }

      ref.current = setTimeout(() => {
        ref.current = null;
        if (typeof fnRef.current === 'function') {
          fnRef.current(...args);
        }
      }, time);
    },
    [time],
  );
};

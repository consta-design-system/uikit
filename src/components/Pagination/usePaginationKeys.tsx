import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import { PaginationPropHotKey } from './types';

type UsePaginationKeysParams = {
  containerEventListener?: HTMLElement | Window;
  hotKeys?: [PaginationPropHotKey?, PaginationPropHotKey?];
  nextButtonRef?: React.RefObject<HTMLElement>;
  prevButtonRef?: React.RefObject<HTMLElement>;
};

export const usePaginationKeys = (params: UsePaginationKeysParams) => {
  const {
    containerEventListener = window,
    hotKeys,
    nextButtonRef,
    prevButtonRef,
  } = params;
  const keys: React.MutableRefObject<string[]> = useRef([]);
  const hotKeysRef = useRef(hotKeys ?? []);

  const keyUpListener: EventListener = (event) => {
    const { key } = event as KeyboardEvent;
    keys.current = keys.current.filter((hotKey) => hotKey !== key);
  };

  const keyDownListener: EventListener = useCallback(
    (event) => {
      const { key } = event as KeyboardEvent;

      const [start, end] = hotKeysRef.current;

      if (start?.keys.includes(key) || end?.keys.includes(key)) {
        const newKeys = [...keys.current, key];
        if (end?.keys.every((hotKey) => newKeys.includes(hotKey))) {
          nextButtonRef?.current?.click();
        } else if (start?.keys.every((hotKey) => newKeys.includes(hotKey))) {
          prevButtonRef?.current?.click();
        }
        keys.current = newKeys;
      }
    },
    [hotKeys],
  );

  useLayoutEffect(() => {
    containerEventListener.addEventListener('keydown', keyDownListener);
    containerEventListener.addEventListener('keyup', keyUpListener);
    return () => {
      containerEventListener.removeEventListener('keydown', keyDownListener);
      containerEventListener.removeEventListener('keyup', keyUpListener);
    };
  }, [nextButtonRef, prevButtonRef, containerEventListener]);

  useEffect(() => {
    if (hotKeys) {
      hotKeysRef.current = hotKeys;
    }
  }, [hotKeys]);
};

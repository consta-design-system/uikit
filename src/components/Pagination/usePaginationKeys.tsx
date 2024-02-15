import { useCallback, useLayoutEffect, useRef } from 'react';

import { useMutableRef } from '##/hooks/useMutableRef';

import { PaginationPropHotKey } from './types';

type UsePaginationKeysParams = {
  containerEventListener?: HTMLElement | Window;
  hotKeys?: [PaginationPropHotKey?, PaginationPropHotKey?];
  handleNext: (e: React.MouseEvent | KeyboardEvent) => void;
  handlePrevious: (e: React.MouseEvent | KeyboardEvent) => void;
};

export const usePaginationKeys = (params: UsePaginationKeysParams) => {
  const {
    containerEventListener = window,
    hotKeys,
    handleNext,
    handlePrevious,
  } = params;
  const keys: React.MutableRefObject<string[]> = useRef([]);
  const mutableRefs = useMutableRef([
    hotKeys || [],
    handleNext,
    handlePrevious,
  ] as const);

  const keyUpListener: EventListener = useCallback((event) => {
    const { key } = event as KeyboardEvent;
    keys.current = keys.current.filter((hotKey) => hotKey !== key);
  }, []);

  const keyDownListener = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    const [start, end] = mutableRefs.current[0];

    if (start?.keys.includes(key) || end?.keys.includes(key)) {
      const newKeys = [...keys.current, key];
      if (end?.keys.every((hotKey) => newKeys.includes(hotKey))) {
        mutableRefs.current[1](event);
      } else if (start?.keys.every((hotKey) => newKeys.includes(hotKey))) {
        mutableRefs.current[2](event);
      }
      keys.current = newKeys;
    }
  }, []);

  useLayoutEffect(() => {
    containerEventListener.addEventListener(
      'keydown',
      keyDownListener as EventListener,
    );
    containerEventListener.addEventListener('keyup', keyUpListener);
    return () => {
      containerEventListener.removeEventListener(
        'keydown',
        keyDownListener as EventListener,
      );
      containerEventListener.removeEventListener('keyup', keyUpListener);
    };
  }, [containerEventListener]);
};

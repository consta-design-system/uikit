import { useLayoutEffect, useRef, useState } from 'react';

import { PaginationPropHotKey } from './types';

type UsePaginationKeysParams = {
  containerEventListener?: HTMLElement | Window;
  hotKeys?: [PaginationPropHotKey?, PaginationPropHotKey?];
};

export const usePaginationKeys = (params: UsePaginationKeysParams) => {
  const { containerEventListener = window, hotKeys } = params;

  const [keys, setKeys] = useState<string[]>([]);

  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);

  const keyUpListener: EventListener = (event) => {
    const { key } = event as KeyboardEvent;

    setKeys((prevState) => prevState.filter((hotKey) => hotKey !== key));
  };

  const keyDownListener: EventListener = (event) => {
    const { key } = event as KeyboardEvent;

    const [start, end] = hotKeys ?? [];

    if (start?.keys.includes(key) || end?.keys.includes(key)) {
      const newKeys = [...keys, key];
      if (end?.keys.every((hotKey) => newKeys.includes(hotKey))) {
        nextButtonRef.current?.click();
      } else if (start?.keys.every((hotKey) => newKeys.includes(hotKey))) {
        prevButtonRef.current?.click();
      }
      setKeys(newKeys);
    }
  };

  useLayoutEffect(() => {
    containerEventListener.addEventListener('keydown', keyDownListener);
    containerEventListener.addEventListener('keyup', keyUpListener);
    return () => {
      containerEventListener.removeEventListener('keydown', keyDownListener);
      containerEventListener.removeEventListener('keyup', keyUpListener);
    };
  }, [nextButtonRef, prevButtonRef, containerEventListener, keys]);

  return {
    prevButtonRef,
    nextButtonRef,
  };
};

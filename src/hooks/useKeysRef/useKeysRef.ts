import React, { useEffect } from 'react';

import { useMutableRef } from '##/hooks/useMutableRef';
import { KeyCode } from '##/utils/types/KeyCode';

export type KeyHandlers = Partial<
  Record<KeyCode, (e: KeyboardEvent) => void>
> & {
  [key: string]: (e: KeyboardEvent) => void;
};

type UseKeysProps = {
  ref?: React.RefObject<HTMLElement>;
  keys: KeyHandlers;
  isActive?: boolean | (() => boolean | undefined);
  eventHandler?: (event: KeyboardEvent) => void;
  eventType?: 'keypress' | 'keydown' | 'keyup';
};

export const useKeysRef = (params: UseKeysProps) => {
  const { ref, keys, isActive, eventType = 'keydown', eventHandler } = params;

  const refs = useMutableRef([keys, isActive, eventHandler] as const);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (
        typeof refs.current[1] === 'function'
          ? refs.current[1]()
          : refs.current[1]
      ) {
        (
          refs.current[0][e.code as KeyCode] ||
          refs.current[0][e.key as KeyCode]
        )?.(e);
      }
      refs.current[2]?.(e);
    };

    ref?.current?.addEventListener(eventType, fn);

    return () => {
      ref?.current?.removeEventListener(eventType, fn);
    };
  }, [ref?.current, eventType]);
};

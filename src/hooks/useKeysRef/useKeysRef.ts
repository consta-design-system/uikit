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
  isActive?: boolean;
  eventHandler?: (event: KeyboardEvent) => void;
  eventType?: 'keypress' | 'keydown' | 'keyup';
};

export const useKeysRef = (params: UseKeysProps) => {
  const { ref, keys, isActive = false, eventType = 'keydown' } = params;

  const fn = useMutableRef((e: KeyboardEvent) => {
    if (isActive) {
      (keys[e.code as KeyCode] || keys[e.key as KeyCode])?.(e);
    }
  });

  useEffect(() => {
    ref?.current?.addEventListener(eventType, fn.current);

    return () => {
      ref?.current?.removeEventListener(eventType, fn.current);
    };
  }, [ref?.current, eventType]);
};

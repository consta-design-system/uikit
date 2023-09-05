import React, { useCallback, useEffect } from 'react';

import { KeyCode } from '##/utils/types/KeyCode';

export type KeyHandlers = Partial<
  Record<KeyCode, (e: KeyboardEvent) => void>
> & {
  [key: string]: (e: KeyboardEvent) => void;
};

type UseKeysProps = {
  ref?: React.RefObject<HTMLElement>;
  keys?: KeyHandlers;
  isActive?: boolean;
};

const getKeyHandler = (keys: KeyHandlers) => {
  return (e: KeyboardEvent) => {
    (keys[e.code as KeyCode] || keys[e.key as KeyCode])?.(e);
  };
};

export const useKeysRef = (params: UseKeysProps) => {
  const { ref, keys, isActive = true } = params;

  const onKeyDown = useCallback(
    (e: Event) => {
      if (keys && isActive) {
        const event = e as unknown as KeyboardEvent;
        getKeyHandler(keys)(event);
      }
    },
    [keys, isActive],
  );

  useEffect(() => {
    ref?.current?.addEventListener('keydown', onKeyDown);

    return () => {
      ref?.current?.removeEventListener('keydown', onKeyDown);
    };
  }, [ref, keys, isActive]);
};

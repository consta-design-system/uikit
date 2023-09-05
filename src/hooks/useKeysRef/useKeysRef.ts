import React, { useCallback, useEffect } from 'react';

export type KeyHandler = (
  prop: { keyCode: number; key: string; shift: boolean; meta: boolean },
  e: KeyboardEvent,
) => void;

export type UserKeysProps = {
  [key: string]: KeyHandler;
};

export const useKeysRef = (
  ref?: React.RefObject<HTMLElement>,
  keys?: UserKeysProps,
) => {
  const onKeyDown = useCallback(
    (e: Event) => {
      if (keys) {
        const event = e as unknown as KeyboardEvent;
        const { keyCode, key, shiftKey: shift, metaKey: meta } = event;
        const handler = keys[key] || keys[keyCode];
        if (typeof handler === 'function') {
          handler(
            {
              keyCode,
              key,
              shift,
              meta,
            },
            event,
          );
        }
      }
    },
    [keys],
  );

  useEffect(() => {
    ref?.current?.addEventListener('keydown', onKeyDown);

    return () => {
      ref?.current?.removeEventListener('keydown', onKeyDown);
    };
  }, [ref, keys]);
};

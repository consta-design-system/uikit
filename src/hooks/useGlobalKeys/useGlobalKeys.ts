import { useEffect, useRef } from 'react';

import { KeyCode } from '../../utils/types/KeyCode';

export type KeysHandlerProps = Partial<Record<KeyCode, (e: KeyboardEvent) => void>>;

export type KeyUpOrKeyDown = 'keyup' | 'keydown';

export const useGlobalKeys = (
  keyHandlers: KeysHandlerProps,
  eventType: KeyUpOrKeyDown = 'keyup',
) => {
  const keyHandlersRef = useRef<KeysHandlerProps>({});

  useEffect(() => {
    keyHandlersRef.current = keyHandlers;
  }, [keyHandlers]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const { current } = keyHandlersRef;

      if (current) {
        const userHandler = current[e.code as KeyCode];
        userHandler && userHandler(e);
      }
    };

    document.addEventListener(eventType, handler);

    return () => {
      document.removeEventListener(eventType, handler);
    };
  }, [eventType]);
};

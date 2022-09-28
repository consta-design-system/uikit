import { useEffect, useRef } from 'react';

import { KeyCode } from '../../utils/types/KeyCode';

export type KeyHandlers = Partial<
  Record<KeyCode, (e: KeyboardEvent) => void>
> & {
  [key: string]: (e: KeyboardEvent) => void;
};

export type EventType = 'keyup' | 'keydown';

export const useGlobalKeys = (
  keyHandlers: KeyHandlers,
  eventType: EventType = 'keyup',
) => {
  const keyHandlersRef = useRef<KeyHandlers>({});

  useEffect(() => {
    keyHandlersRef.current = keyHandlers;
  }, [keyHandlers]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const { current } = keyHandlersRef;

      const userHandler =
        current[e.code as KeyCode] || current[e.key as KeyCode];
      userHandler && userHandler(e);
    };

    document.addEventListener(eventType, handler);

    return () => {
      document.removeEventListener(eventType, handler);
    };
  }, [eventType]);
};

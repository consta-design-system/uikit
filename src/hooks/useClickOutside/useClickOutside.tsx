import { RefObject, useEffect } from 'react';

import { useMutableRef } from '../useMutableRef/useMutableRef';

export type ClickOutsideHandler = (event: MouseEvent) => void;

type UseClickOutsideProps = {
  isActive?: boolean;
  ignoreClicksInsideRefs?: ReadonlyArray<RefObject<HTMLElement>>;
  handler?: ClickOutsideHandler;
};

export function useClickOutside({
  isActive,
  ignoreClicksInsideRefs,
  handler,
}: UseClickOutsideProps): void {
  // Аргументы вынесены в рефки за тем, чтобы не пересоздавать подписку `mousedown` при кажом чихе.
  // Бывают кейсы когда на странице несколко `useClickOutside` и один вызывает рендер,
  // А второй не успевает отрабатывать а просто пересоздается
  // С такой реализацией пересоздание только при удалении из дома, а аргументы всегда актуалны.

  const handlerRef = useMutableRef(handler);
  const ignoreClicksInsideRefsRef = useMutableRef(ignoreClicksInsideRefs);
  const isActiveRef = useMutableRef(isActive);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!isActiveRef.current) {
        return;
      }

      const target = event.target as Node;

      const shouldCallHandler = ignoreClicksInsideRefsRef.current?.every(
        (ref) => !ref.current?.contains(target),
      );

      shouldCallHandler && handlerRef.current?.(event);
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
}

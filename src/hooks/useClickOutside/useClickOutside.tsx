import { RefObject, useEffect } from 'react';

import { useMutableRef } from '../useMutableRef/useMutableRef';

export type ClickOutsideHandler = (event: MouseEvent) => void;

type UseClickOutsideProps = {
  isActive?: boolean | (() => boolean | undefined);
  ignoreClicksInsideRefs?: ReadonlyArray<RefObject<HTMLElement>>;
  handler?: ClickOutsideHandler;
};

export function useClickOutside({
  isActive,
  ignoreClicksInsideRefs,
  handler,
}: UseClickOutsideProps): void {
  // Аргументы вынесены в рефки за тем, чтобы не пересоздавать подписку `mousedown` при каждом рендере.
  // Бывают случаи когда на странице несколько `useClickOutside` и один вызывает рендер,
  // А второй не успевает отрабатывать а просто пересоздается
  // С такой реализацией пересоздание только при удалении из дома, а аргументы всегда актуальны.

  const handlerRef = useMutableRef(handler);
  const ignoreClicksInsideRefsRef = useMutableRef(ignoreClicksInsideRefs);
  const isActiveRef = useMutableRef(isActive);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        typeof isActiveRef.current === 'function'
          ? isActiveRef.current()
          : isActiveRef.current
      ) {
        const target = event.target as Node;

        const shouldCallHandler = ignoreClicksInsideRefsRef.current?.every(
          (ref) => !ref.current?.contains(target),
        );

        shouldCallHandler && handlerRef.current?.(event);
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
}

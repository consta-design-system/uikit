import { RefObject, useEffect } from 'react';

export function useClickOutside({
  isActive,
  ignoreClicksInsideRefs,
  handler,
}: {
  isActive: boolean;
  ignoreClicksInsideRefs: ReadonlyArray<RefObject<HTMLElement>>;
  handler: (event: MouseEvent) => void;
}) {
  useEffect(() => {
    if (!isActive) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;

      const shouldCallHandler = ignoreClicksInsideRefs.every(
        (ref) => !ref.current?.contains(target),
      );

      shouldCallHandler && handler(event);
    };
    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  }, [isActive, ignoreClicksInsideRefs, handler]);
}

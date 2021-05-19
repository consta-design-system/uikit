import { RefObject, useEffect } from 'react';

export type ClickOutsideHandler = (event: MouseEvent) => void;

type UseClickOutsideProps = {
  isActive: boolean;
  ignoreClicksInsideRefs: ReadonlyArray<RefObject<HTMLElement>>;
  handler: ClickOutsideHandler;
};

export function useClickOutside({
  isActive,
  ignoreClicksInsideRefs,
  handler,
}: UseClickOutsideProps): void {
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

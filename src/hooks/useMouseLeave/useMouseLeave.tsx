import { RefObject, useEffect, useRef } from 'react';

import { useDebounce } from '../useDebounce';
import { useMutableRef } from '../useMutableRef';

type Props = {
  isActive?: boolean;
  refs: ReadonlyArray<RefObject<HTMLElement>>;
  handler: (event: FocusEvent) => void;
  debounce?: number;
};

export function useMouseLeave({
  isActive = false,
  refs,
  handler,
  debounce = 0,
}: Props): void {
  const refsRef = useMutableRef(refs);
  const isActiveRef = useMutableRef(isActive);
  const hoveredRef = useRef(false);

  const handleLeaveDebounce = useDebounce((event: FocusEvent) => {
    if (!isActiveRef.current || hoveredRef.current) {
      return;
    }

    const target = event.target as Node;

    const shouldCallHandler = !!refsRef.current?.find((ref) => {
      return ref.current !== target;
    });

    shouldCallHandler && handler(event);
  }, debounce);

  useEffect(() => {
    const hoveredRefSetTrue = () => {
      hoveredRef.current = true;
    };

    const hoveredRefSetFalse = () => {
      hoveredRef.current = false;
    };

    const handleLeave = (event: FocusEvent) => {
      hoveredRefSetFalse();
      handleLeaveDebounce(event);
    };

    refsRef.current.forEach((ref) => {
      ref.current?.addEventListener('mouseleave', handleLeave);
      ref.current?.addEventListener('mousemove', hoveredRefSetTrue);
    });

    return () => {
      refsRef.current.forEach((ref) => {
        ref.current?.removeEventListener('mouseleave', handleLeave);
        ref.current?.removeEventListener('mousemove', hoveredRefSetTrue);
      });
    };
  }, [refs]);
}

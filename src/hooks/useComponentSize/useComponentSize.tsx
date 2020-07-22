import { useCallback, useLayoutEffect, useState } from 'react';

type ComponentSize = {
  width: number;
  height: number;
};

const getElementSize = (el: HTMLElement | null): ComponentSize =>
  el
    ? {
        width: el.offsetWidth,
        height: el.offsetHeight,
      }
    : {
        width: 0,
        height: 0,
      };

export function useComponentSize<T extends HTMLElement>(ref: React.RefObject<T>): ComponentSize {
  const [componentSize, setComponentSize] = useState<ComponentSize>(
    getElementSize(ref && ref.current),
  );

  const handleResize = useCallback(() => {
    if (ref.current) {
      setComponentSize(getElementSize(ref.current));
    }
  }, [ref]);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, handleResize]);

  return componentSize;
}

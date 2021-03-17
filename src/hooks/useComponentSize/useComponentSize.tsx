import { useCallback, useLayoutEffect, useState } from 'react';

type ComponentSize = {
  width: number;
  height: number;
};

const getElementSize = (el: HTMLElement | SVGGraphicsElement | null): ComponentSize => {
  if (!el) {
    return { width: 0, height: 0 };
  }

  const { width, height } = el.getBoundingClientRect();

  return {
    width: Math.floor(width),
    height: Math.floor(height),
  };
};

export function useComponentSize<T extends HTMLElement | SVGGraphicsElement>(
  ref: React.RefObject<T>,
): ComponentSize {
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

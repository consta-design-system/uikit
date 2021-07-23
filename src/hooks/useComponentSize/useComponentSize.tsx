import { useMemo } from 'react';

import { useResizeObserved } from '../useResizeObserved/useResizeObserved';

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

export function useComponentSize(
  ref: React.RefObject<HTMLElement | SVGGraphicsElement>,
): ComponentSize {
  const refs = useMemo(() => [ref], [ref]);
  const [componentSize] = useResizeObserved(refs, getElementSize);
  return componentSize;
}

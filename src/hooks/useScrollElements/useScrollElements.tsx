import React, { createRef, useMemo } from 'react';

import { useDebounce } from '##/hooks/useDebounce';

type UseScrollElementsResult = {
  refs: React.RefObject<HTMLElement>[];
  scrollTo: (index: number) => void;
};

export function useScrollElements<ITEM>(
  items: ITEM[],
): UseScrollElementsResult {
  const refs = useMemo(() => {
    const refArray: React.RefObject<HTMLElement>[] = [];

    for (let i = 0; i < items.length; i++) {
      refArray[i] = createRef<HTMLElement>();
    }

    return refArray;
  }, [items]);

  const scrollTo = useDebounce((index: number) => {
    const currentRef = refs[Math.max(index, 0)];
    const container = currentRef?.current?.parentElement;
    if (currentRef?.current && container) {
      const defaultPadding =
        getComputedStyle(container).position !== 'relative'
          ? container.offsetLeft
          : 0;

      let scrollLeft = currentRef.current.offsetLeft - defaultPadding;

      if (index <= 0) {
        scrollLeft = 0;
      } else if (index === refs.length - 1) {
        scrollLeft = container.scrollWidth;
      }

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, 20);

  return {
    refs,
    scrollTo,
  };
}

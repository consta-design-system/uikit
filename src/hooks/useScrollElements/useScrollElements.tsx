import React, { createRef, useMemo } from 'react';

type UseScrollElementsResult = {
  refs: React.RefObject<HTMLElement>[];
  scrollTo: (index: number) => void;
};

export function useScrollElements<ITEM>(items: ITEM[]): UseScrollElementsResult {
  const refs = useMemo(() => {
    const refArray: React.RefObject<HTMLElement>[] = [];

    for (let i = 0; i < items.length; i++) {
      refArray[i] = createRef<HTMLElement>();
    }

    return refArray;
  }, [items]);

  const scrollTo = (index: number) => {
    const currentRef = refs[index];
    const container = currentRef.current?.parentElement;
    if (currentRef.current && container) {
      container.scrollLeft = currentRef.current.offsetLeft - container.offsetLeft;
    }
  };

  return {
    refs,
    scrollTo,
  };
}

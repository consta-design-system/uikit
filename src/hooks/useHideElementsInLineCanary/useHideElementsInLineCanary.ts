import { useRef } from 'react';

import { useComponentSize } from '##/hooks/useComponentSize';
import { useRefs } from '##/hooks/useRefs';
import { useResizeObserved } from '##/hooks/useResizeObserved';

const createMap = (length: number, moreIndex: number) =>
  new Array(length).fill(null).map((_, index) => index !== moreIndex);

const calcElementsVisibleSize = (elementsSizes: number[], map: boolean[]) => {
  let sum = 0;
  for (let index = 0; index < map.length; index++) {
    sum += map[index] ? elementsSizes[index] : 0;
  }
  return sum;
};

export const useHideElementsInLine = <
  ELEMENT extends HTMLElement = HTMLDivElement,
  PARENT extends HTMLElement = HTMLDivElement,
>(
  length: number,
  moreIndex = length - 1,
  busy = 0,
  deps: unknown[] = [],
) => {
  const elementsRefs = useRefs<ELEMENT>(length, deps);
  const parentRef = useRef<PARENT>(null);
  const parentSize = useComponentSize(parentRef).width;
  const elementsSizes = useResizeObserved(elementsRefs, (el) => {
    if (el) {
      const { marginRight, marginLeft } = getComputedStyle(el);
      return (
        parseInt(marginRight, 10) + parseInt(marginLeft, 10) + el.offsetWidth
      );
    }

    return 0;
  });

  const map = createMap(length, moreIndex);

  const hideByIndex = (index: number) => {
    if (!elementsSizes[index] || index === moreIndex) {
      return;
    }

    const elementsSize = calcElementsVisibleSize(elementsSizes, map);

    if (elementsSize + busy > parentSize) {
      map[index] = false;
      map[moreIndex] = true;
    }
  };

  for (let index = 0; index < elementsSizes.length; index++) {
    // Скрываем элемент слева  от `more`
    hideByIndex(moreIndex - index);
    // Скрываем элемент справа от `more`
    hideByIndex(moreIndex + index);
  }

  return {
    visibleMap: map,
    elementsRefs,
    parentRef,
    elementsSizes,
    parentSize,
  };
};

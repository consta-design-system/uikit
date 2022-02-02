import { useRef } from 'react';

import { useComponentSize } from '../useComponentSize/useComponentSize';
import { useRefs } from '../useRefs/useRefs';
import { useResizeObserved } from '../useResizeObserved/useResizeObserved';

export const useHideElementsInLine = <
  ELEMENT extends HTMLElement,
  WRAPPER_ELEMENT extends HTMLElement,
  ITEM
>(
  items: ITEM[],
  busy = 0,
  reverse?: boolean,
) => {
  const refs = useRefs<ELEMENT>(items.length + 1, items);
  const wrapperRef = useRef<WRAPPER_ELEMENT>(null);
  const wrapperWidth = useComponentSize(wrapperRef).width;
  const itemsRefs = [...refs];
  const moreRef = itemsRefs.pop();

  const itemsDimensions = useResizeObserved(refs, (el) =>
    el
      ? parseInt(getComputedStyle(el).marginRight, 10) +
        parseInt(getComputedStyle(el).marginLeft, 10) +
        el.offsetWidth
      : 0,
  );

  const visibleItems: ITEM[] = [];
  const hiddenItems: ITEM[] = [];

  if (wrapperWidth) {
    let calcWidth = (itemsDimensions[itemsDimensions.length - 1] || 0) + busy;

    if (reverse) {
      for (let index = itemsDimensions.length - 2; index >= 0; index--) {
        calcWidth += itemsDimensions[index];

        if (calcWidth >= wrapperWidth) {
          items[index] && hiddenItems.push(items[index]);

          continue;
        }
        visibleItems.push(items[index]);
      }
    } else {
      for (let index = 0; index < itemsDimensions.length; index++) {
        calcWidth += itemsDimensions[index];

        if (calcWidth >= wrapperWidth) {
          items[index] && hiddenItems.push(items[index]);

          continue;
        }
        visibleItems.push(items[index]);
      }
    }
  }

  if (reverse) {
    visibleItems.reverse();
    hiddenItems.reverse();
  }

  return {
    visibleItems,
    hiddenItems,
    itemsRefs,
    wrapperRef,
    moreRef,
    itemsDimensions,
    wrapperWidth,
  };
};

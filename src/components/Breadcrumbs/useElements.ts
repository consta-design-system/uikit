import { useMemo } from 'react';

import { useHideElementsInLine } from '##/hooks/useHideElementsInLineCanary';
import { useRefs } from '##/hooks/useRefs';
import { useResizeObserved } from '##/hooks/useResizeObserved';

const useReadyToHideItems = <ITEM>(items: ITEM[]) =>
  useMemo(() => {
    const returnedItems = [...items];
    const first = returnedItems.shift();
    const last = returnedItems.pop();
    return [first, returnedItems, last] as const;
  }, [items]);

const getLastWidth = (
  wrapperWidth: number,
  fistWidth: number,
  itemsDimensions: number[],
  visibleMap: boolean[],
) => {
  const widthExceptLast =
    fistWidth +
    itemsDimensions.reduce(
      (previous, current, currentIndex) =>
        previous + (!visibleMap[currentIndex] ? 0 : current),
      0,
    );

  const lastWidthCalculate = wrapperWidth - widthExceptLast;

  return `${lastWidthCalculate}px`;
};

const getCompression = (componentWidth: number) => {
  if (componentWidth <= 380) {
    return 's';
  }
  if (componentWidth <= 900) {
    return 'm';
  }
  if (componentWidth <= 1200) {
    return 'l';
  }
  return 'xl';
};

export const useElements = <ITEM>(items: ITEM[]) => {
  const [firstItem, readyToHideItems, lastItem] = useReadyToHideItems(items);

  const noHideElementsRef = useRefs<HTMLLIElement>(2);

  const noHideElementsSize = useResizeObserved(noHideElementsRef, (el) =>
    el
      ? parseInt(getComputedStyle(el).marginRight, 10) +
        parseInt(getComputedStyle(el).marginLeft, 10) +
        el.offsetWidth
      : 0,
  );

  const noHideElementsSizeSum = noHideElementsSize.reduce(
    (previous, current) => previous + current,
    0,
  );

  const { elementsSizes, parentSize, visibleMap, parentRef, elementsRefs } =
    useHideElementsInLine<HTMLLIElement, HTMLUListElement>(
      readyToHideItems.length + 1,
      0,
      noHideElementsSizeSum,
    );

  const lastWidth = getLastWidth(
    parentSize,
    noHideElementsSize[0],
    elementsSizes,
    visibleMap,
  );

  const compression = getCompression(parentSize);

  const hiddenItems = visibleMap
    .map((element, index) => {
      if (!element && index !== 0) {
        return items[index];
      }
    })
    .filter((item) => Boolean(item)) as ITEM[];

  return {
    firstItem,
    lastItem,
    readyToHideItems,
    hiddenItems,
    visibleMap,
    firstItemRef: noHideElementsRef[0],
    lastItemRef: noHideElementsRef[1],
    lastWidth,
    compression,
    parentRef,
    elementsRefs,
  };
};

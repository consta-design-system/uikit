import React, { useMemo } from 'react';

import { useHideElementsInLine } from '../../hooks/useHideElementsInLine/useHideElementsInLine';
import { useRefs } from '../../hooks/useRefs/useRefs';
import { useResizeObserved } from '../../hooks/useResizeObserved/useResizeObserved';

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
  hiddenItems: unknown[],
) => {
  const widthExceptLast =
    fistWidth +
    itemsDimensions.reduce(
      (previous, current, currentIndex) => previous + (hiddenItems[currentIndex] ? 0 : current),
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

  const noHideElementsRef = useRefs(2) as [
    React.RefObject<HTMLLIElement>,
    React.RefObject<HTMLLIElement>,
  ];

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

  const { itemsDimensions, wrapperWidth, ...hideElementsInLineResult } = useHideElementsInLine<
    HTMLLIElement,
    HTMLUListElement,
    ITEM
  >(readyToHideItems, noHideElementsSizeSum, true);

  const elementsSizeSum =
    noHideElementsSizeSum + itemsDimensions.reduce((previous, current) => previous + current, 0);

  const lastWidth = getLastWidth(
    wrapperWidth,
    noHideElementsSize[0],
    itemsDimensions,
    hideElementsInLineResult.hiddenItems,
  );

  const compression = getCompression(wrapperWidth);

  return {
    firstItem,
    lastItem,
    readyToHideItems,
    firstItemRef: noHideElementsRef[0],
    lastItemRef: noHideElementsRef[1],
    lastWidth,
    compression,
    elementsSizeSum,
    ...hideElementsInLineResult,
  };
};

import { RefObject, useCallback, useEffect } from 'react';

import { getElementSize } from '##/hooks/useComponentSize';
import { useMutableRef } from '##/hooks/useMutableRef';

export type UseVirtualScrollProps = {
  length: number;
  isActive?: boolean;
  onScrollToBottom?: (index: number) => void;
};

export type UseVirtualScrollReturn<ITEM_ELEMENT, SCROLL_ELEMENT> = {
  listRefs: React.RefObject<ITEM_ELEMENT>[];
  scrollElementRef: React.RefObject<SCROLL_ELEMENT>;
  slice: [number, number];
  spaceTop: number;
};

export type Bounds = [[number, number], [number, number]];

export const defaultItemsCalculationCount = 5;

export const arraysIsEq = (arr1: number[], arr2: number[]) =>
  arr1.join('-') === arr2.join('-');

export const useScroll = (
  ref: RefObject<HTMLElement>,
  fn: () => void,
  isActive: boolean,
) => {
  useEffect(() => {
    if (isActive) {
      ref.current?.addEventListener('scroll', fn);
    }

    return () => {
      ref.current?.removeEventListener('scroll', fn);
    };
  }, [ref.current, fn, isActive]);
};

export const getElementHeight = (el: HTMLElement | SVGGraphicsElement | null) =>
  getElementSize(el).height;

const roundPositionByGap = (position: number, gap: number) => {
  if (position <= 0) {
    return 0;
  }
  return Math.ceil(position / gap) * gap;
};

export const getVisiblePosition = (
  top: number,
  height: number,
  elementMaxSize: number,
): [number, number] => {
  const gap =
    height > elementMaxSize * defaultItemsCalculationCount
      ? height * 1.5
      : elementMaxSize * defaultItemsCalculationCount;

  const visiblePosition: [number, number] = [
    Math.ceil(roundPositionByGap(top - gap, height)),
    Math.ceil(roundPositionByGap(top === 0 ? gap : top + gap, height)),
  ];

  return visiblePosition;
};

export const calculateSavedSizes = (savedSizes: number[], sizes: number[]) => {
  const newSavedSizes = [...savedSizes];
  for (let index = 0; index < sizes.length; index++) {
    const element = sizes[index];
    if (element > 0) {
      newSavedSizes[index] = element;
    }
  }
  return newSavedSizes;
};

export const useCalculateVisiblePosition = (
  scrollElement: HTMLElement | null,
  set: (value: React.SetStateAction<[number, number]>) => void,
  elementsSizes: number[],
) => {
  const elementMaxSizeRef = useMutableRef(Math.max.apply(null, elementsSizes));

  return useCallback(() => {
    if (!scrollElement) {
      return;
    }

    const visiblePosition = getVisiblePosition(
      scrollElement.scrollTop,
      getElementHeight(scrollElement),
      elementMaxSizeRef.current,
    );

    set((state) => {
      if (visiblePosition[0] !== state[0] || visiblePosition[1] !== state[1]) {
        return visiblePosition;
      }

      return state;
    });
  }, [scrollElement, set]);
};

const addCount = (
  pxs: [number, number],
  visiblePosition: [number, number],
  savedSize: number[],
) => {
  const lastSavedSize = savedSize.slice(-50);
  const average =
    lastSavedSize.reduce((a, b) => a + b, 0) / lastSavedSize.length;

  let add = defaultItemsCalculationCount;

  while (visiblePosition[1] >= pxs[1] + add * average) {
    add += defaultItemsCalculationCount;
  }

  return add;
};

export const calculateBounds = (
  savedSizes: number[],
  sizes: number[],
  visiblePosition: [number, number],
  length: number,
): Bounds => {
  const pxs: [number, number] = [0, 0];
  const indexs: [number, number] = [0, 0];

  for (let index = 0; index < savedSizes.length; index++) {
    if (visiblePosition[0] > pxs[0]) {
      pxs[0] += savedSizes[index];
      indexs[0] = index + 1;
    }

    if (visiblePosition[1] > pxs[1]) {
      pxs[1] += savedSizes[index];
      indexs[1] = index + 1;
    }
  }

  if (indexs[0] === 0 && indexs[1] === 0) {
    indexs[1] = defaultItemsCalculationCount;
  }

  if (sizes.length !== savedSizes.length) {
    indexs[1] += addCount(pxs, visiblePosition, savedSizes);
  }

  if (indexs[1] > length) {
    indexs[1] = length;
  }

  return [pxs, indexs];
};

import { RefObject, useCallback, useEffect } from 'react';

import { getElementSize } from '##/hooks/useComponentSize';

export const defaultItemsCalculationCount = 5;
const visualGap = 200;

export const useScroll = (
  ref: RefObject<HTMLElement>,
  fn: () => void,
  isActive: boolean,
) => {
  useEffect(() => (isActive ? fn() : undefined), [ref.current, fn, isActive]);
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
): [number, number] => {
  const first = Math.ceil(
    roundPositionByGap(top - height < 0 ? 0 : top - height, height) - visualGap,
  );

  return [
    first <= 0 ? 0 : first,
    Math.ceil(
      roundPositionByGap(top === 0 ? height : top, height) + height + visualGap,
    ),
  ];
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
) =>
  useCallback(() => {
    if (!scrollElement) {
      return;
    }

    const visiblePosition = getVisiblePosition(
      scrollElement.scrollTop,
      getElementHeight(scrollElement),
    );

    set((state) => {
      if (visiblePosition[0] !== state[0] || visiblePosition[1] !== state[1]) {
        return visiblePosition;
      }

      return state;
    });
  }, [scrollElement, set]);

const addCount = (
  pxs: [number, number],
  visiblePosition: [number, number],
  savedSize: number[],
) => {
  const lastSavedSize = savedSize.slice(-50);
  const average =
    lastSavedSize.reduce((a, b) => a + b, 0) / lastSavedSize.length;

  let add = defaultItemsCalculationCount;

  while (visiblePosition[1] > pxs[1] + add * average) {
    add += defaultItemsCalculationCount;
  }

  return add;
};

export const calculateBounds = (
  savedSize: number[],
  size: number[],
  visiblePosition: [number, number],
  length: number,
) => {
  const pxs: [number, number] = [0, 0];
  const indexs: [number, number] = [0, 0];

  for (let index = 0; index < savedSize.length; index++) {
    if (visiblePosition[0] > pxs[0]) {
      pxs[0] += savedSize[index];
      indexs[0] = index;
    }

    if (visiblePosition[1] > pxs[1]) {
      pxs[1] += savedSize[index];
      indexs[1] = index;
    }
  }

  if (indexs[0] === 0 && indexs[1] === 0) {
    indexs[1] = defaultItemsCalculationCount;
  }

  if (savedSize.length - 1 >= indexs[1] && size.length !== savedSize.length) {
    indexs[1] += addCount(pxs, visiblePosition, savedSize);
  }

  if (indexs[1] - 1 > length) {
    indexs[1] = length - 1;
  }

  return [pxs, indexs];
};

import { getElementSize } from '@consta/uikit/useResizeObserved';
import { Atom, AtomLike, Computed } from '@reatom/core';

export type VirtualScrollProps = {
  length: AtomLike<number>;
  isActive?: AtomLike<boolean>;
  busy?: AtomLike<number>;
  onEndReached?: (index: number) => void;
};

export type VirtualScrollReturn<ITEM_ELEMENT, SCROLL_ELEMENT> = {
  listElementsAtom: Computed<
    Atom<ITEM_ELEMENT | null, [newState: ITEM_ELEMENT | null]>[]
  >;
  scrollElementAtom: Atom<
    SCROLL_ELEMENT | null,
    [newState: SCROLL_ELEMENT | null]
  >;
  sliceAtom: Computed<[number, number]>;
  spaceTopAtom: Computed<number>;
};

export type Bounds = [[number, number], [number, number]];

export const defaultItemsCalculationCount = 1;

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
  busy: number = 0,
): [number, number] => {
  const gap =
    height > elementMaxSize * defaultItemsCalculationCount
      ? height
      : elementMaxSize * defaultItemsCalculationCount;

  const visiblePosition: [number, number] = [
    Math.ceil(
      roundPositionByGap(
        height < gap ? top - (gap + height) : top - (gap + height / 2),
        height,
      ),
    ),
    Math.ceil(roundPositionByGap(top === 0 ? gap : top + gap * 1.1, height)),
  ];

  const visiblePositionStart = Math.max(visiblePosition[0] - busy, 0);
  const visiblePositionEnd =
    visiblePositionStart === 0 ? visiblePosition[1] - busy : visiblePosition[1];

  return [visiblePositionStart, visiblePositionEnd];
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

const addCount = (
  pxs: [number, number],
  visiblePosition: [number, number],
  savedSize: number[],
) => {
  const lastSavedSize = savedSize.slice(-50);
  const average =
    lastSavedSize.reduce((a, b) => a + b, 0) / lastSavedSize.length;

  let add = 0;

  if (visiblePosition[1] < pxs[1] + add * average) {
    return add;
  }

  while (visiblePosition[1] > pxs[1] + add * average) {
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

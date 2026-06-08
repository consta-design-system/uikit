import { action, atom, computed, effect, peek } from '@reatom/core';

import { onEventEffect } from '##/utils/state/onEventEffect';
import { rangeAtom } from '##/utils/state/rangeAtom';
import { resizeObservedAtom } from '##/utils/state/resizeObservedAtom';

import {
  arraysIsEq,
  Bounds,
  calculateBounds,
  calculateSavedSizes,
  defaultItemsCalculationCount,
  getElementHeight,
  getVisiblePosition,
  UseVirtualScrollProps,
  UseVirtualScrollReturn,
} from './helpers';

export const virtualScrollEffect = <
  ITEM_ELEMENT extends HTMLElement = HTMLDivElement,
  SCROLL_ELEMENT extends HTMLElement = HTMLDivElement,
>({
  length: lengthAtom,
  onScrollToBottom,
  isActive: isActiveAtom,
}: UseVirtualScrollProps): UseVirtualScrollReturn<
  ITEM_ELEMENT,
  SCROLL_ELEMENT
> => {
  const visiblePositionAtom = atom<[number, number]>([0, 0]);

  const boundsAtom = atom<Bounds>([
    [0, 0],
    [0, isActiveAtom?.() ? defaultItemsCalculationCount : lengthAtom()],
  ]);

  const spaceTopAtom = computed(() => boundsAtom()[0][0]);

  const sliceStartAtom = computed(() => boundsAtom()[1][0]);
  const sliceEndAtom = computed(() => boundsAtom()[1][1]);

  const sliceAtom = computed(
    () => [sliceStartAtom(), sliceEndAtom()] as [number, number],
  );

  const listElementsAtom = rangeAtom<ITEM_ELEMENT | null>(lengthAtom, null);

  const subscribersElements = computed(() =>
    listElementsAtom().map((el) => el()),
  );

  const scrollElementAtom = atom<SCROLL_ELEMENT | null>(null);

  const sizesAtom = resizeObservedAtom<
    ITEM_ELEMENT | null,
    number,
    (ITEM_ELEMENT | null)[]
  >(subscribersElements, getElementHeight);

  const savedSizesAtom = atom<number[]>([]);

  const scrollElementHeightAtom = resizeObservedAtom(
    scrollElementAtom,
    getElementHeight,
  );

  const calculateVisiblePosition = action(() => {
    const scrollElement = scrollElementAtom();
    if (!scrollElement) {
      return;
    }

    const visiblePosition = getVisiblePosition(
      scrollElement.scrollTop,
      getElementHeight(scrollElement),
      Math.max.apply(null, sizesAtom()),
    );

    visiblePositionAtom.set((state: [number, number]) => {
      if (visiblePosition[0] !== state[0] || visiblePosition[1] !== state[1]) {
        return visiblePosition;
      }

      return state;
    });
  });

  onEventEffect(scrollElementAtom, 'scroll', calculateVisiblePosition);

  effect(() => {
    scrollElementHeightAtom();

    if (isActiveAtom?.()) {
      calculateVisiblePosition();
    }
  });

  effect(() => {
    const visiblePosition = visiblePositionAtom();
    const sizes = peek(sizesAtom);
    const length = lengthAtom();

    if (isActiveAtom?.()) {
      savedSizesAtom.set(calculateSavedSizes(peek(savedSizesAtom), sizes));

      boundsAtom.set(
        calculateBounds(peek(savedSizesAtom), sizes, visiblePosition, length),
      );
    } else {
      boundsAtom.set((state) => {
        if (
          state[0][0] !== 0 ||
          state[0][1] !== 0 ||
          state[1][0] !== 0 ||
          state[1][1] !== length
        ) {
          return [
            [0, 0],
            [0, length],
          ];
        }
        return state;
      });
    }
  });

  effect(() => {
    const isActive = isActiveAtom?.();
    const sliceEnd = sliceEndAtom();
    const length = peek(lengthAtom);

    if (isActive && onScrollToBottom && sliceEnd === length) {
      onScrollToBottom(length);
    }
  });

  effect(() => {
    const isActive = isActiveAtom?.();
    const length = peek(lengthAtom);
    const resetVisiblePosition: [number, number] = [0, 0];
    const resetBounds: Bounds = [
      [0, 0],
      [0, isActive ? defaultItemsCalculationCount : length],
    ];

    boundsAtom.set((state) =>
      arraysIsEq(state[0], resetBounds[0]) &&
      arraysIsEq(state[1], resetBounds[1])
        ? state
        : resetBounds,
    );

    visiblePositionAtom.set((state) =>
      arraysIsEq(state, resetVisiblePosition) ? state : resetVisiblePosition,
    );
  });

  return {
    listElementsAtom,
    scrollElementAtom,
    sliceAtom,
    spaceTopAtom,
  };
};

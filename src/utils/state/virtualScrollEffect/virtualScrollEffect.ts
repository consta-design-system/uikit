import { action, atom, computed } from '@reatom/core';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useMutableRef } from '##/hooks/useMutableRef';
import { useRefs } from '##/hooks/useRefs';
import { useResizeObserved } from '##/hooks/useResizeObserved';
import { onEventEffect } from '##/utils/state/onEventEffect';
import { resizeObservedAtom } from '##/utils/state/resizeObservedAtom';

import {
  arraysIsEq,
  Bounds,
  calculateBounds,
  calculateSavedSizes,
  defaultItemsCalculationCount,
  getElementHeight,
  getVisiblePosition,
  useCalculateVisiblePosition,
  useScroll,
  UseVirtualScrollProps,
  UseVirtualScrollReturn,
} from './helpers';

const emptyArray: [] = [];

export const virtualScrollEffect = <
  ITEM_ELEMENT extends HTMLElement = HTMLDivElement,
  SCROLL_ELEMENT extends HTMLElement = HTMLDivElement,
>({
  length,
  onScrollToBottom,
  isActive,
}: UseVirtualScrollProps): UseVirtualScrollReturn<
  ITEM_ELEMENT,
  SCROLL_ELEMENT
> => {
  const visiblePositionAtom = atom<[number, number]>([0, 0]);

  //   const fff = visiblePosition.set;

  const bounds = atom<Bounds>([
    [0, 0],
    [0, isActive?.() ? defaultItemsCalculationCount : length()],
  ]);
  //   const listRefs = useRefs<ITEM_ELEMENT>(length, visiblePosition);
  const listRefs = computed(() => {
    return new Array(length() as number)
      .fill(null)
      .map(() => atom<ITEM_ELEMENT | null>(null));
  });

  const subscribersElements = computed(() => listRefs().map((el) => el()));

  const scrollElementAtom = atom<SCROLL_ELEMENT | null>(null);

  //   resizeObservedAtom;

  const sizes = resizeObservedAtom<
    ITEM_ELEMENT | null,
    number,
    (ITEM_ELEMENT | null)[]
  >(subscribersElements, getElementHeight);

  //   const savedSizesRef = useRef(calculateSavedSizes([], sizes));

  //   const onScrollToBottomRef = useMutableRef(onScrollToBottom);

  const scrollElementRefHeight = resizeObservedAtom(
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
      Math.max.apply(null, sizes()),
    );

    visiblePositionAtom.set((state: [number, number]) => {
      if (visiblePosition[0] !== state[0] || visiblePosition[1] !== state[1]) {
        return visiblePosition;
      }

      return state;
    });
  });

  onEventEffect(scrollElementAtom, 'scroll', calculateVisiblePosition);

  // TODO: доделать
  useEffect(() => {
    if (isActive) {
      calculateVisiblePosition();
    }
  }, [scrollElementRefHeight, isActive]);

  useEffect(() => {
    if (isActive) {
      savedSizesRef.current = calculateSavedSizes(savedSizesRef.current, sizes);
      setBounds(
        calculateBounds(savedSizesRef.current, sizes, visiblePosition, length),
      );
    } else {
      setBounds((state) => {
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
  }, [...visiblePosition, sizes, length, isActive]);

  useEffect(() => {
    if (isActive && onScrollToBottomRef.current && bounds[1][1] + 1 >= length) {
      onScrollToBottomRef.current(length);
    }
  }, [bounds[1][1], isActive]);

  useEffect(() => {
    const resetVisiblePosition: [number, number] = [0, 0];
    const resetBounds: Bounds = [
      [0, 0],
      [0, isActive ? defaultItemsCalculationCount : length],
    ];

    setBounds((state) =>
      arraysIsEq(state[0], resetBounds[0]) &&
      arraysIsEq(state[1], resetBounds[1])
        ? state
        : resetBounds,
    );

    setVisiblePosition((state) =>
      arraysIsEq(state, resetVisiblePosition) ? state : resetVisiblePosition,
    );
  }, [isActive]);

  return {
    listRefs,
    scrollElementRef,
    slice: bounds[1],
    spaceTop: bounds[0][0],
  };
};

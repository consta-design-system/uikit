import { useEffect, useMemo, useRef, useState } from 'react';

import { useMutableRef } from '##/hooks/useMutableRef';
import { useRefs } from '##/hooks/useRefs';
import { useResizeObserved } from '##/hooks/useResizeObserved';

import {
  arraysIsEq,
  Bounds,
  calculateBounds,
  calculateSavedSizes,
  defaultItemsCalculationCount,
  getElementHeight,
  useCalculateVisiblePosition,
  useScroll,
  UseVirtualScrollProps,
  UseVirtualScrollReturn,
} from './hellpers';

export const useVirtualScroll = <
  ITEM_ELEMENT extends HTMLElement = HTMLDivElement,
  SCROLL_ELEMENT extends HTMLElement = HTMLDivElement,
>({
  length,
  onScrollToBottom,
  isActive = false,
}: UseVirtualScrollProps): UseVirtualScrollReturn<
  ITEM_ELEMENT,
  SCROLL_ELEMENT
> => {
  const [visiblePosition, setVisiblePosition] = useState<[number, number]>([
    0, 0,
  ]);
  const [bounds, setBounds] = useState<Bounds>([
    [0, 0],
    [0, isActive ? defaultItemsCalculationCount : length],
  ]);
  const listRefs = useRefs<ITEM_ELEMENT>(length, visiblePosition);
  const scrollElementRef = useRef<SCROLL_ELEMENT>(null);
  const sizes = useResizeObserved(listRefs, getElementHeight);
  const savedSizesRef = useRef(calculateSavedSizes([], sizes));
  const onScrollToBottomRef = useMutableRef(onScrollToBottom);
  const [scrollElementRefHeight] = useResizeObserved(
    useMemo(() => {
      return [scrollElementRef];
    }, [scrollElementRef]),
    getElementHeight,
  );
  const calculateVisiblePosition = useCalculateVisiblePosition(
    scrollElementRef.current,
    setVisiblePosition,
    sizes,
  );

  useScroll(scrollElementRef, calculateVisiblePosition, isActive);

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
      setBounds([
        [0, 0],
        [0, length],
      ]);
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

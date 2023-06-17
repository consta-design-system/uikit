import { useEffect, useRef, useState } from 'react';

import { useMutableRef } from '##/hooks/useMutableRef';
import { useRefs } from '##/hooks/useRefs';
import { useResizeObserved } from '##/hooks/useResizeObserved';

import {
  calculateBounds,
  calculateSavedSizes,
  defaultItemsCalculationCount,
  getElementHeight,
  useCalculateVisiblePosition,
  useScroll,
} from './hellpers';

type UseVirtualScrollProps = {
  length: number;
  isActive?: boolean;
  onScrollToBottom?: (index: number) => void;
};

type UseVirtualScrollReturn<ITEM_ELEMENT, SCROLL_ELEMENT> = {
  listRefs: React.RefObject<ITEM_ELEMENT>[];
  scrollElementRef: React.RefObject<SCROLL_ELEMENT>;
  slice: [number, number];
  spaceTop: number;
};

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
  const [bounds, setBounds] = useState<number[][]>([
    [0, 0],
    [0, isActive ? defaultItemsCalculationCount : length],
  ]);
  const listRefs = useRefs<ITEM_ELEMENT>(length, visiblePosition);
  const scrollElementRef = useRef<SCROLL_ELEMENT>(null);
  const sizes = useResizeObserved(listRefs, getElementHeight);
  const savedSizesRef = useRef(calculateSavedSizes([], sizes));
  const onScrollToBottomRef = useMutableRef(onScrollToBottom);

  useScroll(
    scrollElementRef,
    useCalculateVisiblePosition(scrollElementRef.current, setVisiblePosition),
    isActive,
  );

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
    if (onScrollToBottomRef.current && isActive && bounds[1][1] + 1 >= length) {
      onScrollToBottomRef.current(length);
    }
  }, [bounds[1][1], length, isActive]);

  return {
    listRefs,
    scrollElementRef,
    slice: [
      bounds[1][0] === 0 ? 0 : bounds[1][0] + 1,
      bounds[1][1] === 0 ? 0 : bounds[1][1] + 1,
    ],
    spaceTop: bounds[0][0],
  };
};

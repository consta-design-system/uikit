import React, { useMemo } from 'react';

import { useComponentSize } from '../../../hooks/useComponentSize/useComponentSize';
import { TabDimensions } from '../types';

export const useFittingItems = ({
  tabsDimensions,
  containerRef,
  moreItemsRef,
  activeIndex,
}: {
  tabsDimensions: TabDimensions[];
  containerRef: React.RefObject<HTMLElement>;
  moreItemsRef: React.RefObject<HTMLElement>;
  activeIndex?: number;
}): {
  visibleIndexes: number[];
  isItemHidden: (idx: number) => boolean;
} => {
  const { width: containerWidth } = useComponentSize(containerRef);
  const { width: moreItemsWidth } = useComponentSize(moreItemsRef);

  const visibleIndexes = useMemo(
    () =>
      getFittingItems(
        tabsDimensions,
        containerWidth,
        moreItemsWidth,
        activeIndex,
      ),
    [tabsDimensions, containerWidth, moreItemsWidth, activeIndex],
  );

  return {
    visibleIndexes,
    isItemHidden: React.useCallback(
      (idx) => !visibleIndexes.includes(idx),
      [visibleIndexes],
    ),
  };
};

export const getFittingItems = (
  tabsDimensions: TabDimensions[],
  totalWidth: number,
  moreItemsWidth: number,
  activeIndex?: number,
): number[] => {
  if (!totalWidth) {
    return Array.from<number>({ length: tabsDimensions.length }).map(
      (_el, index) => index,
    );
  }
  let width =
    typeof activeIndex === 'number' && activeIndex > -1
      ? tabsDimensions[activeIndex].size + tabsDimensions[activeIndex].gap
      : 0;
  const arr: number[] = [];
  for (const [idx, tabDimensions] of tabsDimensions.entries()) {
    if (idx !== activeIndex) {
      const isLastItem = idx === tabsDimensions.length - 1;
      width += tabDimensions.size + (isLastItem ? 0 : tabDimensions.gap);
      if (width + moreItemsWidth > totalWidth) {
        if (activeIndex && !arr.includes(activeIndex)) {
          arr.push(activeIndex);
        }
        return arr;
      }
      arr.push(idx);
    } else {
      arr.push(activeIndex);
    }
  }

  return Array.from<number>({ length: tabsDimensions.length }).map(
    (_el, index) => index,
  );
};

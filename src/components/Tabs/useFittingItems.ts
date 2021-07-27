import React from 'react';

import { useComponentSize } from '../../hooks/useComponentSize/useComponentSize';

import { getTabsWidth } from './helpers';
import { TabDimensions } from './Tabs';

export const useFittingItems = ({
  isVertical,
  tabsDimensions,
  containerRef,
  moreItemsRef,
}: {
  isVertical: boolean;
  tabsDimensions: TabDimensions[];
  containerRef: React.RefObject<HTMLElement>;
  moreItemsRef: React.RefObject<HTMLElement>;
}): {
  fittingItemsCount: number;
  isItemHidden: (idx: number) => boolean;
} => {
  const { width: containerWidth } = useComponentSize(containerRef);
  const { width: moreItemsWidth } = useComponentSize(moreItemsRef);

  const fittingItemsCount = React.useMemo(
    () =>
      isVertical
        ? tabsDimensions.length
        : getFittingItemsCount({
            tabsDimensions,
            totalWidth: containerWidth,
            moreItemsWidth,
          }),
    [tabsDimensions, containerWidth, moreItemsWidth, isVertical],
  );

  return {
    fittingItemsCount,
    isItemHidden: React.useCallback((idx) => idx >= fittingItemsCount, [fittingItemsCount]),
  };
};

export const getFittingItemsCount = ({
  tabsDimensions,
  totalWidth,
  moreItemsWidth,
}: {
  tabsDimensions: TabDimensions[];
  totalWidth: number;
  moreItemsWidth: number;
}): number => {
  if (!totalWidth) {
    return tabsDimensions.length;
  }

  for (const [idx, tabDimensions] of tabsDimensions.entries()) {
    const isLastItem = idx === tabsDimensions.length - 1;
    const previousTabsDimensions = tabsDimensions.slice(0, idx);
    const width =
      tabDimensions.size +
      getTabsWidth(previousTabsDimensions) +
      (isLastItem ? 0 : tabDimensions.gap + moreItemsWidth);
    if (width > totalWidth) {
      return idx;
    }
  }

  return tabsDimensions.length;
};

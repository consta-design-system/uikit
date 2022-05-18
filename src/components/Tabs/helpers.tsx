import React from 'react';

import { TabsFitModeDropdownWrapper } from './FitModeDropdownWrapper/TabsFitModeDropdownWrapper';
import { TabsFitModeScrollWrapper } from './FitModeScrollWrapper/TabsFitModeScrollWrapper';
import {
  TabDimensions,
  TabsDirection,
  TabsFitModeWrapperProps,
  TabsItemDefault,
  TabsPropFitMode,
  TabsPropGetIcon,
  TabsPropGetLabel,
  TabsPropLinePosition,
  TabsProps,
} from './types';

export const getTabsDirection = (linePosition: TabsPropLinePosition): TabsDirection =>
  linePosition === 'left' || linePosition === 'right' ? 'vertical' : 'horizontal';

export const getTabsWidth = (tabsDimensions: TabDimensions[]): number =>
  tabsDimensions.reduce((acc, td) => acc + td.size + td.gap, 0);

export const getTabsWrapper = (tabsDirection: TabsDirection, fitMode: TabsPropFitMode) => {
  if (tabsDirection === 'vertical') {
    return OnlyListWrapper;
  }

  return fitMode === 'scroll' ? TabsFitModeScrollWrapper : TabsFitModeDropdownWrapper;
};

const defaultGetLabel: TabsPropGetLabel<TabsItemDefault> = (item) => item.label;
const defaultGetIcon: TabsPropGetIcon<TabsItemDefault> = (item) => item.icon;

export const withDefaultGetters = (props: TabsProps) => {
  return {
    ...props,
    getLabel: props.getLabel || defaultGetLabel,
    getIcon: props.getIcon || defaultGetIcon,
  };
};

const OnlyListWrapper = <ITEM,>({
  renderItemsList,
}: TabsFitModeWrapperProps<ITEM>): React.ReactElement | null => <>{renderItemsList({})}</>;

export const getVisibleTabsRange = ({
  tabsDimensions,
  containerWidth,
  containerPaddingLeft,
  scrollLeft,
}: {
  tabsDimensions: TabDimensions[];
  containerWidth: number;
  containerPaddingLeft: number;
  scrollLeft: number;
}): [number, number] => {
  let firstVisibleTabIdx = null;
  let lastVisibleTabIdx = null;

  const containerLeftSide = scrollLeft;
  const containerRightSide = containerLeftSide + containerWidth;

  for (let idx = 0; idx < tabsDimensions.length; idx++) {
    const previousTabsWidth = getTabsWidth(tabsDimensions.slice(0, idx));
    const tabElLeftSide = containerPaddingLeft + previousTabsWidth;
    const isTabLeftSideVisible = tabElLeftSide >= containerLeftSide;
    if (isTabLeftSideVisible && firstVisibleTabIdx === null) {
      firstVisibleTabIdx = idx;
    }

    const tabElRightSide = tabElLeftSide + tabsDimensions[idx].size;
    const isTabRightSideVisible = tabElRightSide <= containerRightSide;
    if (isTabRightSideVisible) {
      lastVisibleTabIdx = idx;
    }
  }

  firstVisibleTabIdx = firstVisibleTabIdx ?? 0;
  lastVisibleTabIdx = Math.max(firstVisibleTabIdx, lastVisibleTabIdx ?? 0);

  return [firstVisibleTabIdx, lastVisibleTabIdx];
};

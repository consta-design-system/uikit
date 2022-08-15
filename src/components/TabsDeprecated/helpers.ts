import React from 'react';

import { TabsPropGetLabel, TabsPropLinePosition } from './TabsDeprecated';

export type TabDimensions = {
  size: number;
  gap: number;
};

export type TabsFitModeWrapperProps<ITEM> = {
  items: ITEM[];
  tabsDimensions: TabDimensions[];
  getLabel: TabsPropGetLabel<ITEM>;
  getChecked: (item: ITEM) => boolean;
  renderItem: (item: ITEM) => React.ReactNode;
  renderItemsList: RenderItemsListProp;
  tabRefs: Array<React.RefObject<HTMLElement>>;
};

export type RenderItemsListProp = (props: {
  withRunningLine?: boolean;
  getTabClassName?: (idx: number) => string | undefined;
}) => React.ReactNode;

export type TabsDirection = 'horizontal' | 'vertical';

export const getTabsDirection = (
  linePosition: TabsPropLinePosition,
): TabsDirection =>
  linePosition === 'left' || linePosition === 'right'
    ? 'vertical'
    : 'horizontal';

export const getTabsWidth = (tabsDimensions: TabDimensions[]): number =>
  tabsDimensions.reduce((acc, td) => acc + td.size + td.gap, 0);

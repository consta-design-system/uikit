import React from 'react';

import { range } from '##/utils/array';

import { TabsFitModeWrapperProps } from '../types';

export const TabsListWrapper = <ITEM,>({
  renderItemsList,
  items,
}: TabsFitModeWrapperProps<ITEM>) => {
  return <>{renderItemsList({ visibleIndexes: range(items.length) })}</>;
};

import React, { useMemo } from 'react';

import { TabsFitModeWrapperProps } from '../types';

export const TabsListWrapper = <ITEM,>({
  renderItemsList,
  items,
}: TabsFitModeWrapperProps<ITEM>) => {
  const visibleIndexes = useMemo(() => {
    return items.map((_el, i) => i);
  }, [items]);

  return <>{renderItemsList({ visibleIndexes })}</>;
};

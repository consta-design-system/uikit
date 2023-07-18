import './TabsFitModeDropdownWrapper.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { getTabsWidth } from '../helpers';
import { TabsMoreItems } from '../MoreItems/TabsMoreItems';
import { TabsFitModeWrapperProps } from '../types';
import { useFittingItems } from './useFittingItems';

const cnTabsFitModeDropdownWrapper = cn('TabsFitModeDropdownWrapper');

export const TabsFitModeDropdownWrapper = <ITEM,>({
  items,
  tabsDimensions,
  tabRefs,
  getItemLabel,
  getItemChecked,
  renderItem,
  renderItemsList,
  size,
}: TabsFitModeWrapperProps<ITEM>): React.ReactElement | null => {
  const ref = React.useRef<HTMLDivElement>(null);
  const moreItemsRef = React.useRef<HTMLDivElement>(null);
  const { isItemHidden } = useFittingItems({
    tabsDimensions,
    containerRef: ref,
    moreItemsRef,
  });
  const hiddenItems = items.filter((_item, idx) => isItemHidden(idx));
  const maxTabHeight: number = React.useMemo(() => {
    if (!tabRefs.length) {
      return 0;
    }
    return Math.max(
      ...tabRefs.map((tabRef) => tabRef.current?.offsetHeight ?? 0),
    );
  }, [tabsDimensions]);

  const checkedItemIsHidden = hiddenItems.some(getItemChecked);
  const visibleTabsWidth = getTabsWidth(
    tabsDimensions.filter((_td, idx) => !isItemHidden(idx)),
  );

  return (
    <div
      ref={ref}
      className={cnTabsFitModeDropdownWrapper()}
      style={{ height: maxTabHeight }}
    >
      <div className={cnTabsFitModeDropdownWrapper('Tabs')}>
        {renderItemsList({
          withRunningLine: !checkedItemIsHidden,
          getTabClassName: (idx) =>
            cnTabsFitModeDropdownWrapper('Tab', { hidden: isItemHidden(idx) }),
        })}
      </div>
      <div
        ref={moreItemsRef}
        className={cnTabsFitModeDropdownWrapper('MoreItems', {
          hidden: !hiddenItems.length,
        })}
        style={{
          /* В Safari скрытые табы с абсолютом продолжают растягивать контейнер,
            поэтому приходится позиционировать кнопку абсолютом */
          left: hiddenItems.length ? visibleTabsWidth : undefined,
        }}
      >
        <TabsMoreItems
          items={hiddenItems}
          renderItem={renderItem}
          getItemLabel={getItemLabel}
          getItemChecked={getItemChecked}
          height={maxTabHeight}
          size={size}
        />
      </div>
    </div>
  );
};

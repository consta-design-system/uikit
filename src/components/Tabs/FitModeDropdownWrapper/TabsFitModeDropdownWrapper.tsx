import './TabsFitModeDropdownWrapper.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { getTabsWidth, TabsFitModeWrapperProps } from '../helpers';
import { TabsMoreItems } from '../MoreItems/TabsMoreItems';
import { useFittingItems } from './useFittingItems';

const cnTabsFitModeDropdownWrapper = cn('TabsFitModeDropdownWrapper');

export const TabsFitModeDropdownWrapper = <ITEM,>({
  items,
  tabsDimensions,
  tabRefs,
  getLabel,
  getChecked,
  renderItem,
  renderItemsList,
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
    return Math.max(
      ...tabRefs.map((tabRef) => tabRef.current?.offsetHeight ?? 0),
    );
  }, [tabsDimensions]);
  const checkedItemIsHidden = hiddenItems.some(getChecked);
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
      {hiddenItems.length > 0 && (
        <div
          ref={moreItemsRef}
          className={cnTabsFitModeDropdownWrapper('MoreItems')}
          style={{
            /* В Safari скрытые табы с абсолютом продолжают растягивать контейнер,
            поэтому приходится позиционировать кнопку абсолютом */
            left: visibleTabsWidth,
          }}
        >
          <TabsMoreItems
            items={hiddenItems}
            renderItem={renderItem}
            getLabel={getLabel}
            getChecked={getChecked}
            height={maxTabHeight}
          />
        </div>
      )}
    </div>
  );
};

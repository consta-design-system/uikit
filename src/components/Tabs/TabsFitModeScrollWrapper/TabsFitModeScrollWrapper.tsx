import './TabsFitModeScrollWrapper.css';

import { IconArrowLeft } from '@consta/icons/IconArrowLeft';
import { IconArrowRight } from '@consta/icons/IconArrowRight';
import React from 'react';

import { cnMixScrollBar } from '##/mixs/MixScrollBar';

import { useResizeObserved } from '../../../hooks/useResizeObserved/useResizeObserved';
import { useScrollPosition } from '../../../hooks/useScrollPosition/useScrollPosition';
import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { getTabsWidth, getVisibleTabsRange } from '../helpers';
import { TabsFitModeWrapperProps } from '../types';

const cnTabsFitModeScrollWrapper = cn('TabsFitModeScrollWrapper');

export const TabsFitModeScrollWrapper = <ITEM,>({
  tabsDimensions,
  items,
  renderItemsList,
  getItemChecked,
  withScrollButtons,
}: TabsFitModeWrapperProps<ITEM>): React.ReactNode | null => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [
    { isScrollable, width: containerWidth, paddingLeft: containerPaddingLeft },
  ] = useResizeObserved(
    React.useMemo(() => [scrollContainerRef], [scrollContainerRef, items]),
    (el) => ({
      isScrollable: el && el.scrollWidth > el.offsetWidth,
      width: el?.offsetWidth ?? 0,
      paddingLeft: el ? parseInt(getComputedStyle(el).paddingLeft, 10) : 0,
    }),
  );
  const { scrollLeft } = useScrollPosition(scrollContainerRef.current);

  const [firstVisibleTabIdx, lastVisibleTabIdx] = getVisibleTabsRange({
    tabsDimensions,
    containerWidth,
    containerPaddingLeft,
    scrollLeft,
  });

  const scrollTabIntoView = (idx: number) => {
    const tabIsVisible = idx >= firstVisibleTabIdx && idx <= lastVisibleTabIdx;

    if (!tabIsVisible) {
      const previousTabsWidth = getTabsWidth(tabsDimensions.slice(0, idx));
      scrollContainerRef.current?.scrollTo({
        left: previousTabsWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollPrev = () => {
    scrollTabIntoView(firstVisibleTabIdx - 1);
  };

  const scrollNext = () => {
    scrollTabIntoView(lastVisibleTabIdx + 1);
  };

  // Подскролливаем к выбранному табу
  const checkedTabIdx = items.findIndex(getItemChecked);
  React.useEffect(() => {
    if (isScrollable) {
      scrollTabIntoView(checkedTabIdx);
    }
  }, [checkedTabIdx, isScrollable]);

  return (
    <div className={cnTabsFitModeScrollWrapper()}>
      {isScrollable && withScrollButtons && (
        <>
          {(['prev', 'next'] as const).map((buttonTo) => (
            <Button
              key={buttonTo}
              view="clear"
              type="button"
              size="xs"
              onlyIcon
              disabled={
                buttonTo === 'prev'
                  ? firstVisibleTabIdx === 0
                  : lastVisibleTabIdx === items.length - 1
              }
              iconLeft={buttonTo === 'prev' ? IconArrowLeft : IconArrowRight}
              className={cnTabsFitModeScrollWrapper('Button', { to: buttonTo })}
              onClick={buttonTo === 'prev' ? scrollPrev : scrollNext}
            />
          ))}
        </>
      )}
      <div
        className={cnTabsFitModeScrollWrapper(
          'Content',
          cnMixScrollBar({ invisible: true }),
        )}
        ref={scrollContainerRef}
      >
        {renderItemsList({
          visibleIndexes: Array.from(Array(items.length).keys()),
          getTabClassName: (idx) =>
            cnTabsFitModeScrollWrapper('Tab', {
              noMargin: idx === items.length - 1,
            }),
        })}
      </div>
    </div>
  );
};

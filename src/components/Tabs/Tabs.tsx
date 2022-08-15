import './Tabs.css';

import React, { createRef, forwardRef, useMemo } from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { useResizeObserved } from '../../hooks/useResizeObserved/useResizeObserved';
import { cn } from '../../utils/bem';
import {
  getTabsDirection,
  getTabsWrapper,
  withDefaultGetters,
} from './helpers';
import { TabsBorderLine, TabsRunningLine } from './Line/TabsLine';
import { cnTabsTab, TabsTab } from './Tab/TabsTab';
import {
  RenderItemProps,
  RenderItemsListProp,
  TabDimensions,
  TabsComponent,
  tabsDefaultFitMode,
  tabsDefaultLinePosition,
  tabsDefaultSize,
  tabsDefaultView,
  TabsProps,
} from './types';

export const cnTabs = cn('Tabs');

function renderItemDefault<ITEM>(
  props: RenderItemProps<ITEM>,
): React.ReactElement {
  const { onChange, ...otherProps } = props;
  return <TabsTab {...otherProps} onChange={onChange} />;
}

const TabsRender = (props: TabsProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    size = tabsDefaultSize,
    className,
    items,
    view = tabsDefaultView,
    value,
    linePosition = tabsDefaultLinePosition,
    fitMode = tabsDefaultFitMode,
    onlyIcon,
    getItemIcon,
    getItemLabel,
    onChange,
    iconSize,
    renderItem: renderItemProp = renderItemDefault,
    ...otherProps
  } = withDefaultGetters(props);

  const { getOnChange, getChecked } = useChoiceGroup({
    value: value || null,
    getKey: getItemLabel,
    callBack: onChange,
    multiple: false,
  });

  const tabsDirection = getTabsDirection(linePosition);
  const isVertical = tabsDirection === 'vertical';
  const tabRefs = useMemo(
    () =>
      new Array(items.length).fill(null).map(() => createRef<HTMLDivElement>()),
    [items, fitMode, isVertical],
  );
  const tabsDimensions = useResizeObserved(
    tabRefs,
    (el): TabDimensions => ({
      size: el?.[isVertical ? 'offsetHeight' : 'offsetWidth'] ?? 0,
      gap: el
        ? parseInt(
            getComputedStyle(el)[isVertical ? 'marginBottom' : 'marginRight'],
            10,
          )
        : 0,
    }),
  );

  const activeTabIdx = items.findIndex(getChecked);

  const renderItem = (item: typeof items[number], onClick?: () => void) =>
    renderItemProp({
      item,
      onChange: (...args) => {
        onClick?.();
        getOnChange(item)(...args);
      },
      checked: getChecked(item),
      label: getItemLabel(item).toString(),
      icon: getItemIcon?.(item),
      onlyIcon,
      size,
      iconSize,
    });

  const renderItemsList: RenderItemsListProp = ({
    withRunningLine = true,
    getTabClassName,
  }) => (
    <div className={cnTabs('List', { direction: tabsDirection, linePosition })}>
      {items.map((item, idx) => (
        <div
          ref={tabRefs[idx]}
          key={getItemLabel(item)}
          className={cnTabs('Tab', { direction: tabsDirection }, [
            getTabClassName?.(idx),
          ])}
        >
          {renderItem(item)}
        </div>
      ))}
      {withRunningLine && (
        <TabsRunningLine
          linePosition={linePosition}
          tabsDimensions={tabsDimensions}
          activeTabIdx={activeTabIdx}
        />
      )}
    </div>
  );

  const Wrapper = getTabsWrapper(tabsDirection, fitMode);

  return (
    <div
      className={cnTabs({ size, view, direction: tabsDirection }, [className])}
      ref={ref}
      {...otherProps}
    >
      <Wrapper
        tabRefs={tabRefs}
        tabsDimensions={tabsDimensions}
        renderItem={renderItem}
        renderItemsList={renderItemsList}
        getItemLabel={getItemLabel}
        getItemChecked={getChecked}
        items={items}
      />
      {view === 'bordered' && <TabsBorderLine linePosition={linePosition} />}
    </div>
  );
};

export const Tabs = forwardRef(TabsRender) as TabsComponent;

export { TabsTab, cnTabsTab };

export * from './types';

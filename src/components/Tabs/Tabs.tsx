import './Tabs.css';

import React, { createRef, useMemo } from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { useResizeObserved } from '../../hooks/useResizeObserved/useResizeObserved';
import { IconProps, IconPropSize } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

import { TabsLine } from './Line/TabsLine';
import { TabsMoreItems } from './MoreItems/TabsMoreItems';
import { cnTabsTab, TabsTab } from './Tab/TabsTab';
import { getTabsDirection } from './helpers';
import { useFittingItems } from './useFittingItems';

export const tabsSizes = ['m', 's'] as const;
export type TabsPropSize = typeof tabsSizes[number];
export const tabsDefaultSize: TabsPropSize = tabsSizes[0];

export const tabsViews = ['bordered', 'clear'] as const;
export type TabsPropView = typeof tabsViews[number];
export const tabsDefaultView: TabsPropView = tabsViews[0];

export const tabsLinePositions = ['bottom', 'top', 'left', 'right'] as const;
export type TabsPropLinePosition = typeof tabsLinePositions[number];
export const tabsDefaultLinePosition: TabsPropLinePosition = 'bottom';

export type TabsPropGetLabel<ITEM> = (item: ITEM) => string | number;
export type TabsPropGetIcon<ITEM> = (item: ITEM) => React.FC<IconProps> | undefined;
export type TabsPropOnChange<ITEM, ITEM_ELEMENT> = (props: {
  e: React.MouseEvent<ITEM_ELEMENT>;
  value: ITEM;
}) => void;

type RenderItemProps<ITEM, ELEMENT extends HTMLElement> = {
  item: ITEM;
  onChange: React.MouseEventHandler<ELEMENT>;
  checked: boolean;
  label: string;
  icon?: React.FC<IconProps>;
  size: TabsPropSize;
  iconSize?: IconPropSize;
  onlyIcon?: boolean;
};

type RenderItem<ITEM, ELEMENT extends HTMLElement> = (
  props: RenderItemProps<ITEM, ELEMENT>,
) => React.ReactElement | null;

export type TabsProps<
  ITEM,
  ITEM_ELEMENT extends HTMLElement = HTMLButtonElement
> = PropsWithHTMLAttributesAndRef<
  {
    size?: TabsPropSize;
    onlyIcon?: boolean;
    view?: TabsPropView;
    iconSize?: IconPropSize;
    items: ITEM[];
    value?: ITEM | null;
    linePosition?: TabsPropLinePosition;
    getIcon?: TabsPropGetIcon<ITEM>;
    getLabel: TabsPropGetLabel<ITEM>;
    children?: never;
    onChange: TabsPropOnChange<ITEM, ITEM_ELEMENT>;
    renderItem?: RenderItem<ITEM, ITEM_ELEMENT>;
  },
  HTMLDivElement
>;

type Tabs = <ITEM, ITEMELEMENT extends HTMLElement = HTMLButtonElement>(
  props: TabsProps<ITEM, ITEMELEMENT>,
  ref: React.Ref<HTMLDivElement>,
) => React.ReactElement | null;

export const cnTabs = cn('Tabs');

function renderItemDefault<ITEM, ITEMELEMENT extends HTMLElement>(
  props: RenderItemProps<ITEM, ITEMELEMENT>,
): React.ReactElement {
  const { onChange, ...otherProps } = props;
  return (
    <TabsTab
      {...otherProps}
      onChange={(onChange as unknown) as React.MouseEventHandler<HTMLButtonElement>}
    />
  );
}

export type TabDimensions = {
  size: number;
  gap: number;
};

export const Tabs: Tabs = React.forwardRef((props, ref) => {
  const {
    size = tabsDefaultSize,
    className,
    items,
    view = tabsDefaultView,
    value,
    linePosition = tabsDefaultLinePosition,
    onlyIcon,
    getIcon,
    getLabel,
    onChange,
    iconSize,
    renderItem: renderItemProp = renderItemDefault,
    ...otherProps
  } = props;

  const { getOnChange, getChecked } = useChoiceGroup({
    value: value || null,
    getKey: getLabel,
    callBack: onChange,
    multiple: false,
  });

  const tabRefs = useMemo(
    () => new Array(items.length).fill(null).map(() => createRef<HTMLDivElement>()),
    [items],
  );
  const tabsDirection = getTabsDirection(linePosition);
  const isVertical = tabsDirection === 'vertical';
  const tabsDimensions = useResizeObserved(
    tabRefs,
    (el): TabDimensions => ({
      size: el?.[isVertical ? 'offsetHeight' : 'offsetWidth'] ?? 0,
      gap: el ? parseInt(getComputedStyle(el)[isVertical ? 'marginBottom' : 'marginRight'], 10) : 0,
    }),
  );
  const maxTabHeight: number = React.useMemo(() => {
    return Math.max(...tabRefs.map((tabRef) => tabRef.current?.offsetHeight ?? 0));
  }, [tabsDimensions]);

  const activeTabIdx = (value && items.indexOf(value)) ?? -1;

  const rootRef = React.useRef(null);
  const moreItemsRef = React.useRef(null);
  const { isItemHidden } = useFittingItems({
    isVertical,
    tabsDimensions,
    containerRef: rootRef,
    moreItemsRef,
  });
  const hiddenItems = items.filter((_item, idx) => isItemHidden(idx));

  const renderItem = (item: typeof items[number], onClick?: () => void) =>
    renderItemProp({
      item,
      onChange: (...args) => {
        onClick?.();
        getOnChange(item)(...args);
      },
      checked: getChecked(item),
      label: getLabel(item).toString(),
      icon: getIcon && getIcon(item),
      onlyIcon,
      size,
      iconSize,
    });

  return (
    <div
      className={cnTabs({ view, direction: tabsDirection }, [className])}
      ref={useForkRef([ref, rootRef])}
      {...otherProps}
    >
      {items.map((item, idx) => (
        <div
          ref={tabRefs[idx]}
          key={getLabel(item)}
          className={cnTabs('Tab', { hidden: isItemHidden(idx), direction: tabsDirection })}
        >
          {renderItem(item)}
        </div>
      ))}
      <div
        className={cnTabs('Tab', { hidden: hiddenItems.length === 0, direction: tabsDirection })}
      >
        <TabsMoreItems
          items={hiddenItems}
          renderItem={renderItem}
          getLabel={getLabel}
          getChecked={getChecked}
          height={maxTabHeight}
          ref={moreItemsRef}
        />
      </div>
      {view === 'bordered' && <TabsLine type="border" linePosition={linePosition} />}
      {!isItemHidden(activeTabIdx) && (
        <TabsLine
          type="running"
          linePosition={linePosition}
          tabsDimensions={tabsDimensions}
          activeTabIdx={activeTabIdx}
        />
      )}
    </div>
  );
});

export { TabsTab, cnTabsTab };

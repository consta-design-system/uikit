import './Tabs.css';

import React, { createRef, useMemo } from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { useResizeObserved } from '../../hooks/useResizeObserved/useResizeObserved';
import { IconProps, IconPropSize } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { getSizeByMap } from '../../utils/getSizeByMap';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

import { cnTabsTab, TabsTab } from './Tab/TabsTab';
import { getTabsDirection } from './helpers';

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
  ref: React.RefObject<ELEMENT>;
  key: string | number;
  onChange: React.MouseEventHandler<ELEMENT>;
  checked: boolean;
  label: string;
  icon?: React.FC<IconProps>;
  iconSize: IconPropSize;
  onlyIcon?: boolean;
  className: string;
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

const sizeMap: Record<TabsPropSize, IconPropSize> = {
  s: 'xs',
  m: 's',
};

function renderItemDefault<ITEM, ITEMELEMENT extends HTMLElement>(
  props: RenderItemProps<ITEM, ITEMELEMENT>,
): React.ReactElement {
  const { ref, onChange, ...otherProps } = props;
  return (
    <TabsTab
      {...otherProps}
      ref={(ref as unknown) as React.RefObject<HTMLButtonElement>}
      onChange={(onChange as unknown) as React.MouseEventHandler<HTMLButtonElement>}
    />
  );
}

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
    iconSize: iconSizeProp,
    renderItem = renderItemDefault,
    ...otherProps
  } = props;

  type ItemElement = Exclude<Parameters<typeof renderItem>[number]['ref']['current'], null>;

  const { getOnChange, getChecked } = useChoiceGroup({
    value: value || null,
    getKey: getLabel,
    callBack: onChange,
    multiple: false,
  });

  const tabRefs = useMemo(
    () => new Array(items.length).fill(null).map(() => createRef<ItemElement>()),
    [items],
  );
  const tabsDirection = getTabsDirection(linePosition);
  const isVertical = tabsDirection === 'vertical';
  const tabsDimensions = useResizeObserved(tabRefs, (el) => ({
    size: el?.[isVertical ? 'offsetHeight' : 'offsetWidth'] ?? 0,
    offset: el?.[isVertical ? 'offsetTop' : 'offsetLeft'] ?? 0,
  }));
  const activeTabIdx = (value && items.indexOf(value)) ?? -1;
  const activeTabDimensions = tabsDimensions[activeTabIdx];

  const iconSize = getSizeByMap(sizeMap, size, iconSizeProp);

  return (
    <div
      className={cnTabs({ size, view, direction: tabsDirection }, [className])}
      ref={ref}
      {...otherProps}
    >
      <div className={cnTabs('List')}>
        {items.map((item, idx) =>
          renderItem({
            item,
            ref: tabRefs[idx],
            key: getLabel(item),
            onChange: getOnChange(item),
            checked: getChecked(item),
            label: getLabel(item).toString(),
            icon: getIcon && getIcon(item),
            iconSize,
            onlyIcon,
            className: cnTabs('Tab'),
          }),
        )}
      </div>
      {view === 'bordered' && (
        <div className={cnTabs('Line', { type: 'border', position: linePosition })} />
      )}
      {activeTabDimensions?.size > 0 && (
        <div
          className={cnTabs('Line', { type: 'running', position: linePosition })}
          style={{
            ['--tabSize' as string]: `${activeTabDimensions.size}px`,
            ['--tabOffset' as string]: `${activeTabDimensions.offset}px`,
          }}
        />
      )}
    </div>
  );
});

export { TabsTab, cnTabsTab };

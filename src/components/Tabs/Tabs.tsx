import './Tabs.css';

import React, { createRef, useEffect, useMemo, useRef } from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { IconProps, IconPropSize } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { getSizeByMap } from '../../utils/getSizeByMap';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

import { cnTabsTab, TabsTab } from './Tab/TabsTab';

export const tabsSizes = ['m', 's'] as const;
export type TabsPropSize = typeof tabsSizes[number];
export const tabsDefaultSize: TabsPropSize = tabsSizes[0];

export const tabsViews = ['bordered', 'clear'] as const;
export type TabsPropView = typeof tabsViews[number];
export const tabsDefaultView: TabsPropView = tabsViews[0];

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

function setStyleForLine(
  lineRef: React.RefObject<HTMLDivElement>,
  tabsWidth: number,
  tabWidth: number,
  tabRatio: number,
  tabOffsetLeft: number,
) {
  if (lineRef.current) {
    const lineStyle = lineRef.current.style;
    lineStyle.setProperty('--tabsWidth', `${tabsWidth}px`);
    lineStyle.setProperty('--tabWidth', `${tabWidth}px`);
    lineStyle.setProperty('--tabRatio', `${tabRatio}`);
    lineStyle.setProperty('--tabOffsetLeft', `${tabOffsetLeft}px`);
  }
}

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

  const constructItemRefs: () => Record<string, React.RefObject<ItemElement>> = () => {
    const refs: Record<string, React.RefObject<ItemElement>> = {};
    for (const item of items) {
      refs[getLabel(item)] = createRef<ItemElement>();
    }
    return refs;
  };

  const buttonRefs = useMemo(constructItemRefs, [items, getLabel]);

  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const updateLine = () => {
    if (rootRef.current && lineRef.current && buttonRefs) {
      const rootWidth = rootRef.current.offsetWidth;
      if (value) {
        const activeItemRef = buttonRefs[getLabel(value)];
        if (activeItemRef && activeItemRef.current) {
          const itemWidth = activeItemRef.current.offsetWidth;
          const itemOffsetLeft = activeItemRef.current.offsetLeft;
          setStyleForLine(lineRef, rootWidth, itemWidth, itemWidth / rootWidth, itemOffsetLeft);
        }
      } else {
        setStyleForLine(lineRef, rootWidth, 1, 0.00001, 1);
      }
    }
  };

  useEffect(() => updateLine());

  const withOutValue = !value;
  const iconSize = getSizeByMap(sizeMap, size, iconSizeProp);

  return (
    <div
      className={cnTabs({ size, view }, [className])}
      ref={useForkRef<HTMLDivElement>([ref, rootRef])}
      {...otherProps}
    >
      <div className={cnTabs('List')}>
        {items.map((item) =>
          renderItem({
            item,
            ref: buttonRefs[getLabel(item)],
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
      <div className={cnTabs('WrapperRunningLine')}>
        <div className={cnTabs('RunningLine', { withOutValue })} ref={lineRef} />
      </div>
    </div>
  );
});

export { TabsTab, cnTabsTab };

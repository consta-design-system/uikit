import './Tabs.css';

import React, { createRef, useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { useForkRef } from '../../utils/useForkRef';
import { cn } from '../../utils/bem';
import { IIcon } from '../../icons/Icon/Icon';
import {
  BaseCheckGroupField,
  BaseCheckGroupFieldPropGetAdditionalPropsForItem,
  IBaseCheckGroupField,
  BaseCheckGroupFieldItemPropItemKey,
} from '../BaseCheckGroupField/BaseCheckGroupField';
import { TabsTab } from './Tab/TabsTab';

export type TabsPropSize = 's' | 'm';
export type TabsPropView = 'bordered' | 'clear';
export type TabsProps<T> = {
  size?: TabsPropSize;
  onlyIcon?: boolean;
  view?: TabsPropView;
  getItemIcon?: (item: T) => React.FC<IIcon> | undefined;
};
export type TabsPropsWithIBaseCheckGroupField<T> = Omit<
  IBaseCheckGroupField<T, TabsProps<T>>,
  'componentItem' | 'getAdditionalPropsForItem' | 'multiply'
>;

export type ITabs<T = {}> = TabsPropsWithIBaseCheckGroupField<T> &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof TabsPropsWithIBaseCheckGroupField<T>>;

export const cnTabs = cn('Tabs');

export function Tabs<T>(props: ITabs<T>) {
  const {
    size = 'm',
    className,
    items,
    getItemKey,
    view = 'bordered',
    innerRef,
    value,
    onlyIcon,
    getItemIcon,
    getItemLabel,
    id,
    name,
    onChange,
    ...otherProps
  } = props;
  const [mounted, setMounted] = useState<boolean>(false);

  const constructItemRefs: () => Record<
    BaseCheckGroupFieldItemPropItemKey,
    React.RefObject<HTMLButtonElement>
  > = () => {
    const refs: Record<BaseCheckGroupFieldItemPropItemKey, React.RefObject<HTMLButtonElement>> = {};
    if (items) {
      for (const item of items) {
        if (getItemKey) {
          refs[getItemKey(item)] = createRef<HTMLButtonElement>();
        }
      }
    }
    return refs;
  };

  const buttonRefs = useMemo(constructItemRefs, [items, getItemKey]);
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  function setStyleForLine(tabsWidth, tabWidth, tabRatio, tabOffsetLeft) {
    if (lineRef.current) {
      const lineStyle = lineRef.current.style;
      lineStyle.setProperty('--tabsWidth', `${tabsWidth}px`);
      lineStyle.setProperty('--tabWidth', `${tabWidth}px`);
      lineStyle.setProperty('--tabRatio', `${tabRatio}`);
      lineStyle.setProperty('--tabOffsetLeft', `${tabOffsetLeft}px`);
    }
  }

  const updateLine = () => {
    if (rootRef.current && lineRef.current && buttonRefs) {
      const rootWidth = rootRef.current.offsetWidth;
      if (value && value.length > 0) {
        const activeItemRef = getItemKey ? buttonRefs[getItemKey(value[0])] : undefined;
        if (activeItemRef && activeItemRef.current) {
          const itemWidth = activeItemRef.current.offsetWidth;
          const itemOffsetLeft = activeItemRef.current.offsetLeft;
          setStyleForLine(rootWidth, itemWidth, itemWidth / rootWidth, itemOffsetLeft);
        }
      } else {
        setStyleForLine(rootWidth, 1, 0.00001, 1);
      }
    }
  };

  useEffect(() => {
    updateLine();
  });

  const onMount = useCallback(() => {
    updateLine();
    setMounted(true);
  }, []);

  const getAdditionalPropsForItem: BaseCheckGroupFieldPropGetAdditionalPropsForItem<
    T,
    TabsProps<T>
  > = (item, index, { size, getItemKey, getItemIcon, onlyIcon }) => ({
    ...(getItemIcon ? { icon: getItemIcon(item) } : {}),
    size,
    onlyIcon,
    innerRef: getItemKey ? buttonRefs[getItemKey(item)] : null,
  });

  const withOutValue = !(value && value.length > 0);

  return (
    <div
      className={cnTabs({ size, view }, [className])}
      ref={useForkRef<HTMLDivElement>([innerRef, rootRef, onMount])}
      {...otherProps}
    >
      <BaseCheckGroupField<T, ITabs<T>>
        className={cnTabs('List')}
        componentItem={TabsTab}
        size={size}
        getAdditionalPropsForItem={getAdditionalPropsForItem}
        items={items}
        getItemKey={getItemKey}
        value={value}
        onlyIcon={onlyIcon}
        getItemIcon={getItemIcon}
        getItemLabel={getItemLabel}
        id={id}
        name={name}
        onChange={onChange}
      />
      <div className={cnTabs('RunningLine', { withOutValue, mounted })} ref={lineRef} />
    </div>
  );
}

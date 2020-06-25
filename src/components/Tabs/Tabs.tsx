import './Tabs.css';

import React, { createRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { IconProps } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { useForkRef } from '../../utils/useForkRef';
import {
  BaseCheckGroupField,
  BaseCheckGroupFieldItemPropItemKey,
  BaseCheckGroupFieldProps,
} from '../BaseCheckGroupField/BaseCheckGroupField';

import { TabsTab } from './Tab/Tabs-Tab';

export type TabsPropSize = 's' | 'm';
export type TabsPropView = 'bordered' | 'clear';
type Props<T> = {
  size?: TabsPropSize;
  onlyIcon?: boolean;
  view?: TabsPropView;
  getItemIcon?: (item: T) => React.FC<IconProps> | undefined;
};
export type TabsProps<T> = Props<T> &
  Omit<BaseCheckGroupFieldProps<T>, 'componentItem' | 'getAdditionalPropsForItem' | 'multiple'>;

export const cnTabs = cn('Tabs');

export const Tabs: <T>(
  props: TabsProps<T> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null = React.forwardRef((props, ref) => {
  const {
    size = 'm',
    className,
    items,
    getItemKey,
    view = 'bordered',
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

  function setStyleForLine(
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
  }, [updateLine]);

  const withOutValue = !(value && value.length > 0);

  return (
    <div
      className={cnTabs({ size, view }, [className])}
      ref={useForkRef<HTMLDivElement>([ref, rootRef, onMount])}
      {...otherProps}
    >
      <BaseCheckGroupField
        className={cnTabs('List')}
        componentItem={TabsTab}
        getAdditionalPropsForItem={(item) => ({
          ...(getItemIcon ? { icon: getItemIcon(item) } : {}),
          size,
          onlyIcon,
          innerRef: getItemKey ? buttonRefs[getItemKey(item)] : null,
        })}
        items={items}
        getItemKey={getItemKey}
        value={value}
        id={id}
        name={name}
        onChange={onChange}
        getItemLabel={getItemLabel}
      />
      <div className={cnTabs('WrapperRunningLine')}>
        <div className={cnTabs('RunningLine', { withOutValue, mounted })} ref={lineRef} />
      </div>
    </div>
  );
});

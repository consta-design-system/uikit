import './Tabs.css';

import React, { Component, createRef, RefObject } from 'react';
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
export type ITabs<T> = Omit<
  IBaseCheckGroupField<T, TabsProps<T>>,
  'componentItem' | 'getAdditionalPropsForItem' | 'multiply'
>;

export const cnTabs = cn('Tabs');

export class Tabs<T> extends Component<ITabs<T>> {
  constructItemRefs: () => Record<
    BaseCheckGroupFieldItemPropItemKey,
    RefObject<HTMLButtonElement>
  > = () => {
    const { items, getItemKey } = this.props;
    const refs: Record<BaseCheckGroupFieldItemPropItemKey, RefObject<HTMLButtonElement>> = {};
    if (items) {
      for (const item of items) {
        if (getItemKey) {
          refs[getItemKey(item)] = createRef<HTMLButtonElement>();
        }
      }
    }
    return refs;
  };

  private buttonRefs = this.constructItemRefs();
  private rootRef = React.createRef<HTMLDivElement>();
  private lineRef = React.createRef<HTMLDivElement>();
  private timeOut;

  componentDidMount() {
    const { value } = this.props;
    if (value && value.length) {
      this.timeOut = setTimeout(() => {
        this.updateLine(value[0]);
      }, 500);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }

  getAdditionalPropsForItem: BaseCheckGroupFieldPropGetAdditionalPropsForItem<T, TabsProps<T>> = (
    item,
    index,
    { size, getItemKey, getItemIcon, onlyIcon }
  ) => ({
    ...(getItemIcon ? { icon: getItemIcon(item) } : {}),
    size,
    onlyIcon,
    innerRef: getItemKey ? this.buttonRefs[getItemKey(item)] : null,
    handleItemChange: this.handleItemChange,
  });

  handleItemChange = ({ value }) => {
    this.updateLine(value);
  };

  updateLine = (item) => {
    const { getItemKey } = this.props;

    if (this.rootRef.current && this.lineRef.current && item) {
      const activeItemRef = getItemKey ? this.buttonRefs[getItemKey(item)] : undefined;
      if (activeItemRef && activeItemRef.current) {
        const rootWidth = this.rootRef.current.offsetWidth;
        const itemWidth = activeItemRef.current.offsetWidth;
        const itemOffsetLeft = activeItemRef.current.offsetLeft;
        this.lineRef.current.style.transform = `translateX(${itemOffsetLeft}px) scaleX(${itemWidth /
          rootWidth})`;
      }
    }
  };

  render() {
    const {
      size = 'm',
      className,
      items,
      getItemKey,
      view = 'bordered',
      ...otherProps
    } = this.props;
    return (
      <div className={cnTabs({ size, view }, [className])} ref={this.rootRef}>
        <BaseCheckGroupField<T, ITabs<T>>
          className={cnTabs('List')}
          componentItem={TabsTab}
          size={size}
          getAdditionalPropsForItem={this.getAdditionalPropsForItem}
          items={items}
          getItemKey={getItemKey}
          {...otherProps}
        />
        <div className={cnTabs('RunningLine')} ref={this.lineRef} />
      </div>
    );
  }
}

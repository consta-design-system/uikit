import './TabsTab.css';

import React from 'react';
import { BaseCheckGroupItemProps } from '../../BaseCheckGroupField/BaseCheckGroupField';
import { IconPropSize, IIcon } from '../../../icons/Icon/Icon';

import { cnTabs, TabsPropSize } from '../Tabs';

export type TabsTabProps<T> = {
  size?: TabsPropSize;
  innerRef?: React.Ref<HTMLButtonElement>;
  handleItemChange?: ({ value: T }) => void;
  onlyIcon?: boolean;
  icon?: React.FC<IIcon>;
};

export type ITabsTab<T> = BaseCheckGroupItemProps<T> & TabsTabProps<T>;

export function TabsTab<T>(props: ITabsTab<T>): React.ReactElement {
  const {
    label,
    onChange,
    size,
    checked,
    id,
    value,
    innerRef,
    handleItemChange,
    onlyIcon,
    icon: Icon,
  } = props;
  const handleChange = (e) => {
    onChange({ e, value, checked: !checked, id });
    handleItemChange && handleItemChange({ value });
  };
  const getIconSizeByTabsSize = (buttonSize: TabsPropSize = 's'): IconPropSize => {
    const sizeObj: Record<TabsPropSize, IconPropSize> = {
      s: 'xs',
      m: 's',
    };

    return sizeObj[buttonSize];
  };
  return (
    <button
      className={cnTabs('Tab', { size, active: checked, onlyIcon })}
      onClick={handleChange}
      ref={innerRef}
      role="tab"
    >
      {Icon && <Icon className={cnTabs('TabIcon')} size={getIconSizeByTabsSize(size)} />}
      {!onlyIcon && label}
    </button>
  );
}

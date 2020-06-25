import './Tabs-Tab.css';

import React from 'react';

import { IconProps, IconPropSize } from '../../../icons/Icon/Icon';
import { BaseCheckGroupItemProps } from '../../BaseCheckGroupField/BaseCheckGroupField';
import { cnTabs, TabsPropSize } from '../Tabs';

type Props<T> = {
  size?: TabsPropSize;
  innerRef?: React.Ref<HTMLButtonElement>;
  onlyIcon?: boolean;
  icon?: React.FC<IconProps>;
};

export type TabsTabProps<T> = BaseCheckGroupItemProps<T> & Props<T>;

const getIconSizeByTabsSize = (buttonSize: TabsPropSize = 's'): IconPropSize => {
  const sizeObj: Record<TabsPropSize, IconPropSize> = {
    s: 'xs',
    m: 's',
  };

  return sizeObj[buttonSize];
};

export function TabsTab<T>(props: TabsTabProps<T>): React.ReactElement {
  const { label, onChange, size, checked, id, value, innerRef, onlyIcon, icon: Icon } = props;
  const handleChange = (e: React.MouseEvent) => onChange({ e, value, checked: !checked, id });

  return (
    <button
      className={cnTabs('Tab', { size, active: checked, onlyIcon })}
      onClick={handleChange}
      ref={innerRef}
      role="tab"
      type="button"
    >
      {Icon && <Icon className={cnTabs('Icon')} size={getIconSizeByTabsSize(size)} />}
      {!onlyIcon && label}
    </button>
  );
}

import './Tabs-Tab.css';

import React from 'react';

import { IconProps, IconPropSize } from '../../../icons/Icon/Icon';
import { cnMixFocus } from '../../../mixs/MixFocus/MixFocus';
import { getSizeByMap } from '../../../utils/getSizeByMap';
import { BaseCheckGroupItemProps } from '../../BaseCheckGroupField/BaseCheckGroupField';
import { cnTabs, TabsPropSize } from '../Tabs';

type Props<T> = {
  size?: TabsPropSize;
  innerRef?: React.Ref<HTMLButtonElement>;
  onlyIcon?: boolean;
  icon?: React.FC<IconProps>;
  iconSize?: IconPropSize;
};

export type TabsTabProps<T> = BaseCheckGroupItemProps<T> & Props<T>;

const sizeMap: Record<TabsPropSize, IconPropSize> = {
  s: 'xs',
  m: 's',
};

export function TabsTab<T>(props: TabsTabProps<T>): React.ReactElement {
  const {
    label,
    onChange,
    size = 'm',
    checked,
    id,
    value,
    innerRef,
    onlyIcon,
    icon: Icon,
    iconSize,
  } = props;
  const handleChange = (e: React.MouseEvent) => onChange({ e, value, checked: !checked, id });

  return (
    <button
      className={cnTabs('Tab', { size, active: checked, onlyIcon }, [cnMixFocus({ before: true })])}
      onClick={handleChange}
      ref={innerRef}
      role="tab"
      type="button"
    >
      {Icon && <Icon className={cnTabs('Icon')} size={getSizeByMap(sizeMap, size, iconSize)} />}
      {!onlyIcon && label}
    </button>
  );
}

import './TabsTab.css';

import React, { forwardRef } from 'react';

import { IconProps, IconPropSize } from '../../../icons/Icon/Icon';
import { cnMixFocus } from '../../../mixs/MixFocus/MixFocus';
import { cn } from '../../../utils/bem';
import { getSizeByMap } from '../../../utils/getSizeByMap';
import { TabsPropSize } from '../Tabs';

export const cnTabsTab = cn('TabsTab');

type Props = {
  size: TabsPropSize;
  onlyIcon?: boolean;
  icon?: React.FC<IconProps>;
  iconSize?: IconPropSize;
  label: string;
  checked: boolean;
  onChange: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const sizeMap: Record<TabsPropSize, IconPropSize> = {
  s: 'xs',
  m: 's',
};

export const TabsTab = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    label,
    onChange,
    checked,
    size,
    onlyIcon,
    icon: Icon,
    iconSize: iconSizeProp,
    className,
  } = props;
  const iconSize = getSizeByMap(sizeMap, size, iconSizeProp);

  return (
    <button
      className={cnTabsTab({ size, checked, onlyIcon }, [cnMixFocus({ before: true }), className])}
      onClick={checked ? undefined : onChange}
      ref={ref}
      role="tab"
      type="button"
      title={onlyIcon ? label : undefined}
    >
      {Icon && <Icon className={cnTabsTab('Icon')} size={iconSize} />}
      {!onlyIcon && label}
    </button>
  );
});

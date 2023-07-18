import './TabsTab.css';

import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React, { forwardRef } from 'react';

import { cnMixFocus } from '../../../mixs/MixFocus/MixFocus';
import { cnDeprecated } from '../../../utils/bem';
import { getByMap } from '../../../utils/getByMap';
import { TabsPropSize } from '../TabsDeprecated';

export const cnTabsTab = cnDeprecated('TabsTab');

type Props = {
  size: TabsPropSize;
  onlyIcon?: boolean;
  icon?: IconComponent;
  iconSize?: IconPropSize;
  label: string;
  checked: boolean;
  onChange: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const sizeMap: Record<TabsPropSize, IconPropSize> = {
  s: 'xs',
  m: 's',
  xs: 'xs',
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
  const iconSize = getByMap(sizeMap, size, iconSizeProp);

  return (
    <button
      className={cnTabsTab({ size, checked, onlyIcon }, [
        cnMixFocus({ before: true }),
        className,
      ])}
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

import './TabsTab.css';

import { IconPropSize } from '@consta/icons/Icon';
import React, { forwardRef } from 'react';

import { cnMixFocus } from '../../../mixs/MixFocus/MixFocus';
import { cn } from '../../../utils/bem';
import { getByMap } from '../../../utils/getByMap';
import { TabsPropSize, TabsTabProps } from '../types';

export const cnTabsTab = cn('TabsTab');

const sizeMap: Record<TabsPropSize, IconPropSize> = {
  s: 'xs',
  m: 's',
  xs: 'xs',
};

export const TabsTab = forwardRef<HTMLButtonElement, TabsTabProps>(
  (props, ref) => {
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
  },
);

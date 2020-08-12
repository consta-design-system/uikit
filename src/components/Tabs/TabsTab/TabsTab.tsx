import './TabsTab.css';

import React, { forwardRef } from 'react';

import { IconProps, IconPropSize } from '../../../icons/Icon/Icon';
import { cnMixFocus } from '../../../mixs/MixFocus/MixFocus';
import { cn } from '../../../utils/bem';

export const cnTabsTab = cn('TabsTab');

type Props = {
  onlyIcon?: boolean;
  icon?: React.FC<IconProps>;
  iconSize?: IconPropSize;
  label: string;
  checked: boolean;
  onChange: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

export const TabsTab = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { label, onChange, checked, onlyIcon, icon: Icon, iconSize, className } = props;

  return (
    <button
      className={cnTabsTab({ checked, onlyIcon }, [cnMixFocus({ before: true }), className])}
      onClick={onChange}
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

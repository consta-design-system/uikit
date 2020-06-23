import './Icon.css';

import React from 'react';

import { cn } from '../../utils/bem';

export type IconPropSize = 'xs' | 's' | 'm';
export type IconPropView =
  | 'alert'
  | 'brand'
  | 'ghost'
  | 'link'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning';

export type IconProps = {
  view?: IconPropView;
  size?: IconPropSize;
};

export type IIcon = IconProps & Omit<React.HTMLAttributes<HTMLSpanElement>, keyof IconProps>;

export const cnIcon = cn('Icon');

export const Icon = React.forwardRef<HTMLSpanElement, IIcon>((props, ref) => {
  const { children, className, size = 'm', view, ...otherProps } = props;
  return (
    <span {...otherProps} className={cnIcon({ size, view }, [className])} ref={ref}>
      {children}
    </span>
  );
});

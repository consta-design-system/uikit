import './Icon.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export type IconPropSize = 'xs' | 's' | 'm';
export type IconPropView =
  | 'alert'
  | 'brand'
  | 'ghost'
  | 'link'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'disabled';

export type Props = {
  view?: IconPropView;
  size?: IconPropSize;
};

export type IconProps = PropsWithHTMLAttributes<Props, HTMLSpanElement>;

export const cnIcon = cn('Icon');

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const { children, className, size = 'm', view, ...otherProps } = props;
  return (
    <span {...otherProps} className={cnIcon({ size, view }, [className])} ref={ref}>
      {children}
    </span>
  );
});

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
  className?: string;
  innerRef?: React.Ref<HTMLDivElement>;
};

export type IIcon = IconProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof IconProps>;

export const cnIcon = cn('Icon');

export const Icon: React.FC<IIcon> = ({
  children,
  className,
  size = 'm',
  view,
  innerRef,
  ...otherProps
}) => {
  return (
    <span {...otherProps} className={cnIcon({ size, view }, [className])} ref={innerRef}>
      {children}
    </span>
  );
};

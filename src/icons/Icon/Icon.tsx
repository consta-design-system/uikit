import './Icon.css';

import React, { forwardRef } from 'react';

import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

const iconPropSize = ['xs', 's', 'm'] as const;
export type IconPropSize = typeof iconPropSize[number];
export const defaultIconPropSize = iconPropSize[2];

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

export type IconProps = PropsWithHTMLAttributesAndRef<
  {
    view?: IconPropView;
    size?: IconPropSize;
  },
  HTMLSpanElement
>;

export type IconComponent = React.FC<IconProps>;

export const cnIcon = cn('Icon');

export const Icon: IconComponent = forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const { children, className, size = defaultIconPropSize, view, ...otherProps } = props;
  return (
    <span {...otherProps} className={cnIcon({ size, view }, [className])} ref={ref}>
      {children}
    </span>
  );
});

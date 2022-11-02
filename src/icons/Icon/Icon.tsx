import './Icon.css';

import React, { forwardRef } from 'react';

import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export const iconPropSize = ['m', 's', 'xs', 'l'] as const;
export type IconPropSize = typeof iconPropSize[number];
export const iconPropSizeDefault = iconPropSize[0];

export const iconPropView = [
  'primary',
  'alert',
  'brand',
  'ghost',
  'link',
  'secondary',
  'success',
  'warning',
  'disabled',
] as const;
export type IconPropView = typeof iconPropView[number];
export const iconPropViewDefault = iconPropView[0];

export type IconProps = PropsWithHTMLAttributesAndRef<
  {
    view?: IconPropView;
    size?: IconPropSize;
  },
  HTMLSpanElement
>;

export type IconComponent = React.FC<IconProps>;

export const cnIcon = cn('Icon');

export const Icon: IconComponent = forwardRef<HTMLSpanElement, IconProps>(
  (props, ref) => {
    const { children, className, size = 'm', view, ...otherProps } = props;
    return (
      <span
        {...otherProps}
        className={cnIcon({ size, view }, [className])}
        ref={ref}
      >
        {children}
      </span>
    );
  },
);

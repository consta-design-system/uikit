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

export interface IIcon {
  view?: IconPropView;
  size?: IconPropSize;
  className?: string;
}

export const cnIcon = cn('Icon');

export const Icon: React.FC<IIcon> = ({ children, className, size = 'm', view }) => {
  return <div className={cnIcon({ size, view }, [className])}>{children}</div>;
};

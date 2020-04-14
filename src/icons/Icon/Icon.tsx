import React from 'react';
import { cn } from '../../utils/bem';

export type IconPropSize = 'xs' | 's' | 'm';
export interface IIcon {
  view?: 'alert' | 'brand' | 'ghost' | 'link' | 'primary' | 'secondary' | 'success' | 'warning';
  size?: IconPropSize;
  className?: string;
}

export const cnIcon = cn('Icon');

export const Icon: React.FC<IIcon> = ({ children, className, size = 'm', view }) => (
  <div className={cnIcon({ size, view }, [className])}>{children}</div>
);

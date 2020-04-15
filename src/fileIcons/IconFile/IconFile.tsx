import './IconFile.css';
import React from 'react';
import { cn } from '../../utils/bem';

export type IconFilePropSize = 's' | 'm';

export interface IIconFile {
  size?: IconFilePropSize;
  className?: string;
}

export const cnIconFile = cn('IconFile');

export const IconFile: React.FC<IIconFile> = ({ children, className, size = 'm' }) => {
  return <div className={cnIconFile({ size }, [className])}>{children}</div>;
};

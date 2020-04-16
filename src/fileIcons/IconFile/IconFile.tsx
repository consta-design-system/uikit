import './IconFile.css';
import React from 'react';
import { cn } from '../../utils/bem';

export type IconFilePropSize = 's' | 'm';

export type IconFileProps = {
  size?: IconFilePropSize;
  className?: string;
};

export type IIconFile = IconFileProps & (Omit<React.HTMLAttributes<Element>, keyof IconFileProps>);

export const cnIconFile = cn('IconFile');

export const IconFile: React.FC<IIconFile> = ({
  children,
  className,
  size = 'm',
  ...otherProps
}) => {
  return (
    <div className={cnIconFile({ size }, [className])} {...otherProps}>
      {children}
    </div>
  );
};

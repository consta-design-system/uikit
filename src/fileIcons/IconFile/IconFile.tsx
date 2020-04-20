import './IconFile.css';
import React from 'react';
import { cn } from '../../utils/bem';

export type IconFilePropSize = 's' | 'm';

export type IconFileProps = {
  size?: IconFilePropSize;
  className: string;
  innerRef?: React.Ref<HTMLDivElement>;
};

export type IIconFile = IconFileProps &
  (Omit<React.HTMLAttributes<HTMLDivElement>, keyof IconFileProps>);

export const cnIconFile = cn('IconFile');

export const IconFile: React.FC<IIconFile> = ({
  children,
  className,
  size = 'm',
  innerRef,
  ...otherProps
}) => {
  return (
    <div {...otherProps} ref={innerRef} className={cnIconFile({ size }, [className])}>
      {children}
    </div>
  );
};

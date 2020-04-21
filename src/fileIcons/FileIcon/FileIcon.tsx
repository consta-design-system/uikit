import './FileIcon.css';
import React from 'react';
import { cn } from '../../utils/bem';

export type FileIconPropSize = 's' | 'm';

export type FileIconProps = {
  size?: FileIconPropSize;
  className?: string;
  innerRef?: React.Ref<HTMLDivElement>;
};

export type IFileIcon = FileIconProps &
  (Omit<React.HTMLAttributes<HTMLDivElement>, keyof FileIconProps>);

export const cnIconFile = cn('FileIcon');

export const FileIcon: React.FC<IFileIcon> = ({
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

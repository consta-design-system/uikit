import './FileIcon.css';

import React from 'react';

import { cn } from '../../utils/bem';

export type FileIconPropSize = 's' | 'm';

export type FileIconProps = {
  size?: FileIconPropSize;
};

export type IFileIcon = FileIconProps & React.HTMLAttributes<HTMLDivElement>;

export const cnIconFile = cn('FileIcon');

export const FileIcon = React.forwardRef<HTMLDivElement, IFileIcon>((props, ref) => {
  const { children, className, size = 'm', ...otherProps } = props;
  return (
    <div {...otherProps} className={cnIconFile({ size }, [className])} ref={ref}>
      {children}
    </div>
  );
});

import './FileIcon.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';

export type FileIconPropSize = 's' | 'm';

type Props = {
  size?: FileIconPropSize;
};

export type FileIconProps = PropsWithHTMLAttributes<Props, HTMLDivElement>;

export const cnIconFile = cn('FileIcon');

export const FileIcon = React.forwardRef<HTMLDivElement, FileIconProps>((props, ref) => {
  const { children, className, size = 'm', ...otherProps } = props;
  return (
    <div {...otherProps} className={cnIconFile({ size }, [className])} ref={ref}>
      {children}
    </div>
  );
});

import './FileCanaryBase.css';

import React, { forwardRef } from 'react';

import { cnCanary } from '##/utils/bem';

import { FileBaseComponent, FileBaseProps } from '../types';

export const cnFileCanaryBase = cnCanary('FileBase');

const FileBaseRender = (
  {
    size,
    icon: Icon,
    extension,
    color,
    className,
    as: Tag = 'div',
    ...otherProps
  }: FileBaseProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  return (
    <Tag
      className={cnFileCanaryBase({ size }, [className])}
      style={{ backgroundColor: color }}
      ref={ref}
      {...otherProps}
    >
      <div className={cnFileCanaryBase('IconContainer')}>
        <Icon size={size} className={cnFileCanaryBase('Icon')} />
      </div>
      <div className={cnFileCanaryBase('Extension')}>{extension}</div>
    </Tag>
  );
};

export const FileBase = forwardRef(FileBaseRender) as FileBaseComponent;

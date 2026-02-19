import './FileCanaryBase.css';

import { classnames } from '@bem-react/classnames';
import React, { forwardRef } from 'react';

import { useTheme } from '##/components/Theme';
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
  const { themeClassNames } = useTheme();
  const themedClassName = classnames(className, themeClassNames.color.accent);

  return (
    <Tag
      className={cnFileCanaryBase({ size }, [themedClassName])}
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

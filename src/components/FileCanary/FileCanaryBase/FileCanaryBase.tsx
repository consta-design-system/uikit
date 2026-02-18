import './FileCanaryBase.css';

import { classnames } from '@bem-react/classnames';
import React from 'react';

import { useTheme } from '##/components/Theme';
import { cnCanary } from '##/utils/bem';

import { FileBaseProps } from '../types';

export const cnFileCanaryBase = cnCanary('FileBase');

export const FileBase: React.FC<FileBaseProps> = (props) => {
  const {
    size,
    icon: Icon,
    extension,
    color,
    className,
    ...otherProps
  } = props;

  const { themeClassNames } = useTheme();
  const themedClassName = classnames(className, themeClassNames.color.accent);

  return (
    <div
      className={cnFileCanaryBase({ size }, [themedClassName])}
      style={{ backgroundColor: color }}
      {...otherProps}
    >
      <div className={cnFileCanaryBase('IconContainer')}>
        <Icon size={size} className={cnFileCanaryBase('Icon')} />
      </div>
      <div className={cnFileCanaryBase('Extension')}>{extension}</div>
    </div>
  );
};

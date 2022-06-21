import './ProgressLine.css';

import React, { forwardRef } from 'react';

import { cn } from '../../utils/bem';
import { isNumber } from '../../utils/type-guards';

import { ProgressLineComponent } from './types';

const cnProgressLine = cn('ProgressLine');

const getProgress = (progress: number) => {
  const progressNormal = Math.ceil(progress);

  if (progressNormal >= 100) {
    return 1;
  }

  if (progressNormal <= 0) {
    return 0;
  }

  return progressNormal / 100;
};

export const ProgressLine: ProgressLineComponent = forwardRef((props, ref) => {
  const { size = 'm', value, style, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      ref={ref}
      style={{
        ...style,
        ['--progress-line-value' as string]: `${getProgress(value ?? 0)}`,
      }}
      className={cnProgressLine({
        size,
        mode: isNumber(value) ? 'determinate' : 'indeterminate',
      })}
    />
  );
});

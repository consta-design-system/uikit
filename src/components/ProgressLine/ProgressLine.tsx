import './ProgressLine.css';

import React, { forwardRef } from 'react';

import { cn } from '../../utils/bem';
import { isNumber } from '../../utils/type-guards';

import { ProgressLineComponent } from './types';

const cnProgressLine = cn('ProgressLine');

const getProgress = (progress: number) => {
  if (progress > 100) {
    return 100;
  }
  if (progress < 0) {
    return 0;
  }
  return progress;
};

export const ProgressLine: ProgressLineComponent = forwardRef((props, ref) => {
  const { size = 'm', value, style, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      ref={ref}
      style={{
        ...style,
        ['--progress-line-value' as string]: `${getProgress(value ?? 0)}%`,
      }}
      className={cnProgressLine({
        size,
        mode: isNumber(value) ? 'determinate' : 'indeterminate',
      })}
    />
  );
});

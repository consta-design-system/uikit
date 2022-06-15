import './ProgressLine.css';

import React, { forwardRef } from 'react';

import { cn } from '../../utils/bem';

import { ProgressLineComponent, ProgressLineProps } from './types';

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

function ProgressLineRender(props: ProgressLineProps) {
  const { size = 'm', value, ...otherProps } = props;

  return (
    <div
      style={{
        ['--progress-line-value' as string]: `${getProgress(value ?? 0)}%`,
      }}
      className={cnProgressLine({
        size,
        mode: value ? 'determinate' : 'indeterminate',
      })}
      {...otherProps}
    />
  );
}

export const ProgressLine = forwardRef(ProgressLineRender) as ProgressLineComponent;

import './ProgressLine.css';

import React, { forwardRef } from 'react';

import { cn } from '../../utils/bem';

import { ProgressLineComponent, ProgressLineProps, PropgressLinePropMode } from './types';

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

function ProgressLineRender<MODE extends PropgressLinePropMode = 'indeterminate'>(
  props: ProgressLineProps<MODE>,
) {
  const { size = 'm', mode = 'indeterminate', progress, ...otherProps } = props;

  return (
    <div
      style={{
        ['--progress-line-progress' as string]: `${getProgress(progress ?? 0)}%`,
      }}
      className={cnProgressLine({
        size,
        mode: mode === 'determinate' && progress ? 'determinate' : 'indeterminate',
      })}
      {...otherProps}
    />
  );
}

export const ProgressLine = forwardRef(ProgressLineRender) as ProgressLineComponent;

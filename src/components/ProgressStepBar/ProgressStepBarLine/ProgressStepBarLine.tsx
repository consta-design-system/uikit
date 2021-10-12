import './ProgressStepBarLine.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { Line, PropDirection, PropSize } from '../helpers';

type ProgressStepBarLineProps = {
  lines: Line[];
  size: PropSize;
  direction: PropDirection;
  activeStepIndex?: number;
};

const cnProgressStepBarLine = cn('ProgressStepBarLine');

export const ProgressStepBarLine = (props: ProgressStepBarLineProps) => {
  const { lines, activeStepIndex = 0, size, direction, ...otherProps } = props;

  return (
    <div
      style={{
        ['--line-size' as string]: `${lines.length > 0 ? lines[lines.length - 1].size : 0}px`,
      }}
      className={cnProgressStepBarLine({ size, direction })}
      {...otherProps}
    >
      {lines.map((line, index) => (
        <div
          style={{
            ['--progress-line-size' as string]: `${index < activeStepIndex ? line.size : 0}px`,
            ['--progress-line-index' as string]: lines.length - index,
            ['--progress-line-resize' as string]: `${
              index < activeStepIndex ? (index + 1) * 0.3 : (lines.length - index - 1) * 0.3
            }s`,
          }}
          className={cnProgressStepBarLine('ProgressLine', {
            status: line.status,
            direction,
          })}
        />
      ))}
    </div>
  );
};

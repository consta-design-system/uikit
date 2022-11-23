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

const getActiveLineSize = (
  activeStepIndex: number | undefined,
  lines: Line[],
  lineSize: number,
) => {
  if (typeof activeStepIndex !== 'number') {
    return 0;
  }

  return lines[activeStepIndex] ? lines[activeStepIndex].size : lineSize;
};

export const ProgressStepBarLine = (props: ProgressStepBarLineProps) => {
  const { lines, activeStepIndex, size, direction } = props;
  const lineSize = lines.length > 0 ? lines[lines.length - 1].size : 0;
  const activeLineSize = getActiveLineSize(activeStepIndex, lines, lineSize);

  return (
    <div
      className={cnProgressStepBarLine({ size, direction })}
      style={{
        ['--line-size' as string]: `${lineSize}px`,
        ['--line-active-size' as string]: `${activeLineSize}px`,
      }}
    >
      <svg
        className={cnProgressStepBarLine('Svg')}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        {lines.map((line, index) => {
          const fill = `var(--color-bg-${line.status || 'normal'})`;
          const from = lines[index - 1] ? lines[index - 1].size : 0;
          const to = line.size;

          const x = direction === 'horizontal' ? from : 0;
          const y = direction === 'horizontal' ? 0 : from;
          const height =
            direction === 'horizontal'
              ? 'var(--progress-step-bar-line-height)'
              : to;

          const width =
            direction === 'horizontal'
              ? to
              : 'var(--progress-step-bar-line-width)';
          return (
            <rect key={index} style={{ height, width, fill }} x={x} y={y} />
          );
        })}
      </svg>
    </div>
  );
};

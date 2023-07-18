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
) => {
  const lineSizes = lines.map(({ size }) => size);
  const active = activeStepIndex ? Math.max(activeStepIndex, 0) : undefined;
  if (typeof active !== 'number' || active === 0) {
    return 0;
  }

  return lineSizes.splice(0, active).reduce((a, b) => a + b, 0);
};

type PathItem = {
  fill: string;
  height: string | number;
  width: string | number;
  x: number;
  y: number;
};
const getPathParams = (lines: Line[], direction: PropDirection) => {
  const paths: PathItem[] = [];
  let width = 0;
  lines.forEach(({ size, status }) => {
    paths.push({
      width:
        direction === 'horizontal'
          ? size
          : 'var(--progress-step-bar-line-width)',
      height:
        direction === 'horizontal'
          ? 'var(--progress-step-bar-line-height)'
          : size,
      x: direction === 'horizontal' ? width : 0,
      y: direction === 'horizontal' ? 0 : width,
      fill: `var(--color-bg-${status || 'normal'})`,
    });
    width += size;
  });
  return paths;
};

export const ProgressStepBarLine = (props: ProgressStepBarLineProps) => {
  const { lines, activeStepIndex, size, direction, ...otherProps } = props;
  const lineSize = lines.map(({ size }) => size).reduce((a, b) => a + b, 0);
  const activeLineSize = getActiveLineSize(activeStepIndex, lines);

  return (
    <div
      {...otherProps}
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
        {getPathParams(lines, direction).map(
          ({ fill, height, width, x, y }, index) => (
            <rect key={index} style={{ height, width, fill }} x={x} y={y} />
          ),
        )}
      </svg>
    </div>
  );
};

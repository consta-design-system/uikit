import './ProgressStepBarLine.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { getSizeByMap } from '../../../utils/getSizeByMap';
import { Line, PropDirection, PropSize, PropStatus } from '../helpers';

type ProgressStepBarLineProps = {
  lines: Line[];
  size: PropSize;
  direction: PropDirection;
  activeStepIndex?: number;
};

const cnProgressStepBarLine = cn('ProgressStepBarLine');

const mapVarsByStatus: Record<PropStatus, string> = {
  normal: 'var(--color-bg-normal)',
  success: 'var(--color-bg-success)',
  warning: 'var(--color-bg-warning)',
  alert: 'var(--color-bg-alert)',
};

const backgroundGenerate = (lines: Line[], direction: PropDirection) => {
  let background = `linear-gradient(${direction === 'horizontal' ? '90' : '180'}deg, `;

  const { length } = lines;

  for (let index = 0; index < length; index++) {
    const line = lines[index];
    const color = getSizeByMap(mapVarsByStatus, line.status || 'normal');
    const from = lines[index - 1] ? lines[index - 1].size : 0;
    const to = line.size;
    background += `${color} ${from}px, ${color} ${to}px${index < length - 1 ? ', ' : ')'}`;
  }

  return background;
};

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
  const { lines, activeStepIndex, size, direction, ...otherProps } = props;
  const background = backgroundGenerate(lines, direction);
  const lineSize = lines.length > 0 ? lines[lines.length - 1].size : 0;
  const activeLineSize = getActiveLineSize(activeStepIndex, lines, lineSize);

  return (
    <div
      {...otherProps}
      className={cnProgressStepBarLine({ size, direction })}
      style={{
        ['--line-size' as string]: `${lineSize}px`,
        ['--line-background' as string]: background,
        ['--line-active-size' as string]: `${activeLineSize}px`,
      }}
    />
  );
};

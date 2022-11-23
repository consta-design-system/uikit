import {
  ProgressLineItemDefault,
  ProgressLinePropGetItemLabel,
  ProgressLineProps,
} from './types';

const defaultGetItemLabel: ProgressLinePropGetItemLabel<
  ProgressLineItemDefault
> = (item) => item.label;

export function withDefaultGetters<ITEM>(props: ProgressLineProps<ITEM>) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
  };
}

export const getProgress = (progress: number) => {
  const progressNormal = Math.ceil(progress);

  if (progressNormal >= 100) {
    return 1;
  }

  if (progressNormal <= 0) {
    return 0;
  }

  return progressNormal / 100;
};

type ProgressLineSvgItem = {
  width: number;
  x: number;
  y: number;
};

export const calculateLinePositions = (
  steps: number,
  containerWidth: number,
): ProgressLineSvgItem[] => {
  const lines: ProgressLineSvgItem[] = [];
  const gap = 2;
  const widthWithoutGap = Math.max(containerWidth - (steps - 1) * gap, 0);
  const lineWidth = widthWithoutGap / steps;
  let padding = 0;
  for (let i = 0; i < steps; i++) {
    lines.push({
      width: lineWidth,
      y: 0,
      x: padding,
    });
    padding += lineWidth + gap;
  }
  return lines;
};

export const generateMask = (lines: ProgressLineSvgItem[]): string => {
  const { length } = lines;
  if (length > 0) {
    const width = lines[length - 1].x + lines[length - 1].width;
    let svg = `%3csvg width='${width}px' height='4px' xmlns='http://www.w3.org/2000/svg'%3e`;
    for (let index = 0; index < length; index++) {
      const { x, width, y } = lines[index];
      svg += `%3crect x='${x}px' y='${y}px' height='4px' width='${width}px' /%3e`;
    }
    svg += '%3c/svg%3e';
    return `url("data:image/svg+xml;charset=UTF-8,${svg}")`;
  }
  return '';
};

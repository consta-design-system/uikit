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
) => {
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

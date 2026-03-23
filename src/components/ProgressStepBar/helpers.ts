import React from 'react';

import { cn } from '../../utils/bem';
import {
  ProgressStepBarItemDefault,
  ProgressStepBarPropDirection,
  ProgressStepBarPropGetItemContent,
  ProgressStepBarPropGetItemLabel,
  ProgressStepBarPropGetItemLineStatus,
  ProgressStepBarPropGetItemOnClick,
  ProgressStepBarPropGetItemPoint,
  ProgressStepBarPropGetItemProgress,
  ProgressStepBarPropGetItemStatus,
  ProgressStepBarPropGetItemTooltipContent,
  ProgressStepBarPropPosition,
  ProgressStepBarProps,
} from './types';

export const cnProgressStepBar = cn('ProgressStepBar');

export const defaultGetItemLabel: ProgressStepBarPropGetItemLabel<
  ProgressStepBarItemDefault
> = (item) => item.label;
export const defaultGetItemTooltipContent: ProgressStepBarPropGetItemTooltipContent<
  ProgressStepBarItemDefault
> = (item) => item.tooltipContent;
export const defaultGetItemPoint: ProgressStepBarPropGetItemPoint<
  ProgressStepBarItemDefault
> = (item) => item.point;
export const defaultGetItemLineStatus: ProgressStepBarPropGetItemLineStatus<
  ProgressStepBarItemDefault
> = (item) => item.lineStatus;
export const defaultGetItemProgress: ProgressStepBarPropGetItemProgress<
  ProgressStepBarItemDefault
> = (item) => item.progress;
export const defaultGetItemContent: ProgressStepBarPropGetItemContent<
  ProgressStepBarItemDefault
> = (item) => item.content;
export const defaultGetItemStatus: ProgressStepBarPropGetItemStatus<
  ProgressStepBarItemDefault
> = (item) => item.status;
export const defaultGetItemOnClick: ProgressStepBarPropGetItemOnClick<
  ProgressStepBarItemDefault
> = (item) => item.onClick;

export function withDefaultGetters<ITEM>(props: ProgressStepBarProps<ITEM>) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemTooltipContent:
      props.getItemTooltipContent || defaultGetItemTooltipContent,
    getItemPoint: props.getItemPoint || defaultGetItemPoint,
    getItemProgress: props.getItemProgress || defaultGetItemProgress,
    getItemContent: props.getItemContent || defaultGetItemContent,
    getItemStatus: props.getItemStatus || defaultGetItemStatus,
    getItemLineStatus: props.getItemLineStatus || defaultGetItemLineStatus,
    getItemOnClick: props.getItemOnClick || defaultGetItemOnClick,
  };
}

export const getItemPosition = (index: number, length: number) => {
  let position: ProgressStepBarPropPosition = 'center';
  if (index === length - 1) position = 'end';
  if (index === 0) position = 'start';

  return position;
};

const getRefSize = (ref: React.RefObject<HTMLElement>) => {
  if (ref.current) {
    const { width, height } = ref.current.getBoundingClientRect();
    return [width, height];
  }
  return [0, 0];
};

export const calculateLines = (
  refs: React.RefObject<HTMLElement>[],
  direction: ProgressStepBarPropDirection,
) => {
  const sizes: number[] = [];
  const { length } = refs;

  if (length < 2) {
    return sizes;
  }

  for (let i = 0; i < length - 1; i++) {
    const [width1, height1] = getRefSize(refs[i]);
    const [width2] = getRefSize(refs[i + 1]);

    let size = 0;
    if (direction === 'horizontal') {
      const first = i === 0 ? width1 : width1 / 2;
      const second = i === length - 2 ? width2 : width2 / 2;
      size = first + second;
    } else {
      size = height1;
      if (i === length - 2) {
        size += 2;
      }
    }
    sizes.push(size);
  }

  return sizes;
};

export const validateVisibleIndex = (
  length: number,
  index: number | undefined,
) => {
  if (!index) {
    return index;
  }

  if (index < 0) {
    return undefined;
  }

  return Math.min(index, length - 1);
};

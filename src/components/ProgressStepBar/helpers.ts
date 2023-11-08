import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export const progressStepBarPropSize = ['s', 'xs', 'm'] as const;
export type ProgressStepBarPropSize = typeof progressStepBarPropSize[number];
export const progressStepBarPropSizeDefault = progressStepBarPropSize[0];

export const progressStepBarPropDirection = ['horizontal', 'vertical'] as const;
export type ProgressStepBarPropDirection =
  typeof progressStepBarPropDirection[number];
export const progressStepBarPropDirectionDefault =
  progressStepBarPropDirection[0];

export const progressStepBarPropStatus = [
  'normal',
  'success',
  'warning',
  'alert',
] as const;
export type ProgressStepBarPropStatus =
  typeof progressStepBarPropStatus[number];
export const progressStepBarPropStatusDefault = progressStepBarPropStatus[0];

export const progressStepBarPointNumbersMap = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
] as const;
export type ProgressStepBarPointNumbersMap =
  typeof progressStepBarPointNumbersMap[number];

export const progressStepBarPropPosition = ['center', 'start', 'end'] as const;
export type ProgressStepBarPropPosition =
  typeof progressStepBarPropPosition[number];
export const progressStepBarPropPositionDefault: ProgressStepBarPropPosition =
  progressStepBarPropPosition[0];

export type ProgressStepBarPropGetItemLabel<ITEM> = (
  item: ITEM,
) => string | undefined;
export type ProgressStepBarPropGetItemKey<ITEM> = (
  item: ITEM,
) => string | number;
export type ProgressStepBarPropGetItemTooltipContent<ITEM> = (
  item: ITEM,
) => string | undefined;
export type ProgressStepBarPropGetItemLineStatus<ITEM> = (
  item: ITEM,
) => ProgressStepBarPropStatus | undefined;
export type ProgressStepBarPropGetItemPoint<ITEM> = (
  item: ITEM,
) => ProgressStepBarPointNumbersMap | IconComponent | undefined;
export type ProgressStepBarPropGetItemProgress<ITEM> = (
  item: ITEM,
) => boolean | undefined;
export type ProgressStepBarPropGetItemContent<ITEM> = (
  item: ITEM,
) => React.ReactNode | undefined;
export type ProgressStepBarPropGetItemStatus<ITEM> = (
  item: ITEM,
) => ProgressStepBarPropStatus | undefined;
export type ProgressStepBarPropGetItemOnClick<ITEM> = (
  item: ITEM,
) => React.EventHandler<React.MouseEvent> | undefined;

export type ProgressStepBarItemDefault = {
  label?: string;
  tooltipContent?: string;
  lineStatus?: ProgressStepBarPropStatus;
  point?: ProgressStepBarPointNumbersMap | IconComponent;
  status?: ProgressStepBarPropStatus;
  progress?: boolean;
  content?: React.ReactNode;
  onClick?: React.EventHandler<React.MouseEvent>;
};

export type Line = {
  status: ProgressStepBarPropStatus;
  size: number;
};

export type ProgressStepBarPropOnItemClick<ITEM> = (
  item: ITEM,
  props: {
    e: React.MouseEvent;
    index: number;
  },
) => void;

export type ProgressStepBarProps<ITEM = ProgressStepBarItemDefault> =
  PropsWithHTMLAttributesAndRef<
    {
      steps: ITEM[];
      direction?: ProgressStepBarPropDirection;
      size?: ProgressStepBarPropSize;
      activeStepIndex?: number;
      onItemClick?: ProgressStepBarPropOnItemClick<ITEM>;
      getItemLabel?: ProgressStepBarPropGetItemLabel<ITEM>;
      getItemLineStatus?: ProgressStepBarPropGetItemLineStatus<ITEM>;
      getItemTooltipContent?: ProgressStepBarPropGetItemTooltipContent<ITEM>;
      getItemPoint?: ProgressStepBarPropGetItemPoint<ITEM>;
      getItemProgress?: ProgressStepBarPropGetItemProgress<ITEM>;
      getItemContent?: ProgressStepBarPropGetItemContent<ITEM>;
      getItemStatus?: ProgressStepBarPropGetItemStatus<ITEM>;
      getItemOnClick?: ProgressStepBarPropGetItemOnClick<ITEM>;
    },
    HTMLDivElement
  > &
    (ITEM extends { label: ProgressStepBarItemDefault['label'] }
      ? {}
      : { getItemLabel: ProgressStepBarPropGetItemLabel<ITEM> });

export type ProgressStepBarItemProps = {
  content?: React.ReactNode;
  label?: string;
  point?: ProgressStepBarPointNumbersMap | IconComponent;
  progress?: boolean;
  status?: ProgressStepBarPropStatus | 'system';
  tooltipContent?: string;
  tooltipZIndex?: number;
  position?: ProgressStepBarPropPosition;
  direction: ProgressStepBarPropDirection;
  size: ProgressStepBarPropSize;
  onClick?: (e: React.MouseEvent) => void;
  pointRef?: React.RefObject<HTMLButtonElement>;
  className?: string;
};

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

export type ProgressStepBarComponent = <ITEM = ProgressStepBarItemDefault>(
  props: ProgressStepBarProps<ITEM>,
) => React.ReactElement | null;

export type ProgressStepBarItemComponent = (
  props: PropsWithHTMLAttributesAndRef<
    ProgressStepBarItemProps,
    HTMLDivElement
  >,
) => React.ReactElement | null;

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

export const getItemPosition = (index: number, lendth: number) => {
  let position: ProgressStepBarPropPosition = 'center';
  if (index === lendth - 1) position = 'end';
  if (index === 0) position = 'start';

  return position;
};

export const getLineSize: (
  container: React.RefObject<HTMLElement>,
  activeElement: React.RefObject<HTMLElement>,
  direction: ProgressStepBarPropDirection,
) => number = (container, activeElement, direction) => {
  let size = 0;
  if (
    container &&
    container.current &&
    activeElement &&
    activeElement.current
  ) {
    const containerPosition = container.current.getBoundingClientRect();
    const activeElementPosition = activeElement.current.getBoundingClientRect();
    if (direction === 'vertical')
      size =
        activeElementPosition.y -
        containerPosition.y +
        activeElementPosition.height;
    else size = activeElementPosition.x - containerPosition.x;
  }
  return size;
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
  for (let i = 0; i < refs.length - 1; i++) {
    const ref = refs[i];
    const firstSize = getRefSize(ref);
    const secondSize = getRefSize(refs[i + 1]);
    let size = 0;
    if (i === 0) {
      size =
        direction === 'horizontal'
          ? firstSize[0] + secondSize[0] / 2
          : firstSize[1];
    } else if (i === refs.length - 2) {
      size =
        direction === 'horizontal'
          ? firstSize[0] / 2 + secondSize[0]
          : firstSize[1] + 2;
    } else {
      size =
        direction === 'horizontal'
          ? firstSize[0] / 2 + secondSize[0] / 2
          : firstSize[1];
    }
    sizes.push(size);
  }

  return sizes;
};

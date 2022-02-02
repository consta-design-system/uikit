import React from 'react';

import { IconComponent } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export const propSize = ['s', 'xs', 'm'] as const;
export type PropSize = typeof propSize[number];
export const propSizeDefault = propSize[0];

export const propDirection = ['horizontal', 'vertical'] as const;
export type PropDirection = typeof propDirection[number];
export const propDirectionDefault = propDirection[0];

export const propStatus = ['normal', 'success', 'warning', 'alert'] as const;
export type PropStatus = typeof propStatus[number];
export const propStatusDefault = propStatus[0];

export const pointNumbersMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export type PointNumbersMap = typeof pointNumbersMap[number];

export const propPosition = ['center', 'start', 'end'] as const;
export type PropPosition = typeof propPosition[number];
export const propPositionDefault: PropPosition = propPosition[0];

export type PropGetItemLabel<ITEM> = (item: ITEM) => string | undefined;
export type PropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type PropGetItemTooltipContent<ITEM> = (item: ITEM) => string | undefined;
export type PropGetItemLineStatus<ITEM> = (item: ITEM) => PropStatus | undefined;
export type PropGetItemPoint<ITEM> = (item: ITEM) => PointNumbersMap | IconComponent | undefined;
export type PropGetItemProgress<ITEM> = (item: ITEM) => boolean | undefined;
export type PropGetItemContent<ITEM> = (item: ITEM) => React.ReactNode | undefined;
export type PropGetItemStatus<ITEM> = (item: ITEM) => PropStatus | undefined;
export type PropGetItemOnClick<ITEM> = (
  item: ITEM,
) => React.EventHandler<React.MouseEvent> | undefined;

export type DefaultItem = {
  label?: string;
  tooltipContent?: string;
  lineStatus?: PropStatus;
  point?: PointNumbersMap | IconComponent;
  status?: PropStatus;
  progress?: boolean;
  content?: React.ReactNode;
  onClick?: React.EventHandler<React.MouseEvent>;
};

export type Line = {
  status: PropStatus;
  size: number;
};

export type ProgressStepBarProps<ITEM = DefaultItem> = PropsWithHTMLAttributesAndRef<
  {
    steps: ITEM[];
    direction?: PropDirection;
    size?: PropSize;
    activeStepIndex?: number;
    onItemClick?: (props: { e: React.MouseEvent; item: ITEM; index: number }) => void;
    getItemLabel?: PropGetItemLabel<ITEM>;
    getItemLineStatus?: PropGetItemLineStatus<ITEM>;
    getItemTooltipContent?: PropGetItemTooltipContent<ITEM>;
    getItemPoint?: PropGetItemPoint<ITEM>;
    getItemProgress?: PropGetItemProgress<ITEM>;
    getItemContent?: PropGetItemContent<ITEM>;
    getItemStatus?: PropGetItemStatus<ITEM>;
    getItemOnClick?: PropGetItemOnClick<ITEM>;
  },
  HTMLDivElement
> &
  (ITEM extends { label: DefaultItem['label'] } ? {} : { getItemLabel: PropGetItemLabel<ITEM> });

export type ProgressStepBarItemProps = {
  content?: React.ReactNode;
  label?: string;
  point?: PointNumbersMap | IconComponent;
  progress?: boolean;
  status?: PropStatus | 'system';
  tooltipContent?: string;
  tooltipZIndex?: number;
  position?: PropPosition;
  direction: PropDirection;
  size: PropSize;
  onClick?: (e: React.MouseEvent) => void;
  pointRef?: React.RefObject<HTMLButtonElement> | React.RefObject<HTMLDivElement>;
};

export const cnProgressStepBar = cn('ProgressStepBar');

export const defaultGetItemLabel: PropGetItemLabel<DefaultItem> = (item) => item.label;
export const defaultGetItemTooltipContent: PropGetItemTooltipContent<DefaultItem> = (item) =>
  item.tooltipContent;
export const defaultGetItemPoint: PropGetItemPoint<DefaultItem> = (item) => item.point;
export const defaultGetItemLineStatus: PropGetItemLineStatus<DefaultItem> = (item) =>
  item.lineStatus;
export const defaultGetItemProgress: PropGetItemProgress<DefaultItem> = (item) => item.progress;
export const defaultGetItemContent: PropGetItemContent<DefaultItem> = (item) => item.content;
export const defaultGetItemStatus: PropGetItemStatus<DefaultItem> = (item) => item.status;
export const defaultGetItemOnClick: PropGetItemOnClick<DefaultItem> = (item) => item.onClick;

export type ProgressStepBarComponent = <ITEM = DefaultItem>(
  props: ProgressStepBarProps<ITEM>,
) => React.ReactElement | null;

export type ProgressStepBarItemComponent = (
  props: PropsWithHTMLAttributesAndRef<ProgressStepBarItemProps, HTMLDivElement>,
) => React.ReactElement | null;

export function withDefaultGetters<ITEM>(props: ProgressStepBarProps<ITEM>) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemTooltipContent: props.getItemTooltipContent || defaultGetItemTooltipContent,
    getItemPoint: props.getItemPoint || defaultGetItemPoint,
    getItemProgress: props.getItemProgress || defaultGetItemProgress,
    getItemContent: props.getItemContent || defaultGetItemContent,
    getItemStatus: props.getItemStatus || defaultGetItemStatus,
    getItemLineStatus: props.getItemLineStatus || defaultGetItemLineStatus,
    getItemOnClick: props.getItemOnClick || defaultGetItemOnClick,
  };
}

export const getItemPosition = (index: number, lendth: number) => {
  let position: PropPosition = 'center';
  if (index === lendth - 1) position = 'end';
  if (index === 0) position = 'start';

  return position;
};

export const getLineSize: (
  container: React.RefObject<HTMLElement>,
  activeElement: React.RefObject<HTMLElement>,
  direction: PropDirection,
) => number = (container, activeElement, direction) => {
  let size = 0;
  if (container && container.current && activeElement && activeElement.current) {
    const containerPosition = container.current.getBoundingClientRect();
    const activeElementPosition = activeElement.current.getBoundingClientRect();
    if (direction === 'vertical')
      size = activeElementPosition.y - containerPosition.y + activeElementPosition.height;
    else size = activeElementPosition.x - containerPosition.x;
  }
  return size;
};

import React from 'react';

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

export type PropGetItemLabel<ITEM> = (item: ITEM) => string;
export type PropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type PropGetItemTooltipContent<ITEM> = (item: ITEM) => string | undefined;
export type PropGetItemLineStatus<ITEM> = (item: ITEM) => string | undefined;
export type PropGetItemPoint<ITEM> = (item: ITEM) => PointNumbersMap | SVGElement | undefined;
export type PropGetItemProgress<ITEM> = (item: ITEM) => boolean | undefined;
export type PropGetItemContent<ITEM> = (item: ITEM) => React.ReactNode | undefined;
export type PropGetItemStatus<ITEM> = (item: ITEM) => PropStatus | undefined;
export type PropGetItemOnCLick<ITEM> = (
  item: ITEM,
) => React.EventHandler<React.MouseEvent> | undefined;

export type DefaultItem = {
  label: string;
  tooltipContent?: string;
  lineStatus?: PropStatus;
  point?: PointNumbersMap | SVGElement;
  status?: PropStatus;
  progress?: boolean;
  content?: React.ReactNode;
};

export type Line = {
  status?: string;
  size?: number;
};

export type ProgressStepBarProps<ITEM = DefaultItem> = PropsWithHTMLAttributesAndRef<
  {
    steps: ITEM[];
    direction?: PropDirection;
    size?: PropSize;
    activeStepIndex?: number;
    onItemClick?: (e: React.MouseEvent, item: ITEM, index: number) => void;
    getItemLabel?: PropGetItemLabel<ITEM>;
    getItemLineStatus?: PropGetItemLineStatus<ITEM>;
    getItemTooltipContent?: PropGetItemTooltipContent<ITEM>;
    getItemPoint?: PropGetItemPoint<ITEM>;
    getItemProgress?: PropGetItemProgress<ITEM>;
    getItemContent?: PropGetItemContent<ITEM>;
    getItemStatus?: PropGetItemStatus<ITEM>;
  },
  HTMLDivElement
> &
  (ITEM extends { label: DefaultItem['label'] } ? {} : { getItemLabel: PropGetItemLabel<ITEM> });

export type ProgressStepBarItemProps = {
  content?: React.ReactNode;
  label: string;
  point?: PointNumbersMap | SVGElement;
  progress?: boolean;
  status?: PropStatus;
  tooltipContent?: string;
  position?: PropPosition;
  direction: PropDirection;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  size: PropSize;
  onItemClick?: (e: React.MouseEvent) => void;
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

export type ProgressStepBarComponent = <ITEM = DefaultItem>(
  props: ProgressStepBarProps<ITEM>,
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
  };
}

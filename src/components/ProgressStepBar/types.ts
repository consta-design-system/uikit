import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export const progressStepBarPropSize = ['s', 'xs', 'm'] as const;
export type ProgressStepBarPropSize = (typeof progressStepBarPropSize)[number];
export const progressStepBarPropSizeDefault = progressStepBarPropSize[0];

export const progressStepBarPropDirection = ['horizontal', 'vertical'] as const;
export type ProgressStepBarPropDirection =
  (typeof progressStepBarPropDirection)[number];
export const progressStepBarPropDirectionDefault =
  progressStepBarPropDirection[0];

export const progressStepBarPropStatus = [
  'normal',
  'success',
  'warning',
  'alert',
] as const;
export type ProgressStepBarPropStatus =
  (typeof progressStepBarPropStatus)[number];
export const progressStepBarPropStatusDefault = progressStepBarPropStatus[0];

export const progressStepBarPointNumbersMap = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
] as const;
export type ProgressStepBarPointNumbersMap =
  (typeof progressStepBarPointNumbersMap)[number];

export const progressStepBarPropPosition = ['center', 'start', 'end'] as const;
export type ProgressStepBarPropPosition =
  (typeof progressStepBarPropPosition)[number];
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

export type ProgressStepBarComponent = <ITEM = ProgressStepBarItemDefault>(
  props: ProgressStepBarProps<ITEM>,
) => React.ReactNode | null;

export type ProgressStepBarItemComponent = (
  props: PropsWithHTMLAttributesAndRef<
    ProgressStepBarItemProps,
    HTMLDivElement
  >,
) => React.ReactNode | null;

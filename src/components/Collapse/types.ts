import { IconComponent, IconProps } from '@consta/icons/Icon';
import React from 'react';

import {
  PropsWithHTMLAttributes,
  PropsWithHTMLAttributesAndRef,
} from '##/utils/types/PropsWithHTMLAttributes';

export const collapsePropSize = ['m', 'l', 's', 'xs', '2xs'] as const;
export type CollapsePropSize = typeof collapsePropSize[number];
export const collapsePropSizeDefault = collapsePropSize[0];

export const collapsePropForm = ['brick', 'default', 'round'] as const;
export type CollapsePropForm = typeof collapsePropForm[number];
export const collapsePropFormDefault = collapsePropForm[0];

export const collapsePropView = [
  'clear',
  'ghost',
  'primary',
  'secondary',
] as const;
export type CollapsePropView = typeof collapsePropView[number];
export const collapsePropViewDefault = collapsePropView[0];

export const collapsePropHorizontalSpace = [
  '3xs',
  '6xl',
  '5xl',
  '4xl',
  '3xl',
  '2xl',
  'xl',
  'l',
  'm',
  's',
  'xs',
  '2xs',
] as const;
export type CollapsePropHorizontalSpace =
  typeof collapsePropHorizontalSpace[number];

export const collapsePropIconPosition = ['left', 'right'] as const;
export type CollapsePropIconPosition = typeof collapsePropIconPosition[number];
export const collapsePropIconPositionDefault = collapsePropIconPosition[0];

export const collapseIconPropDirection = [
  'up',
  'right',
  'down',
  'left',
  'upRight',
  'downRight',
  'upLeft',
  'downLeft',
] as const;
export type CollapseIconPropDirection =
  typeof collapseIconPropDirection[number];

export type CollapseIconProps = PropsWithHTMLAttributes<
  {
    size: 'xs' | 's';
    icon: React.FC<IconProps>;
    view: CollapsePropIconView;
    isOpen?: boolean;
    cildren?: never;
    closeIcon?: React.FC<IconProps>;
    direction?: CollapseIconPropDirection;
    closeDirection?: CollapseIconPropDirection;
  },
  HTMLSpanElement
>;

export const collapsePropDirectionIcon = collapseIconPropDirection;
export const collapsePropDirectionIconDefault = collapsePropDirectionIcon[0];
export const collapsePropCloseDirectionIconDefault =
  collapsePropDirectionIcon[2];

export const collapsePropIconView = ['clear', 'ghost'] as const;
export const collapsePropIconViewDefault = collapsePropIconView[0];
export type CollapsePropIconView = typeof collapsePropIconView[number];

export type CollapseProps = PropsWithHTMLAttributesAndRef<
  {
    size?: CollapsePropSize;
    icon?: IconComponent;
    form?: CollapsePropForm;
    view?: CollapsePropView;
    divider?: boolean;
    label: React.ReactNode;
    maxContentHeight?: string | number;
    horizontalSpace?: CollapsePropHorizontalSpace;
    hoverEffect?: boolean;
    isOpen?: boolean;
    iconView?: CollapsePropIconView;
    rightSide?: React.ReactNode;
    iconPosition?: 'left' | 'right';
  } & (
    | {
        closeIcon?: IconComponent;
        directionIcon?: never;
        closeDirectionIcon?: never;
      }
    | {
        closeIcon?: never;
        directionIcon?: CollapseIconPropDirection;
        closeDirectionIcon?: CollapseIconPropDirection;
      }
  ),
  HTMLDivElement
>;

export type CollapseComponent = (
  props: CollapseProps,
) => React.ReactElement | null;

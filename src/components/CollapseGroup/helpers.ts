import React from 'react';

import { IconProps } from '../../icons/Icon/Icon';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import {
  CollapsePropHorizontalSpace,
  CollapsePropSize,
  CollapsePropView,
} from '../Collapse/Collapse';
import { CollapseIconPropDirection } from '../Collapse/CollapseIcon/CollapseIcon';

export type DefaultItem = {
  label: string;
  content: React.ReactNode;
  rightSide?: React.ReactNode | React.ReactNode[];
};

type CollapseGroupPropGetItemLabel<ITEM> = (item: ITEM) => string;
type CollapseGroupPropGetItemContent<ITEM> = (item: ITEM) => React.ReactNode;
type CollapseGroupPropGetItemRightSide<ITEM> = (
  item: ITEM,
) => React.ReactNode | React.ReactNode[] | undefined;

export type CollapseGroupProps<ITEM> = PropsWithHTMLAttributesAndRef<
  {
    items: ITEM[];
    children?: never;
    icon?: React.FC<IconProps>;
    divider?: boolean;
    size?: CollapsePropSize;
    view?: CollapsePropView;
    horizontalSpace?: CollapsePropHorizontalSpace;
    hoverEffect?: boolean;
  } & (
    | {
        isAccordion: true;
        opened?: number | null;
        onOpen?: (params: { value: number | null }) => void;
      }
    | {
        isAccordion?: false;
        opened?: number[] | null;
        onOpen?: (params: { value: number[] | null }) => void;
      }
  ) &
    (
      | {
          closeIcon: React.FC<IconProps>;
          directionIcon?: never;
          closeDirectionIcon?: never;
        }
      | {
          closeIcon?: never;
          directionIcon?: CollapseIconPropDirection;
          closeDirectionIcon?: CollapseIconPropDirection;
        }
    ) &
    (
      | {
          iconPosition?: 'left';
          getItemRightSide?: CollapseGroupPropGetItemRightSide<ITEM>;
        }
      | {
          iconPosition: 'right';
          getItemRightSide?: never;
        }
    ),
  HTMLDivElement
> &
  (ITEM extends { label: DefaultItem['label'] }
    ? { getItemLabel?: never }
    : { getItemLabel: CollapseGroupPropGetItemLabel<ITEM> }) &
  (ITEM extends { content: DefaultItem['content'] }
    ? { getItemContent?: never }
    : { getItemContent: CollapseGroupPropGetItemContent<ITEM> });

export const defaultGetItemLabel: CollapseGroupPropGetItemLabel<DefaultItem> = (item) => item.label;
export const defaultGetItemContent: CollapseGroupPropGetItemContent<DefaultItem> = (item) =>
  item.content;
export const defaultGetItemRightSide: CollapseGroupPropGetItemContent<DefaultItem> = (item) =>
  item.rightSide;

export type CollapseGroupComponent = <ITEM>(
  props: CollapseGroupProps<ITEM>,
) => React.ReactElement | null;

export type CollapseGroupRenderFunction = <ITEM>(
  props: CollapseGroupProps<ITEM>,
  ref: React.Ref<HTMLDivElement>,
) => React.ReactElement | null;

export function withDefaultGetters<ITEM>(props: CollapseGroupProps<ITEM>) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemContent: props.getItemContent || defaultGetItemContent,
    getItemRightSide: props.getItemRightSide || defaultGetItemRightSide,
  };
}

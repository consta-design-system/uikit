import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import {
  CollapseIconPropDirection,
  CollapsePropForm,
  CollapsePropHorizontalSpace,
  CollapsePropIconView,
  CollapsePropSize,
  CollapsePropView,
} from '##/components/Collapse';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type DefaultItem = {
  label: React.ReactNode;
  content: React.ReactNode;
  rightSide?: React.ReactNode | React.ReactNode[];
};

export type CollapseGroupPropOnOpen<IS_ACCORDION> = (params: {
  e: React.MouseEvent<HTMLDivElement, MouseEvent>;
  value: (IS_ACCORDION extends true ? number : number[]) | null;
}) => void;

export type CollapseGroupPropOpened<IS_ACCORDION> =
  | (IS_ACCORDION extends true ? number : number[])
  | null
  | undefined;

type CollapseGroupPropGetItemLabel<ITEM> = (item: ITEM) => React.ReactNode;
type CollapseGroupPropGetItemContent<ITEM> = (item: ITEM) => React.ReactNode;
type CollapseGroupPropGetItemRightSide<ITEM> = (
  item: ITEM,
) => React.ReactNode | React.ReactNode[] | undefined;

export type CollapseGroupProps<
  ITEM,
  IS_ACCORDION extends boolean,
> = PropsWithHTMLAttributesAndRef<
  {
    items: ITEM[];
    isAccordion?: IS_ACCORDION;
    children?: never;
    icon?: IconComponent;
    divider?: boolean;
    size?: CollapsePropSize;
    form?: CollapsePropForm;
    view?: CollapsePropView;
    horizontalSpace?: CollapsePropHorizontalSpace;
    hoverEffect?: boolean;
    onOpen?: CollapseGroupPropOnOpen<IS_ACCORDION>;
    opened?: CollapseGroupPropOpened<IS_ACCORDION>;
    getItemLabel?: CollapseGroupPropGetItemLabel<ITEM>;
    getItemContent?: CollapseGroupPropGetItemContent<ITEM>;
    iconView?: CollapsePropIconView;
  } & (
    | {
        closeIcon: IconComponent;
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
          iconPosition?: 'right';
          getItemRightSide?: never;
        }
    ),
  HTMLDivElement
> &
  (ITEM extends { label: DefaultItem['label'] }
    ? {}
    : { getItemLabel: CollapseGroupPropGetItemLabel<ITEM> }) &
  (ITEM extends { content: DefaultItem['content'] }
    ? {}
    : { getItemContent: CollapseGroupPropGetItemContent<ITEM> });

export const defaultGetItemLabel: CollapseGroupPropGetItemLabel<DefaultItem> = (
  item,
) => item.label;
export const defaultGetItemContent: CollapseGroupPropGetItemContent<
  DefaultItem
> = (item) => item.content;
export const defaultGetItemRightSide: CollapseGroupPropGetItemContent<
  DefaultItem
> = (item) => item.rightSide;

export type CollapseGroupComponent = <
  ITEM,
  IS_ACCORDION extends boolean = false,
>(
  props: CollapseGroupProps<ITEM, IS_ACCORDION>,
) => React.ReactElement | null;

export type CollapseGroupRenderFunction = <
  ITEM,
  IS_ACCORDION extends boolean = false,
>(
  props: CollapseGroupProps<ITEM, IS_ACCORDION>,
  ref: React.Ref<HTMLDivElement>,
) => React.ReactElement | null;

export function withDefaultGetters<ITEM, IS_ACCORDION extends boolean>(
  props: CollapseGroupProps<ITEM, IS_ACCORDION>,
) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemContent: props.getItemContent || defaultGetItemContent,
    getItemRightSide: props.getItemRightSide || defaultGetItemRightSide,
  };
}

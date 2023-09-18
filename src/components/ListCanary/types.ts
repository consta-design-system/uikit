import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React from 'react';

import { MixSpaceProps } from '##/mixs/MixSpace';
import { Group } from '##/utils/getGroups';
import { PropsWithAsAttributes } from '##/utils/types/PropsWithAsAttributes';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export const listPropSize = ['m', 'xs', 's', 'l'] as const;
export type ListPropSize = typeof listPropSize[number];
export const defaultListPropSize = listPropSize[0];

export const listPropInnerOffset = ['normal', 'increased'] as const;
export type ListPropInnerOffset = typeof listPropInnerOffset[number];
export const defaultListPropInnerOffset = listPropInnerOffset[0];

export const listPropStatus = ['alert', 'success', 'warning'] as const;
export type ListPropStatus = typeof listPropStatus[number];

export const listPropForm = ['default', 'brick', 'round'] as const;
export type ListPropForm = typeof listPropForm[number];
export const defaultListPropForm = listPropForm[0];

export type DefaultListGroup = {
  id: string | number;
  label?: string;
  rightSide?: React.ReactNode;
};

export type DefaultListItem = {
  label: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  checked?: boolean;
  status?: ListPropStatus;
  groupId?: string | number;
  leftSide?: React.ReactNode;
  leftIcon?: IconComponent;
  rightSide?: React.ReactNode;
  rightIcon?: IconComponent;
  onClick?: React.MouseEventHandler;
};

export type ListPropOnItemClick<ITEM> = (
  item: ITEM,
  params: {
    e: React.MouseEvent;
    item: ITEM;
  },
) => void;

export type ListPropRenderItem<ITEM> = (
  item: ITEM,
) => React.ReactElement | null;

// ITEMS

export type ListPropGetItemLabel<ITEM> = (item: ITEM) => React.ReactNode;

export type ListPropGetItemAdditionalClassName<ITEM> = (item: ITEM) => string;

export type ListPropGetItemDisabled<ITEM> = (item: ITEM) => boolean | undefined;

export type ListPropGetItemActive<ITEM> = (item: ITEM) => boolean | undefined;

export type ListPropGetItemChecked<ITEM> = (item: ITEM) => boolean | undefined;

export type ListPropGetItemStatus<ITEM> = (
  item: ITEM,
) => ListPropStatus | undefined;

export type ListPropGetItemGroupId<ITEM> = (
  item: ITEM,
) => string | number | undefined;

export type ListPropGetItemLeftSide<ITEM> = (
  item: ITEM,
) => React.ReactNode | undefined;

export type ListPropGetItemLeftIcon<ITEM> = (
  item: ITEM,
) => IconComponent | undefined;

export type ListPropGetItemRightSide<ITEM> = (
  item: ITEM,
) => React.ReactNode | undefined;

export type ListPropGetItemRightIcon<ITEM> = (
  item: ITEM,
) => IconComponent | undefined;

export type ListPropGetItemAs<ITEM> = (
  item: ITEM,
) => keyof JSX.IntrinsicElements | undefined;

export type ListPropGetItemAttributes<ITEM> = (
  item: ITEM,
) => JSX.IntrinsicElements[keyof JSX.IntrinsicElements] | undefined;

export type ListPropGetItemOnClick<ITEM> = (
  item: ITEM,
) => React.MouseEventHandler | undefined;

export type ListPropSortGroup<ITEM, GROUP> = (
  a: Group<ITEM, GROUP>,
  b: Group<ITEM, GROUP>,
) => number;

// GROUPS
export type ListPropGetGroupKey<GROUP> = (item: GROUP) => string | number;
export type ListPropGetGroupAdditionalClassName<GROUP> = (
  item: GROUP,
) => string;

export type ListPropGetGroupLabel<GROUP> = (item: GROUP) => string | undefined;
export type ListPropGetGroupRightSide<GROUP> = (
  item: GROUP,
) => React.ReactNode | undefined;

export type ListPropGetItemRef<ITEM> = (
  item: ITEM,
) => React.RefObject<HTMLElement> | undefined;

export type ListProps<ITEM = DefaultListItem, GROUP = DefaultListGroup> = {
  size?: ListPropSize;
  items: ITEM[];
  innerOffset?: ListPropInnerOffset;
  itemSpase?: MixSpaceProps;
  groupLabelSpase?: MixSpaceProps;
  dividerSpase?: MixSpaceProps;
  onItemClick?: ListPropOnItemClick<ITEM>;
  getItemLabel?: ListPropGetItemLabel<ITEM>;
  getItemDisabled?: ListPropGetItemDisabled<ITEM>;
  getItemActive?: ListPropGetItemActive<ITEM>;
  getItemChecked?: ListPropGetItemActive<ITEM>;
  getItemLeftSide?: ListPropGetItemLeftSide<ITEM>;
  getItemLeftIcon?: ListPropGetItemLeftIcon<ITEM>;
  getItemRightSide?: ListPropGetItemRightSide<ITEM>;
  getItemRightIcon?: ListPropGetItemRightIcon<ITEM>;
  getItemGroupKey?: ListPropGetItemGroupId<ITEM>;
  getItemOnClick?: ListPropGetItemOnClick<ITEM>;
  getItemStatus?: ListPropGetItemStatus<ITEM>;
  getItemAs?: ListPropGetItemAs<ITEM>;
  getItemAttributes?: ListPropGetItemAttributes<ITEM>;
  getItemRef?: ListPropGetItemRef<ITEM>;
  getItemAdditionalClassName?: ListPropGetItemAdditionalClassName<ITEM>;
  renderItem?: ListPropRenderItem<ITEM>;
  groups?: GROUP[];
  getGroupKey?: ListPropGetGroupKey<GROUP>;
  getGroupLabel?: ListPropGetGroupLabel<GROUP>;
  getGroupRightSide?: ListPropGetGroupRightSide<GROUP>;
  sortGroup?: ListPropSortGroup<ITEM, GROUP>;
  getGroupAdditionalClassName?: ListPropGetGroupAdditionalClassName<GROUP>;
  disabled?: boolean;
} & (ITEM extends { label: DefaultListItem['label'] }
  ? {}
  : { getItemLabel: ListPropGetItemLabel<ITEM> }) &
  (GROUP extends { id: DefaultListGroup['id'] }
    ? {}
    : { getGroupKey: ListPropGetGroupKey<GROUP> });

export type ListComponent = <ITEM = DefaultListItem, GROUP = DefaultListGroup>(
  props: ListProps<ITEM, GROUP>,
) => React.ReactElement | null;

export type ListItemProps<AS extends keyof JSX.IntrinsicElements = 'div'> =
  PropsWithAsAttributes<
    Omit<DefaultListItem, 'id' | 'groupId' | 'attributes' | 'onClick'> & {
      size?: ListPropSize;
      innerOffset?: 'normal' | 'increased';
      space?: MixSpaceProps;
      iconSize?: IconPropSize;
    },
    AS
  >;

export type ListItemComponent = <
  AS extends keyof JSX.IntrinsicElements = 'div',
>(
  props: ListItemProps<AS>,
) => React.ReactElement | null;

export type ListGroupLabelProps = PropsWithHTMLAttributesAndRef<
  {
    size?: ListPropSize;
    label: string;
    innerOffset?: ListPropInnerOffset;
    rightSide?: React.ReactNode;
    space?: MixSpaceProps;
  },
  HTMLDivElement
>;

export type ListDividerProps = PropsWithHTMLAttributesAndRef<
  {
    size?: ListPropSize;
    innerOffset?: ListPropInnerOffset;
    space?: MixSpaceProps;
  },
  HTMLDivElement
>;

export type ListBoxProps = PropsWithHTMLAttributesAndRef<
  {
    size?: ListPropSize;
    form?: ListPropForm;
    border?: boolean;
    shadow?: boolean;
  },
  HTMLDivElement
>;

export type ListAddItemProps = PropsWithHTMLAttributesAndRef<
  {
    size?: ListPropSize;
    label: React.ReactNode;
    innerOffset?: ListPropInnerOffset;
    active?: boolean;
    underLine?: boolean;
  },
  HTMLDivElement
>;

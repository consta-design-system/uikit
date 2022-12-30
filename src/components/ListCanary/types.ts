import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { PropsWithAsAttributes } from '##/utils/types/PropsWithAsAttributes';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export const listPropForm = ['default', 'brick', 'round'] as const;
export type ListPropForm = typeof listPropForm[number];
export const defaultListPropForm = listPropForm[0];

export const listPropSize = ['m', 'xs', 's', 'l'] as const;
export type ListPropSize = typeof listPropSize[number];
export const defaultListPropSize = listPropSize[0];

export type DefaultListGroup = {
  id: string | number;
  label: string;
  rightSide?: React.ReactNode;
};

export type DefaultListItem = {
  id: string | number;
  label: string;
  disabled?: boolean;
  active?: boolean;
  groupId?: string | number;
  leftSide?: React.ReactNode;
  leftIcon?: IconComponent;
  rightSide?: React.ReactNode;
  rightIcon?: IconComponent;
  onClick?: React.MouseEventHandler;
  as?: keyof JSX.IntrinsicElements;
  attributes?: JSX.IntrinsicElements[keyof JSX.IntrinsicElements];
};

export type ListPropOnItemClick<ITEM> = (params: {
  e: React.MouseEvent;
  item: ITEM;
}) => void;

export type ListPropRenderItem<ITEM> = (
  item: ITEM,
) => React.ReactElement | null;

// ITEMS
export type ListPropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type ListPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type ListPropGetItemDisabled<ITEM> = (item: ITEM) => boolean | undefined;
export type ListPropGetItemActive<ITEM> = (item: ITEM) => boolean | undefined;
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

// GROUPS
export type ListPropGetGroupKey<GROUP> = (item: GROUP) => string | number;
export type ListPropGetGroupLabel<GROUP> = (item: GROUP) => string;
export type ListPropGetGroupRightSide<GROUP> = (
  item: GROUP,
) => React.ReactNode | undefined;

export type ListProps<
  ITEM = DefaultListItem,
  GROUP = DefaultListGroup,
> = PropsWithHTMLAttributesAndRef<
  {
    size?: ListPropSize;
    form?: ListPropForm;
    items: ITEM[];
    onItemClick?: ListPropOnItemClick<ITEM>;
    getItemKey?: ListPropGetItemKey<ITEM>;
    getItemLabel?: ListPropGetItemLabel<ITEM>;
    getItemDisabled?: ListPropGetItemDisabled<ITEM>;
    getItemActive?: ListPropGetItemActive<ITEM>;
    getItemLeftSide?: ListPropGetItemLeftSide<ITEM>;
    getItemLeftIcon?: ListPropGetItemLeftIcon<ITEM>;
    getItemRightSide?: ListPropGetItemRightSide<ITEM>;
    getItemRightIcon?: ListPropGetItemRightIcon<ITEM>;
    getItemGroupKey?: ListPropGetItemGroupId<ITEM>;
    getItemOnClick?: ListPropGetItemOnClick<ITEM>;
    getItemAs?: ListPropGetItemAs<ITEM>;
    getItemAttributes?: ListPropGetItemAttributes<ITEM>;
    renderItem?: ListPropRenderItem<ITEM>;
    groups?: GROUP[];
    getGroupKey?: ListPropGetGroupKey<GROUP>;
    getGroupLabel?: ListPropGetGroupLabel<GROUP>;
    getGroupRightSide?: ListPropGetGroupRightSide<GROUP>;
    isLoading?: boolean;
    disabled?: boolean;
  },
  HTMLDivElement
> &
  (ITEM extends { label: DefaultListItem['label'] }
    ? {}
    : { getItemLabel: ListPropGetItemLabel<ITEM> }) &
  (ITEM extends { id: DefaultListItem['id'] }
    ? {}
    : { getItemKey: ListPropGetItemKey<ITEM> }) &
  (GROUP extends { label: DefaultListGroup['label'] }
    ? {}
    : { getGroupLabel: ListPropGetGroupLabel<GROUP> }) &
  (GROUP extends { id: DefaultListGroup['id'] }
    ? {}
    : { getGroupKey: ListPropGetGroupKey<GROUP> });

export type ListComponent = <ITEM = DefaultListItem, GROUP = DefaultListGroup>(
  props: ListProps<ITEM, GROUP>,
) => React.ReactElement | null;

export type ListItemProps<AS extends keyof JSX.IntrinsicElements = 'div'> =
  PropsWithAsAttributes<
    Omit<DefaultListItem, 'id' | 'groupId' | 'attributes' | 'onClick'> & {
      active?: boolean;
      size?: ListPropSize;
      indent?: 'normal' | 'increased';
    },
    AS
  > &
    React.RefAttributes<HTMLDivElement>;

export type ListItemComponent = <
  AS extends keyof JSX.IntrinsicElements = 'div',
>(
  props: ListItemProps<AS>,
  ref: React.Ref<HTMLElement>,
) => React.ReactElement | null;

export type ListGroupLabelProps = PropsWithHTMLAttributesAndRef<
  {
    size?: ListPropSize;
    label?: string;
    rightSide?: React.ReactNode;
  },
  HTMLDivElement
>;

export type ListAddItemProps = PropsWithHTMLAttributesAndRef<
  {
    size?: ListPropSize;
    label?: React.ReactNode;
    indent?: 'normal' | 'increased';
    disabled?: boolean;
  },
  HTMLDivElement
>;

export type ListWrapperProps = PropsWithHTMLAttributesAndRef<
  {
    size?: ListPropSize;
    form?: ListPropForm;
  },
  HTMLDivElement
>;

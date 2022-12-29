import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { RenderItemProps } from '../SelectComponents/types';

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
  groupId?: string | number;
  leftSide?: React.ReactNode;
  leftIcon?: IconComponent;
  rightSide?: React.ReactNode;
  rightIcon?: IconComponent;
};

export type ListPropValue<ITEM, MULTIPLE extends boolean> =
  | (MULTIPLE extends true ? ITEM[] : ITEM)
  | null
  | undefined;

export type ListPropOnChange<ITEM, MULTIPLE extends boolean> = (props: {
  value: (MULTIPLE extends true ? ITEM[] : ITEM) | null;
  e: React.SyntheticEvent;
}) => void;

export type ListPropRenderItem<ITEM> = (
  props: RenderItemProps<ITEM>,
) => React.ReactElement | null;

// ITEMS
export type ListPropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type ListPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type ListPropGetItemDisabled<ITEM> = (item: ITEM) => boolean | undefined;
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

// GROUPS
export type ListPropGetGroupKey<GROUP> = (item: GROUP) => string | number;
export type ListPropGetGroupLabel<GROUP> = (item: GROUP) => string;
export type ListPropGetGroupRightSide<GROUP> = (
  item: GROUP,
) => React.ReactNode | undefined;

export type ListProps<
  ITEM = DefaultListItem,
  GROUP = DefaultListGroup,
  MULTIPLE extends boolean = false,
> = PropsWithHTMLAttributesAndRef<
  {
    size?: ListPropSize;
    form?: ListPropForm;
    multiple?: MULTIPLE;
    value?: ListPropValue<ITEM, MULTIPLE>;
    onChange?: ListPropOnChange<ITEM, MULTIPLE>;
    items: ITEM[];
    getItemKey?: ListPropGetItemKey<ITEM>;
    getItemLabel?: ListPropGetItemLabel<ITEM>;
    getItemDisabled?: ListPropGetItemDisabled<ITEM>;
    getItemLeftSide?: ListPropGetItemLeftSide<ITEM>;
    getItemLeftIcon?: ListPropGetItemLeftIcon<ITEM>;
    getItemRightSide?: ListPropGetItemRightSide<ITEM>;
    getItemRightIcon?: ListPropGetItemRightIcon<ITEM>;
    getItemGroupKey?: ListPropGetItemGroupId<ITEM>;
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

export type ListComponent = <
  ITEM = DefaultListItem,
  GROUP = DefaultListGroup,
  MULTIPLE extends boolean = false,
>(
  props: ListProps<ITEM, GROUP, MULTIPLE>,
) => React.ReactElement | null;

export type ListItemProps = PropsWithHTMLAttributesAndRef<
  Omit<DefaultListItem, 'id' | 'groupId'> & {
    active?: boolean;
    hovered?: boolean;
    multiple?: boolean;
    size?: ListPropSize;
    indent?: 'normal' | 'increased';
  },
  HTMLDivElement
>;

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

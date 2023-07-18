import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import {
  PropForm,
  PropSize,
  PropStatus,
  PropView,
  RenderItemProps,
} from '../SelectComponents/types';

export type DefaultItem = {
  label: string;
  id: string | number;
  subLabel?: string;
  avatarUrl?: string;
  groupId?: string | number;
  disabled?: boolean;
};

export type DefaultGroup = {
  label: string;
  id: string | number;
};

type RenderValueProps<ITEM> = {
  item: ITEM;
  handleRemove?: (e: React.SyntheticEvent) => void;
};

export type PropGetItemLabel<ITEM> = (item: ITEM) => string;
export type PropGetItemSubLabel<ITEM> = (item: ITEM) => string | undefined;
export type PropGetItemAvatarUrl<ITEM> = (item: ITEM) => string | undefined;
export type PropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type PropGetItemGroupKey<ITEM> = (
  item: ITEM,
) => string | number | undefined;
export type PropGetItemDisabled<ITEM> = (item: ITEM) => boolean | undefined;
export type PropGetGroupKey<GROUP> = (group: GROUP) => string | number;
export type PropGetGroupLabel<GROUP> = (group: GROUP) => string;

type PropSearchFunction<ITEM> = (item: ITEM, searchValue: string) => boolean;
type PropOnChange<ITEM, MULTIPLE extends boolean> = (props: {
  value: (MULTIPLE extends true ? ITEM[] : ITEM) | null;
  e: React.SyntheticEvent;
}) => void;
type PropValue<ITEM, MULTIPLE extends boolean> =
  | (MULTIPLE extends true ? ITEM[] : ITEM)
  | null
  | undefined;

export type PropRenderItem<ITEM> = (
  props: RenderItemProps<ITEM>,
) => React.ReactElement | null;
export type PropRenderValue<ITEM> = (
  props: RenderValueProps<ITEM>,
) => React.ReactElement | null;

export type UserSelectProps<
  ITEM = DefaultItem,
  GROUP = DefaultGroup,
  MULTIPLE extends boolean = false,
> = PropsWithHTMLAttributesAndRef<
  {
    disabled?: boolean;
    form?: PropForm;
    size?: Exclude<PropSize, 'xs'>;
    view?: PropView;
    dropdownForm?: 'default' | 'brick' | 'round';
    placeholder?: string;
    ariaLabel?: string;
    dropdownClassName?: string;
    status?: PropStatus;
    dropdownRef?: React.RefObject<HTMLDivElement>;
    name?: string;
    items: ITEM[];
    required?: boolean;
    isLoading?: boolean;
    renderItem?: PropRenderItem<ITEM>;
    renderValue?: PropRenderValue<ITEM>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onCreate?: (props: { e: React.SyntheticEvent; label: string }) => void;
    inputRef?: React.RefObject<HTMLInputElement>;
    labelForNotFound?: string;
    labelForCreate?: string;
    labelForEmptyItems?: string;
    searchFunction?: PropSearchFunction<ITEM>;
    searchValue?: string;
    multiple?: MULTIPLE;
    value?: PropValue<ITEM, MULTIPLE>;
    onChange: PropOnChange<ITEM, MULTIPLE>;
    groups?: GROUP[];
    getItemLabel?: PropGetItemLabel<ITEM>;
    getItemSubLabel?: PropGetItemSubLabel<ITEM>;
    getItemAvatarUrl?: PropGetItemAvatarUrl<ITEM>;
    getItemKey?: PropGetItemKey<ITEM>;
    getItemGroupKey?: PropGetItemGroupKey<ITEM>;
    getItemDisabled?: PropGetItemDisabled<ITEM>;
    getGroupLabel?: PropGetGroupLabel<GROUP>;
    getGroupKey?: PropGetGroupKey<GROUP>;
    label?: string;
    labelIcon?: IconComponent;
    caption?: string;
    labelPosition?: 'top' | 'left';
  },
  HTMLDivElement
> &
  (ITEM extends { label: DefaultItem['label'] }
    ? {}
    : { getItemLabel: PropGetItemLabel<ITEM> }) &
  (ITEM extends { id: DefaultItem['id'] }
    ? {}
    : { getItemKey: PropGetItemKey<ITEM> }) &
  (GROUP extends { label: DefaultGroup['label'] }
    ? {}
    : { getGroupLabel: PropGetGroupLabel<GROUP> }) &
  (GROUP extends { id: DefaultGroup['id'] }
    ? {}
    : { getGroupKey: PropGetGroupKey<GROUP> });

export type UserSelectComponent = <
  ITEM = DefaultItem,
  GROUP = DefaultGroup,
  MULTIPLE extends boolean = false,
>(
  props: UserSelectProps<ITEM, GROUP, MULTIPLE>,
) => React.ReactElement | null;

export const defaultGetItemKey: PropGetItemKey<DefaultItem> = (item) => item.id;
export const defaultGetItemLabel: PropGetItemLabel<DefaultItem> = (item) =>
  item.label;
export const defaultGetItemSubLabel: PropGetItemSubLabel<DefaultItem> = (
  item,
) => item.subLabel;
export const defaultGetItemAvatarUrl: PropGetItemAvatarUrl<DefaultItem> = (
  item,
) => item.avatarUrl;
export const defaultGetItemGroupKey: PropGetItemGroupKey<DefaultItem> = (
  item,
) => item.groupId;
export const defaultGetItemDisabled: PropGetItemDisabled<DefaultItem> = (
  item,
) => item.disabled;

export const defaultGetGroupKey: PropGetGroupKey<DefaultGroup> = (group) =>
  group.id;
export const defaultGetGroupLabel: PropGetGroupLabel<DefaultGroup> = (group) =>
  group.label;

export const isMultipleParams = <ITEM, GROUP>(
  params: UserSelectProps<ITEM, GROUP, boolean>,
): params is UserSelectProps<ITEM, GROUP, true> => {
  return !!params.multiple;
};

export const isNotMultipleParams = <ITEM, GROUP>(
  params: UserSelectProps<ITEM, GROUP, boolean>,
): params is UserSelectProps<ITEM, GROUP, false> => {
  return !params.multiple;
};

export function withDefaultGetters<
  ITEM = DefaultItem,
  GROUP = DefaultGroup,
  MULTIPLE extends boolean = false,
>(props: UserSelectProps<ITEM, GROUP, MULTIPLE>) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemKey: props.getItemKey || defaultGetItemKey,
    getItemGroupKey: props.getItemGroupKey || defaultGetItemGroupKey,
    getItemDisabled: props.getItemDisabled || defaultGetItemDisabled,
    getGroupLabel: props.getGroupLabel || defaultGetGroupLabel,
    getGroupKey: props.getGroupKey || defaultGetGroupKey,
    getItemSubLabel: props.getItemSubLabel || defaultGetItemSubLabel,
    getItemAvatarUrl: props.getItemAvatarUrl || defaultGetItemAvatarUrl,
  };
}

export const searchCompare = (
  searchValue: string,
  compare?: string,
): boolean => {
  if (!compare) {
    return false;
  }

  return (
    compare.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1
  );
};

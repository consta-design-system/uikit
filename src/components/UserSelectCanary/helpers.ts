import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import {
  PropForm,
  PropSize,
  PropStatus,
  PropView,
  RenderItemProps,
} from '../SelectComponentsCanary/types';

export type UserSelectItemDefault = {
  label: string;
  id: string | number;
  subLabel?: string;
  avatarUrl?: string;
  groupId?: string | number;
  disabled?: boolean;
};

export type UserSelectGroupDefault = {
  label: string;
  id: string | number;
};

type UserSelectRenderValueProps<ITEM> = {
  item: ITEM;
  handleRemove?: (e: React.SyntheticEvent) => void;
};

export type UserSelectPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type UserSelectPropGetItemSubLabel<ITEM> = (
  item: ITEM,
) => string | undefined;
export type UserSelectPropGetItemAvatarUrl<ITEM> = (
  item: ITEM,
) => string | undefined;
export type UserSelectPropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type UserSelectPropGetItemGroupKey<ITEM> = (
  item: ITEM,
) => string | number | undefined;
export type UserSelectPropGetItemDisabled<ITEM> = (
  item: ITEM,
) => boolean | undefined;
export type UserSelectPropGetGroupKey<GROUP> = (
  group: GROUP,
) => string | number;
export type UserSelectPropGetGroupLabel<GROUP> = (group: GROUP) => string;

type UserSelectPropSearchFunction<ITEM> = (
  item: ITEM,
  searchValue: string,
) => boolean;
type UserSelectPropOnChange<ITEM, MULTIPLE extends boolean> = (
  value: (MULTIPLE extends true ? ITEM[] : ITEM) | null,
  props: {
    e: React.SyntheticEvent;
    value: (MULTIPLE extends true ? ITEM[] : ITEM) | null;
  },
) => void;
type UserSelectPropValue<ITEM, MULTIPLE extends boolean> =
  | (MULTIPLE extends true ? ITEM[] : ITEM)
  | null
  | undefined;

export type UserSelectPropRenderItem<ITEM> = (
  props: RenderItemProps<ITEM>,
) => React.ReactElement | null;
export type UserSelectPropRenderValue<ITEM> = (
  props: UserSelectRenderValueProps<ITEM>,
) => React.ReactElement | null;

export type UserSelectProps<
  ITEM = UserSelectItemDefault,
  GROUP = UserSelectGroupDefault,
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
    renderItem?: UserSelectPropRenderItem<ITEM>;
    renderValue?: UserSelectPropRenderValue<ITEM>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onCreate?: (label: string, props: { e: React.SyntheticEvent }) => void;
    inputRef?: React.RefObject<HTMLInputElement>;
    labelForNotFound?: string;
    labelForCreate?: string;
    labelForEmptyItems?: string;
    searchFunction?: UserSelectPropSearchFunction<ITEM>;
    searchValue?: string;
    multiple?: MULTIPLE;
    value?: UserSelectPropValue<ITEM, MULTIPLE>;
    onChange: UserSelectPropOnChange<ITEM, MULTIPLE>;
    groups?: GROUP[];
    getItemLabel?: UserSelectPropGetItemLabel<ITEM>;
    getItemSubLabel?: UserSelectPropGetItemSubLabel<ITEM>;
    getItemAvatarUrl?: UserSelectPropGetItemAvatarUrl<ITEM>;
    getItemKey?: UserSelectPropGetItemKey<ITEM>;
    getItemGroupKey?: UserSelectPropGetItemGroupKey<ITEM>;
    getItemDisabled?: UserSelectPropGetItemDisabled<ITEM>;
    getGroupLabel?: UserSelectPropGetGroupLabel<GROUP>;
    getGroupKey?: UserSelectPropGetGroupKey<GROUP>;
    label?: string;
    labelIcon?: IconComponent;
    caption?: string;
    labelPosition?: 'top' | 'left';
    virtualScroll?: boolean;
    onScrollToBottom?: () => void;
    onSearchValueChange?: (value: string) => void;
    onDropdownOpen?: (isOpen: boolean) => void;
    dropdownOpen?: boolean;
    ignoreOutsideClicksRefs?: ReadonlyArray<React.RefObject<HTMLElement>>;
  },
  HTMLDivElement
> &
  (ITEM extends { label: UserSelectItemDefault['label'] }
    ? {}
    : { getItemLabel: UserSelectPropGetItemLabel<ITEM> }) &
  (ITEM extends { id: UserSelectItemDefault['id'] }
    ? {}
    : { getItemKey: UserSelectPropGetItemKey<ITEM> }) &
  (GROUP extends { label: UserSelectGroupDefault['label'] }
    ? {}
    : { getGroupLabel: UserSelectPropGetGroupLabel<GROUP> }) &
  (GROUP extends { id: UserSelectGroupDefault['id'] }
    ? {}
    : { getGroupKey: UserSelectPropGetGroupKey<GROUP> });

export type UserSelectComponent = <
  ITEM = UserSelectItemDefault,
  GROUP = UserSelectGroupDefault,
  MULTIPLE extends boolean = false,
>(
  props: UserSelectProps<ITEM, GROUP, MULTIPLE>,
) => React.ReactElement | null;

export const defaultGetItemKey: UserSelectPropGetItemKey<
  UserSelectItemDefault
> = (item) => item.id;
export const defaultGetItemLabel: UserSelectPropGetItemLabel<
  UserSelectItemDefault
> = (item) => item.label;
export const defaultGetItemSubLabel: UserSelectPropGetItemSubLabel<
  UserSelectItemDefault
> = (item) => item.subLabel;
export const defaultGetItemAvatarUrl: UserSelectPropGetItemAvatarUrl<
  UserSelectItemDefault
> = (item) => item.avatarUrl;
export const defaultGetItemGroupKey: UserSelectPropGetItemGroupKey<
  UserSelectItemDefault
> = (item) => item.groupId;
export const defaultGetItemDisabled: UserSelectPropGetItemDisabled<
  UserSelectItemDefault
> = (item) => item.disabled;

export const defaultGetGroupKey: UserSelectPropGetGroupKey<
  UserSelectGroupDefault
> = (group) => group.id;
export const defaultGetGroupLabel: UserSelectPropGetGroupLabel<
  UserSelectGroupDefault
> = (group) => group.label;

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
  ITEM = UserSelectItemDefault,
  GROUP = UserSelectGroupDefault,
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

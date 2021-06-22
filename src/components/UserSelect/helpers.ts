import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import { PropForm, PropSize, PropView, RenderItemProps } from '../SelectComponents/types';

export type DefaultItem = {
  label: string;
  subLabel?: string;
  avatarUrl?: string;
  id: string | number;
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

type PropGetItemLabel<ITEM> = (item: ITEM) => string;
type PropGetItemSubLabel<ITEM> = (item: ITEM) => string | undefined;
type PropGetItemAvatarUrl<ITEM> = (item: ITEM) => string | undefined;
type PropGetItemKey<ITEM> = (item: ITEM) => string | number;
type PropGetItemGroupKey<ITEM> = (item: ITEM) => string | number | undefined;
type PropgetItemDisabled<ITEM> = (item: ITEM) => boolean | undefined;
type PropGetGroupKey<GROUP> = (group: GROUP) => string | number;
type PropGetGroupLabel<GROUP> = (group: GROUP) => string;
type PropSearchFunction<ITEM> = (item: ITEM, searchValue: string) => boolean;
type PropOnChange<ITEM, MULTIPLE extends boolean> = (props: {
  value: (MULTIPLE extends true ? ITEM[] : ITEM) | null;
  e: React.SyntheticEvent;
}) => void;
type PropValue<ITEM, MULTIPLE extends boolean> =
  | (MULTIPLE extends true ? ITEM[] : ITEM)
  | null
  | undefined;

export type PropRenderItem<ITEM> = (props: RenderItemProps<ITEM>) => React.ReactElement | null;
export type PropRenderValue<ITEM> = (props: RenderValueProps<ITEM>) => React.ReactElement | null;

export type UserSelectProps<ITEM, GROUP, MULTIPLE extends boolean> = PropsWithHTMLAttributesAndRef<
  {
    disabled?: boolean;
    form?: PropForm;
    size?: Exclude<PropSize, 'xs'>;
    view?: PropView;
    placeholder?: string;
    ariaLabel?: string;
    dropdownClassName?: string;
    dropdownRef?: React.RefObject<HTMLDivElement>;
    name?: string;
    items: ITEM[];
    renderItem?: PropRenderItem<ITEM>;
    renderValue?: PropRenderValue<ITEM>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onCreate?: (props: { e: React.SyntheticEvent; label: string }) => void;
    inputRef?: React.RefObject<HTMLInputElement>;
    labelForNotFound?: string;
    labelForCreate?: string;
    searchFunction?: PropSearchFunction<ITEM>;
    multiple?: MULTIPLE;
    value?: PropValue<ITEM, MULTIPLE>;
    onChange: PropOnChange<ITEM, MULTIPLE>;
    groups?: GROUP[];
  },
  HTMLDivElement
> &
  (ITEM extends DefaultItem
    ? {
        getItemLabel?: PropGetItemLabel<ITEM>;
        getItemSubLabel?: PropGetItemSubLabel<ITEM>;
        getItemAvatarUrl?: PropGetItemAvatarUrl<ITEM>;
        getItemKey?: PropGetItemKey<ITEM>;
        getItemGroupKey?: PropGetItemGroupKey<ITEM>;
        getItemDisabled?: PropgetItemDisabled<ITEM>;
        customItemType?: never;
      }
    : {
        getItemLabel: PropGetItemLabel<ITEM>;
        getItemSubLabel: PropGetItemSubLabel<ITEM>;
        getItemAvatarUrl: PropGetItemAvatarUrl<ITEM>;
        getItemKey: PropGetItemKey<ITEM>;
        getItemGroupKey: PropGetItemGroupKey<ITEM>;
        getItemDisabled: PropgetItemDisabled<ITEM>;
        customItemType: true;
      }) &
  (GROUP extends DefaultGroup
    ? {
        getGroupLabel?: PropGetGroupLabel<GROUP>;
        getGroupKey?: PropGetGroupKey<GROUP>;
        customGroupType?: never;
      }
    : {
        getGroupLabel: PropGetGroupLabel<GROUP>;
        getGroupKey: PropGetGroupKey<GROUP>;
        customGroupType: true;
      });

export const defaultGetItemKey: PropGetItemKey<DefaultItem> = (item) => item.id;
export const defaultGetItemLabel: PropGetItemLabel<DefaultItem> = (item) => item.label;
export const defaultGetItemSubLabel: PropGetItemSubLabel<DefaultItem> = (item) => item.subLabel;
export const defaultGetItemAvatarUrl: PropGetItemAvatarUrl<DefaultItem> = (item) => item.avatarUrl;
export const defaultGetItemGroupKey: PropGetItemGroupKey<DefaultItem> = (item) => item.groupId;
export const defaultGetItemDisabled: PropgetItemDisabled<DefaultItem> = (item) => item.disabled;

export const defaultGetGroupKey: PropGetGroupKey<DefaultGroup> = (group) => group.id;
export const defaultGetGroupLabel: PropGetGroupLabel<DefaultGroup> = (group) => group.label;

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

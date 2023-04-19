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
import { TextFieldPropOnChange } from '../TextField/TextField';

export type DefaultItem = {
  label: string;
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

export type PropGetItemLabel<ITEM> = (item: ITEM) => string;
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

export type ComboboxProps<
  ITEM = DefaultItem,
  GROUP = DefaultGroup,
  MULTIPLE extends boolean = false,
> = PropsWithHTMLAttributesAndRef<
  {
    items: ITEM[];
    onChange: PropOnChange<ITEM, MULTIPLE>;
    disabled?: boolean;
    form?: PropForm;
    dropdownForm?: 'default' | 'brick' | 'round';
    size?: PropSize;
    view?: PropView;
    placeholder?: string;
    ariaLabel?: string;
    status?: PropStatus;
    isLoading?: boolean;
    dropdownClassName?: string;
    dropdownRef?: React.Ref<HTMLDivElement>;
    name?: string;
    renderItem?: PropRenderItem<ITEM>;
    renderValue?: PropRenderValue<ITEM>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onCreate?: (props: { e: React.SyntheticEvent; label: string }) => void;
    inputRef?: React.Ref<HTMLInputElement>;
    labelForNotFound?: string;
    required?: boolean;
    labelForCreate?: string;
    labelForEmptyItems?: string;
    searchFunction?: PropSearchFunction<ITEM>;
    searchValue?: string;
    multiple?: MULTIPLE;
    value?: PropValue<ITEM, MULTIPLE>;
    groups?: GROUP[];
    onInputChange?: TextFieldPropOnChange;
    getItemLabel?: PropGetItemLabel<ITEM>;
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
  (MULTIPLE extends true
    ? {
        selectAll?: boolean;
      }
    : {
        selectAll?: never;
      }) &
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

export type ComboboxComponent = <
  ITEM = DefaultItem,
  GROUP = DefaultGroup,
  MULTIPLE extends boolean = false,
>(
  props: ComboboxProps<ITEM, GROUP, MULTIPLE>,
) => React.ReactElement | null;

export const defaultGetItemKey: PropGetItemKey<DefaultItem> = (item) => item.id;
export const defaultGetItemLabel: PropGetItemLabel<DefaultItem> = (item) =>
  item.label;
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
  params: ComboboxProps<ITEM, GROUP, boolean>,
): params is ComboboxProps<ITEM, GROUP, true> => {
  return !!params.multiple;
};

export const isNotMultipleParams = <ITEM, GROUP>(
  params: ComboboxProps<ITEM, GROUP, boolean>,
): params is ComboboxProps<ITEM, GROUP, false> => {
  return !params.multiple;
};

export function withDefaultGetters<
  ITEM = DefaultItem,
  GROUP = DefaultGroup,
  MULTIPLE extends boolean = false,
>(props: ComboboxProps<ITEM, GROUP, MULTIPLE>) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemKey: props.getItemKey || defaultGetItemKey,
    getItemGroupKey: props.getItemGroupKey || defaultGetItemGroupKey,
    getItemDisabled: props.getItemDisabled || defaultGetItemDisabled,
    getGroupLabel: props.getGroupLabel || defaultGetGroupLabel,
    getGroupKey: props.getGroupKey || defaultGetGroupKey,
  };
}

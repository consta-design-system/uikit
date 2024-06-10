import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import {
  PropForm,
  PropSize,
  PropStatus,
  PropView,
  RenderItemProps,
} from '../SelectComponents/types';

export type SelectItemDefault = {
  label: string;
  id: string | number;
  groupId?: string | number;
  disabled?: boolean;
};

export type SelectGroupDefault = {
  label: string;
  id: string | number;
};

type SelectPropValue<ITEM> = ITEM | null | undefined;

type SelectRenderValueProps<ITEM> = {
  item: ITEM;
};

export type SelectPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type SelectPropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type SelectPropGetItemGroupKey<ITEM> = (
  item: ITEM,
) => string | number | undefined;
export type SelectPropGetItemDisabled<ITEM> = (
  item: ITEM,
) => boolean | undefined;
export type SelectPropGetGroupKey<GROUP> = (group: GROUP) => string | number;
export type SelectPropGetGroupLabel<GROUP> = (group: GROUP) => string;
export type PropRenderItem<ITEM> = (
  props: RenderItemProps<ITEM>,
) => React.ReactElement | null;
export type PropRenderValue<ITEM> = (
  props: SelectRenderValueProps<ITEM>,
) => React.ReactElement | null;

export type SelectPropOnChange<ITEM> = (
  value: ITEM | null,
  props: { e: React.SyntheticEvent },
) => void;

export type SelectProps<
  ITEM = SelectItemDefault,
  GROUP = SelectGroupDefault,
> = PropsWithHTMLAttributesAndRef<
  {
    items: ITEM[];
    onChange: SelectPropOnChange<ITEM>;
    disabled?: boolean;
    form?: PropForm;
    dropdownForm?: 'default' | 'brick' | 'round';
    size?: PropSize;
    view?: PropView;
    status?: PropStatus;
    focused?: boolean;
    placeholder?: string;
    ariaLabel?: string;
    dropdownClassName?: string;
    dropdownRef?: React.RefObject<HTMLDivElement>;
    required?: boolean;
    name?: string;
    isLoading?: boolean;
    labelForEmptyItems?: string;
    value?: SelectPropValue<ITEM>;
    renderItem?: PropRenderItem<ITEM>;
    renderValue?: PropRenderValue<ITEM>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    inputRef?: React.RefObject<HTMLInputElement>;
    groups?: GROUP[];
    getItemLabel?: SelectPropGetItemLabel<ITEM>;
    getItemKey?: SelectPropGetItemKey<ITEM>;
    getItemGroupKey?: SelectPropGetItemGroupKey<ITEM>;
    getItemDisabled?: SelectPropGetItemDisabled<ITEM>;
    getGroupLabel?: SelectPropGetGroupLabel<GROUP>;
    getGroupKey?: SelectPropGetGroupKey<GROUP>;
    label?: string;
    labelIcon?: IconComponent;
    labelPosition?: 'top' | 'left';
    caption?: string;
    virtualScroll?: boolean;
    onScrollToBottom?: (lenght: number) => void;
    onDropdownOpen?: (isOpen: boolean) => void;
    dropdownOpen?: boolean;
    ignoreOutsideClicksRefs?: ReadonlyArray<React.RefObject<HTMLElement>>;
  },
  HTMLDivElement
> &
  (ITEM extends { label: SelectItemDefault['label'] }
    ? {}
    : { getItemLabel: SelectPropGetItemLabel<ITEM> }) &
  (ITEM extends { id: SelectItemDefault['id'] }
    ? {}
    : { getItemKey: SelectPropGetItemKey<ITEM> }) &
  (GROUP extends { label: SelectGroupDefault['label'] }
    ? {}
    : { getGroupLabel: SelectPropGetGroupLabel<GROUP> }) &
  (GROUP extends { id: SelectGroupDefault['id'] }
    ? {}
    : { getGroupKey: SelectPropGetGroupKey<GROUP> });

export type SelectComponent = <
  ITEM = SelectItemDefault,
  GROUP = SelectGroupDefault,
>(
  props: SelectProps<ITEM, GROUP>,
) => React.ReactElement | null;

export const defaultGetItemKey: SelectPropGetItemKey<SelectItemDefault> = (
  item,
) => item.id;
export const defaultGetItemLabel: SelectPropGetItemLabel<SelectItemDefault> = (
  item,
) => item.label;
export const defaultGetItemGroupKey: SelectPropGetItemGroupKey<
  SelectItemDefault
> = (item) => item.groupId;
export const defaultGetItemDisabled: SelectPropGetItemDisabled<
  SelectItemDefault
> = (item) => item.disabled;

export const defaultGetGroupKey: SelectPropGetGroupKey<SelectGroupDefault> = (
  group,
) => group.id;
export const defaultGetGroupLabel: SelectPropGetGroupLabel<
  SelectGroupDefault
> = (group) => group.label;

export function withDefaultGetters<ITEM, GROUP>(
  props: SelectProps<ITEM, GROUP>,
) {
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

export const iconSizeMap: Record<PropSize, IconPropSize> = {
  xs: 'xs',
  s: 's',
  m: 'm',
  l: 'm',
};

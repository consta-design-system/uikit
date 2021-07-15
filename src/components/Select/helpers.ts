import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import { PropForm, PropSize, PropView, RenderItemProps } from '../SelectComponents/types';

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

type PropValue<ITEM> = ITEM | null | undefined;

type RenderValueProps<ITEM> = {
  item: ITEM;
};

export type PropGetItemLabel<ITEM> = (item: ITEM) => string;
export type PropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type PropGetItemGroupKey<ITEM> = (item: ITEM) => string | number | undefined;
export type PropGetItemDisabled<ITEM> = (item: ITEM) => boolean | undefined;
export type PropGetGroupKey<GROUP> = (group: GROUP) => string | number;
export type PropGetGroupLabel<GROUP> = (group: GROUP) => string;
export type PropRenderItem<ITEM> = (props: RenderItemProps<ITEM>) => React.ReactElement | null;
export type PropRenderValue<ITEM> = (props: RenderValueProps<ITEM>) => React.ReactElement | null;

export type SelectProps<ITEM = DefaultItem, GROUP = DefaultGroup> = PropsWithHTMLAttributesAndRef<
  {
    items: ITEM[];
    onChange: (props: { value: ITEM | null; e: React.SyntheticEvent }) => void;
    disabled?: boolean;
    form?: PropForm;
    size?: PropSize;
    view?: PropView;
    focused?: boolean;
    multiple?: boolean;
    placeholder?: string;
    ariaLabel?: string;
    dropdownClassName?: string;
    dropdownRef?: React.RefObject<HTMLDivElement>;
    name?: string;
    value?: PropValue<ITEM>;
    renderItem?: PropRenderItem<ITEM>;
    renderValue?: PropRenderValue<ITEM>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    inputRef?: React.RefObject<HTMLInputElement>;
    groups?: GROUP[];
    getItemLabel?: PropGetItemLabel<ITEM>;
    getItemKey?: PropGetItemKey<ITEM>;
    getItemGroupKey?: PropGetItemGroupKey<ITEM>;
    getItemDisabled?: PropGetItemDisabled<ITEM>;
    getGroupLabel?: PropGetGroupLabel<GROUP>;
    getGroupKey?: PropGetGroupKey<GROUP>;
  },
  HTMLDivElement
> &
  (ITEM extends { label: DefaultItem['label'] } ? {} : { getItemLabel: PropGetItemLabel<ITEM> }) &
  (ITEM extends { id: DefaultItem['id'] } ? {} : { getItemKey: PropGetItemKey<ITEM> }) &
  (GROUP extends { label: DefaultGroup['label'] }
    ? {}
    : { getGroupLabel: PropGetGroupLabel<GROUP> }) &
  (GROUP extends { id: DefaultGroup['id'] } ? {} : { getGroupKey: PropGetGroupKey<GROUP> });

export type SelectComponent = <ITEM = DefaultItem, GROUP = DefaultGroup>(
  props: SelectProps<ITEM, GROUP>,
) => React.ReactElement | null;

export const defaultGetItemKey: PropGetItemKey<DefaultItem> = (item) => item.id;
export const defaultGetItemLabel: PropGetItemLabel<DefaultItem> = (item) => item.label;
export const defaultGetItemGroupKey: PropGetItemGroupKey<DefaultItem> = (item) => item.groupId;
export const defaultGetItemDisabled: PropGetItemDisabled<DefaultItem> = (item) => item.disabled;

export const defaultGetGroupKey: PropGetGroupKey<DefaultGroup> = (group) => group.id;
export const defaultGetGroupLabel: PropGetGroupLabel<DefaultGroup> = (group) => group.label;

export function withDefaultGetters<ITEM, GROUP>(props: SelectProps<ITEM, GROUP>) {
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

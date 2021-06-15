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

type PropGetItemLabel<ITEM> = (item: ITEM) => string;
type PropGetItemKey<ITEM> = (item: ITEM) => string | number;
type PropGetItemGroupKey<ITEM> = (item: ITEM) => string | number | undefined;
type PropgetItemDisabled<ITEM> = (item: ITEM) => boolean | undefined;
type PropGetGroupKey<GROUP> = (group: GROUP) => string | number;
type PropGetGroupLabel<GROUP> = (group: GROUP) => string;
export type PropRenderItem<ITEM> = (props: RenderItemProps<ITEM>) => React.ReactElement | null;
export type PropRenderValue<ITEM> = (props: RenderValueProps<ITEM>) => React.ReactElement | null;

export type SelectProps<ITEM = DefaultItem, GROUP = DefaultGroup> = PropsWithHTMLAttributesAndRef<
  {
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
    items: ITEM[];
    value?: PropValue<ITEM>;
    onChange: (props: { value: ITEM | null; e: React.SyntheticEvent }) => void;
    renderItem?: PropRenderItem<ITEM>;
    renderValue?: PropRenderValue<ITEM>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    inputRef?: React.RefObject<HTMLInputElement>;
  },
  HTMLDivElement
> &
  (ITEM extends DefaultItem
    ? {
        getItemLabel?: PropGetItemLabel<ITEM>;
        getItemKey?: PropGetItemKey<ITEM>;
        getItemGroupKey?: PropGetItemGroupKey<ITEM>;
        getItemDisabled?: PropgetItemDisabled<ITEM>;
      }
    : {
        getItemLabel: PropGetItemLabel<ITEM>;
        getItemKey: PropGetItemKey<ITEM>;
        getItemGroupKey: PropGetItemGroupKey<ITEM>;
        getItemDisabled: PropgetItemDisabled<ITEM>;
      }) &
  (
    | ({
        groups: GROUP[];
      } & (GROUP extends DefaultGroup
        ? {
            getGroupLabel?: PropGetGroupLabel<GROUP>;
            getGroupKey?: PropGetGroupKey<GROUP>;
          }
        : {
            getGroupLabel: PropGetGroupLabel<GROUP>;
            getGroupKey: PropGetGroupKey<GROUP>;
          }))
    | {
        groups?: never;
        getGroupLabel?: never;
        getGroupKey?: never;
      }
  );

export type SelectComponentType = <ITEM = DefaultItem, GROUP = DefaultGroup>(
  props: SelectProps<ITEM, GROUP>,
) => React.ReactElement | null;

export const defaultGetItemKey: PropGetItemKey<DefaultItem> = (item) => item.id;
export const defaultGetItemLabel: PropGetItemLabel<DefaultItem> = (item) => item.label;
export const defaultGetItemGroupKey: PropGetItemGroupKey<DefaultItem> = (item) => item.groupId;
export const defaultgetItemDisabled: PropgetItemDisabled<DefaultItem> = (item) => item.disabled;

export const defaultGetGroupKey: PropGetGroupKey<DefaultGroup> = (group) => group.id;
export const defaultGetGroupLabel: PropGetGroupLabel<DefaultGroup> = (group) => group.label;

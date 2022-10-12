import React from 'react';

import { PropRenderItem } from '../Select';
import { TextFieldProps } from '../TextField';

export type AutoCompleteItemDefault = {
  id: string | number;
  label: string;
  groupId?: number;
};

export type AutoCompleteGroupDefault = {
  label: string;
  id: number | string;
};

export type AutoCompletePropDropdownForm = 'default' | 'brick' | 'round';

export type AutoCompletePropGetItemLabel<ITEM> = (item: ITEM) => string;
export type AutoCompletePropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type AutoCompletePropGetItemGroupId<ITEM> = (
  item: ITEM,
) => number | undefined;
export type AutoCompletePropGetGroupLabel<GROUP> = (group: GROUP) => string;
export type AutoCompletePropGetGroupId<GROUP> = (
  group: GROUP,
) => number | string;

export type MappersItem<ITEM> = {
  getItemLabel?: AutoCompletePropGetItemLabel<ITEM>;
  getItemKey?: AutoCompletePropGetItemKey<ITEM>;
  getItemGroupKey?: AutoCompletePropGetItemGroupId<ITEM>;
};

export type AutoCompletePropSearchFunction<ITEM> = (
  item: ITEM,
  searchValue: string,
) => boolean;

export type MappersGroup<GROUP> = {
  getGroupLabel?: AutoCompletePropGetGroupLabel<GROUP>;
  getGroupKey?: AutoCompletePropGetGroupId<GROUP>;
};

export type AutoCompleteProps<
  TYPE extends string,
  ITEM = AutoCompleteItemDefault,
  GROUP = AutoCompleteGroupDefault,
> = {
  items: ITEM[];
  groups?: GROUP[];
  renderItem?: PropRenderItem<ITEM>;
  dropdownClassName?: string;
  dropdownForm?: AutoCompletePropDropdownForm;
  isLoading?: boolean;
  searchFunction?: AutoCompletePropSearchFunction<ITEM>;
  dropdownRef?: React.RefObject<HTMLDivElement>;
  labelForNotFound?: string;
  labelForEmptyItems?: string;
} & MappersGroup<GROUP> &
  MappersItem<ITEM> &
  Omit<TextFieldProps<TYPE>, 'max' | 'min' | 'step' | 'incrementButtons'> &
  (ITEM extends { label: AutoCompleteItemDefault['label'] }
    ? {}
    : {
        getItemLabel: AutoCompletePropGetItemLabel<ITEM>;
      }) &
  (ITEM extends { id: AutoCompleteItemDefault['id'] }
    ? {}
    : { getItemKey: AutoCompletePropGetItemKey<ITEM> }) &
  (GROUP extends { label: AutoCompleteGroupDefault['label'] }
    ? {}
    : { getGroupLabel: AutoCompletePropGetGroupLabel<GROUP> }) &
  (GROUP extends { id: AutoCompleteGroupDefault['id'] }
    ? {}
    : { getGroupKey: AutoCompletePropGetGroupId<GROUP> });

export type AutoCompleteComponent = <
  TYPE extends string,
  ITEM = AutoCompleteItemDefault,
  GROUP = AutoCompleteGroupDefault,
>(
  props: AutoCompleteProps<TYPE, ITEM, GROUP>,
) => React.ReactElement | null;

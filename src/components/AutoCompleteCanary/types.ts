import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React from 'react';

import {
  FieldPropForm,
  FieldPropSize,
  FieldPropStatus,
  FieldPropView,
} from '##/components/FieldComponents';
import { PropRenderItem } from '##/components/Select';
import {
  TextFieldPropRenderValueItem,
  TextFieldProps,
} from '##/components/TextFieldCanary';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

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

export type AutoCompletePropSearchFunction<ITEM> = (
  item: ITEM,
  searchValue: string,
) => boolean;

// export type AutoCompletePropOnChange = (
//   value: string | null,
//   props: {
//     e: React.ChangeEvent | React.MouseEvent | React.KeyboardEvent;
//     id?: string;
//     name?: string;
//   },
// ) => void;

export type AutoCompletePropValue<MUTIPLE> = MUTIPLE extends true
  ? string[] | null
  : string | null;

export type AutoCompletePropOnChange<MUTIPLE> = (
  value: AutoCompletePropValue<MUTIPLE>,
  params: {
    e: React.ChangeEvent | React.MouseEvent | React.KeyboardEvent;
  },
) => void;

export type AutoCompleteProps<
  MUTIPLE extends boolean = false,
  ITEM = AutoCompleteItemDefault,
  GROUP = AutoCompleteGroupDefault,
> = PropsWithHTMLAttributesAndRef<
  {
    multiple: MUTIPLE;
    items: ITEM[];
    groups?: GROUP[];
    renderItem?: PropRenderItem<ITEM>;
    dropdownClassName?: string;
    dropdownForm?: AutoCompletePropDropdownForm;
    isLoading?: boolean;
    searchFunction?: AutoCompletePropSearchFunction<ITEM>;
    dropdownRef?: React.RefObject<HTMLDivElement>;
    getItemLabel?: AutoCompletePropGetItemLabel<ITEM>;
    getItemKey?: AutoCompletePropGetItemKey<ITEM>;
    getItemGroupKey?: AutoCompletePropGetItemGroupId<ITEM>;
    getGroupLabel?: AutoCompletePropGetGroupLabel<GROUP>;
    getGroupKey?: AutoCompletePropGetGroupId<GROUP>;
    virtualScroll?: boolean;
    onScrollToBottom?: (lenght: number) => void;
    onDropdownOpen?: (isOpen: boolean) => void;
    dropdownOpen?: boolean;
    ignoreOutsideClicksRefs?: ReadonlyArray<React.RefObject<HTMLElement>>;
    value?: AutoCompletePropValue<MUTIPLE>;
    className?: string;
    onChange?: AutoCompletePropOnChange<MUTIPLE>;
    id?: string;
    name?: string;
    disabled?: boolean;
    mixLength?: number;
    maxLength?: number;
    size?: FieldPropSize;
    view?: FieldPropView;
    form?: FieldPropForm;
    status?: FieldPropStatus;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    autoFocus?: boolean;
    placeholder?: string;
    leftSide?: string | IconComponent;
    rightSide?: string | IconComponent;
    withClearButton?: boolean;
    readOnly?: boolean;
    required?: boolean;
    tabIndex?: number;
    ariaLabel?: string;
    iconSize?: IconPropSize;
    children?: never;
    onClear?: React.MouseEventHandler<HTMLButtonElement>;
    inputRef?: React.Ref<HTMLInputElement>;
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
    onKeyUpCapture?: React.KeyboardEventHandler<HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    onKeyDownCapture?: React.KeyboardEventHandler<HTMLInputElement>;
    onCopy?: React.ClipboardEventHandler<HTMLInputElement>;
    onCopyCapture?: React.ClipboardEventHandler<HTMLInputElement>;
    onCut?: React.ClipboardEventHandler<HTMLInputElement>;
    onCutCapture?: React.ClipboardEventHandler<HTMLInputElement>;
    onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
    onPasteCapture?: React.ClipboardEventHandler<HTMLInputElement>;
    renderValueItem?: MUTIPLE extends true
      ? TextFieldPropRenderValueItem
      : never;
    inputValue?: MUTIPLE extends true ? string | null : never;
    onInputChange?: MUTIPLE extends true
      ? AutoCompletePropOnChange<false>
      : never;
  },
  HTMLDivElement
> &
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
  MUTIPLE extends boolean = false,
  ITEM = AutoCompleteItemDefault,
  GROUP = AutoCompleteGroupDefault,
>(
  props: AutoCompleteProps<MUTIPLE, ITEM, GROUP>,
) => React.ReactElement | null;

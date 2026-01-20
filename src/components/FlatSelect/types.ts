import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { FieldPropSize, FieldPropView } from '##/components/FieldComponents';
import { Direction } from '##/components/Popover';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type RenderItemProps<ITEM> = {
  item: ITEM;
  active: boolean;
  hovered: boolean;
  onClick: (e: React.MouseEvent) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  ref: React.Ref<HTMLDivElement>;
};

export type FlatSelectItemDefault = {
  label: string;
  id: string | number;
  groupId?: string | number;
  disabled?: boolean;
};

export type FlatSelectGroupDefault = {
  label: string;
  id: string | number;
};

export type FlatSelectPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type FlatSelectPropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type FlatSelectPropGetItemGroupKey<ITEM> = (
  item: ITEM,
) => string | number | undefined;
export type FlatSelectPropGetItemDisabled<ITEM> = (
  item: ITEM,
) => boolean | undefined;
export type FlatSelectPropGetGroupKey<GROUP> = (
  group: GROUP,
) => string | number;
export type FlatSelectPropGetGroupLabel<GROUP> = (group: GROUP) => string;

export type FlatSelectPropOnChange<ITEM, MULTIPLE extends boolean> = (
  value: (MULTIPLE extends true ? ITEM[] : ITEM) | null,
  props: {
    e: React.SyntheticEvent;
  },
) => void;
export type FlatSelectPropValue<ITEM, MULTIPLE extends boolean> =
  | (MULTIPLE extends true ? ITEM[] : ITEM)
  | null
  | undefined;

export type FlatSelectPropRenderItem<ITEM> = (
  props: RenderItemProps<ITEM>,
) => React.ReactNode | null;

export type FlatSelectPropRenderValue<ITEM, MULTIPLE> = MULTIPLE extends true
  ? (props: {
      value: ITEM[];
      getRemove: (
        item: ITEM,
      ) => (e: React.SyntheticEvent<Element, Event>) => void;
    }) => React.ReactNode | null
  : (props: { value: ITEM }) => React.ReactNode | null;

export type FlatSelectPropOnCreate = (
  label: string,
  props: { e: React.SyntheticEvent },
) => void;

export type FlatSelectAllItem = {
  groupKey: string | number;
  __optionSelectAll: true;
};

export type Group<ITEM, GROUP> = {
  items: ITEM[];
  key: string | number;
  group?: GROUP;
};

export type CountedGroup<ITEM, GROUP> = Omit<Group<ITEM, GROUP>, 'items'> & {
  items: Array<FlatSelectAllItem | ITEM>;
};

export type FlatSelectPropForm = 'default' | 'brick' | 'round';

export type FlatSelectPropsInit<
  ITEM = FlatSelectItemDefault,
  GROUP = FlatSelectGroupDefault,
  MULTIPLE extends boolean = false,
> = PropsWithHTMLAttributesAndRef<
  {
    items: ITEM[];
    onChange: FlatSelectPropOnChange<ITEM, MULTIPLE>;
    disabled?: boolean;
    form?: 'default' | 'brick' | 'round';
    placeholder?: string;
    size?: FieldPropSize;
    isLoading?: boolean;
    listRef?: React.Ref<HTMLDivElement>;
    renderItem?: FlatSelectPropRenderItem<ITEM>;
    onInputFocus?: React.FocusEventHandler<HTMLInputElement>;
    onInputBlur?: React.FocusEventHandler<HTMLInputElement>;
    onCreate?: FlatSelectPropOnCreate;
    inputRef?: React.Ref<HTMLInputElement>;
    input?: boolean;
    inputValue?: string;
    inputDefaultValue?: string;
    onInput?: (value: string) => void;
    labelForCreate?:
      | ((label: string | undefined) => React.ReactNode)
      | React.ReactNode;
    labelForEmptyItems?: string;
    multiple?: MULTIPLE;
    value?: FlatSelectPropValue<ITEM, MULTIPLE>;
    groups?: GROUP[];
    getItemLabel?: FlatSelectPropGetItemLabel<ITEM>;
    getItemKey?: FlatSelectPropGetItemKey<ITEM>;
    getItemGroupKey?: FlatSelectPropGetItemGroupKey<ITEM>;
    getItemDisabled?: FlatSelectPropGetItemDisabled<ITEM>;
    getGroupLabel?: FlatSelectPropGetGroupLabel<GROUP>;
    getGroupKey?: FlatSelectPropGetGroupKey<GROUP>;
    virtualScroll?: boolean;
    onScrollToBottom?: (length: number) => void;
    onOpen?: (isOpen: boolean) => void;
    isOpen?: boolean;
    listClassName?: string;
    ignoreOutsideClicksRefs?: ReadonlyArray<React.RefObject<HTMLElement>>;
    clearButton?: boolean;
    iconClear?: IconComponent;
    iconLeft?: IconComponent;
    selectAll?: MULTIPLE extends true ? boolean : never;
    selectAllLabel?: string;
    footer?: React.ReactNode;
    view?: FieldPropView;
    bordered?: boolean;
    anchorRef?: React.RefObject<HTMLElement>;
    direction?: Direction;
    spareDirection?: Direction;
    possibleDirections?: Direction[];
    viewportRef?: React.RefObject<HTMLElement>;
  },
  HTMLDivElement
>;

/**
 * Props for the FlatSelect component.
 *
 * This type defines the props for the FlatSelect component, which is a customizable select component.
 * It allows for single or multiple selection, and supports grouping of items.
 * The component can be customized by providing custom item and group types.
 *
 * @template ITEM The type of the items in the select. Defaults to FlatSelectItemDefault.
 * @template GROUP The type of the groups in the select. Defaults to FlatSelectGroupDefault.
 * @template MULTIPLE Whether the select allows multiple selection. Defaults to false.
 */
export type FlatSelectProps<
  ITEM = FlatSelectItemDefault,
  GROUP = FlatSelectGroupDefault,
  MULTIPLE extends boolean = false,
> = FlatSelectPropsInit<ITEM, GROUP, MULTIPLE> &
  (ITEM extends { label: FlatSelectItemDefault['label'] }
    ? {}
    : { getItemLabel: FlatSelectPropGetItemLabel<ITEM> }) &
  (ITEM extends { id: FlatSelectItemDefault['id'] }
    ? {}
    : { getItemKey: FlatSelectPropGetItemKey<ITEM> }) &
  (GROUP extends { label: FlatSelectGroupDefault['label'] }
    ? {}
    : { getGroupLabel: FlatSelectPropGetGroupLabel<GROUP> }) &
  (GROUP extends { id: FlatSelectGroupDefault['id'] }
    ? {}
    : { getGroupKey: FlatSelectPropGetGroupKey<GROUP> });

export type FlatSelectComponent = <
  ITEM = FlatSelectItemDefault,
  GROUP = FlatSelectGroupDefault,
  MULTIPLE extends boolean = false,
>(
  props: FlatSelectProps<ITEM, GROUP, MULTIPLE>,
) => React.ReactNode | null;

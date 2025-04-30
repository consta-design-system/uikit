import { objectWithDefault, WithDefaultReturn } from '##/utils/object';

import { SelectGroupDefault, SelectItemDefault, SelectPropsInit } from '.';

export const defaultLabelForEmptyItems = 'Список пуст';
export const defaultSelectAllLabel = 'Выбрать все';

const getItemKey = (item: SelectItemDefault) => item.id;
const getGroupKey = (group: SelectGroupDefault) => group.id;
const getGroupLabel = (group: SelectGroupDefault) => group.label;
const getItemDisabled = (item: SelectItemDefault) => item.disabled;
const getItemGroupKey = (item: SelectItemDefault) => item.groupId;
const getItemLabel = (item: SelectItemDefault) => item.label;

const defaultProps = {
  form: 'default',
  size: 'm',
  view: 'default',
  getItemKey,
  getGroupKey,
  getGroupLabel,
  getItemDisabled,
  getItemGroupKey,
  getItemLabel,
  dropdownForm: 'default',
  labelForEmptyItems: defaultLabelForEmptyItems,
  selectAllLabel: defaultSelectAllLabel,
} as const;

export const withDefault = <
  ITEM = SelectItemDefault,
  GROUP = SelectGroupDefault,
  MULTIPLE extends boolean = false,
>(
  props: SelectPropsInit<ITEM, GROUP, MULTIPLE>,
): PropsWithDefault<ITEM, GROUP, MULTIPLE> =>
  objectWithDefault(defaultProps as any, props);

export type PropsWithDefaultMultiple = WithDefaultReturn<
  SelectPropsInit<SelectItemDefault, SelectGroupDefault, true>,
  keyof typeof defaultProps
>;

export type PropsWithDefaultSingle = WithDefaultReturn<
  SelectPropsInit<SelectItemDefault, SelectGroupDefault, false>,
  keyof typeof defaultProps
>;

export type PropsWithDefault<
  ITEM = SelectItemDefault,
  GROUP = SelectGroupDefault,
  MULTIPLE extends boolean = false,
> = WithDefaultReturn<
  SelectPropsInit<ITEM, GROUP, MULTIPLE>,
  keyof typeof defaultProps
>;

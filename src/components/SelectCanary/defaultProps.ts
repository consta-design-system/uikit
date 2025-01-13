import { objectWithDefault, WithDefaultReturn } from '##/utils/object';

import { SelectGroupDefault, SelectItemDefault, SelectPropsInit } from '.';

export const defaultLabelForEmptyItems = 'Список пуст';

const defaultProps = {
  form: 'default',
  size: 'm',
  view: 'default',
  getItemKey: (item: SelectItemDefault) => item.id,
  getGroupKey: (group: SelectGroupDefault) => group.id,
  getGroupLabel: (group: SelectGroupDefault) => group.label,
  getItemDisabled: (item: SelectItemDefault) => item.disabled,
  getItemGroupKey: (item: SelectItemDefault) => item.groupId,
  getItemLabel: (item: SelectItemDefault) => item.label,
  dropdownForm: 'default',
  labelForEmptyItems: defaultLabelForEmptyItems,
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

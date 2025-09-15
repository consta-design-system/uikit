import {
  objectWithDefault,
  WithDefaultReturn,
} from '@consta/uikit/__internal__/src/utils/object';

import {
  FlatSelectGroupDefault,
  FlatSelectItemDefault,
  FlatSelectPropsInit,
} from '.';

// import { objectWithDefault, WithDefaultReturn } from '##/utils/object';

// import { FlatSelectGroupDefault, FlatSelectItemDefault, FlatSelectPropsInit } from '.';

export const defaultLabelForEmptyItems = 'Список пуст';
export const defaultSelectAllLabel = 'Выбрать все';

const getItemKey = (item: FlatSelectItemDefault) => item.id;
const getGroupKey = (group: FlatSelectGroupDefault) => group.id;
const getGroupLabel = (group: FlatSelectGroupDefault) => group.label;
const getItemDisabled = (item: FlatSelectItemDefault) => item.disabled;
const getItemGroupKey = (item: FlatSelectItemDefault) => item.groupId;
const getItemLabel = (item: FlatSelectItemDefault) => item.label;

const defaultProps = {
  form: 'default',
  getItemKey,
  getGroupKey,
  getGroupLabel,
  getItemDisabled,
  getItemGroupKey,
  getItemLabel,
  labelForEmptyItems: defaultLabelForEmptyItems,
  selectAllLabel: defaultSelectAllLabel,
  view: 'default',
  size: 'm',
} as const;

export const withDefault = <
  ITEM = FlatSelectItemDefault,
  GROUP = FlatSelectGroupDefault,
  MULTIPLE extends boolean = false,
>(
  props: FlatSelectPropsInit<ITEM, GROUP, MULTIPLE>,
): PropsWithDefault<ITEM, GROUP, MULTIPLE> =>
  objectWithDefault(defaultProps as any, props);

export type PropsWithDefaultMultiple = WithDefaultReturn<
  FlatSelectPropsInit<FlatSelectItemDefault, FlatSelectGroupDefault, true>,
  keyof typeof defaultProps
>;

export type PropsWithDefaultSingle = WithDefaultReturn<
  FlatSelectPropsInit<FlatSelectItemDefault, FlatSelectGroupDefault, false>,
  keyof typeof defaultProps
>;

export type PropsWithDefault<
  ITEM = FlatSelectItemDefault,
  GROUP = FlatSelectGroupDefault,
  MULTIPLE extends boolean = false,
> = WithDefaultReturn<
  FlatSelectPropsInit<ITEM, GROUP, MULTIPLE>,
  keyof typeof defaultProps
>;

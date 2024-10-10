import {
  AutoCompleteGroupDefault,
  AutoCompleteItemDefault,
  AutoCompletePropGetGroupId,
  AutoCompletePropGetGroupLabel,
  AutoCompletePropGetItemGroupId,
  AutoCompletePropGetItemKey,
  AutoCompletePropGetItemLabel,
  AutoCompleteProps,
} from './types';

export const defaultGetItemKey: AutoCompletePropGetItemKey<
  AutoCompleteItemDefault
> = (item) => item.id;
export const defaultGetItemLabel: AutoCompletePropGetItemLabel<
  AutoCompleteItemDefault
> = (item) => item.label;
export const defaultGetItemGroupKey: AutoCompletePropGetItemGroupId<
  AutoCompleteItemDefault
> = (item) => item.groupId;

export const defaultGetGroupKey: AutoCompletePropGetGroupId<
  AutoCompleteGroupDefault
> = (group) => group.id;
export const defaultGetGroupLabel: AutoCompletePropGetGroupLabel<
  AutoCompleteGroupDefault
> = (group) => group.label;

export function withDefaultGetters<
  TYPE extends string,
  ITEM = AutoCompleteItemDefault,
  GROUP = AutoCompleteGroupDefault,
>(props: AutoCompleteProps<TYPE, ITEM, GROUP>) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemKey: props.getItemKey || defaultGetItemKey,
    getItemGroupKey: props.getItemGroupKey || defaultGetItemGroupKey,
    getGroupLabel: props.getGroupLabel || defaultGetGroupLabel,
    getGroupKey: props.getGroupKey || defaultGetGroupKey,
  };
}

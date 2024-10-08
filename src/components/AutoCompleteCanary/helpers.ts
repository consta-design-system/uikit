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
  MUTIPLE extends boolean = false,
  ITEM = AutoCompleteItemDefault,
  GROUP = AutoCompleteGroupDefault,
>(props: AutoCompleteProps<MUTIPLE, ITEM, GROUP>) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemKey: props.getItemKey || defaultGetItemKey,
    getItemGroupKey: props.getItemGroupKey || defaultGetItemGroupKey,
    getGroupLabel: props.getGroupLabel || defaultGetGroupLabel,
    getGroupKey: props.getGroupKey || defaultGetGroupKey,
  };
}

export const isMultipleProps = <
  ITEM = AutoCompleteItemDefault,
  GROUP = AutoCompleteGroupDefault,
>(
  props: AutoCompleteProps<boolean, ITEM, GROUP>,
): props is AutoCompleteProps<true, ITEM, GROUP> => props.multiple;

export const isNotMultipleProps = <
  ITEM = AutoCompleteItemDefault,
  GROUP = AutoCompleteGroupDefault,
>(
  props: AutoCompleteProps<boolean, ITEM, GROUP>,
): props is AutoCompleteProps<false, ITEM, GROUP> => !props.multiple;

export const getSearchValue = <
  MUTIPLE extends boolean = false,
  ITEM = AutoCompleteItemDefault,
  GROUP = AutoCompleteGroupDefault,
>(
  props: AutoCompleteProps<MUTIPLE, ITEM, GROUP>,
) => {
  let value: string | null = '';
  if (isMultipleProps(props)) {
    value = props.inputValue || ('' as string);
  }
  if (isNotMultipleProps(props)) {
    value = props.value || '';
  }
  return value || '';
};

import {
  CheckboxGroupDefaultItem,
  CheckboxGroupPropGetItemDisabled,
  CheckboxGroupPropGetItemKey,
  CheckboxGroupPropGetItemLabel,
  CheckboxGroupProps,
} from './types';

const defaultGetItemKey: CheckboxGroupPropGetItemKey<
  CheckboxGroupDefaultItem
> = (item) => item.key;
const defaultGetItemLabel: CheckboxGroupPropGetItemLabel<
  CheckboxGroupDefaultItem
> = (item) => item.label;
const defaultGetItemDisabled: CheckboxGroupPropGetItemDisabled<
  CheckboxGroupDefaultItem
> = (item) => item.disabled;

export const withDefaultGetters = (props: CheckboxGroupProps) => ({
  ...props,
  getItemKey: props.getItemKey || defaultGetItemKey,
  getItemLabel: props.getItemLabel || defaultGetItemLabel,
  getItemDisabled: props.getItemDisabled || defaultGetItemDisabled,
});

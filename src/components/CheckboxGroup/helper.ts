import {
  CheckboxGroupDefaultItem,
  CheckboxGroupPropGetItemDisabled,
  CheckboxGroupPropGetItemLabel,
  CheckboxGroupProps,
} from './types';

const defaultGetItemLabel: CheckboxGroupPropGetItemLabel<
  CheckboxGroupDefaultItem
> = (item) => item.label;
const defaultGetItemDisabled: CheckboxGroupPropGetItemDisabled<
  CheckboxGroupDefaultItem
> = (item) => item.disabled;

export const withDefaultGetters = (props: CheckboxGroupProps) => ({
  ...props,
  getItemLabel: props.getItemLabel || defaultGetItemLabel,
  getItemDisabled: props.getItemDisabled || defaultGetItemDisabled,
});

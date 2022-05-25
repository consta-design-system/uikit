import {
  RadioGroupDefaultItem,
  RadioGroupPropGetItemDisabled,
  RadioGroupPropGetItemLabel,
  RadioGroupProps,
} from './types';

const defaultGetItemLabel: RadioGroupPropGetItemLabel<RadioGroupDefaultItem> = (item) => item.label;
const defaultGetItemDisabled: RadioGroupPropGetItemDisabled<RadioGroupDefaultItem> = (item) =>
  item.disabled;

export const withDefaultGetters = (props: RadioGroupProps) => ({
  ...props,
  getItemLabel: props.getItemLabel || defaultGetItemLabel,
  getItemDisabled: props.getItemDisabled || defaultGetItemDisabled,
});

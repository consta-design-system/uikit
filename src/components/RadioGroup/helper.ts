import {
  RadioGroupDefaultItem,
  RadioGroupPropGetDisabled,
  RadioGroupPropGetLabel,
  RadioGroupProps,
} from './types';

const defaultGetItemLabel: RadioGroupPropGetLabel<RadioGroupDefaultItem> = (item) => item.label;
const defaultGetItemDisabled: RadioGroupPropGetDisabled<RadioGroupDefaultItem> = (item) =>
  item.disabled;

export const withDefaultGetters = (props: RadioGroupProps) => ({
  ...props,
  getLabel: props.getLabel || defaultGetItemLabel,
  getDisabled: props.getDisabled || defaultGetItemDisabled,
});

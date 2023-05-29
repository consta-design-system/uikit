import {
  RadioGroupDefaultItem,
  RadioGroupPropGetItemDisabled,
  RadioGroupPropGetItemKey,
  RadioGroupPropGetItemLabel,
  RadioGroupProps,
} from './types';

const defaultGetItemKey: RadioGroupPropGetItemKey<RadioGroupDefaultItem> = (
  item,
) => item.key;
const defaultGetItemLabel: RadioGroupPropGetItemLabel<RadioGroupDefaultItem> = (
  item,
) => item.label;
const defaultGetItemDisabled: RadioGroupPropGetItemDisabled<
  RadioGroupDefaultItem
> = (item) => item.disabled;

export const withDefaultGetters = (props: RadioGroupProps) => ({
  ...props,
  getItemKey: props.getItemKey || defaultGetItemKey,
  getItemLabel: props.getItemLabel || defaultGetItemLabel,
  getItemDisabled: props.getItemDisabled || defaultGetItemDisabled,
});

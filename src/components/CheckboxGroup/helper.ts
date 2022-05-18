import {
  CheckboxGroupDefaultItem,
  CheckboxGroupPropGetDisabled,
  CheckboxGroupPropGetLabel,
  CheckboxGroupProps,
} from './types';

const defaultGetItemLabel: CheckboxGroupPropGetLabel<CheckboxGroupDefaultItem> = (item) =>
  item.label;
const defaultGetItemDisabled: CheckboxGroupPropGetDisabled<CheckboxGroupDefaultItem> = (item) =>
  item.disabled;

export const withDefaultGetters = (props: CheckboxGroupProps) => ({
  ...props,
  getLabel: props.getLabel || defaultGetItemLabel,
  getDisabled: props.getDisabled || defaultGetItemDisabled,
});

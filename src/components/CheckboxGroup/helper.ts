import {
  CheckboxGroupDefaultItem,
  CheckboxGroupPropGetItemAttributes,
  CheckboxGroupPropGetItemDisabled,
  CheckboxGroupPropGetItemKey,
  CheckboxGroupPropGetItemLabel,
  CheckboxGroupPropGetItemRef,
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
const defaultGetItemAttributes: CheckboxGroupPropGetItemAttributes<
  CheckboxGroupDefaultItem
> = (item) => item.attributes;
const defaultGetItemRef: CheckboxGroupPropGetItemRef<
  CheckboxGroupDefaultItem
> = (item) => item.ref;

export const withDefaultGetters = (props: CheckboxGroupProps) => ({
  ...props,
  getItemKey: props.getItemKey || defaultGetItemKey,
  getItemLabel: props.getItemLabel || defaultGetItemLabel,
  getItemDisabled: props.getItemDisabled || defaultGetItemDisabled,
  getItemAttributes: props.getItemAttributes || defaultGetItemAttributes,
  getItemRef: props.getItemRef || defaultGetItemRef,
});

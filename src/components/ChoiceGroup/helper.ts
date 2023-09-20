import {
  ChoiceGroupDefaultItem,
  ChoiceGroupPropGetItemAttributes,
  ChoiceGroupPropGetItemDisabled,
  ChoiceGroupPropGetItemIcon,
  ChoiceGroupPropGetItemLabel,
  ChoiceGroupPropGetItemRef,
  ChoiceGroupProps,
} from './types';

const defaultGetItemLabel: ChoiceGroupPropGetItemLabel<
  ChoiceGroupDefaultItem
> = (item) => item.label;
const defaultGetItemIcon: ChoiceGroupPropGetItemIcon<ChoiceGroupDefaultItem> = (
  item,
) => item.icon;
const defaultGetItemDisabled: ChoiceGroupPropGetItemDisabled<
  ChoiceGroupDefaultItem
> = (item) => item.disabled;
const defaultGetItemAttributes: ChoiceGroupPropGetItemAttributes<
  ChoiceGroupDefaultItem
> = (item) => item.attributes;
const defaultGetItemRef: ChoiceGroupPropGetItemRef<ChoiceGroupDefaultItem> = (
  item,
) => item.ref;

export const withDefaultGetters = (props: ChoiceGroupProps) => ({
  ...props,
  getItemLabel: props.getItemLabel || defaultGetItemLabel,
  getItemIcon: props.getItemIcon || defaultGetItemIcon,
  getItemDisabled: props.getItemDisabled || defaultGetItemDisabled,
  getItemAttributes: props.getItemAttributes || defaultGetItemAttributes,
  getItemRef: props.getItemRef || defaultGetItemRef,
});

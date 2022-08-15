import {
  ChoiceGroupDefaultItem,
  ChoiceGroupPropGetItemDisabled,
  ChoiceGroupPropGetItemIcon,
  ChoiceGroupPropGetItemLabel,
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

export const withDefaultGetters = (props: ChoiceGroupProps) => ({
  ...props,
  getItemLabel: props.getItemLabel || defaultGetItemLabel,
  getItemIcon: props.getItemIcon || defaultGetItemIcon,
  getItemDisabled: props.getItemDisabled || defaultGetItemDisabled,
});

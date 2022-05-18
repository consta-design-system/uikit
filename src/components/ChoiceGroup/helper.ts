import {
  ChoiceGroupDefaultItem,
  ChoiceGroupPropGetDisabled,
  ChoiceGroupPropGetIcon,
  ChoiceGroupPropGetLabel,
  ChoiceGroupProps,
} from './types';

const defaultGetItemLabel: ChoiceGroupPropGetLabel<ChoiceGroupDefaultItem> = (item) => item.label;
const defaultGetItemIcon: ChoiceGroupPropGetIcon<ChoiceGroupDefaultItem> = (item) => item.icon;
const defaultGetItemDisabled: ChoiceGroupPropGetDisabled<ChoiceGroupDefaultItem> = (item) =>
  item.disabled;

export const withDefaultGetters = (props: ChoiceGroupProps) => ({
  ...props,
  getLabel: props.getLabel || defaultGetItemLabel,
  getIcon: props.getIcon || defaultGetItemIcon,
  getDisabled: props.getDisabled || defaultGetItemDisabled,
});

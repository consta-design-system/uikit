import {
  SwitchGroupDefaultItem,
  SwitchGroupPropGetItemDisabled,
  SwitchGroupPropGetItemLabel,
  SwitchGroupProps,
} from './types';

const defaultGetItemLabel: SwitchGroupPropGetItemLabel<
  SwitchGroupDefaultItem
> = (item) => item.label;
const defaultGetItemDisabled: SwitchGroupPropGetItemDisabled<
  SwitchGroupDefaultItem
> = (item) => item.disabled;

export const withDefaultGetters = (props: SwitchGroupProps) => ({
  ...props,
  getItemLabel: props.getItemLabel || defaultGetItemLabel,
  getItemDisabled: props.getItemDisabled || defaultGetItemDisabled,
});

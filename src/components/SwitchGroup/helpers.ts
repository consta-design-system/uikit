import {
  SwitchGroupDefaultItem,
  SwitchGroupPropGetDisabled,
  SwitchGroupPropGetLabel,
  SwitchGroupProps,
} from './types';

const defaultGetItemLabel: SwitchGroupPropGetLabel<SwitchGroupDefaultItem> = (item) => item.label;
const defaultGetItemDisabled: SwitchGroupPropGetDisabled<SwitchGroupDefaultItem> = (item) =>
  item.disabled;

export const withDefaultGetters = (props: SwitchGroupProps) => ({
  ...props,
  getLabel: props.getLabel || defaultGetItemLabel,
  getDisabled: props.getDisabled || defaultGetItemDisabled,
});

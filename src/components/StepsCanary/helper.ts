import {
  StepsItemDefault,
  StepsPropGetItemDescription,
  StepsPropGetItemDisabled,
  StepsPropGetItemIcon,
  StepsPropGetItemLabel,
  StepsPropGetItemStatus,
  StepsProps,
} from './types';

const defaultGetItemLabel: StepsPropGetItemLabel<StepsItemDefault> = (item) =>
  item.label;
const defaultGetItemStatus: StepsPropGetItemStatus<StepsItemDefault> = (item) =>
  item.status;
const defaultGetItemDisabled: StepsPropGetItemDisabled<StepsItemDefault> = (
  item,
) => item.disabled;
const defaultGetItemIcon: StepsPropGetItemIcon<StepsItemDefault> = (item) =>
  item.icon;
const defaultGetItemDescription: StepsPropGetItemDescription<
  StepsItemDefault
> = (item) => item.description;

export function withDefaultGetters(props: StepsProps) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemDisabled: props.getItemDisabled || defaultGetItemDisabled,
    getItemStatus: props.getItemStatus || defaultGetItemStatus,
    getItemIcon: props.getItemIcon || defaultGetItemIcon,
    getItemDescription: props.getItemDescription || defaultGetItemDescription,
  };
}

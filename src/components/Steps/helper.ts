import {
  StepsItemDefault,
  StepsPropGetCompleted,
  StepsPropGetDisabled,
  StepsPropGetLabel,
  StepsPropGetSkipped,
  StepsProps,
} from './types';

const defaultGetItemLabel: StepsPropGetLabel<StepsItemDefault> = (item) =>
  item.label;
const defaultGetItemCompleted: StepsPropGetCompleted<StepsItemDefault> = (
  item,
) => item.completed;
const defaultGetItemDisabled: StepsPropGetDisabled<StepsItemDefault> = (item) =>
  item.disabled;
const defaultGetItemSkipped: StepsPropGetSkipped<StepsItemDefault> = (item) =>
  item.skipped;

export function withDefaultGetters(props: StepsProps) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemDisabled: props.getItemDisabled || defaultGetItemDisabled,
    getItemCompleted: props.getItemCompleted || defaultGetItemCompleted,
    getItemSkipped: props.getItemSkipped || defaultGetItemSkipped,
  };
}

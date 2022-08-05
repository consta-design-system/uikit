import { ProgressLineItemDefault, ProgressLinePropGetItemLabel, ProgressLineProps } from './types';

const defaultGetItemLabel: ProgressLinePropGetItemLabel<ProgressLineItemDefault> = (item) =>
  item.label;

export function withDefaultGetters<ITEM>(props: ProgressLineProps<ITEM>) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
  };
}

export const getLineDelay = (value: number, prevValue: number, index: number) => {
  if (prevValue < value) {
    return Math.max(value < index ? 0 : index - prevValue - 1, 0);
  }
  return Math.max(prevValue - index, 0);
};

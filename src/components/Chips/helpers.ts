import {
  ChipsDefaultItem,
  ChipsPropGetItemActive,
  ChipsPropGetItemAs,
  ChipsPropGetItemAttributes,
  ChipsPropGetItemIconLeft,
  ChipsPropGetItemIconRight,
  ChipsPropGetItemLabel,
  ChipsPropGetItemRef,
  ChipsPropGetItemStatus,
  ChipsProps,
} from './types';

export const defaultGetItemIconRight: ChipsPropGetItemIconRight<
  ChipsDefaultItem
> = (item) => item.iconRight;
export const defaultGetItemActive: ChipsPropGetItemActive<ChipsDefaultItem> = (
  item,
) => item.active;
export const defaultGetItemIconLeft: ChipsPropGetItemIconLeft<
  ChipsDefaultItem
> = (item) => item.iconLeft;
export const defaultGetItemStatus: ChipsPropGetItemStatus<ChipsDefaultItem> = (
  item,
) => item.status;
export const defaultGetItemLabel: ChipsPropGetItemLabel<ChipsDefaultItem> = (
  item,
) => item.label;
export const defaultGetItemAs: ChipsPropGetItemAs<ChipsDefaultItem> = (item) =>
  item.as;
export const defaultGetItemAttributes: ChipsPropGetItemAttributes<
  ChipsDefaultItem
> = (item) => item.attributes;
export const defaultGetItemRef: ChipsPropGetItemRef<ChipsDefaultItem> = (
  item,
) => item.ref;

export function withDefaultGetters<ITEM>(props: ChipsProps<ITEM>) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemIconRight: props.getItemIconRight || defaultGetItemIconRight,
    getItemIconLeft: props.getItemIconLeft || defaultGetItemIconLeft,
    getItemStatus: props.getItemStatus || defaultGetItemStatus,
    getItemRef: props.getItemRef || defaultGetItemRef,
    getItemAs: props.getItemAs || defaultGetItemAs,
    getItemAttributes: props.getItemAttributes || defaultGetItemAttributes,
    getItemActive: props.getItemActive || defaultGetItemActive,
  };
}

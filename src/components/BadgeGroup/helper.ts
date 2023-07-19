import { setRef } from '##/utils/setRef';

import {
  BadgeGroupDefaultItem,
  BadgeGroupPropGetItemAs,
  BadgeGroupPropGetItemAttributes,
  BadgeGroupPropGetItemIconLeft,
  BadgeGroupPropGetItemIconRight,
  BadgeGroupPropGetItemKey,
  BadgeGroupPropGetItemLabel,
  BadgeGroupPropGetItemRef,
  BadgeGroupPropGetItemStatus,
  BadgeGroupPropGetItemView,
  BadgeGroupProps,
} from './types';

const defaultGetItemKey: BadgeGroupPropGetItemKey<BadgeGroupDefaultItem> = (
  item,
) => item.key;
const defaultGetItemIconRight: BadgeGroupPropGetItemIconRight<
  BadgeGroupDefaultItem
> = (item) => item.iconRight;
const defaultGetItemIconLeft: BadgeGroupPropGetItemIconLeft<
  BadgeGroupDefaultItem
> = (item) => item.iconLeft;
const defaultGetItemStatus: BadgeGroupPropGetItemStatus<
  BadgeGroupDefaultItem
> = (item) => item.status;
const defaultGetItemView: BadgeGroupPropGetItemView<BadgeGroupDefaultItem> = (
  item,
) => item.view;
const defaultGetItemLabel: BadgeGroupPropGetItemLabel<BadgeGroupDefaultItem> = (
  item,
) => item.label;
const defaultGetItemAs: BadgeGroupPropGetItemAs<BadgeGroupDefaultItem> = (
  item,
) => item.as;
const defaultGetItemAttributes: BadgeGroupPropGetItemAttributes<
  BadgeGroupDefaultItem
> = (item) => item.attributes;
const defaultGetItemRef: BadgeGroupPropGetItemRef<BadgeGroupDefaultItem> = (
  item,
) => item.ref;

export function withDefaultGetters<ITEM>(props: BadgeGroupProps<ITEM>) {
  return {
    ...props,
    getItemKey: props.getItemKey || defaultGetItemKey,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemIconRight: props.getItemIconRight || defaultGetItemIconRight,
    getItemIconLeft: props.getItemIconLeft || defaultGetItemIconLeft,
    getItemView: props.getItemView || defaultGetItemView,
    getItemStatus: props.getItemStatus || defaultGetItemStatus,
    getItemRef: props.getItemRef || defaultGetItemRef,
    getItemAs: props.getItemAs || defaultGetItemAs,
    getItemAttributes: props.getItemAttributes || defaultGetItemAttributes,
  };
}

export const forkRef = <T>(
  refs: (React.Ref<T> | undefined)[],
): React.RefCallback<T> | null => {
  if (!refs.length) {
    return null;
  }
  return (refValue) => {
    for (const ref of refs) {
      setRef(ref as React.MutableRefObject<T>, refValue);
    }
  };
};

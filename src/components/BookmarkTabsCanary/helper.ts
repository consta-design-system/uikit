import {
  BookmarkTabsItemDefault,
  BookmarkTabsPropGetItemAs,
  BookmarkTabsPropGetItemAttributes,
  BookmarkTabsPropGetItemFixed,
  BookmarkTabsPropGetItemKey,
  BookmarkTabsPropGetItemLabel,
  BookmarkTabsPropGetItemLeftIcon,
  BookmarkTabsPropGetItemRef,
  BookmarkTabsPropGetItemRightIcon,
  BookmarkTabsProps,
} from './types';

const defaultGetItemKey: BookmarkTabsPropGetItemKey<BookmarkTabsItemDefault> = (
  item,
) => item.key;
const defaultGetItemLabel: BookmarkTabsPropGetItemLabel<
  BookmarkTabsItemDefault
> = (item) => item.label;
const defaultGetItemLeftIcon: BookmarkTabsPropGetItemLeftIcon<
  BookmarkTabsItemDefault
> = (item) => item.leftIcon;
const defaultGetItemRightIcon: BookmarkTabsPropGetItemRightIcon<
  BookmarkTabsItemDefault
> = (item) => item.rightIcon;
const defaultGetItemFixed: BookmarkTabsPropGetItemFixed<
  BookmarkTabsItemDefault
> = (item) => item.fixed;
const defaultGetItemAs: BookmarkTabsPropGetItemAs<BookmarkTabsItemDefault> = (
  item,
) => item.as;
const defaultGetItemRef: BookmarkTabsPropGetItemRef<BookmarkTabsItemDefault> = (
  item,
) => item.ref;
const defaultGetItemAttributes: BookmarkTabsPropGetItemAttributes<
  BookmarkTabsItemDefault
> = (item) => item.attributes;

export const withDefaultGetters = (props: BookmarkTabsProps) => {
  return {
    ...props,
    getItemKey: props.getItemKey ?? defaultGetItemKey,
    getItemLabel: props.getItemLabel ?? defaultGetItemLabel,
    getItemLeftIcon: props.getItemLeftIcon ?? defaultGetItemLeftIcon,
    getItemRightIcon: props.getItemRightIcon ?? defaultGetItemRightIcon,
    getItemFixed: props.getItemFixed ?? defaultGetItemFixed,
    getItemAs: props.getItemAs ?? defaultGetItemAs,
    getItemRef: props.getItemRef ?? defaultGetItemRef,
    getItemAttributes: props.getItemAttributes ?? defaultGetItemAttributes,
  };
};

import {
  AvatarGroupDefaultItem,
  AvatarGroupPropGetItemName,
  AvatarGroupPropGetItemUrl,
  AvatarGroupProps,
} from './types';

const defaultGetItemName: AvatarGroupPropGetItemName<AvatarGroupDefaultItem> = (
  item,
) => item.name;
const defaultGetItemUrl: AvatarGroupPropGetItemUrl<AvatarGroupDefaultItem> = (
  item,
) => item.url;

export function withDefaultGetters<ITEM>(props: AvatarGroupProps<ITEM>) {
  return {
    ...props,
    getItemName: props.getItemName ?? defaultGetItemName,
    getItemUrl: props.getItemUrl ?? defaultGetItemUrl,
  };
}

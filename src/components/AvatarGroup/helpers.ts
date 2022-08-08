import {
  AvatarGroupDegaultItem,
  AvatarGroupPropGetItemAs,
  AvatarGroupPropGetItemName,
  AvatarGroupPropGetItemUrl,
  AvatarGroupProps,
} from './types';

const defaultGetItemName: AvatarGroupPropGetItemName<AvatarGroupDegaultItem> = (item) => item.name;
const defaultGetItemUrl: AvatarGroupPropGetItemUrl<AvatarGroupDegaultItem> = (item) => item.url;
const defaultGetItemAs: AvatarGroupPropGetItemAs<AvatarGroupDegaultItem> = (item) => item.as;

export function withDefaultGetters<ITEM>(props: AvatarGroupProps<ITEM>) {
  return {
    ...props,
    getItemName: props.getItemName ?? defaultGetItemName,
    getItemUrl: props.getItemUrl ?? defaultGetItemUrl,
    getItemAs: props.getItemAs ?? defaultGetItemAs,
  };
}

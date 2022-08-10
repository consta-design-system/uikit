import {
  AvatarGroupDegaultItem,
  AvatarGroupPropGetItemName,
  AvatarGroupPropGetItemUrl,
  AvatarGroupProps,
} from './types';

const defaultGetItemName: AvatarGroupPropGetItemName<AvatarGroupDegaultItem> = (item) => item.name;
const defaultGetItemUrl: AvatarGroupPropGetItemUrl<AvatarGroupDegaultItem> = (item) => item.url;

export function withDefaultGetters<ITEM>(props: AvatarGroupProps<ITEM>) {
  return {
    ...props,
    getItemName: props.getItemName ?? defaultGetItemName,
    getItemUrl: props.getItemUrl ?? defaultGetItemUrl,
  };
}

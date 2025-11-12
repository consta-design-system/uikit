import {
  NotificationDefaultGroup,
  NotificationDefaultItem,
  NotificationPropGetGroupActions,
  NotificationPropGetGroupId,
  NotificationPropGetGroupLabel,
  NotificationPropGetItemActions,
  NotificationPropGetItemCaption,
  NotificationPropGetItemContent,
  NotificationPropGetItemGroup,
  NotificationPropGetItemLabel,
  NotificationPropGetItemRead,
  NotificationPropGetItemUserImage,
  NotificationProps,
} from './types';

const defaultGetGroupId: NotificationPropGetGroupId<
  NotificationDefaultGroup
> = (group) => group.id;
const defaultGetGroupLabel: NotificationPropGetGroupLabel<
  NotificationDefaultItem,
  NotificationDefaultGroup
> = (group) => group.group?.label;
const defaultGetGroupActions: NotificationPropGetGroupActions<
  NotificationDefaultItem,
  NotificationDefaultGroup
> = (group) => group.group?.actions;
const defaultGetItemActions: NotificationPropGetItemActions<
  NotificationDefaultItem
> = (item) => item.actions;

const defaultGetItemCaption: NotificationPropGetItemCaption<
  NotificationDefaultItem
> = (item) => item.caption;

const defaultGetItemUserName: NotificationPropGetItemUserImage<
  NotificationDefaultItem
> = (item) => item.userName;

const defaultGetItemUserImage: NotificationPropGetItemUserImage<
  NotificationDefaultItem
> = (item) => item.userImage;

const defaultGetItemDescription: NotificationPropGetItemContent<
  NotificationDefaultItem
> = (item) => item.content;
const defaultGetItemGroup: NotificationPropGetItemGroup<
  NotificationDefaultItem
> = (item) => item.group;

const defaultGetItemLabel: NotificationPropGetItemLabel<
  NotificationDefaultItem
> = (item) => item.label;
const defaultGetItemRead: NotificationPropGetItemRead<
  NotificationDefaultItem
> = (item) => item.read;

export function withDefaultGetters<ITEM, GROUP>(
  props: NotificationProps<ITEM, GROUP>,
) {
  return {
    ...props,
    getGroupId: props.getGroupId || defaultGetGroupId,
    getGroupLabel: props.getGroupLabel || defaultGetGroupLabel,
    getGroupActions: props.getGroupActions || defaultGetGroupActions,
    getItemActions: props.getItemActions || defaultGetItemActions,
    getItemCaption: props.getItemCaption || defaultGetItemCaption,
    getItemContent: props.getItemContent || defaultGetItemDescription,
    getItemGroup: props.getItemGroup || defaultGetItemGroup,
    getItemUserImage: props.getItemUserImage || defaultGetItemUserImage,
    getItemUserName: props.getItemUserName || defaultGetItemUserName,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemRead: props.getItemRead || defaultGetItemRead,
  };
}

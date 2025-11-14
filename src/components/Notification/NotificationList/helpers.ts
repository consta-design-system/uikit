import { format, isToday, isYesterday, startOfDay } from 'date-fns';
import { get } from 'http';

import { getGroups as constaGetGroups } from '##/utils/getGroups';

import { NotificationItemAction } from '../NotificationItem';
import {
  NotificationListDefaultGroup,
  NotificationListDefaultItem,
  NotificationListPropGetActionIcon,
  NotificationListPropGetActionLabel,
  NotificationListPropGetActionOnClick,
  NotificationListPropGetGroupActions,
  NotificationListPropGetGroupId,
  NotificationListPropGetGroupLabel,
  NotificationListPropGetItemActions,
  NotificationListPropGetItemBadges,
  NotificationListPropGetItemCaption,
  NotificationListPropGetItemDescription,
  NotificationListPropGetItemGroup,
  NotificationListPropGetItemLabel,
  NotificationListPropGetItemRead,
  NotificationListPropGetItemUserImage,
  NotificationListPropGetItemUserName,
  NotificationListProps,
} from './types';

const defaultGetActionIcon: NotificationListPropGetActionIcon<
  NotificationItemAction
> = (action) => action.icon;
const defaultGetActionLabel: NotificationListPropGetActionLabel<
  NotificationItemAction
> = (action) => action.label;
const defaultGetActionOnClick: NotificationListPropGetActionOnClick<
  NotificationItemAction
> = (action) => action.onClick;
const defaultGetGroupId: NotificationListPropGetGroupId<
  NotificationListDefaultItem,
  NotificationListDefaultGroup
> = (group) => group.group?.id;
const defaultGetGroupLabel: NotificationListPropGetGroupLabel<
  NotificationListDefaultItem,
  NotificationListDefaultGroup
> = (group) => group.group?.label;
const defaultGetGroupActions: NotificationListPropGetGroupActions<
  NotificationListDefaultItem,
  NotificationListDefaultGroup
> = (group) => group.group?.actions;
const defaultGetItemActions: NotificationListPropGetItemActions<
  NotificationListDefaultItem
> = (item) => item.actions;
const defaultGetItemBadges: NotificationListPropGetItemBadges<
  NotificationListDefaultItem
> = (item) => item.badges;
const defaultGetItemCaption: NotificationListPropGetItemCaption<
  NotificationListDefaultItem
> = (item) => item.caption;

const defaultGetItemUserName: NotificationListPropGetItemUserImage<
  NotificationListDefaultItem
> = (item) => item.userName;

const defaultGetItemUserImage: NotificationListPropGetItemUserImage<
  NotificationListDefaultItem
> = (item) => item.userImage;

const defaultGetItemDescription: NotificationListPropGetItemDescription<
  NotificationListDefaultItem
> = (item) => item.description;
const defaultGetItemGroup: NotificationListPropGetItemGroup<
  NotificationListDefaultItem
> = (item) => item.group;

const defaultGetItemLabel: NotificationListPropGetItemLabel<
  NotificationListDefaultItem
> = (item) => item.label;
const defaultGetItemRead: NotificationListPropGetItemRead<
  NotificationListDefaultItem
> = (item) => item.read;

export function withDefaultGetters<ITEM, GROUP, ACTION>(
  props: NotificationListProps<ITEM, GROUP, ACTION>,
) {
  return {
    ...props,
    getActionIcon: props.getActionIcon || defaultGetActionIcon,
    getActionLabel: props.getActionLabel || defaultGetActionLabel,
    getActionOnClick: props.getActionOnClick || defaultGetActionOnClick,
    getGroupId: props.getGroupId || defaultGetGroupId,
    getGroupLabel: props.getGroupLabel || defaultGetGroupLabel,
    getGroupActions: props.getGroupActions || defaultGetGroupActions,
    getItemActions: props.getItemActions || defaultGetItemActions,
    getItemBadges: props.getItemBadges || defaultGetItemBadges,
    getItemCaption: props.getItemCaption || defaultGetItemCaption,
    getItemDescription: props.getItemDescription || defaultGetItemDescription,
    getItemGroup: props.getItemGroup || defaultGetItemGroup,
    getItemUserImage: props.getItemUserImage || defaultGetItemUserImage,
    getItemUserName: props.getItemUserName || defaultGetItemUserName,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemRead: props.getItemRead || defaultGetItemRead,
  };
}

export const defaultGroupLabelFormat: NotificationListPropGroupLabelFormat<
  true
> = (timestamp) => {
  if (isToday(timestamp)) {
    return 'Сегодня';
  }
  if (isYesterday(timestamp)) {
    return 'Вчера';
  }
  return format(timestamp, 'dd.MM.yyyy');
};

const sortGroup = (
  a: { key: string | number },
  b: { key: string | number },
) => {
  if (a.key < b.key) {
    return 1;
  }
  if (a.key > b.key) {
    return -1;
  }
  return 0;
};

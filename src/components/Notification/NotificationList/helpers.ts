import { format, isToday, isYesterday, startOfDay } from 'date-fns';

import { getGroups as constaGetGroups } from '##/utils/getGroups';

import { NotificationItemAction } from '../NotificationItem';
import {
  NotificationListDefaultGroup,
  NotificationListDefaultItem,
  NotificationListPropGetActionIcon,
  NotificationListPropGetActionLabel,
  NotificationListPropGetActionOnClick,
  NotificationListPropGetGroupId,
  NotificationListPropGetGroupLabel,
  NotificationListPropGetItemActions,
  NotificationListPropGetItemBadges,
  NotificationListPropGetItemDate,
  NotificationListPropGetItemDescription,
  NotificationListPropGetItemGroup,
  NotificationListPropGetItemImage,
  NotificationListPropGetItemLabel,
  NotificationListPropGetItemRead,
  NotificationListPropGetItemView,
  NotificationListPropGroupLabelFormat,
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
  NotificationListDefaultGroup
> = (group) => group.id;
const defaultGetGroupLabel: NotificationListPropGetGroupLabel<
  NotificationListDefaultGroup
> = (group) => group.label;
const defaultGetItemActions: NotificationListPropGetItemActions<
  NotificationListDefaultItem
> = (item) => item.actions;
const defaultGetItemBadges: NotificationListPropGetItemBadges<
  NotificationListDefaultItem
> = (item) => item.badges;
const defaultGetItemDate: NotificationListPropGetItemDate<
  NotificationListDefaultItem
> = (item) => item.date;
const defaultGetItemDescription: NotificationListPropGetItemDescription<
  NotificationListDefaultItem
> = (item) => item.description;
const defaultGetItemGroup: NotificationListPropGetItemGroup<
  NotificationListDefaultItem
> = (item) => item.group;
const defaultGetItemImage: NotificationListPropGetItemImage<
  NotificationListDefaultItem
> = (item) => item.image;
const defaultGetItemLabel: NotificationListPropGetItemLabel<
  NotificationListDefaultItem
> = (item) => item.label;
const defaultGetItemRead: NotificationListPropGetItemRead<
  NotificationListDefaultItem
> = (item) => item.read;
const defaultGetItemView: NotificationListPropGetItemView<
  NotificationListDefaultItem
> = (item) => item.view;

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
    getItemActions: props.getItemActions || defaultGetItemActions,
    getItemBadges: props.getItemBadges || defaultGetItemBadges,
    getItemDate: props.getItemDate || defaultGetItemDate,
    getItemDescription: props.getItemDescription || defaultGetItemDescription,
    getItemGroup: props.getItemGroup || defaultGetItemGroup,
    getItemImage: props.getItemImage || defaultGetItemImage,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemRead: props.getItemRead || defaultGetItemRead,
    getItemView: props.getItemView || defaultGetItemView,
  };
}

type ReturnedGroup<ITEM, GROUP> = {
  items: ITEM[];
  key: string | number;
  group?: GROUP;
  groupIndex: number;
};

export const noGroupKey = 'no-group';

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

export const getGroups = <ITEM, GROUP>(
  items: ITEM[],
  groups: GROUP[] | undefined,
  groupByDay: boolean,
  getItemGroup: NotificationListPropGetItemGroup<ITEM>,
  getItemDate: NotificationListPropGetItemDate<ITEM>,
  getGroupId: NotificationListPropGetGroupId<GROUP>,
): Array<ReturnedGroup<ITEM, GROUP>> => {
  if (groupByDay) {
    const getItemGroupByDate = (item: ITEM) => {
      const date = getItemDate(item);
      return date ? startOfDay(date).getTime() : undefined;
    };

    return constaGetGroups<ITEM, GROUP>(
      items,
      getItemGroupByDate,
      undefined,
      undefined,
      sortGroup,
      noGroupKey,
    );
  }
  return constaGetGroups(
    items,
    getItemGroup,
    groups,
    getGroupId,
    undefined,
    noGroupKey,
  );
};

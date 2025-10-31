import { format, isToday, isYesterday, startOfDay } from 'date-fns';

import { getGroups as constaGetGroups } from '##/utils/getGroups';

import { NotificationsItemAction } from '../NotificationsItem';
import {
  NotificationsListDefaultGroup,
  NotificationsListDefaultItem,
  NotificationsListPropGetActionIcon,
  NotificationsListPropGetActionLabel,
  NotificationsListPropGetActionOnClick,
  NotificationsListPropGetGroupId,
  NotificationsListPropGetGroupLabel,
  NotificationsListPropGetItemActions,
  NotificationsListPropGetItemBadges,
  NotificationsListPropGetItemDate,
  NotificationsListPropGetItemDescription,
  NotificationsListPropGetItemGroup,
  NotificationsListPropGetItemImage,
  NotificationsListPropGetItemLabel,
  NotificationsListPropGetItemRead,
  NotificationsListPropGetItemView,
  NotificationsListPropGroupLabelFormat,
  NotificationsListProps,
} from './types';

const defaultGetActionIcon: NotificationsListPropGetActionIcon<
  NotificationsItemAction
> = (action) => action.icon;
const defaultGetActionLabel: NotificationsListPropGetActionLabel<
  NotificationsItemAction
> = (action) => action.label;
const defaultGetActionOnClick: NotificationsListPropGetActionOnClick<
  NotificationsItemAction
> = (action) => action.onClick;
const defaultGetGroupId: NotificationsListPropGetGroupId<
  NotificationsListDefaultGroup
> = (group) => group.id;
const defaultGetGroupLabel: NotificationsListPropGetGroupLabel<
  NotificationsListDefaultGroup
> = (group) => group.label;
const defaultGetItemActions: NotificationsListPropGetItemActions<
  NotificationsListDefaultItem
> = (item) => item.actions;
const defaultGetItemBadges: NotificationsListPropGetItemBadges<
  NotificationsListDefaultItem
> = (item) => item.badges;
const defaultGetItemDate: NotificationsListPropGetItemDate<
  NotificationsListDefaultItem
> = (item) => item.date;
const defaultGetItemDescription: NotificationsListPropGetItemDescription<
  NotificationsListDefaultItem
> = (item) => item.description;
const defaultGetItemGroup: NotificationsListPropGetItemGroup<
  NotificationsListDefaultItem
> = (item) => item.group;
const defaultGetItemImage: NotificationsListPropGetItemImage<
  NotificationsListDefaultItem
> = (item) => item.image;
const defaultGetItemLabel: NotificationsListPropGetItemLabel<
  NotificationsListDefaultItem
> = (item) => item.label;
const defaultGetItemRead: NotificationsListPropGetItemRead<
  NotificationsListDefaultItem
> = (item) => item.read;
const defaultGetItemView: NotificationsListPropGetItemView<
  NotificationsListDefaultItem
> = (item) => item.view;

export function withDefaultGetters<ITEM, GROUP, ACTION>(
  props: NotificationsListProps<ITEM, GROUP, ACTION>,
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

export const defaultGroupLabelFormat: NotificationsListPropGroupLabelFormat<
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
  getItemGroup: NotificationsListPropGetItemGroup<ITEM>,
  getItemDate: NotificationsListPropGetItemDate<ITEM>,
  getGroupId: NotificationsListPropGetGroupId<GROUP>,
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

import { IconProps } from '@consta/icons/Icon';

import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import {
  NotificationItemAction,
  NotificationItemBadge,
} from '../NotificationItem';

export type NotificationListDefaultGroup = {
  label: string;
  id: string;
};

export type NotificationListDefaultItem = {
  label: string;
  description?: string;
  image?: string;
  read?: boolean;
  date?: Date;
  badges?: NotificationItemBadge[];
  actions?: NotificationItemAction[];
  onClick?: React.EventHandler<React.MouseEvent>;
  group?: string;
  view?: 'default' | 'user';
};

export type NotificationListPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type NotificationListPropGetItemDescription<ITEM> = (
  item: ITEM,
) => string | undefined;
export type NotificationListPropGetItemImage<ITEM> = (
  item: ITEM,
) => string | undefined;
export type NotificationListPropGetItemRead<ITEM> = (
  item: ITEM,
) => boolean | undefined;
export type NotificationListPropGetItemDate<ITEM> = (
  item: ITEM,
) => Date | undefined;
export type NotificationListPropGetItemBadges<ITEM> = (
  item: ITEM,
) => NotificationItemBadge[] | undefined;
export type NotificationListPropGetItemActions<ITEM> = (
  item: ITEM,
) => NotificationItemAction[] | undefined;
export type NotificationListPropGetItemGroup<ITEM> = (
  item: ITEM,
) => string | undefined;
export type NotificationListPropGetItemView<ITEM> = (
  item: ITEM,
) => 'default' | 'user' | undefined;
export type NotificationListPropItemDateFormat = (date: Date) => string;

export type NotificationListPropGetActionLabel<ACTION> = (
  action: ACTION,
) => string;
export type NotificationListPropGetActionIcon<ACTION> = (
  action: ACTION,
) => React.FC<IconProps> | undefined;
export type NotificationListPropGetActionOnClick<ACTION> = (
  action: ACTION,
) => React.EventHandler<React.MouseEvent> | undefined;

export type NotificationListPropGetGroupLabel<GROUP> = (group: GROUP) => string;
export type NotificationListPropGetGroupId<GROUP> = (
  group: GROUP,
) => string | number;

export type NotificationListPropGroupLabelFormat<GROUP_BY_DAY> =
  GROUP_BY_DAY extends true ? (timestamp: number) => string : never;

export type Props<ITEM, GROUP, ACTION, GROUP_BY_DAY extends boolean> = {
  children?: never;
  items: ITEM[];
  itemDateFormat?: NotificationListPropItemDateFormat;
  title?: string;
  actions?: ACTION[];
  getItemLabel?: NotificationListPropGetItemLabel<ITEM>;
  getItemDescription?: NotificationListPropGetItemDescription<ITEM>;
  getItemImage?: NotificationListPropGetItemImage<ITEM>;
  getItemRead?: NotificationListPropGetItemRead<ITEM>;
  getItemDate?: NotificationListPropGetItemDate<ITEM>;
  getItemBadges?: NotificationListPropGetItemBadges<ITEM>;
  getItemActions?: NotificationListPropGetItemActions<ITEM>;
  getItemGroup?: NotificationListPropGetItemGroup<ITEM>;
  getItemView?: NotificationListPropGetItemView<ITEM>;
  getActionLabel?: NotificationListPropGetActionLabel<ACTION>;
  getActionIcon?: NotificationListPropGetActionIcon<ACTION>;
  getActionOnClick?: NotificationListPropGetActionOnClick<ACTION>;
  getGroupLabel?: NotificationListPropGetGroupLabel<GROUP>;
  getGroupId?: NotificationListPropGetGroupId<GROUP>;
  groupByDay?: GROUP_BY_DAY;
  groupLabelFormat?: NotificationListPropGroupLabelFormat<GROUP_BY_DAY>;
  groups?: GROUP_BY_DAY extends true ? never : GROUP[];
  onClose?: React.EventHandler<React.MouseEvent>;
} & (ACTION extends { label: NotificationItemAction['label'] }
  ? {}
  : { getActionLabel: NotificationListPropGetItemActions<ACTION> }) &
  (GROUP extends { label: NotificationListDefaultGroup['label'] }
    ? {}
    : { getGroupLabel: NotificationListPropGetGroupLabel<GROUP> }) &
  (GROUP extends { id: NotificationListDefaultGroup['id'] }
    ? {}
    : { getGroupId: NotificationListPropGetGroupId<GROUP> }) &
  (ITEM extends { label: NotificationListDefaultItem['label'] }
    ? {}
    : { getItemLabel: NotificationListPropGetItemLabel<ITEM> });

export type NotificationListProps<
  ITEM = NotificationListDefaultItem,
  GROUP = NotificationListDefaultGroup,
  ACTION = NotificationItemAction,
  GROUP_BY_DAY extends boolean = false,
> = PropsWithHTMLAttributesAndRef<
  Props<ITEM, GROUP, ACTION, GROUP_BY_DAY>,
  HTMLDivElement
>;

export type NotificationListComponent = <
  ITEM = NotificationListDefaultItem,
  GROUP = NotificationListDefaultGroup,
  ACTION = NotificationItemAction,
  GROUP_BY_DAY extends boolean = false,
>(
  props: NotificationListProps<ITEM, GROUP, ACTION, GROUP_BY_DAY>,
) => React.ReactNode;

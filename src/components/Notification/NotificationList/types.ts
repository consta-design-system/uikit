import { IconProps } from '@consta/icons/Icon';

import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import {
  NotificationItemAction,
  NotificationItemBadge,
} from '../NotificationItem';

export type NotificationListDefaultGroup = {
  label: string;
  id: string;
  actions?: NotificationItemAction[];
};

import { Group } from '##/utils/getGroups';

export type NotificationListDefaultItem = {
  label: string;
  userName?: string;
  userImage?: string;
  description?: string;
  read?: boolean;
  caption?: string;
  badges?: NotificationItemBadge[];
  actions?: NotificationItemAction[];
  onClick?: React.EventHandler<React.MouseEvent>;
  group?: string;
};

export type NotificationListPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type NotificationListPropGetItemDescription<ITEM> = (
  item: ITEM,
) => string | undefined;

export type NotificationListPropGetItemRead<ITEM> = (
  item: ITEM,
) => boolean | undefined;

export type NotificationListPropGetItemCaption<ITEM> = (
  item: ITEM,
) => string | undefined;

export type NotificationListPropGetItemUserName<ITEM> = (
  item: ITEM,
) => string | undefined;

export type NotificationListPropGetItemUserImage<ITEM> = (
  item: ITEM,
) => string | undefined;

export type NotificationListPropGetItemBadges<ITEM> = (
  item: ITEM,
) => NotificationItemBadge[] | undefined;
export type NotificationListPropGetItemActions<ITEM> = (
  item: ITEM,
) => NotificationItemAction[] | undefined;

export type NotificationListPropGetItemGroup<ITEM> = (
  item: ITEM,
) => string | undefined;

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

export type NotificationListPropGetGroupId<ITEM, GROUP> = (
  group: GROUP,
) => string | undefined;

export type NotificationListPropGetGroupLabel<ITEM, GROUP> = (
  group: Group<ITEM, GROUP>,
) => string | undefined;
export type NotificationListPropGetGroupActions<ITEM, GROUP> = (
  group: Group<ITEM, GROUP>,
) => NotificationItemAction[] | undefined;

export type NotificationListPropSortGroups<ITEM, GROUP> = (
  a: Group<ITEM, GROUP>,
  b: Group<ITEM, GROUP>,
) => number;

export type Props<ITEM, GROUP, ACTION> = {
  children?: never;
  items: ITEM[];
  itemDateFormat?: NotificationListPropItemDateFormat;
  title?: string;
  actions?: ACTION[];
  getItemLabel?: NotificationListPropGetItemLabel<ITEM>;
  getItemDescription?: NotificationListPropGetItemDescription<ITEM>;
  getItemRead?: NotificationListPropGetItemRead<ITEM>;
  getItemCaption?: NotificationListPropGetItemCaption<ITEM>;
  getItemBadges?: NotificationListPropGetItemBadges<ITEM>;
  getItemActions?: NotificationListPropGetItemActions<ITEM>;
  getItemGroup?: NotificationListPropGetItemGroup<ITEM>;
  getItemUserName?: NotificationListPropGetItemUserName<ITEM>;
  getItemUserImage?: NotificationListPropGetItemUserImage<ITEM>;
  getActionLabel?: NotificationListPropGetActionLabel<ACTION>;
  getActionIcon?: NotificationListPropGetActionIcon<ACTION>;
  getActionOnClick?: NotificationListPropGetActionOnClick<ACTION>;
  getGroupId?: NotificationListPropGetGroupId<ITEM, GROUP>;
  getGroupActions?: NotificationListPropGetGroupActions<ITEM, GROUP>;
  getGroupLabel?: NotificationListPropGetGroupLabel<ITEM, GROUP>;
  groups?: GROUP[];
  onClose?: React.EventHandler<React.MouseEvent>;
  sortGroups?: NotificationListPropSortGroups<ITEM, GROUP> | undefined;
} & (ACTION extends { label: NotificationItemAction['label'] }
  ? {}
  : { getActionLabel: NotificationListPropGetItemActions<ACTION> }) &
  (GROUP extends { label: NotificationListDefaultGroup['label'] }
    ? {}
    : {
        getGroupLabel: NotificationListPropGetGroupLabel<ITEM, GROUP>;
      }) &
  (GROUP extends { id: NotificationListDefaultGroup['id'] }
    ? {}
    : { getGroupId: NotificationListPropGetGroupId<ITEM, GROUP> }) &
  (ITEM extends { label: NotificationListDefaultItem['label'] }
    ? {}
    : { getItemLabel: NotificationListPropGetItemLabel<ITEM> });

export type NotificationListProps<
  ITEM = NotificationListDefaultItem,
  GROUP = NotificationListDefaultGroup,
  ACTION = NotificationItemAction,
> = PropsWithHTMLAttributesAndRef<Props<ITEM, GROUP, ACTION>, HTMLDivElement>;

export type NotificationListComponent = <
  ITEM = NotificationListDefaultItem,
  GROUP = NotificationListDefaultGroup,
  ACTION = NotificationItemAction,
>(
  props: NotificationListProps<ITEM, GROUP, ACTION>,
) => React.ReactNode;

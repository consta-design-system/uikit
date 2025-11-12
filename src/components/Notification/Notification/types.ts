import { MixSpaceProps } from '##/mixs/MixSpace';
import { Group } from '##/utils/getGroups';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { NotificationItemAction } from '../NotificationItem';

export type NotificationDefaultGroup = {
  label: string;
  id: string;
  actions?: NotificationItemAction[];
};

export type NotificationDefaultItem = {
  label: string;
  userName?: string;
  userImage?: string;
  content?: React.ReactNode;
  read?: boolean;
  caption?: string;
  actions?: NotificationItemAction[];
  group?: string;
};

export type NotificationPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type NotificationPropGetItemContent<ITEM> = (
  item: ITEM,
) => React.ReactNode;

export type NotificationPropGetItemRead<ITEM> = (
  item: ITEM,
) => boolean | undefined;

export type NotificationPropGetItemCaption<ITEM> = (
  item: ITEM,
) => React.ReactNode;

export type NotificationPropGetItemUserName<ITEM> = (
  item: ITEM,
) => string | undefined;

export type NotificationPropGetItemUserImage<ITEM> = (
  item: ITEM,
) => string | undefined;

export type NotificationPropGetItemActions<ITEM> = (
  item: ITEM,
) => NotificationItemAction[] | undefined;

export type NotificationPropGetItemGroup<ITEM> = (
  item: ITEM,
) => string | number | undefined;

export type NotificationPropGetGroupId<GROUP> = (
  group: GROUP,
) => string | undefined;

export type NotificationPropGetGroupLabel<ITEM, GROUP> = (
  group: Group<ITEM, GROUP>,
) => string | undefined;
export type NotificationPropGetGroupActions<ITEM, GROUP> = (
  group: Group<ITEM, GROUP>,
) => NotificationItemAction[] | undefined;

export type NotificationPropSortGroups<ITEM, GROUP> = (
  a: Group<ITEM, GROUP>,
  b: Group<ITEM, GROUP>,
) => number;

export type NotificationPropGetItemRender<ITEM> = (
  item: ITEM,
) => React.ReactNode;

export type NotificationPropGetGroupRender<ITEM, GROUP> = (
  group: Group<ITEM, GROUP>,
) => React.ReactNode;

export type NotificationPropGetItemClassName<ITEM> = (item: ITEM) => string;

export type NotificationPropOnItemClick<ITEM> = (
  item: ITEM,
  props: { e: React.MouseEvent },
) => void;

export type NotificationProps<
  ITEM = NotificationDefaultItem,
  GROUP = NotificationDefaultGroup,
> = PropsWithHTMLAttributesAndRef<
  {
    children?: never;
    items: ITEM[];
    getItemLabel?: NotificationPropGetItemLabel<ITEM>;
    getItemClassName?: NotificationPropGetItemClassName<ITEM>;
    getItemContent?: NotificationPropGetItemContent<ITEM>;
    getItemRead?: NotificationPropGetItemRead<ITEM>;
    getItemCaption?: NotificationPropGetItemCaption<ITEM>;
    itemRender?: NotificationPropGetItemRender<ITEM>;
    getItemActions?: NotificationPropGetItemActions<ITEM>;
    getItemGroup?: NotificationPropGetItemGroup<ITEM>;
    getItemUserName?: NotificationPropGetItemUserName<ITEM>;
    getItemUserImage?: NotificationPropGetItemUserImage<ITEM>;
    onItemClick?: NotificationPropOnItemClick<ITEM>;
    getGroupId?: NotificationPropGetGroupId<GROUP>;
    getGroupActions?: NotificationPropGetGroupActions<ITEM, GROUP>;
    getGroupLabel?: NotificationPropGetGroupLabel<ITEM, GROUP>;
    groupRender?: NotificationPropGetGroupRender<ITEM, GROUP>;
    groups?: GROUP[];
    sortGroups?: NotificationPropSortGroups<ITEM, GROUP> | undefined;
    itemSpace?: MixSpaceProps;
    groupSpace?: MixSpaceProps;
    scrollContainerRef?: React.RefObject<HTMLDivElement>;
  } & (GROUP extends { id: NotificationDefaultGroup['id'] }
    ? {}
    : { getGroupId: NotificationPropGetGroupId<GROUP> }),
  HTMLDivElement
>;

export type NotificationComponent = <
  ITEM = NotificationDefaultItem,
  GROUP = NotificationDefaultGroup,
>(
  props: NotificationProps<ITEM, GROUP>,
) => React.ReactNode;

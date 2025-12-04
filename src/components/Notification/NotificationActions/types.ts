import { IconComponent } from '@consta/icons/Icon';

import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type NotificationActionsDefaultItem = {
  label: string;
  onClick?: React.EventHandler<React.MouseEvent>;
  icon?: IconComponent;
};

export type NotificationActionsPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type NotificationActionsPropGetItemIcon<ITEM> = (
  item: ITEM,
) => IconComponent | undefined;
export type NotificationActionsPropGetItemOnClick<ITEM> = (
  item: ITEM,
) => React.EventHandler<React.MouseEvent> | undefined;

export type NotificationActionsOnItemClick<ITEM> = (
  item: ITEM,
  props: {
    e: React.MouseEvent;
  },
) => void;

export type NotificationActionsProps<ITEM = NotificationActionsDefaultItem> =
  PropsWithHTMLAttributesAndRef<
    {
      items?: ITEM[];
      onlyIcon?: boolean;
      opened?: boolean;
      onOpen?: (value: boolean) => void;
      onItemClick?: NotificationActionsOnItemClick<ITEM>;
      scrollContainerRef?: React.RefObject<HTMLDivElement>;
    },
    HTMLButtonElement
  > & {
    getItemLabel?: NotificationActionsPropGetItemLabel<ITEM>;
    getItemOnClick?: NotificationActionsPropGetItemOnClick<ITEM>;
    getItemIcon?: NotificationActionsPropGetItemIcon<ITEM>;
  } & (ITEM extends { label: NotificationActionsDefaultItem['label'] }
      ? {}
      : { getItemLabel: NotificationActionsPropGetItemLabel<ITEM> });

export type NotificationActionsComponent = <
  ITEM = NotificationActionsDefaultItem,
>(
  props: NotificationActionsProps<ITEM>,
) => React.ReactNode;

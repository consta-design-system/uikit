import { IconComponent } from '@consta/icons/Icon';

import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

export type ButtonMenuDefaultItem = {
  label: string;
  onClick?: React.EventHandler<React.MouseEvent>;
  icon?: IconComponent;
};

export type NotificationsActionsPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type NotificationsActionsPropGetItemIcon<ITEM> = (
  item: ITEM,
) => IconComponent | undefined;
export type NotificationsActionsPropGetItemOnClick<ITEM> = (
  item: ITEM,
) => React.EventHandler<React.MouseEvent> | undefined;

export type NotificationsActionsOnItemClick<ITEM> = (
  item: ITEM,
  props: {
    e: React.MouseEvent;
  },
) => void;

export type NotificationsActionsProps<ITEM = ButtonMenuDefaultItem> =
  PropsWithHTMLAttributes<
    {
      items?: ITEM[];
      mainButtonOnlyIcon?: boolean;
      opened?: boolean;
      onOpen?: (value: boolean) => void;
      onItemClick?: NotificationsActionsOnItemClick<ITEM>;
    },
    HTMLButtonElement
  > & {
    getItemLabel?: NotificationsActionsPropGetItemLabel<ITEM>;
    getItemOnClick?: NotificationsActionsPropGetItemOnClick<ITEM>;
    getItemIcon?: NotificationsActionsPropGetItemIcon<ITEM>;
  } & (ITEM extends { label: ButtonMenuDefaultItem['label'] }
      ? {}
      : { getItemLabel: NotificationsActionsPropGetItemLabel<ITEM> });

export type NotificationsActionsComponent = <ITEM = ButtonMenuDefaultItem>(
  props: NotificationsActionsProps<ITEM>,
) => React.ReactNode;

import { IconComponent } from '@consta/icons/Icon';

import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

export type ButtonMenuDefaultItem = {
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

export type NotificationActionsProps<ITEM = ButtonMenuDefaultItem> =
  PropsWithHTMLAttributes<
    {
      items?: ITEM[];
      mainButtonOnlyIcon?: boolean;
      opened?: boolean;
      onOpen?: (value: boolean) => void;
      onItemClick?: NotificationActionsOnItemClick<ITEM>;
    },
    HTMLButtonElement
  > & {
    getItemLabel?: NotificationActionsPropGetItemLabel<ITEM>;
    getItemOnClick?: NotificationActionsPropGetItemOnClick<ITEM>;
    getItemIcon?: NotificationActionsPropGetItemIcon<ITEM>;
  } & (ITEM extends { label: ButtonMenuDefaultItem['label'] }
      ? {}
      : { getItemLabel: NotificationActionsPropGetItemLabel<ITEM> });

export type NotificationActionsComponent = <ITEM = ButtonMenuDefaultItem>(
  props: NotificationActionsProps<ITEM>,
) => React.ReactNode;

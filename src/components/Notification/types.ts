import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { NotificationItemAction } from './NotificationItem';
import {
  NotificationListDefaultGroup,
  NotificationListDefaultItem,
  Props,
} from './NotificationList';

export type NotificationProps<
  ITEM = NotificationListDefaultItem,
  GROUP = NotificationListDefaultGroup,
  ACTION = NotificationItemAction,
  GROUP_BY_DAY extends boolean = false,
> = PropsWithHTMLAttributesAndRef<
  Omit<Props<ITEM, GROUP, ACTION, GROUP_BY_DAY>, 'onClose'> & {
    listClassName?: string;
    isMobile?: boolean;
  },
  HTMLButtonElement
>;

export type NotificationComponent = <
  ITEM = NotificationListDefaultItem,
  GROUP = NotificationListDefaultGroup,
  ACTION = NotificationItemAction,
  GROUP_BY_DAY extends boolean = false,
>(
  props: NotificationProps<ITEM, GROUP, ACTION, GROUP_BY_DAY>,
) => React.ReactNode;

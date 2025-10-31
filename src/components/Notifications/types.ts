import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { NotificationsItemAction } from './NotificationsItem';
import {
  NotificationsListDefaultGroup,
  NotificationsListDefaultItem,
  Props,
} from './NotificationsList';

export type NotificationsProps<
  ITEM = NotificationsListDefaultItem,
  GROUP = NotificationsListDefaultGroup,
  ACTION = NotificationsItemAction,
  GROUP_BY_DAY extends boolean = false,
> = PropsWithHTMLAttributesAndRef<
  Omit<Props<ITEM, GROUP, ACTION, GROUP_BY_DAY>, 'onClose'> & {
    listClassName?: string;
    isMobile?: boolean;
  },
  HTMLButtonElement
>;

export type NotificationsComponent = <
  ITEM = NotificationsListDefaultItem,
  GROUP = NotificationsListDefaultGroup,
  ACTION = NotificationsItemAction,
  GROUP_BY_DAY extends boolean = false,
>(
  props: NotificationsProps<ITEM, GROUP, ACTION, GROUP_BY_DAY>,
) => React.ReactNode;

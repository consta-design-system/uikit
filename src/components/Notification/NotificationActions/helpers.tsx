import {
  NotificationActionsDefaultItem,
  NotificationActionsPropGetItemIcon,
  NotificationActionsPropGetItemLabel,
  NotificationActionsPropGetItemOnClick,
  NotificationActionsProps,
} from './types';

const defaultGetItemIcon: NotificationActionsPropGetItemIcon<
  NotificationActionsDefaultItem
> = (item) => item.icon;
const defaultGetItemLabel: NotificationActionsPropGetItemLabel<
  NotificationActionsDefaultItem
> = (item) => item.label;
const defaultGetItemOnClick: NotificationActionsPropGetItemOnClick<
  NotificationActionsDefaultItem
> = (item) => item.onClick;

export function withDefaultGetters<ITEM>(
  props: NotificationActionsProps<ITEM>,
) {
  return {
    ...props,
    getItemIcon: props.getItemIcon || defaultGetItemIcon,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemOnClick: props.getItemOnClick || defaultGetItemOnClick,
  };
}

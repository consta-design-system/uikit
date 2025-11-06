import {
  ButtonMenuDefaultItem,
  NotificationActionsPropGetItemIcon,
  NotificationActionsPropGetItemLabel,
  NotificationActionsPropGetItemOnClick,
  NotificationActionsProps,
} from './types';

const defaultGetItemIcon: NotificationActionsPropGetItemIcon<
  ButtonMenuDefaultItem
> = (item) => item.icon;
const defaultGetItemLabel: NotificationActionsPropGetItemLabel<
  ButtonMenuDefaultItem
> = (item) => item.label;
const defaultGetItemOnClick: NotificationActionsPropGetItemOnClick<
  ButtonMenuDefaultItem
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

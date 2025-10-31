import {
  ButtonMenuDefaultItem,
  NotificationsActionsPropGetItemIcon,
  NotificationsActionsPropGetItemLabel,
  NotificationsActionsPropGetItemOnClick,
  NotificationsActionsProps,
} from './types';

const defaultGetItemIcon: NotificationsActionsPropGetItemIcon<
  ButtonMenuDefaultItem
> = (item) => item.icon;
const defaultGetItemLabel: NotificationsActionsPropGetItemLabel<
  ButtonMenuDefaultItem
> = (item) => item.label;
const defaultGetItemOnClick: NotificationsActionsPropGetItemOnClick<
  ButtonMenuDefaultItem
> = (item) => item.onClick;

export function withDefaultGetters<ITEM>(
  props: NotificationsActionsProps<ITEM>,
) {
  return {
    ...props,
    getItemIcon: props.getItemIcon || defaultGetItemIcon,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemOnClick: props.getItemOnClick || defaultGetItemOnClick,
  };
}

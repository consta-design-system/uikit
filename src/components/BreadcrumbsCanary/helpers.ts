import {
  BreadcrumbsPropGetItemActive,
  BreadcrumbsPropGetItemHref,
  BreadcrumbsPropGetItemIcon,
  BreadcrumbsPropGetItemLabel,
  BreadcrumbsPropGetItemOnClick,
  BreadcrumbsPropOnItemClick,
  BreadcrumbsProps,
  DefaultItem,
} from './types';

const defaultGetItemLabel: BreadcrumbsPropGetItemLabel<DefaultItem> = (item) => item.label;
const defaultGetItemIcon: BreadcrumbsPropGetItemIcon<DefaultItem> = (item) => item.icon;
const defaultGetItemActive: BreadcrumbsPropGetItemActive<DefaultItem> = (item) => item.active;
const defaultGetItemHref: BreadcrumbsPropGetItemHref<DefaultItem> = (item) => item.href;
const defaultGetItemOnClick: BreadcrumbsPropGetItemOnClick<DefaultItem> = (item) => item.onClick;

export function withDefaultGetters<ITEM>(props: BreadcrumbsProps<ITEM>) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemActive: props.getItemActive || defaultGetItemActive,
    getItemHref: props.getItemHref || defaultGetItemHref,
    getItemOnClick: props.getItemOnClick || defaultGetItemOnClick,
    getItemIcon: props.getItemIcon || defaultGetItemIcon,
  };
}

export function getItemClick<ITEM>(
  item: ITEM,
  getItemOnClick: BreadcrumbsPropGetItemOnClick<ITEM>,
  onItemClick?: BreadcrumbsPropOnItemClick<ITEM>,
): React.MouseEventHandler {
  return (e) => {
    onItemClick?.({ e, item });
    getItemOnClick(item)?.(e);
  };
}

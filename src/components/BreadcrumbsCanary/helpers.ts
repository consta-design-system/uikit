import {
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
const defaultGetItemHref: BreadcrumbsPropGetItemHref<DefaultItem> = (item) => item.href;
const defaultGetItemOnClick: BreadcrumbsPropGetItemOnClick<DefaultItem> = (item) => item.onClick;

export function withDefaultGetters<ITEM>(props: BreadcrumbsProps<ITEM>) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
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

export const iconSizeMap = {
  xs: 'xs',
  s: 'xs',
  m: 'xs',
  l: 'm',
} as const;

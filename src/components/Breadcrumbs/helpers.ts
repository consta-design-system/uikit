import {
  BreadcrumbsDefaultItem,
  BreadcrumbsPropGetItemHref,
  BreadcrumbsPropGetItemIcon,
  BreadcrumbsPropGetItemLabel,
  BreadcrumbsPropGetItemOnClick,
  BreadcrumbsPropGetItemSubMenu,
  BreadcrumbsProps,
} from './types';

const defaultGetItemLabel: BreadcrumbsPropGetItemLabel<
  BreadcrumbsDefaultItem
> = (item) => item.label;
const defaultGetItemIcon: BreadcrumbsPropGetItemIcon<BreadcrumbsDefaultItem> = (
  item,
) => item.icon;
const defaultGetItemHref: BreadcrumbsPropGetItemHref<BreadcrumbsDefaultItem> = (
  item,
) => item.href;
const defaultGetItemOnClick: BreadcrumbsPropGetItemOnClick<
  BreadcrumbsDefaultItem
> = (item) => item.onClick;
const defaultGetItemSubMenu: BreadcrumbsPropGetItemSubMenu<
  BreadcrumbsDefaultItem
> = (item) => item.subMenu;

export function withDefaultGetters(props: BreadcrumbsProps) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemHref: props.getItemHref || defaultGetItemHref,
    getItemOnClick: props.getItemOnClick || defaultGetItemOnClick,
    getItemIcon: props.getItemIcon || defaultGetItemIcon,
    getItemSubMenu: props.getItemSubMenu || defaultGetItemSubMenu,
  };
}

export const iconSizeMap = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 's',
} as const;

import {
  BreadcrumbsPropGetItemHref,
  BreadcrumbsPropGetItemIcon,
  BreadcrumbsPropGetItemLabel,
  BreadcrumbsPropGetItemOnClick,
  BreadcrumbsPropGetItemSubMenu,
  BreadcrumbsProps,
  DefaultItem,
} from './types';

const defaultGetItemLabel: BreadcrumbsPropGetItemLabel<DefaultItem> = (item) =>
  item.label;
const defaultGetItemIcon: BreadcrumbsPropGetItemIcon<DefaultItem> = (item) =>
  item.icon;
const defaultGetItemHref: BreadcrumbsPropGetItemHref<DefaultItem> = (item) =>
  item.href;
const defaultGetItemOnClick: BreadcrumbsPropGetItemOnClick<DefaultItem> = (
  item,
) => item.onClick;
const defaultGetItemSubMenu: BreadcrumbsPropGetItemSubMenu<DefaultItem> = (
  item,
) => item.subMenu;

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

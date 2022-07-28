// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from 'react';

import {
  DefaultMenuGroup,
  DefaultMenuItem,
  PortalMenuPropGetGroupKey,
  PortalMenuPropGetGroupLabel,
  PortalMenuPropGetItemActive,
  PortalMenuPropGetItemBadge,
  PortalMenuPropGetItemDescription,
  PortalMenuPropGetItemGroupId,
  PortalMenuPropGetItemHref,
  PortalMenuPropGetItemLabel,
  PortalMenuPropGetItemOnClick,
  PortalMenuPropGetItemParams,
  PortalMenuPropGetItemSubMenu,
  PortalMenuProps,
} from '../PortalMenu/types';

// Items

export const defaultGetItemLabel: PortalMenuPropGetItemLabel<
  DefaultMenuItem
> = (item) => item.label;
export const defaultGetItemActive: PortalMenuPropGetItemActive<
  DefaultMenuItem
> = (item) => item.active;
export const defaultGetItemDescription: PortalMenuPropGetItemDescription<
  DefaultMenuItem
> = (item) => item.description;
export const defaultGetItemOnClick: PortalMenuPropGetItemOnClick<
  DefaultMenuItem
> = (item) => item.onClick;
export const defaultGetItemBadge: PortalMenuPropGetItemBadge<
  DefaultMenuItem
> = (item) => item.badge;
export const defaultGetItemGroupId: PortalMenuPropGetItemGroupId<
  DefaultMenuItem
> = (item) => item.groupId;
export const defaultGetItemSubMenu: PortalMenuPropGetItemSubMenu<
  DefaultMenuItem
> = (item) => item.subMenu;
export const defaultGetItemHref: PortalMenuPropGetItemHref<DefaultMenuItem> = (
  item,
) => item.href;
export const defaultGetItemParams: PortalMenuPropGetItemParams<
  DefaultMenuItem
> = (item) => item.params;

// Group

export const defaultGetGroupKey: PortalMenuPropGetGroupKey<DefaultMenuGroup> = (
  item,
) => item.id;
export const defaultGetGroupLabel: PortalMenuPropGetGroupLabel<
  DefaultMenuGroup
> = (item) => item.label;

export function withDefaultGetters<
  ITEM = DefaultMenuItem,
  GROUP = DefaultMenuGroup,
>(props: PortalMenuProps<ITEM, GROUP>) {
  return {
    ...props,
    getItemLabel: props.getItemLabel ?? defaultGetItemLabel,
    getItemActive: props.getItemActive ?? defaultGetItemActive,
    getItemDescription: props.getItemDescription ?? defaultGetItemDescription,
    getItemOnClick: props.getItemOnClick ?? defaultGetItemOnClick,
    getItemBadge: props.getItemBadge ?? defaultGetItemBadge,
    getItemGroupId: props.getItemGroupId ?? defaultGetItemGroupId,
    getItemSubMenu: props.getItemSubMenu ?? defaultGetItemSubMenu,
    getItemHref: props.getItemHref ?? defaultGetItemHref,
    getItemParams: props.getItemParams ?? defaultGetItemParams,
    getGroupKey: props.getGroupKey ?? defaultGetGroupKey,
    getGroupLabel: props.getGroupLabel ?? defaultGetGroupLabel,
  };
}

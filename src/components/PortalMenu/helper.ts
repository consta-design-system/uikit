import {
  DefaultMenuGroup,
  DefaultMenuItem,
  PortalMenuPropGetGroupKey,
  PortalMenuPropGetGroupLabel,
  PortalMenuPropGetItemActive,
  PortalMenuPropGetItemBadge,
  PortalMenuPropGetItemDescription,
  PortalMenuPropGetItemGroupId,
  PortalMenuPropGetItemKey,
  PortalMenuPropGetItemLabel,
  PortalMenuPropGetItemOnClick,
  PortalMenuPropGetItemSubMenu,
  PortalMenuProps,
} from './types';

// Items

export const defaultGetItemKey: PortalMenuPropGetItemKey<DefaultMenuItem> = (item) => item.key;
export const defaultGetItemLabel: PortalMenuPropGetItemLabel<DefaultMenuItem> = (item) =>
  item.label;
export const defaultGetItemActive: PortalMenuPropGetItemActive<DefaultMenuItem> = (item) =>
  item.active;
export const defaultGetItemDescription: PortalMenuPropGetItemDescription<DefaultMenuItem> = (
  item,
) => item.description;
export const defaultGetItemOnClick: PortalMenuPropGetItemOnClick<DefaultMenuItem> = (item) =>
  item.onClick;
export const defaultGetItemBadge: PortalMenuPropGetItemBadge<DefaultMenuItem> = (item) =>
  item.badge;
export const defaultGetItemGroupId: PortalMenuPropGetItemGroupId<DefaultMenuItem> = (item) =>
  item.groupId;
export const defaultGetItemSubMenu: PortalMenuPropGetItemSubMenu<DefaultMenuItem> = (item) =>
  item.subMenu;

// Group

export const defaultGetGroupKey: PortalMenuPropGetGroupKey<DefaultMenuGroup> = (item) => item.id;
export const defaultGetGroupLabel: PortalMenuPropGetGroupLabel<DefaultMenuGroup> = (item) =>
  item.label;

export function withDefaultGetters<ITEM = DefaultMenuItem, GROUP = DefaultMenuGroup>(
  props: PortalMenuProps<ITEM, GROUP>,
) {
  return {
    ...props,
    getItemKey: props.getItemKey ?? defaultGetItemKey,
    getItemLabel: props.getItemLabel ?? defaultGetItemLabel,
    getItemActive: props.getItemActive ?? defaultGetItemActive,
    getItemDescription: props.getItemDescription ?? defaultGetItemDescription,
    getItemOnClick: props.getItemOnClick ?? defaultGetItemOnClick,
    getItemBadge: props.getItemBadge ?? defaultGetItemBadge,
    getItemGroupId: props.getItemGroupId ?? defaultGetItemGroupId,
    getItemSubMenu: props.getItemSubMenu ?? defaultGetItemSubMenu,
    getGroupKey: props.getGroupKey ?? defaultGetGroupKey,
    getGroupLabel: props.getGroupLabel ?? defaultGetGroupLabel,
  };
}

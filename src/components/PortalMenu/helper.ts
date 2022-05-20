import {
  DefaultMenuGroup,
  DefaultNavigationItem,
  DefaultPackageItem,
  PortalMenuPropGetGroupKey,
  PortalMenuPropGetGroupLabel,
  PortalMenuPropGetNavigationActive,
  PortalMenuPropGetNavigationKey,
  PortalMenuPropGetNavigationLabel,
  PortalMenuPropGetNavigationOnClick,
  PortalMenuPropGetNavigationSubMenu,
  PortalMenuPropGetPackageActive,
  PortalMenuPropGetPackageBadgeLabel,
  PortalMenuPropGetPackageBadgeStatus,
  PortalMenuPropGetPackageBadgeView,
  PortalMenuPropGetPackageDescription,
  PortalMenuPropGetPackageGroupId,
  PortalMenuPropGetPackageKey,
  PortalMenuPropGetPackageLabel,
  PortalMenuPropGetPackageOnClick,
  PortalMenuProps,
} from './types';

// Navigation

export const defaultGetNavigationKey: PortalMenuPropGetNavigationKey<DefaultNavigationItem> = (
  item,
) => item.key;
export const defaultGetNavigationLabel: PortalMenuPropGetNavigationLabel<DefaultNavigationItem> = (
  item,
) => item.label;
export const defaultGetNavigationActive: PortalMenuPropGetNavigationActive<DefaultNavigationItem> = (
  item,
) => item.active;
export const defaultGetNavigationOnClick: PortalMenuPropGetNavigationOnClick<DefaultNavigationItem> = (
  item,
) => item.onClick;
export const defaultGetNavigationSubMenu: PortalMenuPropGetNavigationSubMenu<DefaultNavigationItem> = (
  item,
) => item.subMenu;

// Menu

export const defaultGetPackageKey: PortalMenuPropGetPackageKey<DefaultPackageItem> = (item) =>
  item.key;
export const defaultGetPackageLabel: PortalMenuPropGetPackageLabel<DefaultPackageItem> = (item) =>
  item.label;
export const defaultGetPackageActive: PortalMenuPropGetPackageActive<DefaultPackageItem> = (item) =>
  item.active;
export const defaultGetPackageDescription: PortalMenuPropGetPackageDescription<DefaultPackageItem> = (
  item,
) => item.description;
export const defaultGetPackagenOnClick: PortalMenuPropGetPackageOnClick<DefaultPackageItem> = (
  item,
) => item.onClick;
export const defaultGetPackagenBadgeLabel: PortalMenuPropGetPackageBadgeLabel<DefaultPackageItem> = (
  item,
) => item.badgeLabel;
export const defaultGetPackagenBadgeStatus: PortalMenuPropGetPackageBadgeStatus<DefaultPackageItem> = (
  item,
) => item.badgeStatus;
export const defaultGetPackagenBadgeView: PortalMenuPropGetPackageBadgeView<DefaultPackageItem> = (
  item,
) => item.badgeView;
export const defaultGetPackageGroupId: PortalMenuPropGetPackageGroupId<DefaultPackageItem> = (
  item,
) => item.groupId;

// Group

export const defaultGetGroupKey: PortalMenuPropGetGroupKey<DefaultMenuGroup> = (item) => item.id;
export const defaultGetGroupLabel: PortalMenuPropGetGroupLabel<DefaultMenuGroup> = (item) =>
  item.label;

export function withDefaultGetters<
  NAVIGATION = DefaultNavigationItem,
  MENU = DefaultPackageItem,
  GROUP = DefaultMenuGroup
>(props: PortalMenuProps<NAVIGATION, MENU, GROUP>) {
  return {
    ...props,
    getNavigationKey: props.getNavigationKey ?? defaultGetNavigationKey,
    getNavigationLabel: props.getNavigationLabel ?? defaultGetNavigationLabel,
    getNavigationActive: props.getNavigationActive ?? defaultGetNavigationActive,
    getNavigationOnClick: props.getNavigationOnClick ?? defaultGetNavigationOnClick,
    getNavigationSubMenu: props.getNavigationSubMenu ?? defaultGetNavigationSubMenu,
    getPackageKey: props.getPackageKey ?? defaultGetPackageKey,
    getPackageLabel: props.getPackageLabel ?? defaultGetPackageLabel,
    getPackageActive: props.getPackageActive ?? defaultGetPackageActive,
    getPackageDescription: props.getPackageDescription ?? defaultGetPackageDescription,
    getPackageOnClick: props.getPackageOnClick ?? defaultGetPackagenOnClick,
    getPackageBadgeLabel: props.getPackageBadgeLabel ?? defaultGetPackagenBadgeLabel,
    getPackageBadgeStatus: props.getPackageBadgeStatus ?? defaultGetPackagenBadgeStatus,
    getPackageBadgeView: props.getPackageBadgeView ?? defaultGetPackagenBadgeView,
    getPackageGroupId: props.getPackageGroupId ?? defaultGetPackageGroupId,
    getGroupKey: props.getGroupKey ?? defaultGetGroupKey,
    getGroupLabel: props.getGroupLabel ?? defaultGetGroupLabel,
  };
}

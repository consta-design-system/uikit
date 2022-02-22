import { isNotNil } from '../../utils/type-guards';
import { TextPropSize } from '../Text/Text';

import {
  ContextMenuGroupDefault,
  ContextMenuItemDefault,
  ContextMenuLevelProps,
  ContextMenuPropGetGroupId,
  ContextMenuPropGetGroupLabel,
  ContextMenuPropGetItemAs,
  ContextMenuPropGetItemAttributes,
  ContextMenuPropGetItemDisabled,
  ContextMenuPropGetItemGroupId,
  ContextMenuPropGetItemKey,
  ContextMenuPropGetItemLabel,
  ContextMenuPropGetItemLeftIcon,
  ContextMenuPropGetItemLeftSide,
  ContextMenuPropGetItemOnClick,
  ContextMenuPropGetItemRightIcon,
  ContextMenuPropGetItemRightSide,
  ContextMenuPropGetItemStatus,
  ContextMenuPropGetItemSubMenu,
  ContextMenuProps,
  ContextMenuPropSize,
  GetLevelsParams,
  Level,
  MappersGroup,
  MappersItem,
} from './types';

const defaultGetItemKey: ContextMenuPropGetItemKey<ContextMenuItemDefault> = (item) => item.key;
const defaultGetItemRightSide: ContextMenuPropGetItemRightSide<ContextMenuItemDefault> = (item) =>
  item.rightSide;
const defaultGetItemLeftSide: ContextMenuPropGetItemLeftSide<ContextMenuItemDefault> = (item) =>
  item.leftSide;
const defaultGetItemRightIcon: ContextMenuPropGetItemRightIcon<ContextMenuItemDefault> = (item) =>
  item.rightIcon;
const defaultGetItemLeftIcon: ContextMenuPropGetItemLeftIcon<ContextMenuItemDefault> = (item) =>
  item.leftIcon;
const defaultGetItemStatus: ContextMenuPropGetItemStatus<ContextMenuItemDefault> = (item) =>
  item.status;
const defaultGetItemDisabled: ContextMenuPropGetItemDisabled<ContextMenuItemDefault> = (item) =>
  item.disabled;
const defaultGetItemLabel: ContextMenuPropGetItemLabel<ContextMenuItemDefault> = (item) =>
  item.label;
const defaultGetItemOnClick: ContextMenuPropGetItemOnClick<ContextMenuItemDefault> = (item) =>
  item.onClick;
const defaultGetItemSubMenu: ContextMenuPropGetItemSubMenu<ContextMenuItemDefault> = (item) =>
  item.subMenu;
const defaultGetItemAs: ContextMenuPropGetItemAs<ContextMenuItemDefault> = (item) => item.as;
const defaultGetItemAttributes: ContextMenuPropGetItemAttributes<ContextMenuItemDefault> = (item) =>
  item.attributes;
const defaultGetItemGroupId: ContextMenuPropGetItemGroupId<ContextMenuItemDefault> = (item) =>
  item.groupId;

const defaultGetGroupId: ContextMenuPropGetGroupId<ContextMenuGroupDefault> = (group) => group.id;
const defaultGetGroupLabel: ContextMenuPropGetGroupLabel<ContextMenuGroupDefault> = (group) =>
  group.label;

export function withDefaultGetters<ITEM, GROUP>(props: ContextMenuProps<ITEM, GROUP>) {
  return {
    ...props,
    getItemKey: props.getItemKey || defaultGetItemKey,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemRightSide: props.getItemRightSide || defaultGetItemRightSide,
    getItemLeftSide: props.getItemLeftSide || defaultGetItemLeftSide,
    getItemRightIcon: props.getItemRightIcon || defaultGetItemRightIcon,
    getItemLeftIcon: props.getItemLeftIcon || defaultGetItemLeftIcon,
    getItemSubMenu: props.getItemSubMenu || defaultGetItemSubMenu,
    getItemStatus: props.getItemStatus || defaultGetItemStatus,
    getItemDisabled: props.getItemDisabled || defaultGetItemDisabled,
    getItemOnClick: props.getItemOnClick || defaultGetItemOnClick,
    getItemAs: props.getItemAs || defaultGetItemAs,
    getItemAttributes: props.getItemAttributes || defaultGetItemAttributes,
    getItemGroupId: props.getItemGroupId || defaultGetItemGroupId,
    getGroupId: props.getGroupId || defaultGetGroupId,
    getGroupLabel: props.getGroupLabel || defaultGetGroupLabel,
  };
}

export const getItemMappers = <ITEM, GROUP>(
  props: ContextMenuLevelProps<ITEM, GROUP>,
): Required<MappersItem<ITEM>> => ({
  getItemKey: props.getItemKey,
  getItemLabel: props.getItemLabel,
  getItemRightSide: props.getItemRightSide,
  getItemLeftSide: props.getItemLeftSide,
  getItemSubMenu: props.getItemSubMenu,
  getItemStatus: props.getItemStatus,
  getItemDisabled: props.getItemDisabled,
  getItemOnClick: props.getItemOnClick,
  getItemAs: props.getItemAs,
  getItemAttributes: props.getItemAttributes,
  getItemGroupId: props.getItemGroupId,
  getItemLeftIcon: props.getItemLeftIcon,
  getItemRightIcon: props.getItemRightIcon,
});

export const getItem = <ITEM>(item: ITEM, props: Required<MappersItem<ITEM>>) => {
  const {
    getItemAs,
    getItemAttributes,
    getItemDisabled,
    getItemKey,
    getItemLabel,
    getItemLeftSide,
    getItemOnClick,
    getItemRightSide,
    getItemLeftIcon,
    getItemRightIcon,
    getItemStatus,
    getItemSubMenu,
    getItemGroupId,
  } = props;
  return {
    key: getItemKey(item),
    label: getItemLabel(item),
    leftSide: getItemLeftSide(item),
    rightSide: getItemRightSide(item),
    disabled: getItemDisabled(item),
    as: getItemAs(item),
    attributes: getItemAttributes(item),
    onClick:
      typeof getItemOnClick(item) === 'function'
        ? (e: React.MouseEvent<HTMLDivElement>) => {
            getItemOnClick(item)?.({ e, item });
          }
        : undefined,
    status: getItemStatus(item),
    subMenu: getItemSubMenu(item),
    groupId: getItemGroupId(item),
    leftIcon: getItemLeftIcon(item),
    rightIcon: getItemRightIcon(item),
  };
};

export const getGroup = <GROUP>(group: GROUP, props: Required<MappersGroup<GROUP>>) => {
  const { getGroupId, getGroupLabel } = props;
  return {
    id: getGroupId(group),
    name: getGroupLabel(group),
  };
};

const findItem = <ITEM>(
  params: Omit<GetLevelsParams<ITEM>, 'levels'> & { key: ContextMenuItemDefault['key'] },
): ITEM | undefined => {
  const { items, getItemKey, getItemSubMenu, key, getItemLabel } = params;
  for (const item of items) {
    if (getItemKey(item) ?? getItemLabel(item) === key) {
      return item;
    }
    const subItems = typeof getItemSubMenu === 'function' && getItemSubMenu(item);
    if (subItems) {
      const subItem = findItem({
        items: subItems,
        key,
        getItemLabel,
        getItemKey,
        getItemSubMenu,
      });
      if (subItem) {
        return subItem;
      }
    }
  }
  return undefined;
};

export const getLevels = <ITEM>(params: GetLevelsParams<ITEM>): Level<ITEM>[] => {
  const { levels, items, getItemKey, getItemSubMenu, getItemLabel } = params;
  return levels.map((level) => ({
    ...level,
    items: level.items
      .map((item) =>
        findItem({
          items,
          getItemSubMenu,
          getItemKey,
          getItemLabel,
          key: getItemKey(item) ?? getItemLabel(item),
        }),
      )
      .filter(isNotNil),
  }));
};

export const getItemIndex = (groupId: number | string, itemIndex: number) =>
  `${groupId}-${itemIndex}`;

export const sizeMap: Record<ContextMenuPropSize, TextPropSize> = {
  xs: '2xs',
  s: '2xs',
  m: 'xs',
  l: 's',
};

import { isNotNil } from '../../utils/type-guards';
import {
  ContextMenuGroupDefault,
  ContextMenuItemDefault,
  ContextMenuLevelsProps,
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
  GetLevelsParams,
  Level,
} from './types';

const defaultGetItemKey: ContextMenuPropGetItemKey<ContextMenuItemDefault> = (
  item,
) => item.key || item.label;
const defaultGetItemRightSide: ContextMenuPropGetItemRightSide<
  ContextMenuItemDefault
> = (item) => item.rightSide;
const defaultGetItemLeftSide: ContextMenuPropGetItemLeftSide<
  ContextMenuItemDefault
> = (item) => item.leftSide;
const defaultGetItemRightIcon: ContextMenuPropGetItemRightIcon<
  ContextMenuItemDefault
> = (item) => item.rightIcon;
const defaultGetItemLeftIcon: ContextMenuPropGetItemLeftIcon<
  ContextMenuItemDefault
> = (item) => item.leftIcon;
const defaultGetItemStatus: ContextMenuPropGetItemStatus<
  ContextMenuItemDefault
> = (item) => item.status;
const defaultGetItemDisabled: ContextMenuPropGetItemDisabled<
  ContextMenuItemDefault
> = (item) => item.disabled;
const defaultGetItemLabel: ContextMenuPropGetItemLabel<
  ContextMenuItemDefault
> = (item) => item.label;
const defaultGetItemOnClick: ContextMenuPropGetItemOnClick<
  ContextMenuItemDefault
> = (item) => item.onClick;
const defaultGetItemSubMenu: ContextMenuPropGetItemSubMenu<
  ContextMenuItemDefault
> = (item) => item.subMenu;
const defaultGetItemAs: ContextMenuPropGetItemAs<ContextMenuItemDefault> = (
  item,
) => item.as;
const defaultGetItemAttributes: ContextMenuPropGetItemAttributes<
  ContextMenuItemDefault
> = (item) => item.attributes;
const defaultGetItemGroupId: ContextMenuPropGetItemGroupId<
  ContextMenuItemDefault
> = (item) => item.groupId;

const defaultGetGroupId: ContextMenuPropGetGroupId<ContextMenuGroupDefault> = (
  group,
) => group.id;
const defaultGetGroupLabel: ContextMenuPropGetGroupLabel<
  ContextMenuGroupDefault
> = (group) => group.label;

export function withDefaultGetters<ITEM, GROUP>(
  props: ContextMenuLevelsProps<ITEM, GROUP>,
) {
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

const findItem = <ITEM>(
  params: Omit<GetLevelsParams<ITEM>, 'levels'> & {
    key: ContextMenuItemDefault['key'];
  },
): ITEM | undefined => {
  const { items, getItemKey, getItemSubMenu, key } = params;
  for (const item of items) {
    if (getItemKey(item) === key) {
      return item;
    }
    const subItems =
      typeof getItemSubMenu === 'function' && getItemSubMenu(item);
    if (subItems) {
      const subItem = findItem({
        items: subItems,
        key,
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

export const getLevels = <ITEM>(
  params: GetLevelsParams<ITEM>,
): Level<ITEM>[] => {
  const { levels, items, getItemKey, getItemSubMenu } = params;

  return levels.map((level) => ({
    ...level,
    items: level.items
      .map((item) =>
        findItem({
          items,
          getItemSubMenu,
          getItemKey,
          key: getItemKey(item),
        }),
      )
      .filter(isNotNil),
  }));
};

import {
  DefaultListGroup,
  DefaultListItem,
  ListPropGetGroupKey,
  ListPropGetGroupLabel,
  ListPropGetGroupRightSide,
  ListPropGetItemDisabled,
  ListPropGetItemGroupId,
  ListPropGetItemKey,
  ListPropGetItemLabel,
  ListPropGetItemLeftIcon,
  ListPropGetItemLeftSide,
  ListPropGetItemRightIcon,
  ListPropGetItemRightSide,
  ListProps,
} from './types';

const defaultGetItemKey: ListPropGetItemKey<DefaultListItem> = (item) =>
  item.id;
const defaultGetItemLabel: ListPropGetItemLabel<DefaultListItem> = (item) =>
  item.label;
const defaultGetItemDisabled: ListPropGetItemDisabled<DefaultListItem> = (
  item,
) => item.disabled;
const defaultGetItemGroupKey: ListPropGetItemGroupId<DefaultListItem> = (
  item,
) => item.groupId;
const defaultGetItemLeftSide: ListPropGetItemLeftSide<DefaultListItem> = (
  item,
) => item.leftSide;
const defaultGetItemLeftIcon: ListPropGetItemLeftIcon<DefaultListItem> = (
  item,
) => item.leftIcon;
const defaultGetItemRightSide: ListPropGetItemRightSide<DefaultListItem> = (
  item,
) => item.rightSide;
const defaultGetItemRightIcon: ListPropGetItemRightIcon<DefaultListItem> = (
  item,
) => item.rightIcon;

const defaultGetGroupKey: ListPropGetGroupKey<DefaultListGroup> = (group) =>
  group.id;
const defaultGetGroupLabel: ListPropGetGroupLabel<DefaultListGroup> = (group) =>
  group.label;
const defaultGetGroupRightSide: ListPropGetGroupRightSide<DefaultListGroup> = (
  group,
) => group.rightSide;

export const isMultipleParams = <ITEM, GROUP>(
  props: ListProps<ITEM, GROUP, boolean>,
): props is ListProps<ITEM, GROUP, true> => {
  return !!props.multiple;
};

export const isNotMultipleParams = <ITEM, GROUP>(
  props: ListProps<ITEM, GROUP, boolean>,
): props is ListProps<ITEM, GROUP, false> => {
  return !props.multiple;
};

export function withDefaultGetters<
  ITEM = DefaultListItem,
  GROUP = DefaultListGroup,
  MULTIPLE extends boolean = false,
>(props: ListProps<ITEM, GROUP, MULTIPLE>) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemKey: props.getItemKey || defaultGetItemKey,
    getItemGroupKey: props.getItemGroupKey || defaultGetItemGroupKey,
    getItemDisabled: props.getItemDisabled || defaultGetItemDisabled,
    getItemLeftSide: props.getItemLeftSide || defaultGetItemLeftSide,
    getItemLeftIcon: props.getItemLeftIcon || defaultGetItemLeftIcon,
    getItemRightSide: props.getItemRightSide || defaultGetItemRightSide,
    getItemRightIcon: props.getItemRightIcon || defaultGetItemRightIcon,
    getGroupLabel: props.getGroupLabel || defaultGetGroupLabel,
    getGroupKey: props.getGroupKey || defaultGetGroupKey,
    getGroupRightSide: props.getGroupRightSide || defaultGetGroupRightSide,
  };
}

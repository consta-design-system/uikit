import {
  DefaultListGroup,
  DefaultListItem,
  ListPropGetGroupKey,
  ListPropGetGroupLabel,
  ListPropGetGroupRightSide,
  ListPropGetItemActive,
  ListPropGetItemChecked,
  ListPropGetItemDisabled,
  ListPropGetItemGroupId,
  ListPropGetItemLabel,
  ListPropGetItemLeftIcon,
  ListPropGetItemLeftSide,
  ListPropGetItemOnClick,
  ListPropGetItemRightIcon,
  ListPropGetItemRightSide,
  ListPropGetItemStatus,
  ListProps,
} from './types';

const defaultGetItemLabel: ListPropGetItemLabel<DefaultListItem> = (item) =>
  item.label;
const defaultGetItemDisabled: ListPropGetItemDisabled<DefaultListItem> = (
  item,
) => item.disabled;
const defaultGetItemActive: ListPropGetItemActive<DefaultListItem> = (item) =>
  item.active;
const defaultGetItemChecked: ListPropGetItemChecked<DefaultListItem> = (item) =>
  item.checked;
const defaultGetItemStatus: ListPropGetItemStatus<DefaultListItem> = (item) =>
  item.status;
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

const defaultGetItemOnClick: ListPropGetItemOnClick<DefaultListItem> = (item) =>
  item.onClick;

const defaultGetGroupKey: ListPropGetGroupKey<DefaultListGroup> = (group) =>
  group.id;
const defaultGetGroupLabel: ListPropGetGroupLabel<DefaultListGroup> = (group) =>
  group.label;
const defaultGetGroupRightSide: ListPropGetGroupRightSide<DefaultListGroup> = (
  group,
) => group.rightSide;

export function withDefaultGetters<
  ITEM = DefaultListItem,
  GROUP = DefaultListGroup,
>(props: ListProps<ITEM, GROUP>) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemGroupKey: props.getItemGroupKey || defaultGetItemGroupKey,
    getItemActive: props.getItemActive || defaultGetItemActive,
    getItemChecked: props.getItemChecked || defaultGetItemChecked,
    getItemDisabled: props.getItemDisabled || defaultGetItemDisabled,
    getItemLeftSide: props.getItemLeftSide || defaultGetItemLeftSide,
    getItemLeftIcon: props.getItemLeftIcon || defaultGetItemLeftIcon,
    getItemRightSide: props.getItemRightSide || defaultGetItemRightSide,
    getItemRightIcon: props.getItemRightIcon || defaultGetItemRightIcon,
    getItemStatus: props.getItemStatus || defaultGetItemStatus,
    getItemOnClick: props.getItemOnClick || defaultGetItemOnClick,
    getGroupLabel: props.getGroupLabel || defaultGetGroupLabel,
    getGroupKey: props.getGroupKey || defaultGetGroupKey,
    getGroupRightSide: props.getGroupRightSide || defaultGetGroupRightSide,
  };
}

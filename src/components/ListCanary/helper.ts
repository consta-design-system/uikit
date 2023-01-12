import { cn } from '##/utils/bem';

import {
  DefaultListGroup,
  DefaultListItem,
  ListPropGetGroupKey,
  ListPropGetGroupLabel,
  ListPropGetGroupRightSide,
  ListPropGetItemActive,
  ListPropGetItemAs,
  ListPropGetItemAttributes,
  ListPropGetItemDisabled,
  ListPropGetItemGroupId,
  ListPropGetItemKey,
  ListPropGetItemLabel,
  ListPropGetItemLeftIcon,
  ListPropGetItemLeftSide,
  ListPropGetItemOnClick,
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
const defaultGetItemActive: ListPropGetItemActive<DefaultListItem> = (item) =>
  item.active;
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
const defaultGetItemAs: ListPropGetItemAs<DefaultListItem> = (item) => item.as;
const defaultGetItemAttributes: ListPropGetItemAttributes<DefaultListItem> = (
  item,
) => item.attributes;
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
    getItemKey: props.getItemKey || defaultGetItemKey,
    getItemGroupKey: props.getItemGroupKey || defaultGetItemGroupKey,
    getItemActive: props.getItemActive || defaultGetItemActive,
    getItemDisabled: props.getItemDisabled || defaultGetItemDisabled,
    getItemLeftSide: props.getItemLeftSide || defaultGetItemLeftSide,
    getItemLeftIcon: props.getItemLeftIcon || defaultGetItemLeftIcon,
    getItemRightSide: props.getItemRightSide || defaultGetItemRightSide,
    getItemRightIcon: props.getItemRightIcon || defaultGetItemRightIcon,
    getItemOnClick: props.getItemOnClick || defaultGetItemOnClick,
    getGroupLabel: props.getGroupLabel || defaultGetGroupLabel,
    getGroupKey: props.getGroupKey || defaultGetGroupKey,
    getGroupRightSide: props.getGroupRightSide || defaultGetGroupRightSide,
    getItemAs: props.getItemAs || defaultGetItemAs,
    getItemAttributes: props.getItemAttributes || defaultGetItemAttributes,
  };
}

type ListBoxProps = {
  shadow?: boolean;
  size?: 'xs' | 's' | 'm' | 'l';
  form?: 'round' | 'default' | 'brick';
};

type CnListBox = (
  props: ListBoxProps,
  classNames?: Array<string | undefined>,
) => string;

const cnList = cn('ListBox');

export const cnListBox: CnListBox = (props, classNames) => {
  const { shadow = true, form = 'default', size = 's' } = props;
  return cnList({ shadow, form, size }, classNames);
};

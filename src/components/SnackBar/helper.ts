import { Item } from './SnackBar';
import {
  SnackBarPropGetItemActions,
  SnackBarPropGetItemAutoClose,
  SnackBarPropGetItemIcon,
  SnackBarPropGetItemKey,
  SnackBarPropGetItemMessage,
  SnackBarPropGetItemOnAutoClose,
  SnackBarPropGetItemOnClose,
  SnackBarPropGetItemShowProgress,
  SnackBarPropGetItemStatus,
  SnackBarProps,
} from './types';

const defaultGetItemKey: SnackBarPropGetItemKey<Item> = (item) => item.key;
const defaultGetItemMessage: SnackBarPropGetItemMessage<Item> = (item) => item.message;
const defaultGetItemStatus: SnackBarPropGetItemStatus<Item> = (item) => item.status;
const defaultGetItemAutoClose: SnackBarPropGetItemAutoClose<Item> = (item) => item.autoClose;
const defaultGetItemShowProgress: SnackBarPropGetItemShowProgress<Item> = (item) =>
  item.showProgress;
const defaultGetItemIcon: SnackBarPropGetItemIcon<Item> = (item) => item.icon;
const defaultGetItemActions: SnackBarPropGetItemActions<Item> = (item) => item.actions;
const defaultGetItemOnClose: SnackBarPropGetItemOnClose<Item> = (item) => item.onClose;
const defaultGetItemOnAutoClose: SnackBarPropGetItemOnAutoClose<Item> = (item) => item.onAutoClose;

export const withDefaultGetters = <ITEM>(props: SnackBarProps<ITEM>) => {
  return {
    ...props,
    getItemKey: props.getItemKey || defaultGetItemKey,
    getItemMessage: props.getItemMessage || defaultGetItemMessage,
    getItemStatus: props.getItemStatus || defaultGetItemStatus,
    getItemAutoClose: props.getItemAutoClose || defaultGetItemAutoClose,
    getItemShowProgress: props.getItemShowProgress || defaultGetItemShowProgress,
    getItemIcon: props.getItemIcon || defaultGetItemIcon,
    getItemActions: props.getItemActions || defaultGetItemActions,
    getItemOnClose: props.getItemOnClose || defaultGetItemOnClose,
    getItemOnAutoClose: props.getItemOnAutoClose || defaultGetItemOnAutoClose,
  };
};

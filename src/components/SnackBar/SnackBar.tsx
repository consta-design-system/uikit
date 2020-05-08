import './SnackBar.css';

import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group/esm';
import { cnForCssTransition } from '../../utils/cnForCssTransition';
import { cn } from '../../utils/bem';
import { IIcon } from '../../icons/Icon/Icon';
import { SnackBarItem } from './Item/SnackBar-Item';

export const cnSnackBar = cn('SnackBar');
export const cnSnackBarItem = cn('SnackBar', 'Item');
export type SnackBarPropItemAction<ITEM> = {
  label: string | number;
  onClick: React.EventHandler<React.MouseEvent>;
};
export type SnackBarPropItemStatus = 'system' | 'success' | 'warning' | 'alert';
export type SnackBarPropGetItemMessage<ITEM> = (item: ITEM) => string | number | undefined;
export type SnackBarPropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type SnackBarPropGetItemAutoClose<ITEM> = (item: ITEM) => boolean | number | undefined;
export type SnackBarPropGetItemStatus<ITEM> = (item: ITEM) => SnackBarPropItemStatus;
export type SnackBarPropGetItemIcon<ITEM> = (item: ITEM) => React.FC<IIcon> | undefined;
export type SnackBarPropGetItemAction<ITEM> = (
  item: ITEM
) => SnackBarPropItemAction<ITEM> | SnackBarPropItemAction<ITEM>[];
export type SnackBarItemOnClose = (e?: React.MouseEvent) => void;
export type SnackBarPropGetItemOnClose<ITEM> = (item: ITEM) => SnackBarItemOnClose;
export type SnackBarPropGetItemOnClick<ITEM> = (item: ITEM) => React.EventHandler<React.MouseEvent>;
export type SnackBarProps<ITEM> = {
  items: ITEM[];
  getItemMessage?: SnackBarPropGetItemMessage<ITEM>;
  getItemKey: SnackBarPropGetItemKey<ITEM>;
  getItemAutoClose?: SnackBarPropGetItemAutoClose<ITEM>;
  getItemOnClose?: SnackBarPropGetItemOnClose<ITEM>;
  getItemOnClick?: SnackBarPropGetItemOnClick<ITEM>;
  getItemStatus?: SnackBarPropGetItemStatus<ITEM>;
  getItemIcon?: SnackBarPropGetItemIcon<ITEM>;
  getItemAction?: SnackBarPropGetItemAction<ITEM>;
  innerRef?: React.Ref<HTMLDivElement>;
};

declare type ISnackBar<ITEM> = SnackBarProps<ITEM> &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof SnackBarProps<ITEM>>;

export function SnackBar<ITEM>(props: ISnackBar<ITEM>): React.ReactElement {
  const {
    items,
    getItemKey,
    getItemMessage,
    getItemAction,
    getItemAutoClose,
    getItemStatus,
    getItemIcon,
    getItemOnClose,
    getItemOnClick,
    className,
    innerRef,
    ...otherProps
  } = props;

  return (
    <TransitionGroup
      {...otherProps}
      ref={innerRef}
      className={cnSnackBar(null, [className])}
      appear
      entrer
      exit
    >
      {items.map((item) => {
        const key = getItemKey(item);
        return (
          <CSSTransition classNames={cnForCssTransition(cnSnackBarItem)} key={key} timeout={200}>
            <SnackBarItem<ITEM>
              key={key}
              getMessage={getItemMessage}
              getAction={getItemAction}
              getAutoClose={getItemAutoClose}
              getStatus={getItemStatus}
              getIcon={getItemIcon}
              getOnClose={getItemOnClose}
              getOnClick={getItemOnClick}
              item={item}
            />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}

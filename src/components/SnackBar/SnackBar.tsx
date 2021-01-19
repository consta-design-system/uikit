import './SnackBar.css';

import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { IconProps } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { cnForCssTransition } from '../../utils/cnForCssTransition';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';

import { SnackBarItem } from './Item/SnackBar-Item';

export type SnackBarPropItemAction = {
  label: string | number;
  onClick: React.EventHandler<React.MouseEvent>;
};

export const snackBarItemStatus = ['normal', 'system', 'success', 'warning', 'alert'] as const;
export type SnackBarItemStatus = typeof snackBarItemStatus[number];
export const snackBarItemStatusDefault: SnackBarItemStatus = snackBarItemStatus[0];

export type Item = {
  key: string | number;
  message?: string | number;
  status?: SnackBarItemStatus;
  autoClose?: boolean | number;
  icon?: React.FC<IconProps>;
  actions?: SnackBarPropItemAction[];
  onClose?: (item: Item) => void;
  onAutoClose?: (item: Item) => void;
};

type Props = {
  items: Item[];
  children?: never;
};

export type SnackBarProps = PropsWithHTMLAttributes<Props, HTMLDivElement>;

export const cnSnackBar = cn('SnackBar');
export const cnSnackBarItem = cn('SnackBar', 'Item');

const cssTransitionClassNames = cnForCssTransition(cnSnackBarItem);

export const SnackBar: React.FC<SnackBarProps> = (props) => {
  const { items, className, ...otherProps } = usePropsHandler(cnSnackBar(), props);

  return (
    <TransitionGroup {...otherProps} className={cnSnackBar(null, [className])} appear enter exit>
      {items.map((item) => {
        return (
          <CSSTransition classNames={cssTransitionClassNames} key={item.key} timeout={200}>
            <SnackBarItem item={item} />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

import './SnackBar.css';

import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { cnForCssTransition } from '../../utils/cnForCssTransition';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';
import { cn } from '../../utils/bem';
import { IIcon } from '../../icons/Icon/Icon';
import { SnackBarItem } from './Item/SnackBar-Item';

export type SnackBarPropItemAction = {
  label: string | number;
  onClick: React.EventHandler<React.MouseEvent>;
};

export type SnackBarItemStatus = 'system' | 'success' | 'warning' | 'alert' | 'normal';

export type Item = {
  key: string | number;
  message?: string | number;
  status?: SnackBarItemStatus;
  autoClose?: boolean | number;
  icon?: React.FC<IIcon>;
  actions?: SnackBarPropItemAction[];
  onClose?: (item: Item) => void;
};

type Props = {
  items: Item[];
};

export type SnackBarProps = PropsWithHTMLAttributes<Props, HTMLDivElement>;

export const cnSnackBar = cn('SnackBar');
export const cnSnackBarItem = cn('SnackBar', 'Item');

const cssTransitionClassNames = cnForCssTransition(cnSnackBarItem);

export const SnackBar = React.forwardRef<HTMLDivElement, SnackBarProps>((props, ref) => {
  const { items, className, ...otherProps } = props;
  return (
    <TransitionGroup
      {...otherProps}
      ref={ref}
      className={cnSnackBar(null, [className])}
      appear
      enter
      exit
    >
      {items.map((item) => {
        return (
          <CSSTransition classNames={cssTransitionClassNames} key={item.key} timeout={200}>
            <SnackBarItem item={item} />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
});

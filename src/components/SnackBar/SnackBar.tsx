import './SnackBar.css';

import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { cnForCssTransition } from '../../utils/cnForCssTransition';
import { cn } from '../../utils/bem';
import { IIcon } from '../../icons/Icon/Icon';
import { SnackBarItem } from './Item/SnackBar-Item';

export type SnackBarPropItemAction = {
  label: string | number;
  onClick: React.EventHandler<React.MouseEvent>;
};
export type SnackBarPropItemStatus = 'system' | 'success' | 'warning' | 'alert' | 'normal';

export type Item = {
  key: string | number;
  message?: string | number;
  status?: SnackBarPropItemStatus;
  autoClose?: boolean | number;
  icon?: React.FC<IIcon>;
  actions?: SnackBarPropItemAction[];
  onClose?: (item: Item) => void;
};

export type SnackBarProps = {
  items: Item[];
  innerRef?: React.Ref<HTMLDivElement>;
};

export type ISnackBar = SnackBarProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof SnackBarProps>;

export const cnSnackBar = cn('SnackBar');
export const cnSnackBarItem = cn('SnackBar', 'Item');

const cssTransitionClassNames = cnForCssTransition(cnSnackBarItem);

export function SnackBar(props: ISnackBar): React.ReactElement {
  const { items, innerRef, className, ...otherProps } = props;

  return (
    <TransitionGroup
      {...otherProps}
      ref={innerRef}
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
}

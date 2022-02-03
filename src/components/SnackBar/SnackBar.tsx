import './SnackBar.css';

import React, { createRef, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { IconComponent } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { cnForCssTransition } from '../../utils/cnForCssTransition';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';

import { SnackBarItem } from './SnackBarItem/SnackBarItem';
import { withDefaultGetters } from './helper';
import {
  SnackBarItemShowProgressProp,
  SnackBarItemStatus,
  SnackBarPropItemAction,
  SnackBarProps,
} from './types';

export const cnSnackBar = cn('SnackBar');

export type Item = {
  key: string | number;
  message?: string | number | React.ReactNode;
  status?: SnackBarItemStatus;
  autoClose?: boolean | number;
  showProgress?: SnackBarItemShowProgressProp;
  icon?: IconComponent;
  actions?: SnackBarPropItemAction[];
  onClose?: (item: Item) => void;
  onAutoClose?: (item: Item) => void;
};

const cssTransitionClassNames = cnForCssTransition(cnSnackBar, 'Item');

export const SnackBar: React.FC<SnackBarProps> = (props) => {
  const {
    items,
    className,
    getItemKey,
    getItemActions,
    getItemAutoClose,
    getItemIcon,
    getItemMessage,
    getItemOnAutoClose,
    getItemOnClose,
    getItemShowProgress,
    getItemStatus,
    ...otherProps
  } = usePropsHandler('SnackBar', withDefaultGetters(props));

  const itemProps = {
    getItemKey,
    getItemMessage,
    getItemStatus,
    getItemAutoClose,
    getItemShowProgress,
    getItemIcon,
    getItemActions,
    getItemOnClose,
    getItemOnAutoClose,
  };

  const refs = useMemo(() => {
    const refArray: React.RefObject<HTMLDivElement>[] = [];

    for (let i = 0; i < items.length; i++) {
      refArray[i] = createRef<HTMLDivElement>();
    }

    return refArray;
  }, [items]);

  return (
    <TransitionGroup {...otherProps} className={cnSnackBar(null, [className])} appear enter exit>
      {items.map((item, index) => {
        return (
          <CSSTransition
            nodeRef={refs[index]}
            classNames={cssTransitionClassNames}
            key={getItemKey(item)}
            timeout={200}
          >
            <SnackBarItem
              item={item}
              ref={refs[index]}
              className={cnSnackBar('Item')}
              {...itemProps}
            />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

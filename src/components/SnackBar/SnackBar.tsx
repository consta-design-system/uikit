import './SnackBar.css';

import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useRefs } from '../../hooks/useRefs/useRefs';
import { cn } from '../../utils/bem';
import { cnForCssTransition } from '../../utils/cnForCssTransition';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';

import { cnSnackBarItem, SnackBarItem } from './SnackBarItem/SnackBarItem';
import { getItem, withDefaultGetters } from './helper';
import { SnackBarItemDefault, SnackBarProps } from './types';

export const cnSnackBar = cn('SnackBar');

/**
 * @deprecated since version 3.16.0 use SnackBarItemDefault
 */
export type Item = SnackBarItemDefault;

const cssTransitionClassNames = cnForCssTransition(cnSnackBar, 'Item');

export function SnackBar<ITEM>(props: SnackBarProps<ITEM>) {
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

  const getters = {
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

  const refs = useRefs(items.length) as React.RefObject<HTMLDivElement>[];

  return (
    <TransitionGroup {...otherProps} className={cnSnackBar(null, [className])} appear enter exit>
      {items.map((item, index) => {
        return (
          <CSSTransition
            nodeRef={refs[index]}
            classNames={cssTransitionClassNames}
            key={cnSnackBarItem(`Item-${index}`)}
            timeout={200}
          >
            <SnackBarItem
              ref={refs[index]}
              className={cnSnackBar('Item')}
              {...getItem(item, getters)}
            />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}

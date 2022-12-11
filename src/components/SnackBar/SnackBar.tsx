import './SnackBar.css';

import React, { forwardRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useRefs } from '../../hooks/useRefs/useRefs';
import { cn } from '../../utils/bem';
import { cnForCssTransition } from '../../utils/cnForCssTransition';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import { getItem, withDefaultGetters } from './helper';
import { SnackBarItem } from './SnackBarItem/SnackBarItem';
import {
  SnackBarComponent,
  snackBarPropFormDefault,
  SnackBarProps,
} from './types';

export const cnSnackBar = cn('SnackBar');

const cssTransitionClassNames = cnForCssTransition(cnSnackBar, 'Item');

const SnackBarRender = (
  propsComponent: SnackBarProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const props = usePropsHandler('SnackBar', withDefaultGetters(propsComponent));
  const {
    items,
    className,
    form = snackBarPropFormDefault,
    getItemKey,
    getItemActions,
    getItemAutoClose,
    getItemIcon,
    getItemMessage,
    getItemOnAutoClose,
    getItemOnClose,
    getItemShowProgress,
    getItemStatus,
    onItemClose,
    onItemAutoClose,
    ...otherProps
  } = props;

  const refs = useRefs<HTMLDivElement>(items.length);

  return (
    <div className={cnSnackBar(null, [className])} ref={ref} {...otherProps}>
      <TransitionGroup component={null} appear enter exit>
        {items.map((item, index) => {
          return (
            <CSSTransition
              nodeRef={refs[index]}
              classNames={cssTransitionClassNames}
              key={cnSnackBar('Item', { key: getItemKey(item) })}
              timeout={200}
            >
              <SnackBarItem
                ref={refs[index]}
                form={form}
                className={cnSnackBar('Item')}
                {...getItem(item, props)}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export const SnackBar = forwardRef(SnackBarRender) as SnackBarComponent;

export * from './types';

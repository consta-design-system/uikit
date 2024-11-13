import './SnackBar.css';

import React, { forwardRef } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

import { useRefs } from '##/hooks/useRefs';
import { cn } from '##/utils/bem';

import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import { getItem, withDefaultGetters } from './helper';
import { SnackBarItem } from './SnackBarItem';
import {
  SnackBarComponent,
  snackBarPropFormDefault,
  snackBarPropProgressViewDefault,
  SnackBarProps,
} from './types';

export const cnSnackBar = cn('SnackBar');

const SnackBarRender = (
  propsComponent: SnackBarProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const props = usePropsHandler('SnackBar', withDefaultGetters(propsComponent));
  const {
    items,
    className,
    form = snackBarPropFormDefault,
    progressView = snackBarPropProgressViewDefault,
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
    getItemProgress,
    ...otherProps
  } = props;

  const refs = useRefs<HTMLDivElement>(items.length);

  return (
    <div className={cnSnackBar(null, [className])} ref={ref} {...otherProps}>
      <TransitionGroup component={null} appear enter exit>
        {items.map((item, index) => (
          <Transition
            key={cnSnackBar('Item', { key: getItemKey(item) })}
            unmountOnExit
            timeout={200}
            nodeRef={refs[index]}
          >
            {(animate) => (
              <SnackBarItem
                ref={refs[index]}
                form={form}
                progressView={progressView}
                className={cnSnackBar('Item', { animate })}
                {...getItem(item, props)}
              />
            )}
          </Transition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export const SnackBar = forwardRef(SnackBarRender) as SnackBarComponent;

export * from './types';

import './SnackBar.css';

import React, { createRef, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { cn } from '../../utils/bem';
import { cnForCssTransition } from '../../utils/cnForCssTransition';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';

import { SnackBarItem } from './SnackBarItem/SnackBarItem';
import { SnackBarProps } from './helper';

export const cnSnackBar = cn('SnackBar');

const cssTransitionClassNames = cnForCssTransition(cnSnackBar, 'Item');

export const SnackBar: React.FC<SnackBarProps> = (props) => {
  const { items, className, ...otherProps } = usePropsHandler('SnackBar', props);

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
            key={item.key}
            timeout={200}
          >
            <SnackBarItem item={item} ref={refs[index]} className={cnSnackBar('Item')} />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

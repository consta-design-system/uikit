import './ContextMenu.css';

import React, { useEffect } from 'react';
import { Transition } from 'react-transition-group';

import { useDebounce } from '../../hooks/useDebounce/useDebounce';
import { useFlag } from '../../hooks/useFlag/useFlag';
import {
  animateTimeout,
  cnMixPopoverAnimate,
} from '../../mixs/MixPopoverAnimate/MixPopoverAnimate';
import { cn } from '../../utils/bem';

import { ContextMenuLevelGroup } from './ContextMenuLevelGroup/ContextMenuLevelGroup';
import { ContextMenuComponent, ContextMenuProps } from './types';

const cnContextMenu = cn('ContextMenu');

function ContextMenuRender(props: ContextMenuProps, ref: React.Ref<HTMLDivElement>) {
  const { isOpen: isOpenProp, className, direction, ...otherProps } = props;
  const [exitAnimation, { on: startExitAnimation, off: stopExitAnimation }] = useFlag();
  const [isOpen, { on, off }] = useFlag(isOpenProp);

  useEffect(() => {
    if (isOpenProp) {
      on();
    }
  }, [isOpenProp]);

  useEffect(
    useDebounce(() => {
      !isOpenProp && off();
    }, animateTimeout),
    [isOpenProp],
  );

  return (
    <Transition
      in={isOpen}
      unmountOnExit
      timeout={animateTimeout}
      onEnter={stopExitAnimation}
      onExit={startExitAnimation}
    >
      {(animate) => (
        <ContextMenuLevelGroup
          {...otherProps}
          ref={ref}
          direction={direction}
          className={cnContextMenu('Level', { exit: exitAnimation }, [
            className,
            cnMixPopoverAnimate({ animate, direction }),
          ])}
        />
      )}
    </Transition>
  );
}

export const ContextMenu = React.forwardRef(ContextMenuRender) as ContextMenuComponent;

export * from './types';

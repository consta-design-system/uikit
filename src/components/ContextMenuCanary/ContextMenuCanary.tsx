import './ContextMenu.css';

import React, { useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';

import { useDebounce } from '../../hooks/useDebounce/useDebounce';
import { useFlag } from '../../hooks/useFlag/useFlag';
import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import {
  animateTimeout,
  cnMixPopoverAnimate,
} from '../../mixs/MixPopoverAnimate/MixPopoverAnimate';
import { cn } from '../../utils/bem';

import { ContextMenuLevels } from './ContextMenuLevels/ContextMenuLevels';
import { ContextMenuComponent, ContextMenuProps } from './types';

const cnContextMenu = cn('ContextMenu');

function ContextMenuRender(props: ContextMenuProps, ref: React.Ref<HTMLDivElement>) {
  const { isOpen: isOpenProp, className, direction, ...otherProps } = props;
  const [playAnimation, setPlayAnimation] = useFlag();
  const [isOpen, setIsOpen] = useFlag(isOpenProp);

  useEffect(() => {
    if (isOpenProp) {
      setIsOpen.on();
    }
  }, [isOpenProp]);

  useEffect(
    useDebounce(() => {
      !isOpenProp && setIsOpen.off();
    }, animateTimeout),
    [isOpenProp],
  );

  const nodeRef = useRef<HTMLDivElement>(null);
  const levelRef = useForkRef([ref, nodeRef]);

  return (
    <Transition
      in={isOpen}
      unmountOnExit
      timeout={animateTimeout}
      onEnter={setPlayAnimation.off}
      onExit={setPlayAnimation.on}
      nodeRef={nodeRef}
    >
      {(animate) => (
        <ContextMenuLevels
          {...otherProps}
          ref={levelRef}
          direction={direction}
          className={cnContextMenu('Level', { playAnimation }, [
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

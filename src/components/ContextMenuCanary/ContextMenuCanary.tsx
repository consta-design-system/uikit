import './ContextMenu.css';

import React, { useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import { useFlag } from '../../hooks/useFlag/useFlag';
import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import {
  animateTimeout,
  cnMixPopoverAnimate,
} from '../../mixs/MixPopoverAnimate/MixPopoverAnimate';
import { cn } from '../../utils/bem';
import { Direction } from '../Popover/Popover';

import { ContextMenuLevels } from './ContextMenuLevels/ContextMenuLevels';
import { ContextMenuComponent, ContextMenuProps } from './types';

const cnContextMenu = cn('ContextMenu');

function ContextMenuRender(props: ContextMenuProps, ref: React.Ref<HTMLDivElement>) {
  const { isOpen, className, onSetDirection, ...otherProps } = props;
  const [playAnimation, setPlayAnimation] = useFlag();
  const [direction, setDirection] = useState<Direction>();
  const nodeRef = useRef<HTMLDivElement>(null);
  const levelRef = useForkRef([ref, nodeRef]);

  const handleSetDirection = (d: Direction) => {
    setDirection(d);
    onSetDirection?.(d);
  };

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
          onSetDirection={handleSetDirection}
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

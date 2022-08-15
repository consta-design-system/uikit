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
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import { Direction } from '../Popover/Popover';
import { ContextMenuLevels } from './ContextMenuLevels/ContextMenuLevels';
import { ContextMenuComponent, ContextMenuProps } from './types';

const cnContextMenu = cn('ContextMenuCanary');

export const COMPONENT_NAME = 'ContextMenu' as const;

const ContextMenuRender = (
  props: ContextMenuProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const levelRef = useForkRef([ref, nodeRef]);

  const { isOpen, className, onSetDirection, ...otherProps } = usePropsHandler(
    COMPONENT_NAME,
    props,
    levelRef,
  );
  const [playAnimation, setPlayAnimation] = useFlag();
  const [eventsNone, setEventsNone] = useFlag(true);
  const [direction, setDirection] = useState<Direction | undefined>(
    props.direction,
  );

  const handleSetDirection = (d: Direction) => {
    setDirection(d);
    onSetDirection?.(d);
  };

  return (
    <Transition
      in={isOpen}
      unmountOnExit
      timeout={animateTimeout}
      onEntered={setEventsNone.off}
      onEnter={setPlayAnimation.off}
      onExit={() => {
        setPlayAnimation.on();
        setEventsNone.on();
      }}
      nodeRef={nodeRef}
    >
      {(animate) => (
        <ContextMenuLevels
          {...otherProps}
          ref={levelRef}
          onSetDirection={handleSetDirection}
          className={cnContextMenu('Level', { playAnimation, eventsNone }, [
            className,
            cnMixPopoverAnimate({ animate, direction }),
          ])}
        />
      )}
    </Transition>
  );
};

export const ContextMenu = React.forwardRef(
  ContextMenuRender,
) as ContextMenuComponent;

export * from './types';

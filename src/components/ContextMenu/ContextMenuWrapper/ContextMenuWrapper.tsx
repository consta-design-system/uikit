import './ContextMenuWrapper.css';

import React, { Fragment, useCallback, useState } from 'react';
import { Transition } from 'react-transition-group';

import { cnListBox, mapVerticalSpase } from '##/components/ListCanary';
import { Direction, Popover } from '##/components/Popover';
import { useFlag } from '##/hooks/useFlag';
import { useMutableRef } from '##/hooks/useMutableRef';
import { animateTimeout, cnMixPopoverAnimate } from '##/mixs/MixPopoverAnimate';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import {
  contextMenuDefaultSize,
  ContextMenuWrapperProps,
  defaultContextMenuForm,
} from '../types';

const cnContextMenuWrapper = cn('ContextMenuWrapper');

export const ContextMenuWrapper = (props: ContextMenuWrapperProps) => {
  const {
    isMobile,
    children,
    form = defaultContextMenuForm,
    isOpen,
    size = contextMenuDefaultSize,
    anchorRef,
    possibleDirections,
    position,
    direction: directionProp,
    spareDirection,
    onClickOutside,
    offset,
    onSetDirection: onSetDirectionProp,
    className,
    animationBack,
    style,
  } = props;

  const [innerAnimation, setInnerAnimation] = useFlag(isMobile);
  // запоминаем позицию посднего удовлетворяющего разворота,
  // для того чтоб следующий экран разворачивался в эту же строну.
  const [direction, setSirection] = useState(directionProp);

  const onSetDirectionRef = useMutableRef(onSetDirectionProp);

  const onSetDirection = useCallback((direction: Direction) => {
    setSirection(direction);
    onSetDirectionRef.current?.(direction);
  }, []);

  if (isMobile) {
    return (
      <Transition
        timeout={animateTimeout}
        in={isOpen}
        unmountOnExit
        onEntered={setInnerAnimation.on}
        onExit={setInnerAnimation.off}
      >
        {(animate) => (
          <Popover
            className={cnContextMenuWrapper({ animationBack, innerAnimation }, [
              cnListBox({ size, form, border: true, shadow: true }),
              cnMixSpace({
                pV: mapVerticalSpase[size],
              }),
              cnMixPopoverAnimate({ animate }),
              className,
            ])}
            anchorRef={anchorRef}
            possibleDirections={possibleDirections}
            position={position}
            direction={direction}
            spareDirection={spareDirection}
            onClickOutside={onClickOutside}
            offset={offset}
            onSetDirection={onSetDirection}
            style={style}
          >
            {children}
          </Popover>
        )}
      </Transition>
    );
  }

  return <Fragment key={ContextMenuWrapper.name}>{children}</Fragment>;
};

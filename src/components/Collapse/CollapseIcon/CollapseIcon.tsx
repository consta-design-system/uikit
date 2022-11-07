import './CollapseIcon.css';

import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';

import { cnIcon } from '##/icons/Icon';
import { cn } from '##/utils/bem';

import { CollapseIconProps } from '../types';

const cnCollapseIcon = cn('CollapseIcon');
const animateTimeout = 300;

export const CollapseIcon: React.FC<CollapseIconProps> = (props) => {
  const {
    size,
    icon: Icon,
    closeIcon: CloseIcon,
    direction,
    closeDirection,
    isOpen,
    className,
    ...otherProps
  } = props;

  const iconRef = useRef<HTMLSpanElement>(null);
  const closeIconRef = useRef<HTMLSpanElement>(null);

  if (CloseIcon) {
    return (
      <span
        className={cnCollapseIcon('Wrapper', [cnIcon({ size }), className])}
      >
        <Transition
          in={!isOpen}
          unmountOnExit
          timeout={animateTimeout}
          nodeRef={iconRef}
        >
          {(animate) => (
            <Icon
              {...otherProps}
              className={cnCollapseIcon({ animate })}
              size={size}
              ref={iconRef}
            />
          )}
        </Transition>
        <Transition
          in={isOpen}
          unmountOnExit
          timeout={animateTimeout}
          nodeRef={closeIconRef}
        >
          {(animate) => (
            <CloseIcon
              {...otherProps}
              className={cnCollapseIcon({ animate })}
              size={size}
              ref={closeIconRef}
            />
          )}
        </Transition>
      </span>
    );
  }
  return (
    <Icon
      {...otherProps}
      className={cnCollapseIcon({ isOpen, direction, closeDirection }, [
        className,
      ])}
      size={size}
    />
  );
};

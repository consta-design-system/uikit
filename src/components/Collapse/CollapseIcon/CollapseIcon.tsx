import './CollapseIcon.css';

import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';

import { cnIcon, IconProps, IconPropSize } from '##/icons/Icon';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

export const collapseIconPropDirection = [
  'up',
  'right',
  'down',
  'left',
  'upRight',
  'downRight',
  'upLeft',
  'downLeft',
] as const;
export type CollapseIconPropDirection =
  typeof collapseIconPropDirection[number];

export type CollapseIconProps = PropsWithHTMLAttributes<
  {
    size: IconPropSize;
    icon: React.FC<IconProps>;
    isOpen?: boolean;
    cildren?: never;
    closeIcon?: React.FC<IconProps>;
    direction?: CollapseIconPropDirection;
    closeDirection?: CollapseIconPropDirection;
  },
  HTMLSpanElement
>;

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
    color,
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

import './CollapseIcon.css';

import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { cnIcon, IconProps, IconPropSize } from '../../../icons/Icon/Icon';
import { cn } from '../../../utils/bem';
import { cnForCssTransition } from '../../../utils/cnForCssTransition';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';

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
export type CollapseIconPropDirection = typeof collapseIconPropDirection[number];

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
const cssTransitionClassNames = cnForCssTransition(cnCollapseIcon);
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
      <span className={cnCollapseIcon('Wrapper', [cnIcon({ size }), className])}>
        <CSSTransition
          in={!isOpen}
          unmountOnExit
          classNames={cssTransitionClassNames}
          timeout={animateTimeout}
          nodeRef={iconRef}
        >
          <Icon
            {...otherProps}
            className={cnCollapseIcon({ withCloseIcon: true })}
            size={size}
            ref={iconRef}
          />
        </CSSTransition>
        <CSSTransition
          in={isOpen}
          unmountOnExit
          classNames={cssTransitionClassNames}
          timeout={animateTimeout}
          nodeRef={closeIconRef}
        >
          <CloseIcon
            {...otherProps}
            className={cnCollapseIcon({ withCloseIcon: true })}
            size={size}
            ref={closeIconRef}
          />
        </CSSTransition>
      </span>
    );
  }
  return (
    <Icon
      {...otherProps}
      className={cnCollapseIcon({ isOpen, direction, closeDirection }, [className])}
      size={size}
    />
  );
};

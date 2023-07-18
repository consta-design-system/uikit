import './CollapseIcon.css';

import { AnimateIconSwitcher } from '@consta/icons/AnimateIconSwitcher';
import React from 'react';

import { cn } from '##/utils/bem';

import { CollapseIconPropDirection, CollapseIconProps } from '../types';

const cnCollapseIcon = cn('CollapseIcon');

const CollapseIconButton = ({
  children,
  className,
  size,
}: {
  children?: React.ReactNode;
  className?: string;
  size: CollapseIconProps['size'];
}) => {
  return (
    <div className={cnCollapseIcon('Button', { size }, [className])}>
      {children}
    </div>
  );
};

const GuardFragment = (props: { children?: React.ReactNode }) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>{props.children}</>
);

const directionsMap: Record<CollapseIconPropDirection, number> = {
  up: 0,
  right: 90,
  down: 180,
  left: 270,
  upRight: 45,
  downRight: 135,
  downLeft: 225,
  upLeft: 315,
};

export const CollapseIcon: React.FC<CollapseIconProps> = (props) => {
  const {
    size,
    icon: Icon,
    closeIcon: CloseIcon,
    direction,
    closeDirection,
    isOpen,
    className,
    view,
    ...otherProps
  } = props;

  const Wrapper = view === 'ghost' ? CollapseIconButton : GuardFragment;
  const wrapperClassName = view === 'ghost' ? className : undefined;
  const renderIconClassName = view === 'clear' ? className : undefined;

  return (
    <Wrapper size={size} className={wrapperClassName}>
      <AnimateIconSwitcher
        startIcon={Icon}
        endIcon={CloseIcon}
        transition={300}
        size={size}
        active={isOpen}
        className={cnCollapseIcon({ view }, [renderIconClassName])}
        startDirection={
          !CloseIcon && direction ? directionsMap[direction] : undefined
        }
        endDirection={
          !CloseIcon && closeDirection
            ? directionsMap[closeDirection]
            : undefined
        }
        {...otherProps}
      />
    </Wrapper>
  );
};

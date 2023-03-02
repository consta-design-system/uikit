import './CollapseIcon.css';

import { cnIcon } from '@consta/icons/Icon';
import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';

import { cn } from '##/utils/bem';

import { CollapseIconProps } from '../types';

const cnCollapseIcon = cn('CollapseIcon');
const animateTimeout = 300;

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

  const iconRef = useRef<HTMLSpanElement>(null);
  const closeIconRef = useRef<HTMLSpanElement>(null);

  const Wrapper = view === 'ghost' ? CollapseIconButton : GuardFragment;
  const wrapperClassName = view === 'ghost' ? className : undefined;
  const renderIconClassName = view === 'clear' ? className : undefined;

  const renderIcon = () => {
    if (CloseIcon) {
      return (
        <span
          className={cnCollapseIcon('Wrapper', [
            cnIcon({ size }),
            renderIconClassName,
          ])}
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
                className={cnCollapseIcon({ animate, view })}
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
                className={cnCollapseIcon({ animate, view })}
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
        className={cnCollapseIcon({ isOpen, direction, closeDirection, view }, [
          renderIconClassName,
        ])}
        size={size}
      />
    );
  };

  return (
    <Wrapper size={size} className={wrapperClassName}>
      {renderIcon()}
    </Wrapper>
  );
};

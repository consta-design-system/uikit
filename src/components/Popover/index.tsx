import './styles.css';

import React, { useEffect, useRef, useState } from 'react';
import throttle from 'lodash/throttle';

import bem from '../../utils/bem';
import { getAnchor } from '../../utils/getAnchor';
import { cnTheme, useTheme } from '../Theme/Theme';

import { getPositionInLayout, getScrollableParentNodes } from './utils/popover-utils';
import Portal from './Portal';

export type Directions =
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-center'
  | 'right-center';

type PopoverRenderChildren = (params: {
  direction: Directions;
  position: { left: number; top: number };
}) => React.ReactNode;

export type PopoverProps = {
  anchor: React.RefObject<HTMLElement | React.Component | null>;
  directions: Directions[];
  visible: boolean;
  offset?: number;
  className?: string;
  children: PopoverRenderChildren | React.ReactNode;
  popoverWidth?: number;
  positionDependencies?: any[];
};

const b = bem('popover');
export const DEFAULT_OFFSET = 10;

export const Popover = ({
  anchor,
  visible,
  directions,
  children,
  className = '',
  offset = DEFAULT_OFFSET,
  popoverWidth,
}: PopoverProps) => {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [show, setShow] = useState(false);
  const [direction, setDirection] = useState(directions[0]);
  const contentRef = useRef(null);
  const scrollableParentNodes = useRef<(Element | Window)[]>();
  const { theme } = useTheme();

  const doReposition = (directions: Directions[]) => {
    const { direction: calculatedDirection, left, top } = getPositionInLayout({
      popup: contentRef.current,
      directions,
      direction,
      anchor: anchor.current,
      offset,
    });

    if (direction !== calculatedDirection || position.left !== left || position.top !== top) {
      setDirection(calculatedDirection);
      setPosition({ left, top });
    }
  };

  const throttleReposition = throttle(doReposition, 100);
  const viewportResizeChangeHandler = () => {
    throttleReposition(directions);
  };
  const scrollChangeHandler = () => {
    if (visible) {
      doReposition(directions);
    }
  };

  useEffect(() => {
    if (visible) {
      if (!show) {
        setShow(true);
      }
      doReposition(directions);
    }

    if (visible) {
      scrollableParentNodes.current = getScrollableParentNodes(getAnchor(anchor.current));
      if (scrollableParentNodes.current) {
        scrollableParentNodes.current.forEach((parent) => {
          parent.addEventListener('scroll', scrollChangeHandler, { passive: true });
        });
      }
      window.addEventListener('resize', viewportResizeChangeHandler, { passive: true });
    }

    return () => {
      if (scrollableParentNodes.current) {
        scrollableParentNodes.current.forEach((parent) => {
          parent.removeEventListener('scroll', scrollChangeHandler);
        });
      }
      window.removeEventListener('resize', viewportResizeChangeHandler);
    };
  }, [
    visible,
    anchor,
    show,
    directions,
    doReposition,
    viewportResizeChangeHandler,
    scrollChangeHandler,
  ]);

  if (!anchor || !anchor.current || !show || !visible) {
    return null;
  }

  const style = {
    left: position.left,
    top: position.top,
    width: popoverWidth,
  };
  const content =
    typeof children === 'function'
      ? children({
          direction,
          position,
        })
      : children;

  return (
    <Portal>
      <div
        className={cnTheme({ ...theme, color: theme.color.accent }, [
          b({ visible, direction }),
          className,
        ])}
        style={style}
      >
        <div className={b('children')} ref={contentRef}>
          {content}
        </div>
      </div>
    </Portal>
  );
};

export default Popover;

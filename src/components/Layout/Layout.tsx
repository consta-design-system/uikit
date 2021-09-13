import './Layout.css';

import React, { useEffect, useRef, useState } from 'react';

import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';

export const layoutPropDirection = ['row', 'column'] as const;
export type LayoutPropDirection = typeof layoutPropDirection[number];
export const layoutPropDirectionDefault: LayoutPropDirection = layoutPropDirection[0];

type LayoutStateStationing = {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
};

export type Props = {
  flex?: string | number;
  fixed?: boolean;
  top?: boolean;
  bottom?: boolean;
  anchorRef?: React.RefObject<HTMLElement>;
  direction?: LayoutPropDirection;
  children?: React.ReactNode;
};

export const cnLayout = cn('Layout');

export const Layout = forwardRefWithAs<Props>((props, ref) => {
  const {
    flex,
    fixed,
    anchorRef,
    direction = layoutPropDirectionDefault,
    children,
    className,
    tabIndex,
    top,
    bottom,
    as = 'div',
    ...otherProps
  } = props;

  const [stationing, setStationing] = useState<LayoutStateStationing>({
    top: 0,
    left: 0,
    width: undefined,
    height: undefined,
  });
  const [isFixed, setIsFixed] = useState(false);

  const containerRef = useRef(null) as React.Ref<HTMLElement>;

  const layoutRef = (ref || containerRef) as React.RefObject<HTMLElement>;

  useEffect(() => {
    if (fixed) {
      handleScroll();
      document.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (fixed) document.removeEventListener('scroll', handleScroll);
    };
  }, [fixed]);

  const handleScroll = () => {
    if (layoutRef !== null && layoutRef.current && layoutRef.current.parentElement) {
      const containerPosition = {
        top: layoutRef.current.parentElement?.offsetTop,
        bottom:
          layoutRef.current.parentElement?.offsetTop +
          layoutRef.current.parentElement?.clientHeight,
        left: layoutRef.current.parentElement?.offsetLeft,
        right:
          layoutRef.current.parentElement?.offsetLeft +
          layoutRef.current.parentElement?.clientWidth,
        width: layoutRef.current.parentElement?.clientWidth,
        height: layoutRef.current.parentElement?.clientHeight,
      };
      if (
        window.scrollY + window.innerHeight >= containerPosition.top &&
        window.scrollY <= containerPosition.bottom
      ) {
        setStationing({
          left: -window.scrollX + containerPosition.left,
          top: bottom
            ? -window.scrollY +
              containerPosition.top +
              containerPosition.height -
              layoutRef.current.offsetHeight
            : -window.scrollY + containerPosition.top,
          width: containerPosition.width,
        });
        setIsFixed(true);
      } else setIsFixed(false);
    }
  };

  const Tag = as as string;

  return (
    <Tag
      tabIndex={tabIndex}
      ref={layoutRef}
      style={{
        flex: Number(flex),
        top: stationing.top,
        left: stationing.left,
        maxWidth: stationing.width,
      }}
      className={cnLayout(
        {
          fixed: isFixed,
          direction,
        },
        [className],
      )}
      {...otherProps}
    >
      {children}
    </Tag>
  );
});

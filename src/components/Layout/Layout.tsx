import './Layout.css';

import React, { useEffect, useRef, useState } from 'react';

import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';

export const layoutPropDirection = ['row', 'column'] as const;
export type LayoutPropDirection = typeof layoutPropDirection[number];
export const layoutPropDirectionDefault: LayoutPropDirection = layoutPropDirection[0];

export const layoutPropVerticalAlign = ['top', 'bottom'] as const;
export type LayoutPropVerticalAlign = typeof layoutPropVerticalAlign[number];
export const layoutPropVerticalAlignDefault: LayoutPropVerticalAlign = layoutPropVerticalAlign[0];

export const layoutPropHorizontalAlign = ['left', 'right'] as const;
export type LayoutPropHorizontalAlign = typeof layoutPropHorizontalAlign[number];
export const layoutPropHorizontalAlignDefault: LayoutPropHorizontalAlign =
  layoutPropHorizontalAlign[0];

type LayoutStateStationing = {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
};

export type Props = {
  flex?: string | number;
  fixed?: boolean;
  verticalAlign?: LayoutPropVerticalAlign;
  horizontalAlign?: LayoutPropHorizontalAlign;
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
    verticalAlign = layoutPropVerticalAlignDefault,
    horizontalAlign = layoutPropHorizontalAlignDefault,
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
      document.removeEventListener('scroll', handleScroll);
      handleScroll();
      document.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (fixed) document.removeEventListener('scroll', handleScroll);
    };
  }, [verticalAlign, horizontalAlign, fixed]);

  const handleScroll = () => {
    if (layoutRef && layoutRef.current && layoutRef.current.parentElement && fixed) {
      const parentContainer =
        anchorRef && anchorRef.current ? anchorRef.current : layoutRef.current.parentElement;
      const containerPosition = {
        top: parentContainer?.offsetTop,
        bottom: parentContainer?.offsetTop + parentContainer?.clientHeight,
        left: parentContainer?.offsetLeft,
        right: parentContainer?.offsetLeft + parentContainer?.clientWidth,
        width: parentContainer?.clientWidth,
        height: parentContainer?.clientHeight,
      };
      if (
        window.scrollY + window.innerHeight >= containerPosition.top &&
        window.scrollY <= containerPosition.bottom
      ) {
        setStationing({
          left:
            horizontalAlign === 'right'
              ? -window.scrollX + containerPosition.right - layoutRef.current.offsetWidth
              : -window.scrollX + containerPosition.left,
          top:
            verticalAlign === 'bottom'
              ? -window.scrollY + containerPosition.bottom - layoutRef.current.offsetHeight
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

import './Layout.css';

import React, { useEffect, useRef, useState } from 'react';

import { useFixed, UseFixedData } from '../../hooks/useFixed/useFixed';
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

export type Props = {
  flex?: number | 'none' | 'undefined';
  fixed?: boolean;
  verticalAlign?: LayoutPropVerticalAlign;
  horizontalAlign?: LayoutPropHorizontalAlign;
  smooth?: boolean;
  anchorRef?: React.RefObject<HTMLElement>;
  scrollContainerRef?: React.RefObject<HTMLElement> | HTMLElement;
  direction?: LayoutPropDirection;
  children?: React.ReactNode;
};

export const cnLayout = cn('Layout');

export const Layout = forwardRefWithAs<Props>((props, ref) => {
  const {
    flex,
    fixed,
    anchorRef,
    scrollContainerRef,
    direction = layoutPropDirectionDefault,
    children,
    smooth = false,
    className,
    tabIndex,
    verticalAlign = layoutPropVerticalAlignDefault,
    horizontalAlign = layoutPropHorizontalAlignDefault,
    as = 'div',
    style,
    ...otherProps
  } = props;

  const [stationing, setStationing] = useState<UseFixedData>({});

  const containerRef = useRef(null) as React.Ref<HTMLElement>;

  const layoutRef = (ref || containerRef) as React.RefObject<HTMLElement>;

  const { top, left, width, height, maxWidth, maxHeight, position } = useFixed(
    layoutRef,
    scrollContainerRef,
    anchorRef,
    verticalAlign,
    horizontalAlign,
    smooth,
  );

  useEffect(() => {
    setStationing({
      ...stationing,
      top,
      left,
      width,
      height,
      maxHeight,
      maxWidth,
      position,
    });
  }, [top, left, width, height, maxWidth, maxHeight, position]);

  const Tag = as as string;

  return (
    <>
      <Tag
        tabIndex={tabIndex}
        ref={layoutRef}
        style={
          fixed
            ? {
                ...style,
                flex,
                top: stationing.top,
                left: stationing.left,
                width: stationing.width,
                maxHeight: stationing.maxHeight,
                maxWidth: stationing.maxWidth,
                position: stationing.position,
              }
            : {
                ...style,
                flex,
              }
        }
        className={cnLayout(
          {
            // fixed: isFixed,
            direction,
          },
          [className],
        )}
        {...otherProps}
      >
        {children}
      </Tag>
      {stationing.position === 'fixed' && fixed && (
        <div
          className={cnLayout('Mock')}
          style={{ minWidth: stationing.width, minHeight: stationing.height, flex }}
        />
      )}
    </>
  );
});

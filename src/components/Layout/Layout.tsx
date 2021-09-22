import './Layout.css';

import React, { useRef } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';

import { useFixed } from './useFixed';

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
    className,
    tabIndex,
    verticalAlign = layoutPropVerticalAlignDefault,
    horizontalAlign = layoutPropHorizontalAlignDefault,
    as = 'div',
    style,
    ...otherProps
  } = props;

  const containerRef = useRef(null);

  const { top, left, width, height, maxWidth, maxHeight, position } = useFixed(
    containerRef,
    scrollContainerRef,
    anchorRef,
    verticalAlign,
    horizontalAlign,
  );

  const Tag = as as string;

  return (
    <>
      <Tag
        tabIndex={tabIndex}
        ref={useForkRef([ref, containerRef])}
        style={
          fixed
            ? {
                ...style,
                flex,
                top,
                left,
                maxHeight,
                maxWidth,
                position,
                minWidth: width,
                minHeight: height,
              }
            : {
                ...style,
                flex,
              }
        }
        className={cnLayout(
          {
            direction,
          },
          [className],
        )}
        {...otherProps}
      >
        {children}
      </Tag>
      {position === 'fixed' && fixed && (
        <div
          className={cnLayout('Fake')}
          style={{
            minWidth: width,
            minHeight: height,
            flex,
            background:
              containerRef && containerRef.current
                ? window.getComputedStyle(containerRef.current).getPropertyValue('background')
                : 'none',
          }}
        />
      )}
    </>
  );
});

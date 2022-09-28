import './Layout.css';

import React, { useRef } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import { useFixed } from './useFixed';

export const layoutPropDirection = ['row', 'column'] as const;
export type LayoutPropDirection = typeof layoutPropDirection[number];
export const layoutPropDirectionDefault: LayoutPropDirection =
  layoutPropDirection[0];

export const layoutPropVerticalAlign = ['top', 'bottom'] as const;
export type LayoutPropVerticalAlign = typeof layoutPropVerticalAlign[number];
export const layoutPropVerticalAlignDefault: LayoutPropVerticalAlign =
  layoutPropVerticalAlign[0];

export const layoutPropHorizontalAlign = ['left', 'right'] as const;
export type LayoutPropHorizontalAlign =
  typeof layoutPropHorizontalAlign[number];
export const layoutPropHorizontalAlignDefault: LayoutPropHorizontalAlign =
  layoutPropHorizontalAlign[0];

export type LayoutProps = {
  flex?: number | 'none';
  fixed?: boolean;
  verticalAlign?: LayoutPropVerticalAlign;
  horizontalAlign?: LayoutPropHorizontalAlign;
  anchorRef?: React.RefObject<HTMLElement>;
  scrollContainer?: React.RefObject<HTMLElement> | HTMLElement | null | Window;
  direction?: LayoutPropDirection;
  children?: React.ReactNode;
};

export const cnLayout = cn('Layout');

export const Layout = forwardRefWithAs<LayoutProps>((props, ref) => {
  const {
    flex,
    fixed,
    anchorRef,
    scrollContainer,
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

  const containerRef = useRef<HTMLElement>(null);

  const { top, left, width, height, maxWidth, maxHeight, position } = useFixed(
    containerRef,
    scrollContainer,
    anchorRef,
    verticalAlign,
    horizontalAlign,
  );

  const Tag = as as string;

  const backgroundColor =
    containerRef && containerRef.current
      ? window
          .getComputedStyle(containerRef.current)
          .getPropertyValue('background-color')
      : 'none';

  return (
    <>
      <Tag
        tabIndex={tabIndex}
        ref={useForkRef([ref, containerRef])}
        style={
          fixed
            ? {
                ...style,
                ['--layout-flex' as string]: flex,
                ['--layout-top' as string]: `${top}px`,
                ['--layout-left' as string]: `${left}px`,
                ['--layout-max-height' as string]: `${maxHeight}px`,
                ['--layout-max-width' as string]: `${maxWidth}px`,
                ['--layout-position' as string]: position,
                ['--layout-min-width' as string]: `${width}px`,
                ['--layout-min-height' as string]: `${height}px`,
              }
            : {
                ...style,
                ['--layout-flex' as string]: flex,
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
            ['--layout-flex' as string]: flex,
            ['--layout-min-width' as string]: `${width}px`,
            ['--layout-min-height' as string]: `${height}px`,
            ['--layout-bg-color' as string]: backgroundColor,
          }}
        />
      )}
    </>
  );
});

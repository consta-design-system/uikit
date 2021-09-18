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
  maxWidth?: number;
};

export type Props = {
  flex?: number | 'none' | 'undefined';
  fixed?: boolean;
  verticalAlign?: LayoutPropVerticalAlign;
  horizontalAlign?: LayoutPropHorizontalAlign;
  anchorRef?: React.RefObject<HTMLElement>;
  scrollContainerRef?: React.RefObject<HTMLElement>;
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

  const [stationing, setStationing] = useState<LayoutStateStationing>({
    top: 0,
    left: 0,
  });
  const [isFixed, setIsFixed] = useState(false);

  const containerRef = useRef(null) as React.Ref<HTMLElement>;

  const layoutRef = (ref || containerRef) as React.RefObject<HTMLElement>;

  useEffect(() => {
    let startScroll = 0;
    setTimeout(() => {
      if (layoutRef && layoutRef.current && layoutRef.current.parentElement && fixed) {
        const parentContainer =
          scrollContainerRef && scrollContainerRef.current
            ? scrollContainerRef.current
            : layoutRef.current.parentElement;
        startScroll = Math.abs(layoutRef.current.offsetTop - parentContainer?.offsetTop);
        positioning(startScroll);
        document.addEventListener('scroll', () => positioning(startScroll));
        parentContainer.addEventListener('scroll', () => positioning(startScroll));
      }
    }, 500);
    return () => {
      if (layoutRef && layoutRef.current && layoutRef.current.parentElement && fixed) {
        const parentContainer =
          scrollContainerRef && scrollContainerRef.current
            ? scrollContainerRef.current
            : layoutRef.current.parentElement;
        document.removeEventListener('scroll', () => positioning(startScroll));
        parentContainer.removeEventListener('scroll', () => positioning(startScroll));
      }
    };
  }, [verticalAlign, horizontalAlign, fixed]);

  const positioning = (startScroll: number | undefined) => {
    if (layoutRef && layoutRef.current && layoutRef.current.parentElement && fixed && startScroll) {
      const scrollContainer =
        scrollContainerRef && scrollContainerRef.current
          ? scrollContainerRef.current
          : layoutRef.current.parentElement;
      const scrollContainerPosition = {
        top: scrollContainer?.offsetTop,
        bottom: scrollContainer?.offsetTop + scrollContainer?.clientHeight,
        left: scrollContainer?.offsetLeft,
        right: scrollContainer?.offsetLeft + scrollContainer?.clientWidth,
        width: scrollContainer?.clientWidth,
        height: scrollContainer?.clientHeight,
      };
      const stationingData = {
        top: 0,
        left: 0,
        width: layoutRef.current.offsetWidth,
        height: layoutRef.current.offsetHeight,
        maxWidth: scrollContainerPosition.width,
      };
      if (
        verticalAlign === 'top'
          ? scrollContainer.scrollTop > startScroll &&
            scrollContainer.scrollTop <=
              scrollContainer.scrollHeight -
                scrollContainer.offsetHeight +
                layoutRef.current.offsetHeight
          : scrollContainer.scrollTop + scrollContainer.offsetHeight <
              startScroll + layoutRef.current.offsetHeight &&
            scrollContainer.scrollTop + layoutRef.current.offsetHeight <=
              scrollContainer.scrollHeight - scrollContainer.offsetHeight
      ) {
        if (verticalAlign === 'top')
          stationingData.top =
            anchorRef && anchorRef.current
              ? anchorRef.current.offsetTop
              : -window.scrollY + scrollContainerPosition.top;
        else
          stationingData.top =
            anchorRef && anchorRef.current
              ? anchorRef.current.offsetTop + anchorRef.current.offsetHeight
              : -window.scrollY + scrollContainerPosition.bottom;
        if (horizontalAlign === 'left')
          stationingData.left =
            anchorRef && anchorRef.current
              ? anchorRef.current.offsetLeft
              : -window.scrollX + scrollContainerPosition.left;
        else
          stationingData.left =
            anchorRef && anchorRef.current
              ? anchorRef.current.offsetLeft +
                anchorRef.current.offsetWidth -
                layoutRef.current.offsetWidth
              : -window.scrollX + scrollContainerPosition.right - layoutRef.current.offsetWidth;
        if (
          verticalAlign === 'bottom' &&
          startScroll - scrollContainer.scrollTop - scrollContainer.offsetHeight <= 0
        ) {
          stationingData.top =
            -window.scrollY +
            scrollContainerPosition.bottom -
            scrollContainer.scrollTop -
            scrollContainer.offsetHeight +
            startScroll;
        }
        setStationing(stationingData);
        setIsFixed(true);
      } else setIsFixed(false);
    }
  };

  const Tag = as as string;

  return (
    <>
      <Tag
        tabIndex={tabIndex}
        ref={layoutRef}
        style={{
          ...style,
          flex,
          top: stationing.top,
          left: stationing.left,
          maxWidth: stationing.maxWidth,
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
      {isFixed && <div style={{ width: stationing.width, height: stationing.height }} />}
    </>
  );
});

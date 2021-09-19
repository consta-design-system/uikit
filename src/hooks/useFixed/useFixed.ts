import React, { useEffect, useState } from 'react';

export type UseFixedData = {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  maxWidth?: number;
  position?: 'unset' | 'fixed';
};

const verticalAlign = ['top', 'bottom'] as const;
type VerticalAlign = typeof verticalAlign[number];
const verticalAlignDefault: VerticalAlign = verticalAlign[0];

const horizontalAlign = ['left', 'right'] as const;
type HorizontalAlign = typeof horizontalAlign[number];
const horizontalAlignDefault: HorizontalAlign = horizontalAlign[0];

type UseFixed = (
  layoutRef?: React.RefObject<HTMLElement>,
  scrollContainerRef?: React.RefObject<HTMLElement>,
  anchorRef?: React.RefObject<HTMLElement>,
  verticalAlign?: VerticalAlign,
  horizontalAlign?: HorizontalAlign,
) => UseFixedData;

type PositioningFunction = (
  startScroll?: number,
  layoutRef?: React.RefObject<HTMLElement>,
  scrollContainerRef?: React.RefObject<HTMLElement>,
  anchorRef?: React.RefObject<HTMLElement>,
) => void;

export const useFixed: UseFixed = (
  layoutRef,
  scrollContainerRef,
  anchorRef,
  verticalAlign = verticalAlignDefault,
  horizontalAlign = horizontalAlignDefault,
) => {
  const [stationing, setStationing] = useState<UseFixedData>({});

  useEffect(() => {
    let startScroll = 0;
    setTimeout(() => {
      if (layoutRef && layoutRef.current && layoutRef.current.parentElement) {
        const parentContainer =
          scrollContainerRef && scrollContainerRef.current
            ? scrollContainerRef.current
            : layoutRef.current.parentElement;
        startScroll =
          layoutRef.current.offsetTop - parentContainer?.offsetTop >= 0
            ? layoutRef.current.offsetTop - parentContainer?.offsetTop
            : 0;
        positioning(startScroll);
        document.addEventListener('scroll', () => positioning(startScroll));
        parentContainer.addEventListener('scroll', () => positioning(startScroll));
      }
    }, 500);
    return () => {
      if (layoutRef && layoutRef.current && layoutRef.current.parentElement) {
        const parentContainer =
          scrollContainerRef && scrollContainerRef.current
            ? scrollContainerRef.current
            : layoutRef.current.parentElement;
        document.removeEventListener('scroll', () => positioning(startScroll));
        parentContainer.removeEventListener('scroll', () => positioning(startScroll));
      }
    };
  }, [verticalAlign, horizontalAlign, layoutRef, scrollContainerRef, anchorRef]);

  const positioning: PositioningFunction = (startScroll) => {
    if (
      layoutRef &&
      layoutRef.current &&
      layoutRef.current.parentElement &&
      typeof startScroll === 'number'
    ) {
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
      const stationingData: UseFixedData = {
        top: 0,
        left: 0,
        width: layoutRef.current.offsetWidth,
        height: layoutRef.current.offsetHeight,
        maxWidth: scrollContainerPosition.width,
        position: 'unset',
      };
      let isFixable = false;
      if (verticalAlign === 'top')
        isFixable =
          scrollContainer.scrollTop >= startScroll &&
          scrollContainer.scrollTop <=
            scrollContainer.scrollHeight -
              scrollContainer.offsetHeight +
              layoutRef.current.offsetHeight;
      else
        isFixable =
          anchorRef && anchorRef.current
            ? scrollContainer.scrollTop + anchorRef.current.offsetHeight >= startScroll &&
              scrollContainer.scrollTop <=
                scrollContainer.scrollHeight -
                  scrollContainer.offsetHeight +
                  layoutRef.current.offsetHeight
            : scrollContainer.scrollTop + scrollContainer.offsetHeight <=
                startScroll + layoutRef.current.offsetHeight &&
              scrollContainer.scrollTop <=
                scrollContainer.scrollHeight - scrollContainer.offsetHeight;
      // console.log(startScroll, isFixable,scrollContainer.scrollTop)
      if (isFixable) {
        stationingData.position = 'fixed';
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
          !anchorRef &&
          startScroll - scrollContainer.scrollTop - scrollContainer.offsetHeight <= 0
        ) {
          stationingData.top =
            -window.scrollY +
            scrollContainerPosition.bottom -
            scrollContainer.scrollTop -
            scrollContainer.offsetHeight +
            startScroll;
        }
      } else stationingData.position = 'unset';
      setStationing(stationingData);
    }
  };

  return stationing;
};

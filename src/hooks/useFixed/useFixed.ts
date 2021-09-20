import React, { useCallback, useEffect, useState } from 'react';

export type UseFixedData = {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  maxWidth?: number;
  maxHeight?: number;
  position?: 'unset' | 'fixed';
};

const verticalAlign = ['top', 'bottom'] as const;
type VerticalAlign = typeof verticalAlign[number];
const verticalAlignDefault: VerticalAlign = verticalAlign[0];

const horizontalAlign = ['left', 'right'] as const;
type HorizontalAlign = typeof horizontalAlign[number];
const horizontalAlignDefault: HorizontalAlign = horizontalAlign[0];

type UseFixed = (
  layoutRef?: React.RefObject<HTMLElement> | null,
  scrollContainerRef?: React.RefObject<HTMLElement> | null | HTMLElement,
  anchorRef?: React.RefObject<HTMLElement> | null,
  verticalAlign?: VerticalAlign,
  horizontalAlign?: HorizontalAlign,
  smoothMode?: boolean,
) => UseFixedData;

type GetHTMLFunction = (element: React.RefObject<HTMLElement> | HTMLElement) => HTMLElement | null;

export const useFixed: UseFixed = (
  layoutRef,
  scrollContainerRef,
  anchorRef,
  verticalAlign = verticalAlignDefault,
  horizontalAlign = horizontalAlignDefault,
  smoothMode = false,
) => {
  const [stationing, setStationing] = useState<UseFixedData>({});
  const [result, setResult] = useState<UseFixedData>({});

  const getHTMLElement: GetHTMLFunction = (element) => {
    if (element && !(element instanceof HTMLElement)) return element?.current;
    return element;
  };

  useEffect(() => {
    let startScroll = 0;
    setTimeout(() => {
      if (layoutRef && layoutRef.current && layoutRef.current.parentElement) {
        const parentContainer = scrollContainerRef
          ? getHTMLElement(scrollContainerRef)
          : layoutRef.current.parentElement;
        if (parentContainer)
          startScroll =
            layoutRef.current.offsetTop - parentContainer?.offsetTop >= 0
              ? layoutRef.current.offsetTop - parentContainer?.offsetTop
              : 0;
        positioning(startScroll);
        if (smoothMode) document.addEventListener('scroll', () => positioning(startScroll));
        if (typeof parentContainer?.addEventListener === 'function')
          parentContainer?.addEventListener('scroll', () => positioning(startScroll));
      }
    }, 500);
    return () => {
      if (layoutRef && layoutRef.current && layoutRef.current.parentElement) {
        const parentContainer = scrollContainerRef
          ? getHTMLElement(scrollContainerRef)
          : layoutRef.current.parentElement;
        if (smoothMode) document.removeEventListener('scroll', () => positioning(startScroll));
        if (typeof parentContainer?.removeEventListener === 'function')
          parentContainer?.removeEventListener('scroll', () => positioning(startScroll));
      }
    };
  }, [verticalAlign, horizontalAlign, layoutRef, scrollContainerRef, anchorRef]);

  useEffect(() => {
    setResult({ ...stationing });
  }, [
    stationing.top,
    stationing.left,
    stationing.position,
    stationing.width,
    stationing.height,
    stationing.maxHeight,
    stationing.maxWidth,
  ]);

  const positioning = useCallback(
    (startScroll: number) => {
      if (
        layoutRef &&
        layoutRef.current &&
        layoutRef.current.parentElement &&
        typeof startScroll === 'number'
      ) {
        const scrollContainer = scrollContainerRef
          ? getHTMLElement(scrollContainerRef)
          : layoutRef.current.parentElement;
        if (scrollContainer) {
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
            maxHeight: scrollContainerPosition.height,
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
                  : -window.scrollY +
                    scrollContainerPosition.bottom -
                    layoutRef.current.offsetHeight;
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
          } else stationingData.position = 'unset';
          setStationing({ ...stationingData, ...stationing });
        }
      }
    },
    [stationing],
  );

  return result;
};

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
) => UseFixedData;

export type ElementStationing = {
  offsetTop: number;
  offsetHeight: number;
  offsetLeft: number;
  offsetWidth: number;
  clientHeight: number;
  clientWidth: number;
  scrollTop: number;
  scrollHeight: number;
};

type GetHTMLFunction = (element: React.RefObject<HTMLElement> | HTMLElement) => HTMLElement | null;

type PositioningElement = (
  startScroll?: number,
  layoutStationing?: ElementStationing,
  scrollContainerStationing?: ElementStationing,
  anchorStationing?: ElementStationing,
  verticalAlign?: VerticalAlign,
  horizontalAlign?: HorizontalAlign,
) => UseFixedData;

const positioningElement: PositioningElement = (
  startScroll,
  layoutStationing,
  scrollContainerStationing,
  anchorStationing,
  verticalAlign,
  horizontalAlign,
) => {
  const stationingData: UseFixedData = {
    top: 0,
    left: 0,
    width: layoutStationing?.offsetWidth,
    height: layoutStationing?.offsetHeight,
    maxWidth: scrollContainerStationing?.clientWidth,
    maxHeight: scrollContainerStationing?.clientHeight,
    position: 'unset',
  };
  if (layoutStationing && scrollContainerStationing && typeof startScroll !== 'undefined') {
    const scrollContainerPosition = {
      top: scrollContainerStationing.offsetTop,
      bottom: scrollContainerStationing.offsetTop + scrollContainerStationing.clientHeight,
      left: scrollContainerStationing.offsetLeft,
      right: scrollContainerStationing.offsetLeft + scrollContainerStationing.clientWidth,
      width: scrollContainerStationing.clientWidth,
      height: scrollContainerStationing.clientHeight,
    };
    stationingData.width = layoutStationing.offsetWidth;
    stationingData.height = layoutStationing.offsetHeight;
    stationingData.maxWidth = scrollContainerPosition.width;
    stationingData.maxHeight = scrollContainerPosition.height;
    let isFixable = false;
    if (verticalAlign === 'top')
      isFixable =
        scrollContainerStationing.scrollTop >= startScroll &&
        scrollContainerStationing.scrollTop <=
          scrollContainerStationing.scrollHeight -
            scrollContainerStationing.offsetHeight +
            layoutStationing.offsetHeight;
    else
      isFixable = anchorStationing
        ? scrollContainerStationing.scrollTop + anchorStationing.offsetHeight >= startScroll &&
          scrollContainerStationing.scrollTop <=
            scrollContainerStationing.scrollHeight -
              scrollContainerStationing.offsetHeight +
              layoutStationing.offsetHeight
        : scrollContainerStationing.scrollTop + scrollContainerStationing.offsetHeight <=
            startScroll + layoutStationing.offsetHeight &&
          scrollContainerStationing.scrollTop <=
            scrollContainerStationing.scrollHeight - scrollContainerStationing.offsetHeight;
    if (isFixable) {
      stationingData.position = 'fixed';
      if (verticalAlign === 'top')
        stationingData.top = anchorStationing
          ? anchorStationing.offsetTop
          : -window.scrollY + scrollContainerPosition.top;
      else
        stationingData.top = anchorStationing
          ? anchorStationing.offsetTop + anchorStationing.offsetHeight
          : -window.scrollY + scrollContainerPosition.bottom - layoutStationing.offsetHeight;
      if (horizontalAlign === 'left')
        stationingData.left = anchorStationing
          ? anchorStationing.offsetLeft
          : -window.scrollX + scrollContainerPosition.left;
      else
        stationingData.left = anchorStationing
          ? anchorStationing.offsetLeft +
            anchorStationing.offsetWidth -
            layoutStationing.offsetWidth
          : -window.scrollX + scrollContainerPosition.right - layoutStationing.offsetWidth;
    } else stationingData.position = 'unset';
  }
  return stationingData;
};

export const useFixed: UseFixed = (
  layoutRef,
  scrollContainerRef,
  anchorRef,
  verticalAlign = verticalAlignDefault,
  horizontalAlign = horizontalAlignDefault,
) => {
  const [stationing, setStationing] = useState<UseFixedData>({});
  const [result, setResult] = useState<UseFixedData>({});

  const getHTMLElement: GetHTMLFunction = (element) => {
    if (element && !(element instanceof HTMLElement)) return element?.current;
    return element;
  };

  const getStationingElement = (element?: HTMLElement | null): ElementStationing | undefined => {
    if (element instanceof HTMLElement)
      return {
        offsetTop: element.offsetTop,
        offsetHeight: element.offsetHeight,
        offsetLeft: element.offsetLeft,
        offsetWidth: element.offsetWidth,
        clientHeight: element.clientHeight,
        clientWidth: element.clientWidth,
        scrollTop: element.scrollTop,
        scrollHeight: element.scrollHeight,
      };
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
        document.addEventListener('resize', resizing);
        if (typeof parentContainer?.addEventListener === 'function') {
          parentContainer?.addEventListener('resize', resizing);
          parentContainer?.addEventListener('scroll', () => positioning(startScroll));
        }
      }
    }, 500);
    return () => {
      if (layoutRef && layoutRef.current && layoutRef.current.parentElement) {
        const parentContainer = scrollContainerRef
          ? getHTMLElement(scrollContainerRef)
          : layoutRef.current.parentElement;
        document.removeEventListener('resize', resizing);
        if (typeof parentContainer?.removeEventListener === 'function') {
          parentContainer?.removeEventListener('resize', resizing);
          parentContainer?.removeEventListener('scroll', () => positioning(startScroll));
        }
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

  const resizing = () => {
    if (layoutRef && layoutRef.current && layoutRef.current.parentElement) {
      const scrollContainer = scrollContainerRef
        ? getHTMLElement(scrollContainerRef)
        : layoutRef.current.parentElement;
      setStationing({
        ...stationing,
        width: layoutRef.current.offsetWidth,
        height: layoutRef.current.offsetHeight,
        maxWidth: scrollContainer?.clientWidth,
        maxHeight: scrollContainer?.clientHeight,
      });
    }
  };

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
          const stationingData = positioningElement(
            startScroll,
            getStationingElement(layoutRef.current),
            getStationingElement(scrollContainer),
            getStationingElement(anchorRef?.current),
            verticalAlign,
            horizontalAlign,
          );
          setStationing({ ...stationingData });
        }
      }
    },
    [stationing],
  );

  return result;
};

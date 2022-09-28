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
  scrollContainer?: React.RefObject<HTMLElement> | null | HTMLElement | Window,
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

type GetHTMLFunction = (
  element: React.RefObject<HTMLElement> | HTMLElement | Window,
) => HTMLElement | Window | null;

type PositioningElement = (
  startScroll?: number,
  layoutStationing?: ElementStationing,
  scrollContainerStationing?: ElementStationing,
  anchorStationing?: ElementStationing,
  verticalAlign?: VerticalAlign,
  horizontalAlign?: HorizontalAlign,
) => UseFixedData;

const getHTMLElement: GetHTMLFunction = (element) => {
  if (element && !(element instanceof HTMLElement || element instanceof Window))
    return element?.current;
  return element;
};

const getStationingElement = (
  element?: HTMLElement | null | Window,
): ElementStationing | undefined => {
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
  if (element instanceof Window) {
    return {
      offsetTop: 0,
      offsetHeight: element.innerHeight,
      offsetLeft: 0,
      offsetWidth: element.innerWidth,
      clientHeight: element.innerHeight,
      clientWidth: element.innerWidth,
      scrollTop: element.scrollY,
      scrollHeight: Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
      ),
    };
  }
  return undefined;
};

const isElementScrollible = (
  element: ElementStationing,
  container: ElementStationing,
  anchor: ElementStationing | undefined,
  isVerticalFixation: boolean,
  startScroll: number,
): boolean | undefined => {
  if (isVerticalFixation)
    return (
      container.scrollTop >= startScroll &&
      container.scrollTop <=
        container.scrollHeight - container.offsetHeight + element.offsetHeight
    );
  return anchor
    ? container.scrollTop + anchor.offsetHeight >= startScroll &&
        container.scrollTop <=
          container.scrollHeight - container.offsetHeight + element.offsetHeight
    : container.scrollTop + container.offsetHeight <=
        startScroll + element.offsetHeight &&
        container.scrollTop <= container.scrollHeight - container.offsetHeight;
};

export const positioningElement: PositioningElement = (
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
  if (
    layoutStationing &&
    scrollContainerStationing &&
    typeof startScroll !== 'undefined'
  ) {
    const scrollContainerPosition = {
      top: scrollContainerStationing.offsetTop,
      bottom:
        scrollContainerStationing.offsetTop +
        scrollContainerStationing.clientHeight,
      left: scrollContainerStationing.offsetLeft,
      right:
        scrollContainerStationing.offsetLeft +
        scrollContainerStationing.clientWidth,
      width: scrollContainerStationing.clientWidth,
      height: scrollContainerStationing.clientHeight,
    };
    stationingData.width = layoutStationing.offsetWidth;
    stationingData.height = layoutStationing.offsetHeight;
    stationingData.maxWidth = scrollContainerPosition.width;
    stationingData.maxHeight = scrollContainerPosition.height;
    if (
      isElementScrollible(
        layoutStationing,
        scrollContainerStationing,
        anchorStationing,
        verticalAlign === 'top',
        startScroll,
      )
    ) {
      stationingData.position = 'fixed';
      if (verticalAlign === 'top')
        stationingData.top = anchorStationing
          ? anchorStationing.offsetTop
          : scrollContainerPosition.top;
      else
        stationingData.top = anchorStationing
          ? anchorStationing.offsetTop + anchorStationing.offsetHeight
          : scrollContainerPosition.bottom - layoutStationing.offsetHeight;
      if (horizontalAlign === 'left')
        stationingData.left = anchorStationing
          ? anchorStationing.offsetLeft
          : -window.scrollX + scrollContainerPosition.left;
      else
        stationingData.left = anchorStationing
          ? anchorStationing.offsetLeft +
            anchorStationing.offsetWidth -
            layoutStationing.offsetWidth
          : -window.scrollX +
            scrollContainerPosition.right -
            layoutStationing.offsetWidth;
    } else stationingData.position = 'unset';
  }
  return stationingData;
};

export const useFixed: UseFixed = (
  layoutRef,
  scrollContainer,
  anchorRef,
  verticalAlign = verticalAlignDefault,
  horizontalAlign = horizontalAlignDefault,
) => {
  const [stationing, setStationing] = useState<UseFixedData>({});
  const [result, setResult] = useState<UseFixedData>({});

  useEffect(() => {
    let startScroll = 0;
    setTimeout(
      () => {
        if (layoutRef && layoutRef.current && layoutRef.current.parentElement) {
          const parentContainer = scrollContainer
            ? getHTMLElement(scrollContainer)
            : layoutRef.current.parentElement;
          const parentStationing = getStationingElement(parentContainer);
          if (parentStationing) {
            startScroll =
              layoutRef.current.offsetTop - parentStationing.offsetTop >= 0
                ? layoutRef.current.offsetTop - parentStationing.offsetTop
                : 0;
          }
          positioning(startScroll);
          document.addEventListener('resize', resizing);
          if (typeof parentContainer?.addEventListener === 'function') {
            parentContainer?.addEventListener('resize', resizing);
            parentContainer?.addEventListener('scroll', () =>
              positioning(startScroll),
            );
          }
        }
      },
      typeof scrollContainer !== 'undefined' ? 0 : 500,
    );
    return () => {
      if (layoutRef && layoutRef.current && layoutRef.current.parentElement) {
        const parentContainer = scrollContainer
          ? getHTMLElement(scrollContainer)
          : layoutRef.current.parentElement;
        document.removeEventListener('resize', resizing);
        if (typeof parentContainer?.removeEventListener === 'function') {
          parentContainer?.removeEventListener('resize', resizing);
          parentContainer?.removeEventListener('scroll', () =>
            positioning(startScroll),
          );
        }
      }
    };
  }, [verticalAlign, horizontalAlign, layoutRef, scrollContainer, anchorRef]);

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
      const parentContainer = scrollContainer
        ? getHTMLElement(scrollContainer)
        : layoutRef.current.parentElement;
      const parentStationing = getStationingElement(parentContainer);
      setStationing({
        ...stationing,
        width: layoutRef.current.offsetWidth,
        height: layoutRef.current.offsetHeight,
        maxWidth: parentStationing?.clientWidth,
        maxHeight: parentStationing?.clientHeight,
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
        const parentContainer = scrollContainer
          ? getHTMLElement(scrollContainer)
          : layoutRef.current.parentElement;
        if (scrollContainer) {
          const stationingData = positioningElement(
            startScroll,
            getStationingElement(layoutRef.current),
            getStationingElement(parentContainer),
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

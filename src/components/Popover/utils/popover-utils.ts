import React from 'react';

import { getAnchor } from '../../../utils/getAnchor';
import { Directions } from '..';

type ViewportDimensions = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};

type PopupPosition = {
  top: number;
  left: number;
};

type PopupSize = {
  area: number;
  width: number;
  height: number;
};

type AnchorDimensions = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const getViewportDimensions = () => {
  const top = window.pageYOffset;
  const left = window.pageXOffset;
  const height = window.innerHeight;
  const width = window.innerWidth;

  return {
    top,
    left,
    bottom: top + height,
    right: left + width,
  };
};

const getPopupDimensions = (popup: HTMLElement | null) => {
  const dimensions = {
    width: popup ? popup.offsetWidth : 0,
    height: popup ? popup.offsetHeight : 0,
  };

  return {
    ...dimensions,
    area: dimensions.width * dimensions.height,
  };
};

const getAnchorDimensions = (anchor: HTMLElement | React.Component | null) => {
  const anchorObject = getAnchor(anchor);

  if (anchorObject && anchorObject instanceof Element) {
    const anchorRect = anchorObject.getBoundingClientRect();
    const viewportRect = document.documentElement.getBoundingClientRect();

    return {
      left: anchorRect.left - viewportRect.left,
      top: anchorRect.top - viewportRect.top,
      width: anchorRect.width,
      height: anchorRect.height,
    };
  }

  return {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  };
};

const getPopupPosition = ({
  direction,
  anchorDimensions,
  popupSize,
  offset = 5,
}: {
  direction: string[];
  anchorDimensions: AnchorDimensions;
  popupSize: PopupSize;
  offset?: number;
}) => {
  let top = 0;
  let left = 0;

  // Базовая направляющая
  if (direction[0] === 'bottom') {
    top = anchorDimensions.top + anchorDimensions.height + offset;
  } else if (direction[0] === 'top') {
    top = anchorDimensions.top - popupSize.height - offset;
  } else if (direction[0] === 'left') {
    left = anchorDimensions.left - popupSize.width - offset;
  } else if (direction[0] === 'right') {
    left = anchorDimensions.left + anchorDimensions.width + offset;
  }

  // Дополнительная направляющая
  if (direction[1] === 'right') {
    left = anchorDimensions.left + anchorDimensions.width - popupSize.width;
  } else if (direction[1] === 'left') {
    left = anchorDimensions.left;
  } else if (direction[1] === 'bottom') {
    top = anchorDimensions.top + anchorDimensions.height - popupSize.height;
  } else if (direction[1] === 'top') {
    top = anchorDimensions.top;
  } else if (direction[1] === 'center') {
    if (direction[0] === 'bottom' || direction[0] === 'top') {
      left = anchorDimensions.left + anchorDimensions.width / 2 - popupSize.width / 2;
    } else if (direction[0] === 'left' || direction[0] === 'right') {
      top = anchorDimensions.top + anchorDimensions.height / 2 - popupSize.height / 2;
    }
  }

  return { top, left };
};

const getViewportFactor = (
  popupPosition: PopupPosition,
  viewportDimensions: ViewportDimensions,
  popupSize: PopupSize,
) => {
  const viewportOffset = 10;
  const intersectionLeft = Math.max(popupPosition.left, viewportDimensions.left + viewportOffset);
  const intersectionRight = Math.min(
    popupPosition.left + popupSize.width,
    viewportDimensions.right - viewportOffset,
  );
  const intersectionTop = Math.max(popupPosition.top, viewportDimensions.top + viewportOffset);
  const intersectionBottom = Math.min(
    popupPosition.top + popupSize.height,
    viewportDimensions.bottom - viewportOffset,
  );

  if (intersectionLeft < intersectionRight && intersectionTop < intersectionBottom) {
    return (
      ((intersectionRight - intersectionLeft) * (intersectionBottom - intersectionTop)) /
      popupSize.area
    );
  }

  return 0;
};

export const getScrollableParentNodes = (element: Element | Text | null) => {
  if (!(element instanceof Element)) {
    return [window];
  }

  const { position } = window.getComputedStyle(element);
  const scrollableParents: Element[] = [];

  if (position === 'fixed') {
    return [element];
  }

  let parent = element;

  // eslint-disable-next-line no-cond-assign
  while ((parent = parent.parentNode as Element) && parent.nodeType === 1) {
    const style = window.getComputedStyle(parent);

    if (!style) {
      scrollableParents.push(parent);
      return scrollableParents;
    }

    const overflow = (style.overflow || '') + (style.overflowY || '') + (style.overflowX || '');
    if (/(auto|scroll)/.test(overflow)) {
      if (
        position !== 'absolute' ||
        ['relative', 'absolute', 'fixed'].indexOf(style.position || '') >= 0
      ) {
        scrollableParents.push(parent);
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  scrollableParents.push(window);

  return scrollableParents;
};

export const getPositionInLayout = ({
  directions,
  direction,
  popup,
  anchor,
  offset,
}: {
  directions: Directions[];
  direction: Directions;
  popup: HTMLElement | null;
  anchor: HTMLElement | React.Component | null;
  offset: number;
}) => {
  const viewportDimensions = getViewportDimensions();
  const popupSize = getPopupDimensions(popup);
  const anchorDimensions = getAnchorDimensions(anchor);
  const directionChunks = directions.map((direction) => direction.split('-'));

  let bestViewportFactor = 0;
  let bestDirection = directions[0];
  let bestPosition = {
    left: 0,
    top: 0,
  };

  for (let i = 0; i < directionChunks.length; i++) {
    const currentDirection = directionChunks[i];
    const position = getPopupPosition({
      direction: currentDirection,
      anchorDimensions,
      popupSize,
      offset,
    });
    const viewportFactor = getViewportFactor(position, viewportDimensions, popupSize);

    if (
      viewportFactor > bestViewportFactor ||
      (!bestViewportFactor && direction === currentDirection.join('-'))
    ) {
      bestDirection = currentDirection.join('-') as Directions;
      bestViewportFactor = viewportFactor;
      bestPosition = position;
    }
    if (bestViewportFactor > 0.99) {
      break;
    }
  }

  return {
    direction: bestDirection,
    ...bestPosition,
  };
};

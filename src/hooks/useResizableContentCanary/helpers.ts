import React from 'react';

import { trackPosition } from '##/components/Slider/useSlider/helper';

import {
  UseResizableContentPropDirection,
  UseResizableContentRef,
  UseResizableContentSize,
} from './types';

export const getRefsSizes = (
  refs: Array<UseResizableContentRef | React.RefObject<HTMLElement>>,
  direction: UseResizableContentPropDirection,
): UseResizableContentSize[] =>
  refs.map((el) => {
    const ref = Object.prototype.hasOwnProperty.call(el, 'current')
      ? (el as React.RefObject<HTMLElement>)
      : (el as UseResizableContentRef).ref;
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      return {
        width: direction === 'horizontal' ? width : undefined,
        height: direction === 'horizontal' ? undefined : height,
      };
    }
    return {
      width: undefined,
      height: undefined,
    };
  });

const getTargetBlockPosition = (
  sizes: UseResizableContentSize[],
  direction: UseResizableContentPropDirection,
  index: number,
) =>
  sizes
    .slice(0, index)
    .map((el) => (direction === 'horizontal' ? el.width : el.height) ?? 0)
    .reduce((val, a) => (val ?? 0) + (a ?? 0), 0);

const getNonCalcualtedSize = (
  sizes: UseResizableContentSize[],
  direction: UseResizableContentPropDirection,
  index: number,
) =>
  sizes
    .filter((_el, i) => !(index === i || index + 1 === i))
    .map((el) => (direction === 'horizontal' ? el.width : el.height) ?? 0)
    .reduce((val, a) => (val ?? 0) + (a ?? 0), 0);

const getBlockMaxSizes = (
  blocks: Array<UseResizableContentRef | React.RefObject<HTMLElement>>,
  direction: UseResizableContentPropDirection,
  index: number,
) => {
  if (!Object.prototype.hasOwnProperty.call(blocks[index], 'current')) {
    const el = blocks[index] as UseResizableContentRef;
    return [
      direction === 'horizontal' ? el.minWidth : el.minHeight,
      direction === 'horizontal' ? el.maxWidth : el.maxHeight,
    ];
  }
  return [undefined, undefined];
};

const getValidValues = (params: {
  value: number;
  index: number;
  direction: UseResizableContentPropDirection;
  blocks: Array<UseResizableContentRef | React.RefObject<HTMLElement>>;
  containerWidth: number;
  containerHeight: number;
  sizes: UseResizableContentSize[];
}) => {
  const {
    value,
    index,
    direction,
    blocks,
    sizes,
    containerHeight,
    containerWidth,
  } = params;
  const blocksSizes =
    (direction === 'horizontal' ? containerWidth : containerHeight) -
    getNonCalcualtedSize(sizes, direction, index);
  const current = getBlockMaxSizes(blocks, direction, index);
  const next = getBlockMaxSizes(blocks, direction, index + 1);
  let results = [value, blocksSizes - value];
  const right = blocksSizes - value;
  if (value < 0 || (current[0] && value < current[0])) {
    const min = current[0] ?? 0;
    results = [min, blocksSizes - min];
  }
  if (value > blocksSizes || (current[1] && value > current[1])) {
    const max = current[1] ?? blocksSizes;
    results = [max, blocksSizes - max];
  }
  if (next[0] && right < next[0]) {
    const min = next[0] ?? 0;
    results = [blocksSizes - min, min];
  }
  if (next[1] && right > next[1]) {
    const max = next[1] ?? blocksSizes;
    results = [blocksSizes - max, max];
  }
  return results;
};

export const getCalcaulatedSizes = (params: {
  event: MouseEvent | TouchEvent | Event;
  index: number;
  direction: UseResizableContentPropDirection;
  blocks: Array<UseResizableContentRef | React.RefObject<HTMLElement>>;
  container: React.RefObject<HTMLElement>;
  sizes: UseResizableContentSize[];
}) => {
  const { event, index, sizes, container, direction, blocks } = params;
  const nativeEvent = event as MouseEvent | TouchEvent;
  const position = trackPosition(nativeEvent);
  if (position) {
    const { left, top, width, height } =
      container.current?.getBoundingClientRect() ?? {
        left: 0,
        top: 0,
      };
    const trackPosition = getTargetBlockPosition(sizes, direction, index);
    const size =
      direction === 'horizontal'
        ? position.x - left - trackPosition
        : position.y - top - trackPosition;
    const [first, second] = getValidValues({
      value: size,
      index,
      containerHeight: height ?? 0,
      containerWidth: width ?? 0,
      sizes,
      blocks,
      direction,
    });
    return [
      {
        width: direction === 'horizontal' ? first : sizes[index].width,
        height: direction === 'horizontal' ? sizes[index].height : first,
      },
      {
        width: direction === 'horizontal' ? second : sizes[index + 1].width,
        height: direction === 'horizontal' ? sizes[index + 1].height : second,
      },
    ];
  }
  return [sizes[index], sizes[index + 1]];
};

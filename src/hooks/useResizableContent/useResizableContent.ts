import React, { useCallback, useEffect, useRef, useState } from 'react';

import { trackPosition } from '##/components/Slider/useSlider/helper';

import { useComponentSize } from '../useComponentSize';
import {
  UseResizableContent,
  UseResizableContentPropDirection,
  UseResizableContentRef,
} from './types';

const getRefsSizes = (
  refs: Array<UseResizableContentRef | React.RefObject<HTMLElement>>,
  direction: UseResizableContentPropDirection,
) =>
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

export const useResizableContent: UseResizableContent = (props) => {
  const { refs, direction = 'horizontal', container } = props;

  const activeIndex: React.MutableRefObject<number | null> = useRef(null);

  const [sizes, setSizes] = useState<
    Array<{ width?: number; height?: number }>
  >(getRefsSizes(refs, direction));

  const { width: containerWidth, height: containerHeight } =
    useComponentSize(container);

  const controlListeners = (type: 'add' | 'remove') => {
    const method = type === 'add' ? 'addEventListener' : 'removeEventListener';
    document[method]('mouseup', handleRelease);
    document[method]('touchend', handleRelease);
    document[method]('mousemove', handleTouchMove);
    document[method]('touchmove', handleTouchMove);
  };

  const getTargetBlockPosition = (index: number) =>
    sizes
      .slice(0, index)
      .map((el) => (direction === 'horizontal' ? el.width : el.height) ?? 0)
      .reduce((val, a) => (val ?? 0) + (a ?? 0), 0);

  const getNonCalcualtedSize = (index: number) =>
    sizes
      .filter((_el, i) => !(index === i || index + 1 === i))
      .map((el) => (direction === 'horizontal' ? el.width : el.height) ?? 0)
      .reduce((val, a) => (val ?? 0) + (a ?? 0), 0);

  const getBlockMaxSizes = (index: number) => {
    if (!Object.prototype.hasOwnProperty.call(refs[index], 'current')) {
      const el = refs[index] as UseResizableContentRef;
      return [
        direction === 'horizontal' ? el.minWidth : el.minHeight,
        direction === 'horizontal' ? el.maxWidth : el.maxHeight,
      ];
    }
    return [undefined, undefined];
  };

  const getValidValues = (value: number, index: number) => {
    const blocksSizes =
      (direction === 'horizontal' ? containerWidth : containerHeight) -
      getNonCalcualtedSize(index);
    const current = getBlockMaxSizes(index);
    const next = getBlockMaxSizes(index + 1);
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

  const getCalcaulatedSizes = (
    event: MouseEvent | TouchEvent | Event,
    index: number,
  ) => {
    const nativeEvent = event as MouseEvent | TouchEvent;
    const position = trackPosition(nativeEvent);
    if (position) {
      const { left, top } = container.current?.getBoundingClientRect() ?? {
        left: 0,
        top: 0,
      };
      const size =
        direction === 'horizontal'
          ? position.x - left - getTargetBlockPosition(index)
          : position.y - top - getTargetBlockPosition(index);
      const [first, second] = getValidValues(size, index);
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

  const handleTouchMove = (event: MouseEvent | TouchEvent | Event) => {
    const index = activeIndex.current;
    if (typeof index === 'number') {
      const copySizes = [...sizes];
      const [left, right] = getCalcaulatedSizes(event, index);
      copySizes[index] = left;
      copySizes[index + 1] = right;
      setSizes(copySizes);
    }
  };

  useEffect(() => {
    setSizes(getRefsSizes(refs, direction));
  }, [refs.length, direction]);

  const handleRelease = useCallback(() => {
    controlListeners('remove');
    activeIndex.current = null;
  }, [sizes, handleTouchMove]);

  const handlePress = useCallback(
    (index: number) => {
      activeIndex.current = index;
      controlListeners('add');
    },
    [handleTouchMove, sizes],
  );

  return {
    handlers: Array.from({ length: refs.length - 1 }).map((_el, index) => ({
      onMouseDown: () => handlePress(index),
      onTouchStart: () => handlePress(index),
    })),
    sizes,
  };
};

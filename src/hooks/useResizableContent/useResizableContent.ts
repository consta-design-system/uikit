import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { getCalcaulatedSizes, getRefsSizes } from './helpers';
import { UseResizableContent, UseResizableContentSize } from './types';

export const useResizableContent: UseResizableContent = (props) => {
  const { blocks, direction = 'horizontal', container } = props;

  const activeIndex: React.MutableRefObject<number | null> = useRef(null);

  const [sizes, setSizes] = useState<UseResizableContentSize[]>(
    getRefsSizes(blocks, direction),
  );

  useEffect(() => {
    setSizes(getRefsSizes(blocks, direction));
  }, [blocks.length, direction]);

  const controlListeners = useCallback((type: 'add' | 'remove') => {
    const method = type === 'add' ? 'addEventListener' : 'removeEventListener';
    document[method]('mouseup', handleRelease);
    document[method]('touchend', handleRelease);
    document[method]('mousemove', handleTouchMove);
    document[method]('touchmove', handleTouchMove);
  }, []);

  const handleTouchMove = useCallback(
    (event: MouseEvent | TouchEvent | Event) => {
      const index = activeIndex.current;
      if (typeof index === 'number') {
        setSizes((copy) => {
          const copySizes = [...copy];
          const [left, right] = getCalcaulatedSizes({
            event,
            index,
            direction,
            blocks,
            container,
            sizes: copySizes,
          });
          copySizes[index] = left;
          copySizes[index + 1] = right;
          return copySizes;
        });
      }
    },
    [],
  );

  const handleRelease = useCallback(() => {
    controlListeners('remove');
    activeIndex.current = null;
  }, []);

  const handlePress = useCallback((index: number) => {
    activeIndex.current = index;
    controlListeners('add');
  }, []);

  const handlers = useMemo(
    () =>
      Array.from({ length: blocks.length - 1 }).map((_el, index) => ({
        onMouseDown: () => handlePress(index),
        onTouchStart: () => handlePress(index),
      })),
    [blocks.length, handlePress],
  );

  return {
    handlers,
    sizes,
  };
};

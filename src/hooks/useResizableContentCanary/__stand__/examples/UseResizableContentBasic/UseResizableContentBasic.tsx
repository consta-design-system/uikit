import './UseResizableContentBasic.css';

import { Example } from '@consta/stand';
import React, { useMemo } from 'react';

import { useRefs } from '##/hooks/useRefs';
import { useResizableContent } from '##/hooks/useResizableContentCanary/useResizableContent';
import { cn } from '##/utils/bem';

const cnUseResizableContentBasic = cn('UseResizableContentBasic');

export const UseResizableContentBasic = () => {
  const [containerRef, block1, block2, block3] = useRefs<HTMLDivElement>(4);

  const blocks = useMemo(
    () => [{ ref: block1, minWidth: 100 }, block2, block3],
    [block1, block2, block3],
  );

  const { sizes, handlers } = useResizableContent({
    blocks,
    direction: 'horizontal',
    container: containerRef,
    isActive: true,
  });

  const toddlerPositions = useMemo(() => {
    return handlers.map((_el, index) => {
      return (
        sizes
          .slice(0, index + 1)
          .map((el) => el.width ?? 0)
          .reduce((val, a) => val + a, 0) - 4
      );
    });
  }, [sizes]);

  return (
    <Example>
      <div className={cnUseResizableContentBasic()} ref={containerRef}>
        <div
          className={cnUseResizableContentBasic('Block')}
          style={sizes[0]}
          ref={block1}
        >
          <p>BLOCK1</p>
        </div>
        <div
          className={cnUseResizableContentBasic('Block')}
          style={sizes[1]}
          ref={block2}
        >
          <p>BLOCK2</p>
        </div>
        <div
          className={cnUseResizableContentBasic('Block')}
          style={sizes[2]}
          ref={block3}
        >
          <p>BLOCK3</p>
        </div>
        {toddlerPositions.map((left, index) => (
          <div
            style={{ left }}
            key={cnUseResizableContentBasic('Toddler', { index })}
            className={cnUseResizableContentBasic('Toddler')}
            {...handlers[index]}
          />
        ))}
      </div>
    </Example>
  );
};

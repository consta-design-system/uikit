import './UseResizableContentGrid.css';

import { Example } from '@consta/stand';
import React, { useMemo } from 'react';

import { useRefs } from '##/hooks/useRefs';
import { useResizableContent } from '##/hooks/useResizableContentCanary/useResizableContent';
import { cn } from '##/utils/bem';

const cnUseResizableContentGrid = cn('UseResizableContentGrid');

export const UseResizableContentGrid = () => {
  const [
    containerRef,
    horizontalBlock1,
    horizontalBlock2,
    verticalBlock1,
    verticalBlock2,
  ] = useRefs<HTMLDivElement>(5);

  const blocks1 = useMemo(
    () => [horizontalBlock1, horizontalBlock2],
    [horizontalBlock1, horizontalBlock2],
  );

  const blocks2 = useMemo(
    () => [verticalBlock1, verticalBlock2],
    [verticalBlock1, verticalBlock2],
  );

  const { sizes: hSizes, handlers: hHandlers } = useResizableContent({
    blocks: blocks1,
    direction: 'horizontal',
    container: verticalBlock1,
    isActive: true,
  });

  const { sizes: vSizes, handlers: vHandlers } = useResizableContent({
    blocks: blocks2,
    direction: 'vertical',
    container: containerRef,
    isActive: true,
  });

  return (
    <Example>
      <div className={cnUseResizableContentGrid()} ref={containerRef}>
        <div
          className={cnUseResizableContentGrid('Toddler', {
            direction: 'horizontal',
          })}
          style={{ left: (hSizes[0].width ?? 0) - 4 }}
          {...hHandlers[0]}
        />
        <div
          className={cnUseResizableContentGrid('Toddler', {
            direction: 'vertical',
          })}
          style={{ top: (vSizes[0].height ?? 0) - 4 }}
          {...vHandlers[0]}
        />
        <div
          ref={verticalBlock1}
          style={vSizes[0]}
          className={cnUseResizableContentGrid('Row')}
        >
          <div
            className={cnUseResizableContentGrid('Block')}
            style={hSizes[0]}
            ref={horizontalBlock1}
          >
            <p>BLOCK1</p>
          </div>
          <div
            className={cnUseResizableContentGrid('Block')}
            style={hSizes[1]}
            ref={horizontalBlock2}
          >
            <p>BLOCK2</p>
          </div>
        </div>
        <div
          ref={verticalBlock2}
          style={vSizes[1]}
          className={cnUseResizableContentGrid('Row')}
        >
          <div className={cnUseResizableContentGrid('Block')} style={hSizes[0]}>
            <p>BLOCK3</p>
          </div>
          <div className={cnUseResizableContentGrid('Block')} style={hSizes[1]}>
            <p>BLOCK4</p>
          </div>
        </div>
      </div>
    </Example>
  );
};

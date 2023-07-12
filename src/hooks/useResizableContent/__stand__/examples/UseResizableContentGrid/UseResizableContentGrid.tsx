import './UseResizableContentGrid.css';

import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { useResizableContent } from '##/hooks/useResizableContent/useResizableContent';
import { cn } from '##/utils/bem';

const cnUseResizableContentGrid = cn('UseResizableContentGrid');

export const UseResizableContentGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalBlock1 = useRef<HTMLDivElement>(null);
  const horizontalBlock2 = useRef<HTMLDivElement>(null);
  const verticalBlock1 = useRef<HTMLDivElement>(null);
  const verticalBlock2 = useRef<HTMLDivElement>(null);

  const { sizes: hSizes, handlers: hHandlers } = useResizableContent({
    refs: [horizontalBlock1, horizontalBlock2],
    direction: 'horizontal',
    container: verticalBlock1,
  });

  const { sizes: vSizes, handlers: vHandlers } = useResizableContent({
    refs: [verticalBlock1, verticalBlock2],
    direction: 'vertical',
    container: containerRef,
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

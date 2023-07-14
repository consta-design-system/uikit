import './UseResizableContentLayout.css';

import { Example } from '@consta/stand';
import React from 'react';

import { useRefs } from '##/hooks/useRefs';
import { useResizableContent } from '##/hooks/useResizableContent/useResizableContent';
import { cn } from '##/utils/bem';

const cnUseResizableContentLayout = cn('UseResizableContentLayout');

export const UseResizableContentLayout = () => {
  const [
    containerRef,
    horizontalBlock1,
    horizontalBlock2,
    verticalBlock1,
    verticalBlock2,
  ] = useRefs<HTMLDivElement>(5);

  const { sizes: hSizes, handlers: hHandlers } = useResizableContent({
    blocks: [horizontalBlock1, horizontalBlock2],
    direction: 'horizontal',
    container: containerRef,
  });

  const { sizes: vSizes, handlers: vHandlers } = useResizableContent({
    blocks: [verticalBlock1, verticalBlock2],
    direction: 'vertical',
    container: containerRef,
  });

  return (
    <Example>
      <div className={cnUseResizableContentLayout()} ref={containerRef}>
        <div
          ref={horizontalBlock1}
          style={hSizes[0]}
          className={cnUseResizableContentLayout('Wrapper')}
        >
          <p>КОНТЕНТ</p>
        </div>
        <div
          className={cnUseResizableContentLayout('Toddler', {
            direction: 'horizontal',
          })}
          style={{ left: (hSizes[0].width ?? 0) - 4 }}
          {...hHandlers[0]}
        />
        <div
          ref={horizontalBlock2}
          style={hSizes[1]}
          className={cnUseResizableContentLayout('Column')}
        >
          <div
            ref={verticalBlock1}
            className={cnUseResizableContentLayout('Block')}
            style={vSizes[0]}
          >
            <p>ФИЛЬТРЫ</p>
          </div>
          <div
            className={cnUseResizableContentLayout('Toddler', {
              direction: 'vertical',
            })}
            style={{
              top: (vSizes[0].height ?? 0) - 4,
            }}
            {...vHandlers[0]}
          />
          <div
            ref={verticalBlock2}
            className={cnUseResizableContentLayout('Block')}
            style={vSizes[1]}
          >
            <p>ДАННЫЕ</p>
          </div>
        </div>
      </div>
    </Example>
  );
};

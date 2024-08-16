import './TooltipViewportExample.css';

import { Example } from '@consta/stand';
import React from 'react';

import { Badge } from '##/components/Badge';
import { Grid, GridItem } from '##/components/Grid';
import { Tooltip } from '##/components/Tooltip';
import { useRefs } from '##/hooks/useRefs';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { range } from '##/utils/array';
import { cn } from '##/utils/bem';

const cnTooltipViewportExample = cn('TooltipViewportExample');

const cols = 5;
const rows = 10;

const items = range(cols * rows);

export const TooltipViewportExample = () => {
  const refs = useRefs<HTMLDivElement>(items.length + 1);

  return (
    <>
      <Example col={1}>
        <div
          ref={refs[0]}
          className={cnTooltipViewportExample(null, cnMixScrollBar())}
        >
          <Grid cols={cols} className={cnTooltipViewportExample('Wrapper')}>
            {items.map((item, index) => (
              <GridItem
                className={cnTooltipViewportExample('Item', [
                  cnMixFlex({
                    flex: 'flex',
                    align: 'center',
                    justify: 'center',
                  }),
                ])}
              >
                <Badge
                  ref={refs[index + 1]}
                  label={item.toString()}
                  form="round"
                />
              </GridItem>
            ))}
          </Grid>
        </div>
      </Example>
      {items.map((item, index) => (
        <Tooltip
          direction="upCenter"
          possibleDirections={[
            'upCenter',
            'downCenter',
            'rightCenter',
            'leftCenter',
          ]}
          spareDirection="upCenter"
          isInteractive
          viewportRef={refs[0]}
          anchorRef={refs[index + 1]}
          isOpen
        >
          {`для ${item}`}
        </Tooltip>
      ))}
    </>
  );
};

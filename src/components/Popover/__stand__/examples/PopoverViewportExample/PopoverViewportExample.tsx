import './PopoverViewportExample.css';

import { Example } from '@consta/stand';
import React from 'react';

import { Badge } from '##/components/Badge';
import { Grid, GridItem } from '##/components/Grid';
import { Popover } from '##/components/Popover';
import { Text } from '##/components/Text';
import { useRefs } from '##/hooks/useRefs';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { range } from '##/utils/array';
import { cn } from '##/utils/bem';

const cnPopoverViewportExample = cn('PopoverViewportExample');

const cols = 5;
const rows = 10;

const items = range(cols * rows);

export const PopoverViewportExample = () => {
  const refs = useRefs<HTMLDivElement>(items.length + 1);

  return (
    <>
      <Example col={1}>
        <div
          ref={refs[0]}
          className={cnPopoverViewportExample(null, cnMixScrollBar())}
        >
          <Grid cols={cols} className={cnPopoverViewportExample('Wrapper')}>
            {items.map((item, index) => (
              <GridItem
                className={cnPopoverViewportExample('Item', [
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
        <Popover
          direction="upCenter"
          possibleDirections={[
            'upCenter',
            'downCenter',
            'rightCenter',
            'leftCenter',
          ]}
          spareDirection="upCenter"
          offset="m"
          isInteractive={false}
          viewportRef={refs[0]}
          anchorRef={refs[index + 1]}
        >
          <div className={cnPopoverViewportExample('PopoverContent')}>
            <Text size="xs" view="primary" lineHeight="m">
              для {item}
            </Text>
          </div>
        </Popover>
      ))}
    </>
  );
};

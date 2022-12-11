import './GridItemExampleBreakpoints.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../Grid';

const cnGridItemExampleBreakpoints = cn('GridItemExampleBreakpoints');

export function GridItemExampleBreakpoints() {
  return (
    <Example col={1}>
      <Grid className={cnGridItemExampleBreakpoints()} cols="3" gap="xl">
        <GridItem
          className={cnGridItemExampleBreakpoints('Item', { color: 'blue' })}
          row="1"
          breakpoints={{
            m: {
              row: 3,
            },
          }}
        >
          1
        </GridItem>
        <GridItem className={cnGridItemExampleBreakpoints('Item')}>2</GridItem>
        <GridItem
          className={cnGridItemExampleBreakpoints('Item', { color: 'green' })}
          order="-1"
          row="3"
          breakpoints={{
            m: {
              order: 0,
              row: 1,
            },
          }}
        >
          3
        </GridItem>
        <GridItem className={cnGridItemExampleBreakpoints('Item')}>4</GridItem>
        <GridItem className={cnGridItemExampleBreakpoints('Item')}>5</GridItem>
        <GridItem className={cnGridItemExampleBreakpoints('Item')}>6</GridItem>
        <GridItem className={cnGridItemExampleBreakpoints('Item')}>7</GridItem>
      </Grid>
    </Example>
  );
}

import './GridExampleBreakpoints.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../Grid';

const cnGridExampleBreakpoints = cn('GridExampleBreakpoints');

export function GridExampleBreakpoints() {
  return (
    <Example col={1}>
      <Grid
        className={cnGridExampleBreakpoints()}
        cols="1"
        gap="xl"
        breakpoints={{
          xs: {
            gap: '2xl',
          },
          m: {
            cols: 2,
            gap: 'xl',
          },
        }}
      >
        <GridItem className={cnGridExampleBreakpoints('Item')}>1</GridItem>
        <GridItem className={cnGridExampleBreakpoints('Item')}>2</GridItem>
        <GridItem className={cnGridExampleBreakpoints('Item')}>3</GridItem>
        <GridItem className={cnGridExampleBreakpoints('Item')}>4</GridItem>
      </Grid>
    </Example>
  );
}

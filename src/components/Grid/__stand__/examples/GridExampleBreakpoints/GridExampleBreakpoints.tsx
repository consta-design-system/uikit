import './GridExampleBreakpoints.css';

import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { Grid, GridItem } from '##/components/Grid';
import { cn } from '##/utils/bem';

const cnGridExampleBreakpoints = cn('GridExampleBreakpoints');

export function GridExampleBreakpoints() {
  return (
    <Example col={1}>
      <Grid
        className={cnGridExampleBreakpoints()}
        cols={1}
        gap="xl"
        breakpoints={{
          480: {
            cols: 2,
            gap: 'xl',
          },
          640: {
            cols: 4,
            gap: '2xl',
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

export function GridExampleBreakpointsForRef() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Example col={1}>
      <Grid
        cols={1}
        gap="xl"
        breakpointsForRef={ref}
        breakpoints={{
          480: {
            cols: 2,
          },
          640: {
            cols: 4,
          },
        }}
        ref={ref}
      >
        <GridItem
          col={1}
          breakpointsForRef={ref}
          breakpoints={{
            480: {
              col: 2,
            },
          }}
        >
          <Grid cols={1} gap="xl">
            <GridItem className={cnGridExampleBreakpoints('Item')}>1</GridItem>
            <GridItem className={cnGridExampleBreakpoints('Item')}>2</GridItem>
          </Grid>
        </GridItem>
        <GridItem className={cnGridExampleBreakpoints('Item')}>3</GridItem>
        <GridItem className={cnGridExampleBreakpoints('Item')}>4</GridItem>
      </Grid>
    </Example>
  );
}

import './GridItemExampleColStart.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../Grid';

const cnGridItemExampleColStart = cn('GridItemExampleColStart');

export function GridItemExampleColStart() {
  return (
    <Example col={1}>
      <Grid className={cnGridItemExampleColStart()} cols="3" gap="xl">
        <GridItem className={cnGridItemExampleColStart('Item')}>1</GridItem>
        <GridItem className={cnGridItemExampleColStart('Item')} colStart="3">
          2
        </GridItem>
        <GridItem className={cnGridItemExampleColStart('Item')}>3</GridItem>
        <GridItem className={cnGridItemExampleColStart('Item')} colStart="3">
          4
        </GridItem>
      </Grid>
    </Example>
  );
}

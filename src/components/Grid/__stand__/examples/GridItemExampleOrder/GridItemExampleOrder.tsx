import './GridItemExampleOrder.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../Grid';

const cnGridItemExampleOrder = cn('GridItemExampleOrder');

export function GridItemExampleOrder() {
  return (
    <Example col={1}>
      <Grid className={cnGridItemExampleOrder()} cols="3" gap="xl">
        <GridItem className={cnGridItemExampleOrder('Item')}>1</GridItem>
        <GridItem className={cnGridItemExampleOrder('Item')}>2</GridItem>
        <GridItem className={cnGridItemExampleOrder('Item')} order="1">
          3
        </GridItem>
        <GridItem className={cnGridItemExampleOrder('Item')}>4</GridItem>
        <GridItem className={cnGridItemExampleOrder('Item')} order="-1">
          5
        </GridItem>
        <GridItem className={cnGridItemExampleOrder('Item')}>6</GridItem>
      </Grid>
    </Example>
  );
}

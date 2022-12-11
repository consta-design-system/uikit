import './GridItemExampleRow.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../Grid';

const cnGridItemExampleRow = cn('GridItemExampleRow');

export function GridItemExampleRow() {
  return (
    <Example col={1}>
      <Grid className={cnGridItemExampleRow()} cols="2" gap="xl">
        <GridItem className={cnGridItemExampleRow('Item')}>1</GridItem>
        <GridItem className={cnGridItemExampleRow('Item')} row="3">
          2
        </GridItem>
        <GridItem className={cnGridItemExampleRow('Item')}>3</GridItem>
        <GridItem className={cnGridItemExampleRow('Item')}>4</GridItem>
        <GridItem className={cnGridItemExampleRow('Item')}>5</GridItem>
        <GridItem className={cnGridItemExampleRow('Item')}>6</GridItem>
      </Grid>
    </Example>
  );
}

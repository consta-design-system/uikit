import './GridItemExampleCol.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import { Grid } from '../../../Grid';
import { GridItem } from '../../../GridItem';

const cnGridItemExampleCol = cn('GridItemExampleCol');

export function GridItemExampleCol() {
  return (
    <Example col={1}>
      <Grid className={cnGridItemExampleCol()} cols={3} gap="xl">
        <GridItem className={cnGridItemExampleCol('Item')} col={1}>
          1
        </GridItem>
        <GridItem className={cnGridItemExampleCol('Item')}>2</GridItem>
        <GridItem className={cnGridItemExampleCol('Item')}>3</GridItem>
        <GridItem className={cnGridItemExampleCol('Item')} col={2}>
          4
        </GridItem>
        <GridItem className={cnGridItemExampleCol('Item')}>5</GridItem>
        <GridItem className={cnGridItemExampleCol('Item')} col={3}>
          6
        </GridItem>
      </Grid>
    </Example>
  );
}

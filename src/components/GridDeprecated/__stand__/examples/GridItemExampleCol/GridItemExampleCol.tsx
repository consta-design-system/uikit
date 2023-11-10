import './GridItemExampleCol.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cnDeprecated } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../GridDeprecated';

const cnGridItemExampleCol = cnDeprecated('GridItemExampleCol');

export function GridItemExampleCol() {
  return (
    <Example col={1}>
      <Grid className={cnGridItemExampleCol()} cols="2" gap="xl">
        <GridItem className={cnGridItemExampleCol('Item')} col="2">
          1
        </GridItem>
        <GridItem className={cnGridItemExampleCol('Item')}>2</GridItem>
        <GridItem className={cnGridItemExampleCol('Item')}>3</GridItem>
        <GridItem className={cnGridItemExampleCol('Item')} col="2">
          4
        </GridItem>
        <GridItem className={cnGridItemExampleCol('Item')}>5</GridItem>
        <GridItem className={cnGridItemExampleCol('Item')}>6</GridItem>
      </Grid>
    </Example>
  );
}

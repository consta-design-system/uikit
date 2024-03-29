import './GridItemExampleRowStart.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cnDeprecated } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../GridDeprecated';

const cnGridItemExampleRowStart = cnDeprecated('GridItemExampleRowStart');

export function GridItemExampleRowStart() {
  return (
    <Example col={1}>
      <Grid className={cnGridItemExampleRowStart()} cols="2" gap="xl">
        <GridItem className={cnGridItemExampleRowStart('Item')}>1</GridItem>
        <GridItem className={cnGridItemExampleRowStart('Item')}>2</GridItem>
        <GridItem className={cnGridItemExampleRowStart('Item')} rowStart="3">
          3
        </GridItem>
        <GridItem className={cnGridItemExampleRowStart('Item')} rowStart="3">
          4
        </GridItem>
      </Grid>
    </Example>
  );
}

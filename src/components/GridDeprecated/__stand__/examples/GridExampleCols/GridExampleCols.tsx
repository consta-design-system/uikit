import './GridExampleCols.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cnDeprecated } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../GridDeprecated';

const cnGridExampleCols = cnDeprecated('GridExampleCols');

export function GridExampleCols() {
  return (
    <Example col={1}>
      <Grid className={cnGridExampleCols()} cols="2">
        <GridItem className={cnGridExampleCols('Item')}>1</GridItem>
        <GridItem className={cnGridExampleCols('Item')}>2</GridItem>
        <GridItem className={cnGridExampleCols('Item')}>3</GridItem>
        <GridItem className={cnGridExampleCols('Item')}>4</GridItem>
      </Grid>
    </Example>
  );
}

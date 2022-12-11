import './GridExampleAlign.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../Grid';

const cnGridExampleAlign = cn('GridExampleAlign');

export function GridExampleAlign() {
  return (
    <Example col={1}>
      <Grid
        className={cnGridExampleAlign()}
        cols="2"
        gap="xl"
        xAlign="center"
        yAlign="center"
      >
        <GridItem className={cnGridExampleAlign('Item')}>1</GridItem>
        <GridItem className={cnGridExampleAlign('Item')}>2</GridItem>
        <GridItem className={cnGridExampleAlign('Item')}>3</GridItem>
        <GridItem className={cnGridExampleAlign('Item')}>4</GridItem>
      </Grid>
    </Example>
  );
}

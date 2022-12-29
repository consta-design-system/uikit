import './GridExampleGap.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../Grid';

const cnGridExampleGap = cn('GridExampleGap');

export function GridExampleGap() {
  return (
    <Example col={1}>
      <Grid className={cnGridExampleGap()} cols="2" gap="xl">
        <GridItem className={cnGridExampleGap('Item')}>1</GridItem>
        <GridItem className={cnGridExampleGap('Item')}>2</GridItem>
        <GridItem className={cnGridExampleGap('Item')}>3</GridItem>
        <GridItem className={cnGridExampleGap('Item')}>4</GridItem>
      </Grid>
    </Example>
  );
}

export function GridExampleColGap() {
  return (
    <Example col={1}>
      <Grid className={cnGridExampleGap()} cols="2" colGap="xl">
        <GridItem className={cnGridExampleGap('Item')}>1</GridItem>
        <GridItem className={cnGridExampleGap('Item')}>2</GridItem>
        <GridItem className={cnGridExampleGap('Item')}>3</GridItem>
        <GridItem className={cnGridExampleGap('Item')}>4</GridItem>
      </Grid>
    </Example>
  );
}

export function GridExampleRowGap() {
  return (
    <Example col={1}>
      <Grid className={cnGridExampleGap()} cols="2" rowGap="xl">
        <GridItem className={cnGridExampleGap('Item')}>1</GridItem>
        <GridItem className={cnGridExampleGap('Item')}>2</GridItem>
        <GridItem className={cnGridExampleGap('Item')}>3</GridItem>
        <GridItem className={cnGridExampleGap('Item')}>4</GridItem>
      </Grid>
    </Example>
  );
}

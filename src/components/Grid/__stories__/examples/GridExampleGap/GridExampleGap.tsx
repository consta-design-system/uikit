import './GridExampleGap.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../Grid';

const cnGridExampleGap = cn('GridExampleGap');

export function GridExampleGap() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Grid className={cnGridExampleGap()} cols="2" gap="xl">
        <GridItem className={cnGridExampleGap('Item')}>1</GridItem>
        <GridItem className={cnGridExampleGap('Item')}>2</GridItem>
        <GridItem className={cnGridExampleGap('Item')}>3</GridItem>
        <GridItem className={cnGridExampleGap('Item')}>4</GridItem>
      </Grid>
    </StoryBookExample>
  );
}

export function GridExampleColGap() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Grid className={cnGridExampleGap()} cols="2" colGap="xl">
        <GridItem className={cnGridExampleGap('Item')}>1</GridItem>
        <GridItem className={cnGridExampleGap('Item')}>2</GridItem>
        <GridItem className={cnGridExampleGap('Item')}>3</GridItem>
        <GridItem className={cnGridExampleGap('Item')}>4</GridItem>
      </Grid>
    </StoryBookExample>
  );
}

export function GridExampleRowGap() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Grid className={cnGridExampleGap()} cols="2" rowGap="xl">
        <GridItem className={cnGridExampleGap('Item')}>1</GridItem>
        <GridItem className={cnGridExampleGap('Item')}>2</GridItem>
        <GridItem className={cnGridExampleGap('Item')}>3</GridItem>
        <GridItem className={cnGridExampleGap('Item')}>4</GridItem>
      </Grid>
    </StoryBookExample>
  );
}

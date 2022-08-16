import './GridExampleCols.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../Grid';

const cnGridExampleCols = cn('GridExampleCols');

export function GridExampleCols() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Grid className={cnGridExampleCols()} cols="2">
        <GridItem className={cnGridExampleCols('Item')}>1</GridItem>
        <GridItem className={cnGridExampleCols('Item')}>2</GridItem>
        <GridItem className={cnGridExampleCols('Item')}>3</GridItem>
        <GridItem className={cnGridExampleCols('Item')}>4</GridItem>
      </Grid>
    </StoryBookExample>
  );
}

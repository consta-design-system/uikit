import './GridItemExampleRow.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../Grid';

const cnGridItemExampleRow = cn('GridItemExampleRow');

export function GridItemExampleRow() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
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
    </StoryBookExample>
  );
}

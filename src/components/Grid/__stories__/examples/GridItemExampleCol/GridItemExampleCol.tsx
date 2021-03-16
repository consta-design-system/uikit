import './GridItemExampleCol.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../Grid';

const cnGridItemExampleCol = cn('GridItemExampleCol');

export function GridItemExampleCol() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
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
    </StoryBookExample>
  );
}

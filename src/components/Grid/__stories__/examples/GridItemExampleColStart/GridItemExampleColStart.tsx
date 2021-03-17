import './GridItemExampleColStart.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../Grid';

const cnGridItemExampleColStart = cn('GridItemExampleColStart');

export function GridItemExampleColStart() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Grid className={cnGridItemExampleColStart()} cols="3" gap="xl">
        <GridItem className={cnGridItemExampleColStart('Item')}>1</GridItem>
        <GridItem className={cnGridItemExampleColStart('Item')} colStart="3">
          2
        </GridItem>
        <GridItem className={cnGridItemExampleColStart('Item')}>3</GridItem>
        <GridItem className={cnGridItemExampleColStart('Item')} colStart="3">
          4
        </GridItem>
      </Grid>
    </StoryBookExample>
  );
}

import './GridItemExampleOrder.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../Grid';

const cnGridItemExampleOrder = cn('GridItemExampleOrder');

export function GridItemExampleOrder() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Grid className={cnGridItemExampleOrder()} cols="3" gap="xl">
        <GridItem className={cnGridItemExampleOrder('Item')}>1</GridItem>
        <GridItem className={cnGridItemExampleOrder('Item')}>2</GridItem>
        <GridItem className={cnGridItemExampleOrder('Item')} order="1">
          3
        </GridItem>
        <GridItem className={cnGridItemExampleOrder('Item')}>4</GridItem>
        <GridItem className={cnGridItemExampleOrder('Item')} order="-1">
          5
        </GridItem>
        <GridItem className={cnGridItemExampleOrder('Item')}>6</GridItem>
      </Grid>
    </StoryBookExample>
  );
}

import './GridItemExampleRowStart.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../Grid';

const cnGridItemExampleRowStart = cn('GridItemExampleRowStart');

export function GridItemExampleRowStart() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
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
    </StoryBookExample>
  );
}

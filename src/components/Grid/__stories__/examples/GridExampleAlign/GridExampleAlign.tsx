import './GridExampleAlign.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../Grid';

const cnGridExampleAlign = cn('GridExampleAlign');

export function GridExampleAlign() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Grid className={cnGridExampleAlign()} cols="2" gap="xl" xAlign="center" yAlign="center">
        <GridItem className={cnGridExampleAlign('Item')}>1</GridItem>
        <GridItem className={cnGridExampleAlign('Item')}>2</GridItem>
        <GridItem className={cnGridExampleAlign('Item')}>3</GridItem>
        <GridItem className={cnGridExampleAlign('Item')}>4</GridItem>
      </Grid>
    </StoryBookExample>
  );
}

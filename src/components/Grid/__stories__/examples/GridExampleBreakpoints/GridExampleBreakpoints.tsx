import './GridExampleBreakpoints.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '../../../../../utils/bem';
import { Grid, GridItem } from '../../../Grid';

const cnGridExampleBreakpoints = cn('GridExampleBreakpoints');

export function GridExampleBreakpoints() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Grid
        className={cnGridExampleBreakpoints()}
        cols="1"
        gap="xl"
        breakpoints={{
          xs: {
            gap: '2xl',
          },
          m: {
            cols: 2,
            gap: 'xl',
          },
        }}
      >
        <GridItem className={cnGridExampleBreakpoints('Item')}>1</GridItem>
        <GridItem className={cnGridExampleBreakpoints('Item')}>2</GridItem>
        <GridItem className={cnGridExampleBreakpoints('Item')}>3</GridItem>
        <GridItem className={cnGridExampleBreakpoints('Item')}>4</GridItem>
      </Grid>
    </StoryBookExample>
  );
}

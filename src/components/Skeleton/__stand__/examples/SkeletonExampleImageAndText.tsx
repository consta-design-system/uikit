import React from 'react';

import { StoryBookExample } from '../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Grid } from '../../../Grid/Grid';
import { SkeletonBrick, SkeletonText } from '../../Skeleton';

export const SkeletonExampleImageAndText = () => (
  <StoryBookExample>
    <Grid gap="m" style={{ width: 200 }}>
      <SkeletonBrick height={200} />
      <SkeletonText rows={4} />
    </Grid>
  </StoryBookExample>
);

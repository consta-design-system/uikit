import { Example } from '@consta/stand';
import React from 'react';

import { Grid } from '##/components/Grid/Grid';

import { SkeletonBrick, SkeletonText } from '../../../Skeleton';

export const SkeletonExampleImageAndText = () => (
  <Example>
    <Grid gap="m" style={{ width: 200 }}>
      <SkeletonBrick height={200} />
      <SkeletonText rows={4} />
    </Grid>
  </Example>
);

import { Example } from '@consta/stand';
import React from 'react';

import { ProgressSpin } from '../../../ProgressSpin';

export const ProgressSpinExampleSize = () => (
  <Example>
    <ProgressSpin value={70} size="2xl" />
    <ProgressSpin value={70} size="xl" />
    <ProgressSpin value={70} size="l" />
    <ProgressSpin value={70} size="m" />
    <ProgressSpin value={70} size="s" />
  </Example>
);

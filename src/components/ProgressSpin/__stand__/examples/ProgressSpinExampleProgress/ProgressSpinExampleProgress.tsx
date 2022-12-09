import { Example } from '@consta/stand';
import React from 'react';

import { ProgressSpin } from '../../../ProgressSpin';

export const ProgressSpinExampleProgress = () => (
  <Example>
    <ProgressSpin size="m" />
    <ProgressSpin value={20} size="m" />
    <ProgressSpin value={40} size="m" />
    <ProgressSpin value={60} size="m" />
    <ProgressSpin value={80} size="m" />
  </Example>
);

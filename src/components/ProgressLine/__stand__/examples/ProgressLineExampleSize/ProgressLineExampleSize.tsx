import { Example } from '@consta/stand';
import React from 'react';

import { ProgressLine } from '../../../ProgressLine';

export const ProgressLineExampleSize = () => {
  return (
    <Example col={1}>
      <ProgressLine size="s" />
      <ProgressLine size="m" />
    </Example>
  );
};

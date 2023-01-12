import { Example } from '@consta/stand';
import React from 'react';

import { Badge } from '../../../Badge';

export const BadgeExampleView = () => (
  <Example>
    <Badge view="filled" label="Filled badge" />
    <Badge view="stroked" label="Stroked badge" />
  </Example>
);

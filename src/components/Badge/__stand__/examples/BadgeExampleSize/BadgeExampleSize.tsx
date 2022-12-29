import { Example } from '@consta/stand';
import React from 'react';

import { Badge } from '../../../Badge';

export const BadgeExampleSize = () => (
  <Example>
    <Badge size="xs" label="Badge xs" />
    <Badge size="s" label="Badge s" />
    <Badge size="m" label="Badge m" />
    <Badge size="l" label="Badge l" />
  </Example>
);

import { Example } from '@consta/stand';
import React from 'react';

import { Badge } from '../../../Badge';

export const BadgeExampleMinified = () => (
  <Example>
    <Badge minified status="error" label="Стойте" />
    <Badge minified status="success" label="Идите" />
  </Example>
);

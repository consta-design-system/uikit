import { Example } from '@consta/stand';
import React from 'react';

import { DateTime } from '../../../DateTime';

export const DateTimeExampleCurrentVisibleDate = () => {
  return (
    <Example>
      <DateTime currentVisibleDate={new Date(2000, 1, 1)} />
    </Example>
  );
};

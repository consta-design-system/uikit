import { Example } from '@consta/stand';
import React from 'react';

import { DateTime } from '../../../DateTime';

export const DateTimeExampleMultiplicity = () => {
  return (
    <Example>
      <DateTime
        type="time"
        multiplicityHours={2}
        multiplicityMinutes={5}
        multiplicitySeconds={0}
      />
    </Example>
  );
};

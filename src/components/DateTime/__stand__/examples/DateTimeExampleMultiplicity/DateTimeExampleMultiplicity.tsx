import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { DateTime } from '../../../DateTime';

export const DateTimeExampleMultiplicity = () => {
  const [value, setValue] = useState<Date | undefined>();
  return (
    <Example>
      <DateTime
        type="time"
        value={value}
        onChange={setValue}
        multiplicityHours={2}
        multiplicityMinutes={5}
        multiplicitySeconds={0}
      />
    </Example>
  );
};

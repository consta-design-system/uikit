import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { DateTime } from '../../../DateTime';

export const DateTimeExamplePeriod = () => {
  const [rangeValue, setRangeValue] = useState<[Date?, Date?]>([]);

  return (
    <Example>
      <DateTime
        value={rangeValue}
        onChangeRange={({ value }) => setRangeValue(value)}
        view="slider"
      />
    </Example>
  );
};

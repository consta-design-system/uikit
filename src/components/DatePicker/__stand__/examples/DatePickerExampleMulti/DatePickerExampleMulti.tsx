import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { DatePicker } from '../../../DatePicker';

export const DatePickerExampleMulti = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <Example col={1}>
      <DatePicker
        type="date-time"
        value={value}
        onChange={({ value }) => setValue(value)}
        multiplicityHours={2}
        multiplicityMinutes={15}
        multiplicitySeconds={5}
      />
    </Example>
  );
};

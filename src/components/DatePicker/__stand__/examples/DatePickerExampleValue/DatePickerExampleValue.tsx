import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { DatePicker } from '../../../DatePicker';

export const DatePickerExampleValue = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Example col={1}>
      <DatePicker value={value} onChange={({ value }) => setValue(value)} />
    </Example>
  );
};

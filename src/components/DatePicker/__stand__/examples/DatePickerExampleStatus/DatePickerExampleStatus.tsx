import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { DatePicker } from '../../../DatePicker';

export const DatePickerExampleStatus = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <Example col={1}>
      <DatePicker
        value={value}
        onChange={({ value }) => setValue(value)}
        status="success"
      />
      <DatePicker
        value={value}
        onChange={({ value }) => setValue(value)}
        status="alert"
      />
      <DatePicker
        value={value}
        onChange={({ value }) => setValue(value)}
        status="warning"
      />
      <DatePicker value={value} onChange={({ value }) => setValue(value)} />
    </Example>
  );
};

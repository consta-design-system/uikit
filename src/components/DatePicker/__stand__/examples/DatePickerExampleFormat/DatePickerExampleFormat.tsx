import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { DatePicker } from '../../../DatePicker';

export const DatePickerExampleFormat = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Example col={1}>
      <DatePicker
        type="date-time"
        format="MM/dd/yyyy HH:mm"
        separator="/"
        placeholder="ММ/ДД/ГГГГ ЧЧ:ММ"
        value={value}
        onChange={({ value }) => setValue(value)}
      />
    </Example>
  );
};

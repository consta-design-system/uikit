import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { DatePicker } from '../../../DatePicker';

export const DatePickerExampleRequired = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <Example col={1}>
      <DatePicker
        value={value}
        onChange={setValue}
        label="Обязательное"
        required
      />
      <DatePicker value={value} onChange={setValue} label="Необязательное" />
    </Example>
  );
};

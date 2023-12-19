import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { DatePicker } from '../../../DatePicker';

export const DatePickerExampleCaption = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <Example col={1}>
      <DatePicker
        value={value}
        onChange={setValue}
        status="success"
        caption="Это подпись"
      />
      <DatePicker
        value={value}
        onChange={setValue}
        status="alert"
        caption="Это подпись"
      />
      <DatePicker
        value={value}
        onChange={setValue}
        status="warning"
        caption="Это подпись"
      />
      <DatePicker value={value} onChange={setValue} caption="Это подпись" />
    </Example>
  );
};

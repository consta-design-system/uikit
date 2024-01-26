import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { DatePicker } from '../../../DatePicker';

export const DatePickerExampleStatus = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <Example col={1}>
      <DatePicker value={value} onChange={setValue} status="success" />
      <DatePicker value={value} onChange={setValue} status="alert" />
      <DatePicker value={value} onChange={setValue} status="warning" />
      <DatePicker value={value} onChange={setValue} />
    </Example>
  );
};

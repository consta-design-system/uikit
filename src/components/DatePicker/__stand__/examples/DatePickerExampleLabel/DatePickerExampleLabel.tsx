import { IconQuestion } from '@consta/icons/IconQuestion';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { DatePicker } from '../../../DatePicker';

export const DatePickerExampleLabel = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <Example col={1}>
      <DatePicker
        value={value}
        onChange={({ value }) => setValue(value)}
        label="Лейбл"
        labelPosition="top"
      />
      <DatePicker
        value={value}
        onChange={({ value }) => setValue(value)}
        label="Лейбл"
        labelPosition="left"
      />
    </Example>
  );
};

export const DatePickerExampleLabelIcon = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <Example>
      <DatePicker
        value={value}
        onChange={({ value }) => setValue(value)}
        label="Лейбл"
        labelIcon={IconQuestion}
      />
    </Example>
  );
};

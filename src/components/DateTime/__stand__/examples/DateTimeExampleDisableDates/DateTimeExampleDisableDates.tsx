import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { DateTime } from '##/components/DateTime/DateTime';

const getDisableDates = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return [
    [
      new Date(year, month, day, 12, 34, 20),
      new Date(year, month, day, 16, 10, 41),
    ] as [Date, Date],
  ];
};

export const DateTimeExampleDisableDates = () => {
  const [value, setValue] = useState<Date | undefined>();

  return (
    <Example>
      <DateTime
        type="date-time"
        value={value}
        disableDates={getDisableDates()}
        onChange={({ value }) => setValue(value)}
      />
    </Example>
  );
};

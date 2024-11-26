import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { DatePicker } from '../../../DatePicker';

const getDisableDates = (): Array<Date | [Date, Date]> => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return [
    // интервал времени текущей даты с 12:34:20 - 16:10:41
    [
      new Date(year, month, day, 12, 34, 20),
      new Date(year, month, day, 16, 10, 41),
    ],
    // следующий день
    new Date(year, month, day + 1),
    // отключаем с 1го по 12ое включительно
    [new Date(year, month, 1), new Date(year, month, 13)],
  ];
};

const disableDates = getDisableDates();

export const DatePickerExampleDisableDates = () => {
  const [value, setValue] = useState<Date | null>();

  return (
    <Example col={1}>
      <DatePicker
        type="date-time"
        value={value}
        disableDates={disableDates}
        onChange={setValue}
      />
    </Example>
  );
};

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { DatePicker } from '../../../DatePicker';

const multiplicityExamples = [
  {
    label: 'Пример 1',
    index: 0,
    multiplicityHours: 2, // 0, 2, 4, … 22
    multiplicityMinutes: 15, // 0, 15, 30, 45
    multiplicitySeconds: undefined, // все секунды
  },
  {
    label: 'Пример 2',
    index: 1,
    multiplicityHours: undefined, // все часы
    multiplicityMinutes: 0, // минут нет
    multiplicitySeconds: 1, // все секунды
  },
  {
    label: 'Пример 3',
    index: 2,
    multiplicityHours: 2, // 0, 2, 4, … 22
    multiplicityMinutes: 0, // нет
    multiplicitySeconds: 0, // нет
  },
];

export const DatePickerExampleMulti = () => {
  const [values, setValues] = useState<(Date | null)[]>(
    multiplicityExamples.map(() => null),
  );

  return (
    <Example
      col={3}
      separately
      items={multiplicityExamples}
      getItemNode={(item) => (
        <DatePicker
          type="date-time"
          value={values[item.index]}
          onChange={(val) =>
            setValues((prev) => {
              const newValues = [...prev];
              newValues[item.index] = val as Date;
              return newValues;
            })
          }
          multiplicityHours={item.multiplicityHours}
          multiplicityMinutes={item.multiplicityMinutes}
          multiplicitySeconds={item.multiplicitySeconds}
        />
      )}
      getItemLabel={(item) => item.label}
    />
  );
};

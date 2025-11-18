import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { DatePicker } from '../../../DatePicker';

const timeOptionsExamples = [
  {
    label: 'Пример 1',
    index: 0,
    options: {
      hours: { start: 9, step: 2, stop: 18 }, // 9, 11, 13, 15, 17
      minutes: [0, 15, 45], // конкретные значения минут
      // seconds не указаны — будут все значения по умолчанию (0–59)
    },
  },
  {
    label: 'Пример 2',
    index: 1,
    options: {
      hours: { step: 1 }, // все часы
      minutes: [], // пустой массив — минуты не показываются
      seconds: { step: 0 }, // секунды не показываются
    },
  },
  {
    label: 'Пример 3',
    index: 2,
    options: {
      hours: { step: 1 }, // все часы
      minutes: { step: 15 }, // каждые 15 минут
      seconds: { step: 15 }, // каждые 15 секунд
    },
  },
  {
    label: 'Пример 4',
    index: 3,
    options: {
      hours: [8, 12, 16],
      minutes: [10, 15, 25, 40],
      seconds: { step: 5 }, // кажды 5 секунд
    },
  },
];

export const DatePickerExampleTimeOptions = () => {
  const [values, setValues] = useState<(Date | null)[]>(
    timeOptionsExamples.map(() => null),
  );

  return (
    <Example
      col={4}
      separately
      items={timeOptionsExamples}
      getItemNode={(item) => (
        <DatePicker
          type="time"
          value={values[item.index]}
          onChange={(val) =>
            setValues((prev) => {
              const newValues = [...prev];
              newValues[item.index] = val as Date;
              return newValues;
            })
          }
          timeOptions={item.options}
        />
      )}
      getItemLabel={(item) => item.label}
    />
  );
};

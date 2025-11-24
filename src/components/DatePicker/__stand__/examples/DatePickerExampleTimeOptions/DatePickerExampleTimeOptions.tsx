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
    multiplicityHours: 1, // Игнорируется, так как задан timeOptions.hours
    multiplicityMinutes: undefined,
    multiplicitySeconds: undefined,
  },
  {
    label: 'Пример 2',
    index: 1,
    options: {
      hours: { step: 1 }, // все часы
      seconds: { step: 0 }, // секунды не показываются
    },
    multiplicityHours: undefined,
    multiplicityMinutes: 2, // Используется, так как timeOptions.minutes не задан
    multiplicitySeconds: 3, // Игнорируется, так как задан timeOptions.seconds
  },
  {
    label: 'Пример 3',
    index: 2,
    options: {
      hours: [8, 12, 16],
      minutes: { step: 15 }, // каждые 15 минут
      seconds: [], // пустой массив — секунды не показываются
    },
  },
];

export const DatePickerExampleTimeOptions = () => {
  const [values, setValues] = useState<(Date | null)[]>(
    timeOptionsExamples.map(() => null),
  );

  return (
    <Example
      col={3}
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
          multiplicityHours={item.multiplicityHours}
          multiplicityMinutes={item.multiplicityMinutes}
          multiplicitySeconds={item.multiplicitySeconds}
        />
      )}
      getItemLabel={(item) => item.label}
    />
  );
};

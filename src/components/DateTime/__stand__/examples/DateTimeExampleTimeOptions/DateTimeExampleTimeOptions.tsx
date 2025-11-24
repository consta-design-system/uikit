import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { DateTime } from '../../../DateTime';

const timeOptionsExamples = [
  {
    label: 'Пример 1',
    index: 1,
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
    index: 2,
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
    index: 3,
    options: {
      hours: [8, 12, 16],
      minutes: { step: 15 }, // каждые 15 минут
      seconds: [], // пустой массив — секунды не показываются
    },
  },
];

export const DateTimeExampleTimeOptions = () => {
  const [values, setValues] = useState<{ [key: string]: Date | undefined }>({});

  const handleChange = (index: number) => (value: Date) => {
    setValues((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  return (
    <Example
      col={3}
      separately
      items={timeOptionsExamples}
      getItemNode={(item) => (
        <DateTime
          type="time"
          timeOptions={item.options}
          multiplicityHours={item.multiplicityHours}
          multiplicityMinutes={item.multiplicityMinutes}
          multiplicitySeconds={item.multiplicitySeconds}
          value={values[item.index]}
          onChange={handleChange(item.index)}
        />
      )}
      getItemLabel={(item) => item.label}
    />
  );
};

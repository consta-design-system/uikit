import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Button } from '../../../../Button/Button';
import { DatePicker, DatePickerPropValue } from '../../../DatePicker';

export const DatePickerExampleAdditionalControls = () => {
  const [value, setValue] = useState<DatePickerPropValue<'date-range'>>([
    undefined,
    undefined,
  ]);

  const setCuarter = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    if (month >= 0 && month < 3) {
      setValue([new Date(year, 0, 1), new Date(year, 3, 0)]);
    } else if (month >= 3 && month < 6) {
      setValue([new Date(year, 3, 1), new Date(year, 6, 0)]);
    } else if (month >= 6 && month < 9) {
      setValue([new Date(year, 6, 1), new Date(year, 9, 0)]);
    } else {
      setValue([new Date(year, 9, 1), new Date(year + 1, 0, 0)]);
    }
  };

  return (
    <Example>
      <DatePicker
        value={value}
        type="date-range"
        onChange={({ value }) => setValue(value)}
        renderAdditionalControls={({ currentVisibleDate }) => (
          <Button
            label="Этот квартал"
            onClick={() => currentVisibleDate && setCuarter(currentVisibleDate)}
          />
        )}
      />
    </Example>
  );
};

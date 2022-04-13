import './DatePickerExampleAdaptive.css';

import React, { useState } from 'react';

import { cnMixSpace } from '../../../../../mixs/MixSpace/MixSpace';
import { cn } from '../../../../../utils/bem';
import { Text } from '../../../../Text/Text';
import { DatePicker } from '../../../DatePickerCanary';

const cnDatePickerExampleAdaptive = cn('DatePickerExampleAdaptive');

export const DatePickerExampleAdaptive = () => {
  const [value, setValue] = useState<[Date?, Date?] | null>(null);

  return (
    <div className={cnDatePickerExampleAdaptive()}>
      <DatePicker value={value} type="date-range" onChange={({ value }) => setValue(value)} />
      <div
        className={cnMixSpace({
          p: 'xl',
          m: 'm',
        })}
      >
        <Text>
          А это просто текст, поверх которого должен появиться календарик, в котором нужно выбрать
          дату.
        </Text>
      </div>
    </div>
  );
};

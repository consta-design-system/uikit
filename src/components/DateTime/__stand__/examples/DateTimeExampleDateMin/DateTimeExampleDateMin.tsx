import { Example } from '@consta/stand';
import { startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';
import React, { useState } from 'react';

import { DateTime } from '../../../DateTime';

const minDate = startOfWeek(new Date(), { locale: ru });
const maxDate = new Date();

export const DateTimeExampleDateMin = () => {
  const [value, setValue] = useState<Date | undefined>();

  return (
    <Example>
      <DateTime
        type="date-time"
        minDate={minDate}
        maxDate={maxDate}
        value={value}
        onChange={setValue}
      />
    </Example>
  );
};

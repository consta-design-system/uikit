import { Example } from '@consta/stand';
import { addDays, startOfWeek } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import React from 'react';

import { DateTime } from '../../../DateTime';

const events = [
  startOfWeek(new Date(), { locale: ruLocale }),
  new Date(),
  addDays(new Date(), 2),
];

export const DateTimeExampleEvents = () => {
  return (
    <Example>
      <DateTime events={events} />
    </Example>
  );
};

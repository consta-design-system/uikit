import { Example } from '@consta/stand';
import { addDays, startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';

import { DateTime } from '../../../DateTime';

const events = [
  startOfWeek(new Date(), { locale: ru }),
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

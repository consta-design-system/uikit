import { Example } from '@consta/stand';
import frLocale from 'date-fns/locale/fr';
import React from 'react';

import { DateTime } from '../../../DateTime';

const dateTimeLocale = {
  ...frLocale,
  words: {
    hours: 'H',
    minutes: 'Min',
    seconds: 'S',
  },
};

export const DateTimeExampleLocale = () => {
  return (
    <Example>
      <DateTime type="date-time" locale={dateTimeLocale} />
    </Example>
  );
};

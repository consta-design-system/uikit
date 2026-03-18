import { Example } from '@consta/stand';
import { fr } from 'date-fns/locale';
import React from 'react';

import { DateTime } from '../../../DateTime';

const dateTimeLocale = {
  ...fr,
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

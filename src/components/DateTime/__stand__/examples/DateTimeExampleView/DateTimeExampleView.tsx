import { Example } from '@consta/stand';
import { startOfWeek } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import React from 'react';

import { DateTime } from '../../../DateTime';

export const DateTimeExampleViewClassic = () => {
  return (
    <Example>
      <DateTime view="classic" />
    </Example>
  );
};

export const DateTimeExampleViewBook = () => {
  return (
    <Example>
      <DateTime view="book" />
    </Example>
  );
};

export const DateTimeExampleViewSlider = () => {
  return (
    <Example>
      <DateTime view="slider" />
    </Example>
  );
};

export const DateTimeExampleCurrent = () => {
  return (
    <Example>
      <DateTime
        currentVisibleDate={startOfWeek(new Date(), { locale: ruLocale })}
      />
    </Example>
  );
};

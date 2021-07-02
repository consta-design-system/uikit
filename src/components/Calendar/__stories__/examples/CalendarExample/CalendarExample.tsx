import React from 'react';
import { startOfWeek } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import ruLocale from 'date-fns/locale/ru';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Calendar } from '../../../Calendar';

export type CalendarPropType = 'date' | 'date-range';

export const CalendarExampleView = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Calendar view="oneMonth" />
    </StoryBookExample>
  );
};

export const CalendarExampleViewTwo = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Calendar view="twoMonths" />
    </StoryBookExample>
  );
};

export const CalendarExampleViewSlider = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Calendar view="slider" />
    </StoryBookExample>
  );
};

export const CalendarExampleDateMin = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Calendar minDate={startOfWeek(new Date(), { locale: ruLocale })} maxDate={new Date()} />
    </StoryBookExample>
  );
};

export const CalendarExampleLocale = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Calendar locale={frLocale} />
    </StoryBookExample>
  );
};

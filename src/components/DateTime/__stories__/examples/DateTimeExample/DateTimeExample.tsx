import React from 'react';
import { addDays, startOfWeek } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import ruLocale from 'date-fns/locale/ru';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DateTime } from '../../../DateTime';

export type DateTimePropType = 'date' | 'date-range';

const events = [startOfWeek(new Date(), { locale: ruLocale }), new Date(), addDays(new Date(), 2)];

export const DateTimeExampleView = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime view="classic" />
    </StoryBookExample>
  );
};

export const DateTimeExampleViewTwo = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime view="book" />
    </StoryBookExample>
  );
};

export const DateTimeExampleViewSlider = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime view="slider" />
    </StoryBookExample>
  );
};

export const DateTimeExampleDateMin = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime minDate={startOfWeek(new Date(), { locale: ruLocale })} maxDate={new Date()} />
    </StoryBookExample>
  );
};

export const DateTimeExampleCurrent = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime currentVisibleDate={startOfWeek(new Date())} />
    </StoryBookExample>
  );
};

export const DateTimeExampleEvents = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime events={events} />
    </StoryBookExample>
  );
};

export const DateTimeExampleLocale = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime locale={frLocale} />
    </StoryBookExample>
  );
};

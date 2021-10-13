import React from 'react';
import { addDays, startOfWeek } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Calendar } from '../../../Calendar';

export type CalendarPropType = 'date' | 'date-range';

const events = [startOfWeek(new Date(), { locale: ruLocale }), new Date(), addDays(new Date(), 2)];

export const CalendarExampleEvents = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Calendar events={events} />
    </StoryBookExample>
  );
};

import { addDays, startOfWeek } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DateTime } from '../../../DateTimeCanary';

const events = [
  startOfWeek(new Date(), { locale: ruLocale }),
  new Date(),
  addDays(new Date(), 2),
];

export const DateTimeExampleEvents = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime events={events} />
    </StoryBookExample>
  );
};

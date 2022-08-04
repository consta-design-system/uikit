import frLocale from 'date-fns/locale/fr';
import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Calendar } from '../../../Calendar';

export type CalendarPropType = 'date' | 'date-range';

export const CalendarExampleLocale = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Calendar locale={frLocale} />
    </StoryBookExample>
  );
};

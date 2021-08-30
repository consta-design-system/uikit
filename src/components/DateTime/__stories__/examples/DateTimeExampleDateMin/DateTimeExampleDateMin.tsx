import React from 'react';
import { startOfWeek } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DateTime } from '../../../DateTime';

export const DateTimeExampleDateMin = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime minDate={startOfWeek(new Date(), { locale: ruLocale })} maxDate={new Date()} />
    </StoryBookExample>
  );
};

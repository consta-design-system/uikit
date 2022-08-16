import React from 'react';
import frLocale from 'date-fns/locale/fr';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
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
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime type="date-time" locale={dateTimeLocale} />
    </StoryBookExample>
  );
};

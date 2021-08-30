import React from 'react';
import frLocale from 'date-fns/locale/fr';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DateTime } from '../../../DateTime';

export const DateTimeExampleLocale = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime locale={frLocale} />
    </StoryBookExample>
  );
};

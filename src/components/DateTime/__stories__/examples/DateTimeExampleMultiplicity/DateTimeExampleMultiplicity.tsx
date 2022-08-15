import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DateTime } from '../../../DateTime';

export const DateTimeExampleMultiplicity = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime
        type="time"
        multiplicityHours={2}
        multiplicityMinutes={5}
        multiplicitySeconds={0}
      />
    </StoryBookExample>
  );
};

import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DateTime } from '../../../DateTime';

export const DateTimeExamplePeriod = () => {
  const [rangeValue, setRangeValue] = useState<[Date?, Date?]>([]);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DateTime
        value={rangeValue}
        onChangeRange={({ value }) => setRangeValue(value)}
        view="slider"
      />
    </StoryBookExample>
  );
};

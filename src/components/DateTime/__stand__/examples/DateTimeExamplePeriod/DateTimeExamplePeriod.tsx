import './DateTimeExamplePeriod.css';

import React, { useState } from 'react';

import { cn } from '##/utils/bem';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DateTime } from '../../../DateTime';

const cnDateTimeExamplePeriod = cn('DateTimeExamplePeriod');

export const DateTimeExamplePeriod = () => {
  const [rangeValue, setRangeValue] = useState<[Date?, Date?]>([]);

  return (
    <StoryBookExample
      className={cnDocsDecorator('Section', [cnDateTimeExamplePeriod()])}
    >
      <DateTime
        value={rangeValue}
        onChangeRange={({ value }) => setRangeValue(value)}
        view="slider"
      />
    </StoryBookExample>
  );
};

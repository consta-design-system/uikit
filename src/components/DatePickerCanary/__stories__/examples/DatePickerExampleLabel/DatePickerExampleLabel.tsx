import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DatePicker } from '../../../DatePickerCanary';

export const DatePickerExampleLabel = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker
        value={value}
        onChange={({ value }) => setValue(value)}
        label="Лейбл"
        labelPosition="top"
      />
      <DatePicker
        value={value}
        onChange={({ value }) => setValue(value)}
        label="Лейбл"
        labelPosition="left"
      />
    </StoryBookExample>
  );
};

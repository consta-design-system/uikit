import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DatePicker } from '../../../DatePickerCanary';

export const DatePickerExampleTypeDate = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker type="date" value={value} onChange={({ value }) => setValue(value)} />
    </StoryBookExample>
  );
};

export const DatePickerExampleTypeDateRange = () => {
  const [value, setValue] = useState<[Date?, Date?] | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker type="date-range" value={value} onChange={({ value }) => setValue(value)} />
    </StoryBookExample>
  );
};

export const DatePickerExampleTypeDateTime = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker type="date-time" value={value} onChange={({ value }) => setValue(value)} />
    </StoryBookExample>
  );
};

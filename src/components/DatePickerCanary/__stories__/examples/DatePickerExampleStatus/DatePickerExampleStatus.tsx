import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DatePicker } from '../../../DatePickerCanary';

export const DatePickerExampleStatus = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker value={value} onChange={({ value }) => setValue(value)} status="success" />
      <DatePicker value={value} onChange={({ value }) => setValue(value)} status="alert" />
      <DatePicker value={value} onChange={({ value }) => setValue(value)} status="warning" />
      <DatePicker value={value} onChange={({ value }) => setValue(value)} />
    </StoryBookExample>
  );
};

import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DatePicker } from '../../../DatePickerCanary';

export const DatePickerExampleFormat = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker
        type="date-time"
        format="MM/dd/yyyy HH:mm"
        separator="/"
        placeholder="ММ/ДД/ГГГГ ЧЧ:ММ"
        value={value}
        onChange={({ value }) => setValue(value)}
      />
    </StoryBookExample>
  );
};

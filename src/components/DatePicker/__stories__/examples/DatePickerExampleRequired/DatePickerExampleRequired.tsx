import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DatePicker } from '../../../DatePicker';

export const DatePickerExampleRequired = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker
        value={value}
        onChange={({ value }) => setValue(value)}
        label="Обязательное"
        required
      />
      <DatePicker value={value} onChange={({ value }) => setValue(value)} label="Необязательное" />
    </StoryBookExample>
  );
};

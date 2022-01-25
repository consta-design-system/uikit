import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DatePicker } from '../../../DatePickerCanary';

export const DatePickerExampleCaption = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker
        value={value}
        onChange={({ value }) => setValue(value)}
        status="success"
        caption="Это подпись"
      />
      <DatePicker
        value={value}
        onChange={({ value }) => setValue(value)}
        status="alert"
        caption="Это подпись"
      />
      <DatePicker
        value={value}
        onChange={({ value }) => setValue(value)}
        status="warning"
        caption="Это подпись"
      />
      <DatePicker value={value} onChange={({ value }) => setValue(value)} caption="Это подпись" />
    </StoryBookExample>
  );
};

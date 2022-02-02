import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DatePicker } from '../../../DatePickerCanary';

export const DatePickerExampleMulti = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker
        type="date-time"
        value={value}
        onChange={({ value }) => setValue(value)}
        multiplicityHours={2}
        multiplicityMinutes={15}
        multiplicitySeconds={5}
      />
    </StoryBookExample>
  );
};

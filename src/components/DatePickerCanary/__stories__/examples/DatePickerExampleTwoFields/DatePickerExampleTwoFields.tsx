import React, { useState } from 'react';

import { IconBackward } from '../../../../../icons/IconBackward/IconBackward';
import { IconForward } from '../../../../../icons/IconForward/IconForward';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DatePicker } from '../../../DatePickerCanary';

export const DatePickerExampleTwoIcons = () => {
  const [value, setValue] = useState<[Date?, Date?] | null>(null);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker
        type="date-range"
        value={value}
        onChange={({ value }) => setValue(value)}
        leftSide={[IconForward, IconBackward]}
        rightSide={['туда', 'обратно']}
      />
    </StoryBookExample>
  );
};

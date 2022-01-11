import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Button } from '../../../../Button/Button';
import { DatePicker } from '../../../DatePickerCanary';

const additionalControls = () => {
  return [<Button label="Кнопка №1" />, <Button label="Кнопка №2" />];
};

const control = () => {
  return <Button label="Кнопка" />;
};
export const DatePickerExampleAdditionalControls = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DatePicker
        value={value}
        onChange={({ value }) => setValue(value)}
        renderAdditionalControls={control()}
      />
      <DatePicker
        value={value}
        onChange={({ value }) => setValue(value)}
        renderAdditionalControls={additionalControls()}
      />
    </StoryBookExample>
  );
};

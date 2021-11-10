import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { TextField } from '../../../TextField';

export const TextFieldExampleView = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <TextField
        view="default"
        placeholder="Самое обычное поле"
        value={value}
        onChange={handleChange}
      />
      <TextField view="clear" placeholder="Незаметное поле" value={value} onChange={handleChange} />
    </StoryBookExample>
  );
};

export const TextFieldExampleViewDisabled = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <TextField placeholder="Неактивное поле" disabled value={value} onChange={handleChange} />
    </StoryBookExample>
  );
};

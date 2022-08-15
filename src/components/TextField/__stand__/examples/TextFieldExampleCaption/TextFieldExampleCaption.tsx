import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { TextField } from '../../../TextField';

export const TextFieldExampleCaption = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <TextField
        onChange={handleChange}
        value={value}
        status="success"
        placeholder="Статус success"
        caption="Это подпись"
      />
      <TextField
        onChange={handleChange}
        value={value}
        status="alert"
        placeholder="Статус alert"
        caption="Это подпись"
      />
      <TextField
        onChange={handleChange}
        value={value}
        status="warning"
        placeholder="Статус warning"
        caption="Это подпись"
      />
      <TextField
        onChange={handleChange}
        value={value}
        placeholder="Обычное поле"
        caption="Это подпись"
      />
    </StoryBookExample>
  );
};

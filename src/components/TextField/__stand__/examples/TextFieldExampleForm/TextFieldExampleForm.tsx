import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Button } from '../../../../Button/Button';
import { TextField } from '../../../TextField';

export const TextFieldExampleFormBasic = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <TextField
        placeholder="Форма default"
        value={value}
        onChange={handleChange}
      />
      <TextField
        form="brick"
        placeholder="Форма brick"
        value={value}
        onChange={handleChange}
      />
      <TextField
        form="round"
        placeholder="Форма round"
        value={value}
        onChange={handleChange}
      />
    </StoryBookExample>
  );
};

export const TextFieldExampleFormHybrid = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <div>
        <TextField
          placeholder="Электронная почта"
          form="roundClear"
          value={value}
          onChange={handleChange}
          style={{ width: '260px' }}
        />
        <Button form="brickRound" label="Подписаться" />
      </div>
    </StoryBookExample>
  );
};

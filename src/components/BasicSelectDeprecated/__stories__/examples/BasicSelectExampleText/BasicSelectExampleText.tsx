import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { BasicSelect } from '../../../BasicSelectDeprecated';

type SelectOption = {
  label: string;
  value: string;
};

const items = [
  { label: 'Синий', value: 'blue' },
  { label: 'Белый', value: 'white' },
  { label: 'Красный', value: 'red' },
  { label: 'Черный', value: 'black' },
  { label: 'Зелёный', value: 'green' },
  { label: 'В полосочку', value: 'stripe' },
];

export const BasicSelectExampleText = () => {
  const getItemLabel = (option: SelectOption): string => option.label;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <BasicSelect
        id="colors"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Выберите цвет"
      />
    </StoryBookExample>
  );
};

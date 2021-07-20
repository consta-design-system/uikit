import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { BasicSelect } from '../../../BasicSelect';

type SelectOption = {
  label: string;
  value: string;
};

const items = [
  { label: 'Синий', value: 'blue' },
  { label: 'Белый', value: 'white' },
  { label: 'Красный', value: 'red' },
  { label: 'Черный', value: 'black' },
  { label: 'Зеленый', value: 'green' },
  { label: 'В полосочку', value: 'stripe' },
];

export const BasicSelectExampleSize = () => {
  const getItemLabel = (option: SelectOption): string => option.label;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <BasicSelect
        id="city"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Ваш выбор S"
        size="s"
      />
      <BasicSelect
        id="city"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Ваш выбор M"
        size="m"
      />
      <BasicSelect
        id="city"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Ваш выбор L"
        size="l"
      />
    </StoryBookExample>
  );
};

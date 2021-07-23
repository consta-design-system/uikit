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
  { label: 'Зеленый', value: 'green' },
  { label: 'В полосочку', value: 'stripe' },
];

export const BasicSelectExampleForm = () => {
  const getItemLabel = (option: SelectOption): string => option.label;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <BasicSelect
        id="city"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Default"
        form="default"
      />
      <BasicSelect
        id="city"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Brick"
        form="brick"
      />
      <BasicSelect
        id="city"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Round"
        form="round"
      />
    </StoryBookExample>
  );
};

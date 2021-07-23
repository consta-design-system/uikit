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

export const BasicSelectExampleView = () => {
  const getItemLabel = (option: SelectOption): string => option.label;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <BasicSelect
        id="city"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Default"
        view="default"
      />
      <BasicSelect
        id="city"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Clear"
        view="clear"
      />
      <BasicSelect
        id="city"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Disabled"
        disabled
      />
    </StoryBookExample>
  );
};

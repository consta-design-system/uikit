import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Combobox } from '../../../ComboboxDeprecated';

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

export const ComboboxExampleForm = () => {
  const getItemLabel = (option: SelectOption): string => option.label;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Combobox
        id="color"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Default"
        form="default"
      />
      <Combobox
        id="color"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Brick"
        form="brick"
      />
      <Combobox
        id="color"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Round"
        form="round"
      />
    </StoryBookExample>
  );
};

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

export const ComboboxExampleView = () => {
  const getItemLabel = (option: SelectOption): string => option.label;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Combobox
        id="city"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Default"
        view="default"
      />
      <Combobox
        id="city"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Clear"
        view="clear"
      />
      <Combobox
        id="city"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Disabled"
        disabled
      />
    </StoryBookExample>
  );
};

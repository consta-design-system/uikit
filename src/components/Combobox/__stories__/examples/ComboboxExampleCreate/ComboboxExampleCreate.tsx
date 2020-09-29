import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Combobox } from '../../../Combobox';

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

let options = items;

const handleCreate = (v: string): void => {
  options = [{ label: v, value: v }, ...options];
};

export const ComboboxExampleCreate = () => {
  const getItemLabel = (option: SelectOption): string => option.label;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Combobox
        id="color"
        options={items}
        getOptionLabel={getItemLabel}
        onCreate={handleCreate}
        placeholder="Выберите цвет"
      />
    </StoryBookExample>
  );
};

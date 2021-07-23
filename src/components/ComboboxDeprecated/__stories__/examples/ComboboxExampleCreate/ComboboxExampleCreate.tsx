import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Combobox } from '../../../ComboboxDeprecated';

type SelectOption = {
  label: string;
  value: string;
};

const items: SelectOption[] = [
  { label: 'Синий', value: 'blue' },
  { label: 'Белый', value: 'white' },
  { label: 'Красный', value: 'red' },
  { label: 'Черный', value: 'black' },
  { label: 'Зеленый', value: 'green' },
  { label: 'В полосочку', value: 'stripe' },
];

export const ComboboxExampleCreate = () => {
  const [options, setOptions] = useState<SelectOption[]>(items);

  const handleCreate = (label: string): void => {
    setOptions([{ label, value: label }, ...items]);
  };

  const getItemLabel = (option: SelectOption): string => option.label;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Combobox
        id="color"
        options={options}
        getOptionLabel={getItemLabel}
        onCreate={handleCreate}
        placeholder="Выберите цвет"
      />
    </StoryBookExample>
  );
};

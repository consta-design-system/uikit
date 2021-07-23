import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { MultiCombobox } from '../../../MultiComboboxDeprecated';

type Option = {
  label: string;
  value: string;
};

const items: Option[] = [
  { label: 'Синий', value: 'blue' },
  { label: 'Белый', value: 'white' },
  { label: 'Красный', value: 'red' },
  { label: 'Черный', value: 'black' },
  { label: 'Зеленый', value: 'green' },
  { label: 'В полосочку', value: 'stripe' },
];

export const MultiComboboxExampleCreate = () => {
  const [options, setOptions] = useState<Option[]>(items);
  const [value, setValue] = useState<Option[] | null>(null);

  const handleCreate = (label: string): void => {
    const newItem = { label, value: label };
    setOptions([newItem, ...options]);
    const newValue = value ? [...value, newItem] : [newItem];
    setValue(newValue);
  };

  const getItemLabel = (option: Option): string => option.label;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <MultiCombobox
        id="color"
        options={options}
        getOptionLabel={getItemLabel}
        onCreate={handleCreate}
        placeholder="Выберите цвет"
        onChange={setValue}
        value={value}
      />
    </StoryBookExample>
  );
};

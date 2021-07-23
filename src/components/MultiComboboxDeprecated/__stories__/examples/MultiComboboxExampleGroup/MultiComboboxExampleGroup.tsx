import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { MultiCombobox } from '../../../MultiComboboxDeprecated';

type Option = {
  label: string;
  value: string;
};

type Group = {
  label: string;
  options: Option[];
};

const items: Group[] = [
  {
    label: 'Чистые цвета',
    options: [
      { label: 'Синий', value: 'а1' },
      { label: 'Зеленый', value: 'a2' },
      { label: 'Красный', value: 'a3' },
    ],
  },
  {
    label: 'Смешанные',
    options: [
      { label: 'Черно-белый', value: 'b1' },
      { label: 'Серо-бурый', value: 'b2' },
    ],
  },
  {
    label: 'Паттерны',
    options: [
      { label: 'В горошек', value: 'c1' },
      { label: 'В полосочку', value: 'c2' },
    ],
  },
];

export const MultiComboboxExampleGroup = () => {
  const [value, setValue] = useState<Option[] | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <MultiCombobox
        id="id"
        options={items}
        getOptionLabel={(option) => option.label}
        getGroupOptions={(group) => group.options}
        placeholder="Выберите цвет"
        onChange={setValue}
        value={value}
      />
    </StoryBookExample>
  );
};

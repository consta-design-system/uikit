import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Combobox } from '../../../ComboboxDeprecated';

type SimpleOption = {
  label: string;
  value: string;
};

type Group = {
  label: string;
  options: SimpleOption[];
};

type Option = SimpleOption | Group;

const items: Option[] = [
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

export const ComboboxExampleGroup = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Combobox
        id="id"
        options={items}
        getOptionLabel={(option) => option.label}
        getGroupOptions={(group: Group) => group.options}
        placeholder="Выберите цвет"
      />
    </StoryBookExample>
  );
};

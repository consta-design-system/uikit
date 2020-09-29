import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Combobox } from '../../../Combobox';

type SimpleOption = {
  label: string;
  value: string;
};

type Group = {
  label: string;
  options: SimpleOption[];
};

const items = [
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
  const getItemLabel = (option: SelectOption): string => option.label;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Combobox
        id="id"
        options={items}
        getOptionLabel={getItemLabel}
        getGroupOptions={(group: Group): SimpleOption[] => group.options}
        placeholder="Выберите цвет"
      />
    </StoryBookExample>
  );
};

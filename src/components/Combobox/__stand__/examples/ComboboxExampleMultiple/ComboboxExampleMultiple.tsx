import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Combobox } from '../../../Combobox';

type Item = {
  label: string;
  id: number;
  disabled?: boolean;
};

const items: Item[] = [
  {
    label: 'Первый',
    id: 1,
  },
  {
    label: 'Второй',
    id: 2,
    disabled: true,
  },
  {
    label: 'Третий',
    id: 3,
  },
  {
    label: 'Четвёртый',
    id: 4,
  },
];

export function ComboboxExampleMultiple() {
  const [value, setValue] = useState<Item[] | null>([items[1]]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Combobox
        placeholder="Выберите вариант"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
        multiple
      />
    </StoryBookExample>
  );
}

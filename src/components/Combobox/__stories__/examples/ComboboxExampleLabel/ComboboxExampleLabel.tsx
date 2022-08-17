import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Combobox } from '../../../Combobox';

type Item = {
  label: string;
  id: number;
};

const items: Item[] = [
  {
    label: 'Первый',
    id: 1,
  },
  {
    label: 'Второй',
    id: 2,
  },
  {
    label: 'Третий',
    id: 3,
  },
];

export function ComboboxExampleLabel() {
  const [value, setValue] = useState<Item | null>();
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Combobox
        label="Выберите что-нибудь"
        caption={value?.label}
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
        placeholder="Выберите что-нибудь хорошее"
      />
    </StoryBookExample>
  );
}

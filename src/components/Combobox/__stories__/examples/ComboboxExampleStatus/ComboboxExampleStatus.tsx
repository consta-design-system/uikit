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

export function ComboboxExampleStatus() {
  const [value, setValue] = useState<Item | null>();
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Combobox
        placeholder="default"
        caption="default"
        size="s"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
      <Combobox
        placeholder="alert"
        caption="alert"
        state="alert"
        size="s"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
      <Combobox
        placeholder="warning"
        caption="warning"
        state="warning"
        size="s"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
      <Combobox
        placeholder="success"
        caption="success"
        size="s"
        state="success"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
    </StoryBookExample>
  );
}

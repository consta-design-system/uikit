import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Select } from '../../../Select';

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

export function SelectExampleForm() {
  const [value, setValue] = useState<Item | null>();
  return (
    <div className={cnDocsDecorator('Section')}>
      <Select
        placeholder="Форма round"
        form="round"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
      <Select
        placeholder="Форма brickDefault"
        form="brickDefault"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
    </div>
  );
}

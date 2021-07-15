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

export function SelectExampleView() {
  const [value, setValue] = useState<Item | null>();
  return (
    <div className={cnDocsDecorator('Section')}>
      <Select
        placeholder="Вид default"
        view="default"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
      <Select
        placeholder="Вид clear"
        view="clear"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
    </div>
  );
}

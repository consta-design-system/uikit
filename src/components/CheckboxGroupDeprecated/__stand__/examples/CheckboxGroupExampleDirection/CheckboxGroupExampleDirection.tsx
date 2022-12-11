import { Example } from '@consta/stand';
import React from 'react';

import { Item, items } from '../../../__mocks__/data.mock';
import { CheckboxGroup } from '../../../CheckboxGroupDeprecated';

export function CheckboxGroupExampleRow() {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example>
      <CheckboxGroup
        value={value}
        items={items}
        getLabel={(item) => item.name}
        getDisabled={(item) => item.disabled}
        onChange={({ value }) => setValue(value)}
        direction="row"
      />
    </Example>
  );
}

export function CheckboxGroupExampleColumn() {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example>
      <CheckboxGroup
        value={value}
        items={items}
        getLabel={(item) => item.name}
        getDisabled={(item) => item.disabled}
        onChange={({ value }) => setValue(value)}
        direction="column"
      />
    </Example>
  );
}

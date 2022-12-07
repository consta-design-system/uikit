import { Example } from '@consta/stand';
import React from 'react';

import { Item, items } from '../../../__mocks__/data.mock';
import { CheckboxGroup } from '../../../CheckboxGroup';

export const CheckboxGroupExampleRow = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example col={1}>
      <CheckboxGroup
        value={value}
        items={items}
        getItemLabel={(item) => item.name}
        getItemDisabled={(item) => item.disabled}
        onChange={({ value }) => setValue(value)}
        direction="row"
      />
    </Example>
  );
};

export const CheckboxGroupExampleColumn = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example>
      <CheckboxGroup
        value={value}
        items={items}
        getItemLabel={(item) => item.name}
        getItemDisabled={(item) => item.disabled}
        onChange={({ value }) => setValue(value)}
        direction="column"
      />
    </Example>
  );
};

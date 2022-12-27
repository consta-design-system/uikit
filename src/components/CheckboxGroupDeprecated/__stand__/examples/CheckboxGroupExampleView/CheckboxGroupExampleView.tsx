import { Example } from '@consta/stand';
import React from 'react';

import { Item, items } from '../../../__mocks__/data.mock';
import { CheckboxGroup } from '../../../CheckboxGroupDeprecated';

export const CheckboxGroupExampleView = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example
      col={1}
      items={(['primary', 'ghost'] as const).map((view) => ({
        node: (
          <CheckboxGroup
            value={value}
            items={items}
            getLabel={(item) => item.name}
            getDisabled={(item) => item.disabled}
            onChange={({ value }) => setValue(value)}
            name="CheckboxGroup"
            direction="row"
            view={view}
          />
        ),
        label: view,
      }))}
    />
  );
};

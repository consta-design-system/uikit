import { Example } from '@consta/stand';
import React from 'react';

import { Item, items } from '../../../__mocks__/data.mock';
import { CheckboxGroup, checkboxGroupViews } from '../../../CheckboxGroup';

export const CheckboxGroupExampleView = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example
      col={1}
      items={checkboxGroupViews.map((view) => ({
        node: (
          <CheckboxGroup
            value={value}
            items={items}
            getItemLabel={(item) => item.name}
            getItemDisabled={(item) => item.disabled}
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

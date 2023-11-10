import { Example } from '@consta/stand';
import React from 'react';

import { Item, items } from '../../../__mocks__/data.mock';
import { CheckboxGroup, checkboxGroupPropViews } from '../../../CheckboxGroup';

export const CheckboxGroupExampleView = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example
      col={1}
      items={checkboxGroupPropViews.map((view) => ({
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

import { Example } from '@consta/stand';
import React from 'react';

import { Item, items } from '../../../__mocks__/data.mock';
import {
  CheckboxGroup,
  checkboxGroupPropDirections,
} from '../../../CheckboxGroup';

export const CheckboxGroupExampleDirection = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example
      col={1}
      items={[...checkboxGroupPropDirections]}
      getItemDescription={(item) => `direction="${item}"`}
      getItemNode={(item) => (
        <CheckboxGroup
          value={value}
          items={items}
          getItemLabel={(item) => item.name}
          getItemDisabled={(item) => item.disabled}
          onChange={setValue}
          direction={item}
        />
      )}
    />
  );
};

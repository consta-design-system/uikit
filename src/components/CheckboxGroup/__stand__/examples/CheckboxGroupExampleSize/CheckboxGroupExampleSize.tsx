import { Example } from '@consta/stand';
import React from 'react';

import { Item, items } from '../../../__mocks__/data.mock';
import { CheckboxGroup } from '../../../CheckboxGroup';

export const CheckboxGroupExampleSize = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);
  return (
    <Example
      col={1}
      getItemDescription={(align) => `align="${align}"`}
      items={['xs', 's', 'm', 'l'] as const}
      getItemNode={(size) => (
        <CheckboxGroup
          value={value}
          items={items}
          getItemLabel={(item) => item.name}
          getItemDisabled={(item) => item.disabled}
          onChange={setValue}
          name="CheckboxGroup"
          direction="row"
          size={size}
        />
      )}
    />
  );
};

import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import { Item, items } from '../../../__mocks__/data.mock';
import { CheckboxGroup } from '../../../CheckboxGroup';

const cnCheckboxGroupExampleSize = cn('CheckboxGroupExampleSize');

export const CheckboxGroupExampleSize = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);
  return (
    <Example col={1}>
      <CheckboxGroup
        value={value}
        items={items}
        getItemLabel={(item) => item.name}
        getItemDisabled={(item) => item.disabled}
        onChange={({ value }) => setValue(value)}
        name="CheckboxGroup"
        direction="row"
        size="m"
        className={cnCheckboxGroupExampleSize()}
      />
      <CheckboxGroup
        value={value}
        items={items}
        getItemLabel={(item) => item.name}
        getItemDisabled={(item) => item.disabled}
        onChange={({ value }) => setValue(value)}
        name="CheckboxGroup"
        direction="row"
        size="l"
        className={cnCheckboxGroupExampleSize()}
      />
    </Example>
  );
};

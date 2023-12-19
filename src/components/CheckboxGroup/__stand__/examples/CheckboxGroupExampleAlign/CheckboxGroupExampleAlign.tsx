import { Example } from '@consta/stand';
import React from 'react';

import { CheckboxGroup, CheckboxGroupPropAlign } from '../../../CheckboxGroup';

const aligns: CheckboxGroupPropAlign[] = ['top', 'center'];

const items = [
  '1. Длинный текст для чекбокса с выравниванием по центру, здесь несколько строк',
  '2. Длинный текст для чекбокса с выравниванием по центру, здесь несколько строк',
  '3. Длинный текст для чекбокса с выравниванием по центру, здесь несколько строк',
];

export const CheckboxGroupExampleAlign = () => {
  const [value, setValue] = React.useState<string[] | null>(null);

  return (
    <Example
      items={aligns}
      getItemDescription={(align) => `align="${align}"`}
      getItemNode={(align) => (
        <CheckboxGroup
          value={value}
          align={align}
          items={items}
          getItemKey={(item) => item}
          getItemLabel={(item) => item}
          onChange={setValue}
        />
      )}
    />
  );
};

import { Example } from '@consta/stand';
import React from 'react';

import { cnDocsExample } from '##/uiKit/components/DocsExample/DocsExample';

import { Item, items } from '../../../__mocks__/data.mock';
import { CheckboxGroup } from '../../../CheckboxGroup';

export const CheckboxGroupExampleView = () => {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example col={1}>
      <>
        <p className={cnDocsExample('Caption')}>
          <b>primary</b>
        </p>
        <CheckboxGroup
          value={value}
          items={items}
          getItemLabel={(item) => item.name}
          getItemDisabled={(item) => item.disabled}
          onChange={({ value }) => setValue(value)}
          name="CheckboxGroup"
          direction="row"
          view="primary"
        />
      </>
      <>
        <p className={cnDocsExample('Caption')}>
          <b>ghost</b>
        </p>
        <CheckboxGroup
          value={value}
          items={items}
          getItemLabel={(item) => item.name}
          getItemDisabled={(item) => item.disabled}
          onChange={({ value }) => setValue(value)}
          name="CheckboxGroup"
          direction="row"
          view="ghost"
        />
      </>
    </Example>
  );
};

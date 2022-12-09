import { Example } from '@consta/stand';
import React from 'react';

import { cnDocsExample } from '##/uiKit/components/DocsExample';

import { Item, items } from '../../../__mocks__/data.mock';
import { CheckboxGroup } from '../../../CheckboxGroupDeprecated';

export function CheckboxGroupExampleView() {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example>
      <>
        <p className={cnDocsExample('Caption')}>
          <b>primary</b>
        </p>
        <CheckboxGroup
          value={value}
          items={items}
          getLabel={(item) => item.name}
          getDisabled={(item) => item.disabled}
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
          getLabel={(item) => item.name}
          getDisabled={(item) => item.disabled}
          onChange={({ value }) => setValue(value)}
          name="CheckboxGroup"
          direction="row"
          view="ghost"
        />
      </>
    </Example>
  );
}

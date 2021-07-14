import React from 'react';

import { Item, items } from '../../../__mocks__/data.mock';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { CheckboxGroup } from '../../../CheckboxGroup';

export function CheckboxGroupExampleView() {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
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
    </StoryBookExample>
  );
}

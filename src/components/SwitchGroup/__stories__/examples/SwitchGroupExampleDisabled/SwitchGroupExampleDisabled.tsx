import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { SwitchGroup } from '../../../SwitchGroup';

type Item = {
  name: string;
  disabled?: boolean;
};

const items: Item[] = [
  { name: 'Тёмная тема' },
  { name: 'Розовый текст' },
  { name: 'Мигающие заголовки', disabled: true },
];

export function SwitchGroupExampleDisabled() {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <SwitchGroup
        value={value}
        items={items}
        getLabel={(item) => item.name}
        getDisabled={(item) => item.disabled}
        onChange={({ value }) => setValue(value)}
        name="SwitchGroupExampleDisabled"
      />
    </StoryBookExample>
  );
}

export function SwitchGroupExampleDisabledGroup() {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <SwitchGroup
        value={value}
        items={items}
        getLabel={(item) => item.name}
        getDisabled={(item) => item.disabled}
        onChange={({ value }) => setValue(value)}
        name="SwitchGroupExampleDisabledGroup"
        disabled
      />
    </StoryBookExample>
  );
}

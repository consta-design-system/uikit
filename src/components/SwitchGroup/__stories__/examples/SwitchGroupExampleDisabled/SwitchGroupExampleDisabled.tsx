import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { SwitchGroup } from '../../../SwitchGroup';

type Item = {
  label: string;
  off?: boolean;
};

const items: Item[] = [
  { label: 'Тёмная тема' },
  { label: 'Розовый текст' },
  { label: 'Мигающие заголовки', off: true },
];

export function SwitchGroupExampleDisabled() {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <SwitchGroup
        value={value}
        items={items}
        getDisabled={(item) => item.off}
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
        getDisabled={(item) => item.off}
        onChange={({ value }) => setValue(value)}
        name="SwitchGroupExampleDisabledGroup"
        disabled
      />
    </StoryBookExample>
  );
}

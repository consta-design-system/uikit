import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { SwitchGroup } from '../../../SwitchGroupCanary';
import { SwitchGroupDefaultItem } from '../../../types';

const items = [
  { label: 'Тёмная тема' },
  { label: 'Розовый текст' },
  { label: 'Мигающие заголовки' },
];

export function SwitchGroupExampleSizeM() {
  const [value, setValue] = React.useState<SwitchGroupDefaultItem[] | null>(null);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <SwitchGroup
        value={value}
        items={items}
        onChange={({ value }) => setValue(value)}
        name="SwitchGroupExampleSizeM"
        size="m"
      />
    </StoryBookExample>
  );
}

export function SwitchGroupExampleSizeL() {
  const [value, setValue] = React.useState<SwitchGroupDefaultItem[] | null>(null);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <SwitchGroup
        value={value}
        items={items}
        onChange={({ value }) => setValue(value)}
        name="SwitchGroupExampleSizeL"
        size="l"
      />
    </StoryBookExample>
  );
}

import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { UserSelect } from '../../../UserSelect';

type Item = {
  label: string;
  subLabel?: string;
  avatarUrl?: string;
  id: string | number;
};

const items: Item[] = [
  {
    label: 'Андрей Андреев',
    subLabel: 'andrey@gmail.com',
    id: 1,
  },
  {
    label: 'Иван Иванов',
    subLabel: 'ivan@gmail.com',
    id: 2,
  },
  {
    label: 'Егор Егоров',
    subLabel: 'igor@icloud.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/13190808?v=4',
    id: 3,
  },
];

export function UserSelectExampleLabel() {
  const [value, setValue] = useState<Item | null>();
  return (
    <div className={cnDocsDecorator('Section')}>
      <UserSelect
        label="Пользователь"
        caption={value?.label}
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
        placeholder="Выберите пользователя"
      />
    </div>
  );
}

export function UserSelectExampleLabelPosition() {
  const [value, setValue] = useState<Item | null>();
  return (
    <>
      <StoryBookExample>
        <UserSelect
          items={items}
          value={value}
          onChange={({ value }) => setValue(value)}
          placeholder="Здесь лейбл сверху"
          label="Лейбл"
          labelPosition="top"
        />
      </StoryBookExample>
      <StoryBookExample>
        <UserSelect
          items={items}
          value={value}
          onChange={({ value }) => setValue(value)}
          placeholder="Здесь лейбл слева"
          label="Лейбл"
          labelPosition="left"
        />
      </StoryBookExample>
    </>
  );
}

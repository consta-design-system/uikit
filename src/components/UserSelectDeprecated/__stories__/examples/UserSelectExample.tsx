import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { UserSelect } from '../../UserSelectDeprecated';

type Option = {
  label: string;
  subLabel: string;
  value: string;
  url: string;
};

const items = [
  {
    label: 'Андрей Андреев',
    value: 'AA',
    subLabel: 'andrey@mail.com',
    url: 'https://i.ibb.co/K2R8Lqb/Rectangle-1496.png',
  },
  {
    label: 'Иван Иванов',
    value: 'II',
    subLabel: 'ivan@mail.com',
    url: 'https://i.ibb.co/K2R8Lqb/Rectangle-1496.png',
  },
  {
    label: 'Тимур Тимуров',
    value: 'TT',
    subLabel: 'timur@mail.com',
    url: 'https://i.ibb.co/K2R8Lqb/Rectangle-1496.png',
  },
];

export const UserSelectExample = () => {
  const [value, setValue] = useState<Option[] | null>(null);
  const getItemLabel = (option: Option): string => option.label;
  const getItemSubLabel = (option: Option): string => option.subLabel;
  const getItemUrl = (option: Option): string => option.url;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <p>Выбор сотрудника</p>
      <UserSelect
        id="employees"
        options={items}
        getOptionLabel={getItemLabel}
        getOptionAdditionalInfo={getItemSubLabel}
        getOptionAvatarUrl={getItemUrl}
        placeholder="Выберите сотрудника"
        size="m"
        onChange={setValue}
        value={value}
        multiple={false}
      />
    </StoryBookExample>
  );
};

export const UserSelectExampleMulti = () => {
  const [value, setValue] = useState<Option[] | null>(null);
  const getItemLabel = (option: Option): string => option.label;
  const getItemSubLabel = (option: Option): string => option.subLabel;
  const getItemUrl = (option: Option): string => option.url;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <p>Выбор сотрудников</p>
      <UserSelect
        id="employees"
        options={items}
        getOptionLabel={getItemLabel}
        getOptionAdditionalInfo={getItemSubLabel}
        getOptionAvatarUrl={getItemUrl}
        placeholder="Выберите сотрудника"
        size="m"
        onChange={setValue}
        value={value}
        multiple
      />
    </StoryBookExample>
  );
};

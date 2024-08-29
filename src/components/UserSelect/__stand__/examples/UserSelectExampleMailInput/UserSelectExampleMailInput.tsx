import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { UserSelect } from '##/components/UserSelect';
import avatarUrl from '##/components/UserSelect/__mocks__/avatar_1.jpg';

type Item = {
  label: string;
  subLabel?: string;
  avatarUrl?: string;
};

const items: Item[] = [
  {
    label: 'Андрей Андреев',
    subLabel: 'andrey@gmail.com',
  },
  {
    label: 'Иван Иванов',
    subLabel: 'ivan@gmail.com',
  },
  {
    label: 'Егор Егоров',
    subLabel: 'igor@icloud.com',
    avatarUrl,
  },
];

const isEmail = (string: string) => {
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,8}$/;
  return pattern.test(string);
};

export function UserSelectExampleMailInput() {
  const [contacts, setContacts] = useState<Item[]>(items);
  const [value, setValue] = useState<Item[] | null>();
  const [searchValue, setSearchValue] = useState<string>('');

  const onCreate = (string: string) => {
    setContacts((state) => {
      return [
        ...state,
        {
          label: string,
        },
      ];
    });
    setValue((state) => {
      return [
        ...(Array.isArray(state) ? state : []),
        {
          label: string,
        },
      ];
    });
  };

  const onBlur = () => {
    if (isEmail(searchValue)) {
      setValue((state) => {
        return [
          ...(Array.isArray(state) ? state : []),
          {
            label: searchValue,
          },
        ];
      });
      setSearchValue('');
    }
  };

  return (
    <Example col={1}>
      <UserSelect
        items={contacts}
        value={value}
        onChange={setValue}
        placeholder="Поиск контактов или ввод email"
        getItemKey={(item) => item.subLabel || item.label}
        labelForCreate={`Отправить на `}
        multiple
        labelForNotFound="Не найдено, введите email"
        onCreate={isEmail(searchValue) ? onCreate : undefined}
        onSearchValueChange={setSearchValue}
        onBlur={onBlur}
        searchValue={searchValue}
      />
    </Example>
  );
}

import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { UserSelect } from '../../UserSelect';

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
      <UserSelect
        id="employeesMulti"
        options={items}
        getOptionLabel={getItemLabel}
        getOptionAdditionalInfo={getItemSubLabel}
        getOptionAvatarUrl={getItemUrl}
        placeholder="Выберите одного или нескольких сотрудников"
        size="m"
        onChange={setValue}
        value={value}
        multiple
      />
    </StoryBookExample>
  );
};

export const UserSelectExampleDefault = () => {
  const [value, setValue] = useState<Option[] | null>(null);
  const getItemLabel = (option: Option): string => option.label;
  const getItemSubLabel = (option: Option): string => option.subLabel;
  const getItemUrl = (option: Option): string => option.url;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <UserSelect
        id="employeesDefault"
        options={items}
        getOptionLabel={getItemLabel}
        getOptionAdditionalInfo={getItemSubLabel}
        getOptionAvatarUrl={getItemUrl}
        placeholder="Выбор сотрудников `default`"
        size="m"
        view="default"
        onChange={setValue}
        value={value}
      />
    </StoryBookExample>
  );
};

export const UserSelectExampleClear = () => {
  const [value, setValue] = useState<Option[] | null>(null);
  const getItemLabel = (option: Option): string => option.label;
  const getItemSubLabel = (option: Option): string => option.subLabel;
  const getItemUrl = (option: Option): string => option.url;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <UserSelect
        id="employeesDefault"
        options={items}
        getOptionLabel={getItemLabel}
        getOptionAdditionalInfo={getItemSubLabel}
        getOptionAvatarUrl={getItemUrl}
        placeholder="Выбор сотрудников `clear`"
        size="m"
        view="clear"
        onChange={setValue}
        value={value}
      />
    </StoryBookExample>
  );
};

export const UserSelectExampleDisabled = () => {
  const [value, setValue] = useState<Option[] | null>(null);
  const getItemLabel = (option: Option): string => option.label;
  const getItemSubLabel = (option: Option): string => option.subLabel;
  const getItemUrl = (option: Option): string => option.url;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <UserSelect
        id="employeesDefault"
        options={items}
        getOptionLabel={getItemLabel}
        getOptionAdditionalInfo={getItemSubLabel}
        getOptionAvatarUrl={getItemUrl}
        placeholder="Неактивный выбор сотрудников"
        size="m"
        onChange={setValue}
        value={value}
        disabled
      />
    </StoryBookExample>
  );
};

export const UserSelectExampleSize = () => {
  const [value, setValue] = useState<Option[] | null>(null);
  const getItemLabel = (option: Option): string => option.label;
  const getItemSubLabel = (option: Option): string => option.subLabel;
  const getItemUrl = (option: Option): string => option.url;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <UserSelect
        id="employeesS"
        options={items}
        getOptionLabel={getItemLabel}
        getOptionAdditionalInfo={getItemSubLabel}
        getOptionAvatarUrl={getItemUrl}
        placeholder="Выбор сотрудников 's'"
        size="s"
        onChange={setValue}
        value={value}
      />
      <UserSelect
        id="employeesM"
        options={items}
        getOptionLabel={getItemLabel}
        getOptionAdditionalInfo={getItemSubLabel}
        getOptionAvatarUrl={getItemUrl}
        placeholder="Выбор сотрудников 'm'"
        size="s"
        onChange={setValue}
        value={value}
      />
      <UserSelect
        id="employeesL"
        options={items}
        getOptionLabel={getItemLabel}
        getOptionAdditionalInfo={getItemSubLabel}
        getOptionAvatarUrl={getItemUrl}
        placeholder="Выбор сотрудников 'l'"
        size="l"
        onChange={setValue}
        value={value}
      />
    </StoryBookExample>
  );
};

export const UserSelectExampleForm = () => {
  const [value, setValue] = useState<Option[] | null>(null);
  const getItemLabel = (option: Option): string => option.label;
  const getItemSubLabel = (option: Option): string => option.subLabel;
  const getItemUrl = (option: Option): string => option.url;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <UserSelect
        id="employeesS"
        options={items}
        getOptionLabel={getItemLabel}
        getOptionAdditionalInfo={getItemSubLabel}
        getOptionAvatarUrl={getItemUrl}
        placeholder="Выбор сотрудников 'default'"
        size="m"
        onChange={setValue}
        value={value}
        form="default"
      />
      <UserSelect
        id="employeesM"
        options={items}
        getOptionLabel={getItemLabel}
        getOptionAdditionalInfo={getItemSubLabel}
        getOptionAvatarUrl={getItemUrl}
        placeholder="Выбор сотрудников 'brick'"
        size="m"
        onChange={setValue}
        value={value}
        form="brick"
      />
      <UserSelect
        id="employeesL"
        options={items}
        getOptionLabel={getItemLabel}
        getOptionAdditionalInfo={getItemSubLabel}
        getOptionAvatarUrl={getItemUrl}
        placeholder="Выбор сотрудников 'round'"
        size="m"
        onChange={setValue}
        value={value}
        form="round"
      />
    </StoryBookExample>
  );
};

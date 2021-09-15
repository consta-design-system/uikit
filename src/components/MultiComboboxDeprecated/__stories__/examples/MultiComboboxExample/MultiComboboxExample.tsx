import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { MultiCombobox } from '../../../MultiComboboxDeprecated';

type Option = {
  label: string;
  value: string;
};

const items: Option[] = [
  { label: 'Синий', value: 'blue' },
  { label: 'Белый', value: 'white' },
  { label: 'Красный', value: 'red' },
  { label: 'Черный', value: 'black' },
  { label: 'Зеленый', value: 'green' },
  { label: 'В полосочку', value: 'stripe' },
];

export const MultiComboboxExampleText = () => {
  const [value, setValue] = useState<Option[] | null>(null);
  const getItemLabel = (option: Option): string => option.label;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <p>Цвет фона</p>
      <MultiCombobox
        id="colors"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Выберите цвет"
        onChange={setValue}
        value={value}
      />
    </StoryBookExample>
  );
};

export const MultiComboboxExampleSize = () => {
  const [value, setValue] = useState<Option[] | null>(null);
  const getItemLabel = (option: Option): string => option.label;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <MultiCombobox
        id="city"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Ваш выбор S"
        size="s"
        onChange={setValue}
        value={value}
      />
      <MultiCombobox
        id="city"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Ваш выбор M"
        size="m"
        onChange={setValue}
        value={value}
      />
      <MultiCombobox
        id="city"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Ваш выбор L"
        size="l"
        onChange={setValue}
        value={value}
      />
    </StoryBookExample>
  );
};

export const MultiComboboxExampleForm = () => {
  const [value, setValue] = useState<Option[] | null>(null);
  const getItemLabel = (option: Option): string => option.label;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <MultiCombobox
        id="color"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Default"
        form="default"
        onChange={setValue}
        value={value}
      />
      <MultiCombobox
        id="color"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Brick"
        form="brick"
        onChange={setValue}
        value={value}
      />
      <MultiCombobox
        id="color"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Round"
        form="round"
        onChange={setValue}
        value={value}
      />
    </StoryBookExample>
  );
};

export const MultiComboboxExampleView = () => {
  const [value, setValue] = useState<Option[] | null>(null);
  const getItemLabel = (option: Option): string => option.label;
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <MultiCombobox
        id="city"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Default"
        view="default"
        onChange={setValue}
        value={value}
      />
      <MultiCombobox
        id="city"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Clear"
        view="clear"
        onChange={setValue}
        value={value}
      />
      <MultiCombobox
        id="city"
        options={items}
        getOptionLabel={getItemLabel}
        placeholder="Disabled"
        disabled
        onChange={setValue}
        value={value}
      />
    </StoryBookExample>
  );
};

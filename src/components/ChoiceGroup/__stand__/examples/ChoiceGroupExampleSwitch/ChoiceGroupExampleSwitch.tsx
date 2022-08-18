import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { ChoiceGroup } from '../../../ChoiceGroup';

type Item = string;

const itemsPolar: Item[] = ['Включен', 'Выключен'];
const itemsLetters: Item[] = ['Да', 'Нет'];
const itemsMode: Item[] = ['Тестовый режим', 'Рабочий режим'];

export const ChoiceGroupExampleSwitchPolar = () => {
  const [value, setValue] = useState<Item | null>(itemsPolar[0]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <p>Поляризационный фильтр</p>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={itemsPolar}
        getItemLabel={(item) => item}
        name="ChoiceGroupExampleSwitchPolar"
      />
    </StoryBookExample>
  );
};

export const ChoiceGroupExampleSwitchLetters = () => {
  const [value, setValue] = useState<Item | null>(itemsLetters[0]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <p>Получать письма</p>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={itemsLetters}
        getItemLabel={(item) => item}
        name="ChoiceGroupExampleSwitchLetters"
      />
    </StoryBookExample>
  );
};

export const ChoiceGroupExampleSwitchMode = () => {
  const [value, setValue] = useState<Item | null>(itemsMode[0]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={itemsMode}
        getItemLabel={(item) => item}
        name="ChoiceGroupExampleSwitchMode"
      />
    </StoryBookExample>
  );
};

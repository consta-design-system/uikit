import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { ChoiceGroup } from '../../../ChoiceGroupDeprecated';

type Item = string;

const itemsPolar: Item[] = ['Включен', 'Выключен'];
const itemsLetters: Item[] = ['Да', 'Нет'];
const itemsMode: Item[] = ['Тестовый режим', 'Рабочий режим'];

export const ChoiceGroupExampleSwitchPolar = () => {
  const [value, setValue] = useState<Item | null>(itemsPolar[0]);
  return (
    <Example col={{ 1: 0, flex: 600 }}>
      <p>Поляризационный фильтр</p>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={itemsPolar}
        getLabel={(item) => item}
        name="ChoiceGroupExampleSwitchPolar"
      />
    </Example>
  );
};

export const ChoiceGroupExampleSwitchLetters = () => {
  const [value, setValue] = useState<Item | null>(itemsLetters[0]);
  return (
    <Example col={{ 1: 0, flex: 600 }}>
      <p>Получать письма</p>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={itemsLetters}
        getLabel={(item) => item}
        name="ChoiceGroupExampleSwitchLetters"
      />
    </Example>
  );
};

export const ChoiceGroupExampleSwitchMode = () => {
  const [value, setValue] = useState<Item | null>(itemsMode[0]);
  return (
    <Example>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={itemsMode}
        getLabel={(item) => item}
        name="ChoiceGroupExampleSwitchMode"
      />
    </Example>
  );
};

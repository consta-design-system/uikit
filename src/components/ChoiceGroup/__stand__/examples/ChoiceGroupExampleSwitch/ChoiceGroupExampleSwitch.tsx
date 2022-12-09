import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { ChoiceGroup } from '../../../ChoiceGroup';
import { cnChoiceGroupExampleFitMode } from '../ChoiceGroupExampleFitMode';

type Item = string;

const itemsPolar: Item[] = ['Включен', 'Выключен'];
const itemsLetters: Item[] = ['Да', 'Нет'];
const itemsMode: Item[] = ['Тестовый режим', 'Рабочий режим'];

export const ChoiceGroupExampleSwitchPolar = () => {
  const [value, setValue] = useState<Item | null>(itemsPolar[0]);
  return (
    <Example>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={itemsPolar}
        getItemLabel={(item) => item}
        name="ChoiceGroupExampleSwitchPolar"
        className={cnChoiceGroupExampleFitMode()}
      />
    </Example>
  );
};

export const ChoiceGroupExampleSwitchLetters = () => {
  const [value, setValue] = useState<Item | null>(itemsLetters[0]);
  return (
    <Example>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={itemsLetters}
        getItemLabel={(item) => item}
        name="ChoiceGroupExampleSwitchLetters"
        className={cnChoiceGroupExampleFitMode()}
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
        getItemLabel={(item) => item}
        name="ChoiceGroupExampleSwitchMode"
        className={cnChoiceGroupExampleFitMode()}
      />
    </Example>
  );
};

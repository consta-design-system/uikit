import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace/MixSpace';

import { RadioGroup } from '../../../RadioGroup';

const itemsOne = ['Только ночью'];

const itemsTwo = ['Днём', 'Ночью', 'Когда угодно'];

const itemsThree = ['Кусочек метеорита', 'Хвост кометы', 'Невесомость в банке'];

const itemsFour = ['На почту', 'Курьером', 'Дроном', 'Оставить у двери'];

const itemsChecked = [
  'Под бобра',
  'В кружок',
  'А ля рюс',
  'С бакенбардами',
  'Только кончики',
];

export const RadioGroupExampleMore = () => {
  const [value, setValue] = React.useState<string | null>(itemsOne[0]);
  const [valueTwo, setValueTwo] = React.useState<string | null>(itemsTwo[0]);

  return (
    <Example
      col={{ 1: 0, 2: 800 }}
      separately
      items={[
        {
          label: 'Неправильно',
          status: 'error',
          node: (
            <>
              <Text
                view="primary"
                size="m"
                weight="bold"
                className={cnMixSpace({ mB: 'm' })}
                lineHeight="m"
              >
                Когда получать вести с Марса
              </Text>
              <RadioGroup
                value={value}
                items={itemsOne}
                getItemLabel={(item) => item}
                onChange={setValue}
              />
            </>
          ),
        },
        {
          label: 'Правильно',
          status: 'success',
          node: (
            <>
              <Text
                view="primary"
                weight="bold"
                className={cnMixSpace({ mB: 'm' })}
                size="m"
                lineHeight="m"
              >
                Когда получать вести с Марса
              </Text>
              <RadioGroup
                value={valueTwo}
                items={itemsTwo}
                getItemLabel={(item) => item}
                onChange={setValueTwo}
              />
            </>
          ),
        },
      ]}
    />
  );
};

export const RadioGroupExampleOne = () => {
  const [value, setValue] = React.useState<string | null>(itemsThree[0]);
  const [valueTwo, setValueTwo] = React.useState<string | null>(itemsFour[0]);

  return (
    <Example
      col={{ 1: 0, 2: 800 }}
      separately
      items={[
        {
          label: 'Неправильно',
          status: 'error',
          node: (
            <>
              <Text
                view="primary"
                size="m"
                weight="bold"
                className={cnMixSpace({ mB: 'm' })}
                lineHeight="m"
              >
                Что привезти из космоса
              </Text>
              <RadioGroup
                value={value}
                items={itemsThree}
                getItemLabel={(item) => item}
                onChange={setValue}
              />
            </>
          ),
        },
        {
          label: 'Правильно',
          status: 'success',
          node: (
            <>
              <Text
                view="primary"
                size="m"
                weight="bold"
                className={cnMixSpace({ mB: 'm' })}
                lineHeight="m"
              >
                Как получить посылку
              </Text>
              <RadioGroup
                value={valueTwo}
                items={itemsFour}
                getItemLabel={(item) => item}
                onChange={setValueTwo}
              />
            </>
          ),
        },
      ]}
    />
  );
};

export const RadioGroupExampleChecked = () => {
  const [value, setValue] = React.useState<string | null>(itemsChecked[0]);

  return (
    <Example>
      <>
        <Text
          view="primary"
          size="m"
          weight="bold"
          className={cnMixSpace({ mB: 'm' })}
          lineHeight="m"
        >
          Как вас постричь
        </Text>
        <RadioGroup
          value={value}
          items={itemsChecked}
          getItemLabel={(item) => item}
          onChange={setValue}
        />
      </>
    </Example>
  );
};

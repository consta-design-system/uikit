import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Text } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';

import { ChoiceGroup } from '../../../ChoiceGroup';

type Item = string;

const itemsWrong: Item[] = ['Сетка', 'Таблицей', 'Карточка'];
const items: Item[] = ['Списком', 'В таблице', 'По одному'];
const itemsSimple: Item[] = ['один', 'два', 'три', 'четыре', 'пять', 'шесть'];

export const ChoiceGroupExampleText = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example
      col={{ 1: 0, 2: 720 }}
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
                lineHeight="m"
                weight="bold"
                className={cnMixSpace({ mB: 'm' })}
              >
                Отображение
              </Text>
              <ChoiceGroup
                value={value}
                onChange={setValue}
                items={itemsWrong}
                getItemLabel={(item) => item}
                name="ChoiceGroupExampleText"
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
                lineHeight="m"
                weight="bold"
                className={cnMixSpace({ mB: 'm' })}
              >
                Как показывать товары
              </Text>
              <ChoiceGroup
                value={value}
                onChange={setValue}
                items={items}
                getItemLabel={(item) => item}
                name="ChoiceGroupExampleText"
              />
            </>
          ),
        },
      ]}
    />
  );
};

export const ChoiceGroupExample = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example>
      <ChoiceGroup
        value={value}
        onChange={setValue}
        items={itemsSimple}
        getItemLabel={(item) => item}
        name="ChoiceGroupExampleText"
      />
    </Example>
  );
};

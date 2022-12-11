import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { cnDocsExample } from '##/uiKit/components/DocsExample/DocsExample';

import { ChoiceGroup } from '../../../ChoiceGroupDeprecated';

type Item = string;

const itemsWrong: Item[] = ['Сетка', 'Таблицей', 'Карточка'];
const items: Item[] = ['Списком', 'В таблице', 'По одному'];
const itemsSimple: Item[] = ['один', 'два', 'три', 'четыре', 'пять', 'шесть'];

export const ChoiceGroupExampleText = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example col={{ 1: 0, 2: 760 }}>
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Отображение</p>
        <ChoiceGroup
          value={value}
          onChange={({ value }) => setValue(value)}
          items={itemsWrong}
          getLabel={(item) => item}
          name="ChoiceGroupExampleText"
        />
        <p className={cnDocsExample('Status', { view: 'wrong' })}>
          Неправильно
        </p>
      </div>

      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>Как показывать товары</p>
        <ChoiceGroup
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getLabel={(item) => item}
          name="ChoiceGroupExampleText"
        />
        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
      </div>
    </Example>
  );
};

export const ChoiceGroupExample = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={itemsSimple}
        getLabel={(item) => item}
        name="ChoiceGroupExampleText"
      />
    </Example>
  );
};

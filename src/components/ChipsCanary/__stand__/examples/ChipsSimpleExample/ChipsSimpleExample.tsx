import { IconBag } from '@consta/icons/IconBag';
import { IconDiamond } from '@consta/icons/IconDiamond';
import { IconDinosaur } from '@consta/icons/IconDinosaur';
import { Example } from '@consta/stand';
import React from 'react';

import { Chips, ChipsDefaultItem } from '##/components/ChipsCanary';

export const items = ['Согласован', 'Ожидает', 'Новый', 'Черновик', 'Отказано'];
export const items2: ChipsDefaultItem[] = [
  {
    iconLeft: IconDinosaur,
    label: 'Динозавр',
  },
  {
    iconLeft: IconBag,
    label: 'Портфель',
  },
  {
    iconLeft: IconDiamond,
    label: 'Бриллиант',
  },
];

export const items3: ChipsDefaultItem[] = [
  {
    status: 'success',
    label: 'Согласован',
  },
  {
    status: 'warning',
    label: 'Ожидает',
  },
  {
    status: 'error',
    label: 'Отказано',
  },
];

const getItemLabel = (item: string) => item;

export const ChipsSimpleExample = () => (
  <Example>
    <Chips items={items} getItemLabel={getItemLabel} />
  </Example>
);

export const ChipsSimpleExample2 = () => (
  <Example>
    <Chips items={items2} />
  </Example>
);

export const ChipsSimpleExample3 = () => (
  <Example>
    <Chips items={items3} />
  </Example>
);

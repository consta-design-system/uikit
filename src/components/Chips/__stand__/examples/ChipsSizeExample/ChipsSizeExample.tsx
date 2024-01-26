import { Example } from '@consta/stand';
import React from 'react';

import { ChipsItem, ChipsPropSize } from '##/components/Chips';

export const items = ['Согласован', 'Ожидает', 'Новый', 'Черновик', 'Отказано'];

export const chipsPropSize: ChipsPropSize[] = ['xs', 's', 'm', 'l'];

export const ChipsSizeExample = () => (
  <Example
    col={{ 2: 0, 4: 500 }}
    items={chipsPropSize}
    getItemNode={(size) => <ChipsItem label="Чип" size={size} />}
    getItemLabel={(size) => `size=${size}`}
  />
);

import { IconClose } from '@consta/icons/IconClose';
import { Example } from '@consta/stand';
import React from 'react';

import { Chips } from '##/components/ChipsCanary';

export const items = ['Согласован', 'Ожидает', 'Новый', 'Черновик', 'Отказано'];

const getItemLabel = (item: string) => item;

export const ChipsInteractiveExample = () => (
  <Example>
    <Chips
      items={items}
      getItemLabel={getItemLabel}
      interactive
      onItemClick={(item) => alert(item)}
      getItemIconRight={() => IconClose}
      onItemRightIconClick={(item, { e }) => {
        e.stopPropagation();
        alert(`${item} - клик по крестику`);
      }}
    />
  </Example>
);

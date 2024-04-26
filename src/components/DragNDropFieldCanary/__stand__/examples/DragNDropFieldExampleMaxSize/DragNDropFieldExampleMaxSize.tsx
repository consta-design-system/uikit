import { Example } from '@consta/stand';
import React from 'react';

import { DragNDropField } from '##/components/DragNDropFieldCanary';
import { Text } from '##/components/Text';

export const DragNDropFieldExampleMaxSize = () => (
  <Example col={1}>
    <DragNDropField maxSize={1 * 1024 * 1024}>
      <Text>Сюда можно перетаскивать файлы размером 1 Мб или меньше</Text>
    </DragNDropField>
  </Example>
);

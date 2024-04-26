import { Example } from '@consta/stand';
import React from 'react';

import { DragNDropField } from '##/components/DragNDropFieldCanary';
import { Text } from '##/components/Text';

export const DragNDropFieldExampleMultiple = () => (
  <Example col={1}>
    <DragNDropField multiple>
      <Text>Сюда можно перетащить много файлов</Text>
    </DragNDropField>
  </Example>
);

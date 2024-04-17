import { Example } from '@consta/stand';
import React from 'react';

import {
  DragNDropField,
  getErrorsList,
} from '##/components/DragNDropFieldCanary';
import { defaultLocale } from '##/components/DragNDropFieldCanary/locale';
import { Text } from '##/components/Text';

export const DragNDropFieldExampleMaxSize = () => (
  <Example col={1}>
    <DragNDropField
      maxSize={1 * 1024 * 1024}
      onDropAccepted={(files) => console.log(files)}
      onDropRejected={(reject) => {
        console.log(reject);
        alert(
          getErrorsList(reject, defaultLocale, {
            maxSize: 1 * 1024 * 1024,
          }).join('; '),
        );
      }}
    >
      <Text view="primary" size="m" lineHeight="m">
        Сюда можно перетаскивать файлы
      </Text>
      <Text view="primary" size="m" lineHeight="m">
        размером 1 Мб или меньше
      </Text>
    </DragNDropField>
  </Example>
);

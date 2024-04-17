import { Example } from '@consta/stand';
import React from 'react';

import {
  DragNDropField,
  getErrorsList,
} from '##/components/DragNDropFieldCanary';
import { Text } from '##/components/Text';

export const DragNDropFieldExampleSingle = () => (
  <Example col={1}>
    <DragNDropField
      multiple={false}
      onDropAccepted={(files) => console.log(files)}
      onDropRejected={(reject) => {
        console.log(reject);
        const text = getErrorsList(reject).join('; ');
        alert(text);
      }}
    >
      <Text view="primary" size="m" lineHeight="m">
        Сюда можно перетащить только один файл
      </Text>
    </DragNDropField>
  </Example>
);

export const DragNDropFieldExampleMultiple = () => (
  <Example col={1}>
    <DragNDropField multiple onDropAccepted={(files) => console.log(files)}>
      <Text view="primary" size="m" lineHeight="m">
        Сюда можно перетащить много файлов за раз
      </Text>
    </DragNDropField>
  </Example>
);

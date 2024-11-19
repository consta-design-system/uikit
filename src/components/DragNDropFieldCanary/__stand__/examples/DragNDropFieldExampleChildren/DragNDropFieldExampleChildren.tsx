import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '##/components/Button';
import { DragNDropField } from '##/components/DragNDropFieldCanary';
import { Text } from '##/components/Text';

export const DragNDropFieldExampleRenderProps = () => (
  <Example col={1}>
    <DragNDropField>
      {({ openFileDialog }) => (
        <>
          <Text>
            Перетащи сюда файлы или выбери их из списка нажав по кнопке
          </Text>
          <br />
          <Button onClick={openFileDialog} label="Выбрать файл" />
        </>
      )}
    </DragNDropField>
  </Example>
);

export const DragNDropFieldExampleChildren = () => (
  <Example col={1}>
    <DragNDropField>
      <Text>Перетащи сюда файлы</Text>
    </DragNDropField>
  </Example>
);

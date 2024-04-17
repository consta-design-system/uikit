import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '##/components/Button';
import { DragNDropField } from '##/components/DragNDropFieldCanary';
import { Text } from '##/components/Text';

export const DragNDropFieldExampleRenderProps = () => (
  <Example col={1}>
    <DragNDropField onDropAccepted={(files) => console.log(files)}>
      {({ openFileDialog }) => (
        <>
          <Text view="primary" size="m" lineHeight="m">
            Пример с Render Props,
          </Text>
          <Text view="primary" size="m" lineHeight="m">
            открывает окно для выбора файла из дочернего контента
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
    <DragNDropField onDropAccepted={(files) => console.log(files)}>
      <Text view="primary" size="m" lineHeight="m">
        Здесь просто текст
      </Text>
    </DragNDropField>
  </Example>
);

export const DragNDropFieldExampleEmpty = () => (
  <Example col={1}>
    <DragNDropField onDropAccepted={(files) => console.log(files)} />
  </Example>
);

import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '../../../../Button/Button';
import { Text } from '../../../../Text/Text';
import { DragNDropField } from '../../../DragNDropField';

export const DragNDropFieldExampleRenderProps = () => (
  <Example col={1}>
    <DragNDropField onDropFiles={(files) => console.log(files)}>
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
    <DragNDropField onDropFiles={(files) => console.log(files)}>
      <Text view="primary" size="m" lineHeight="m">
        Здесь просто текст
      </Text>
    </DragNDropField>
  </Example>
);

export const DragNDropFieldExampleEmpty = () => (
  <Example col={1}>
    <DragNDropField onDropFiles={(files) => console.log(files)} />
  </Example>
);

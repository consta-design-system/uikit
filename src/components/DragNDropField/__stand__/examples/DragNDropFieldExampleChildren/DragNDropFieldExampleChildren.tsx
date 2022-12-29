import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '../../../../Button/Button';
import { Text } from '../../../../Text/Text';
import { DragNDropField } from '../../../DragNDropField';

export const DragNDropFieldExampleRenderProps = () => (
  <Example>
    <div>
      <DragNDropField onDropFiles={(files) => console.log(files)}>
        {({ openFileDialog }) => (
          <>
            <Text>Пример с Render Props,</Text>
            <Text>открывает окно для выбора файла из дочернего контента</Text>
            <br />
            <Button onClick={openFileDialog} label="Выбрать файл" />
          </>
        )}
      </DragNDropField>
    </div>
  </Example>
);

export const DragNDropFieldExampleChildren = () => (
  <Example>
    <div>
      <DragNDropField onDropFiles={(files) => console.log(files)}>
        <Text>Здесь просто текст</Text>
      </DragNDropField>
    </div>
  </Example>
);

export const DragNDropFieldExampleEmpty = () => (
  <Example>
    <div>
      <DragNDropField onDropFiles={(files) => console.log(files)} />
    </div>
  </Example>
);

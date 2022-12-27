import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '../../../../Text/Text';
import { DragNDropField } from '../../../DragNDropField';
import imageFile from './images/too_many_files.png';

const image = {
  src: imageFile,
  alt: 'Ошибка: слишком много файлов',
};

export const DragNDropFieldExampleSingle = () => (
  <Example col={1}>
    <DragNDropField
      multiple={false}
      onDropFiles={(files) => console.log(files)}
    >
      <Text>Сюда можно перетащить только один файл</Text>
    </DragNDropField>
  </Example>
);

export const DragNDropFieldExampleMultiple = () => (
  <Example col={1}>
    <DragNDropField multiple onDropFiles={(files) => console.log(files)}>
      <Text>Сюда можно перетащить много файлов за раз</Text>
    </DragNDropField>
  </Example>
);

export const DragNDropFieldExampleMultipleError = () => (
  <Example col={1}>
    <img src={image.src} alt={image.alt} />
  </Example>
);

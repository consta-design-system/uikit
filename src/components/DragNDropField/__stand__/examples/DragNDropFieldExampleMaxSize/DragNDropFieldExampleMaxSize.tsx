import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '../../../../Text/Text';
import { DragNDropField } from '../../../DragNDropField';
import imageFile from './images/too_big_file.png';

const image = {
  src: imageFile,
  alt: 'Ошибка: файл слишком большой',
};

export const DragNDropFieldExampleMaxSize = () => (
  <Example col={1}>
    <DragNDropField
      maxSize={1 * 1024 * 1024}
      onDropFiles={(files) => console.log(files)}
    >
      <Text>Сюда можно перетаскивать файлы</Text>
      <Text>размером 1 Мб или меньше</Text>
    </DragNDropField>
  </Example>
);

export const DragNDropFieldExampleMaxSizeError = () => (
  <Example col={1}>
    <img src={image.src} alt={image.alt} />
  </Example>
);

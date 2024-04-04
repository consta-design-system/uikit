import { Example } from '@consta/stand';
import React from 'react';

import { DragNDropField } from '##/components/DragNDropField/DragNDropField';

import { Text } from '../../../../Text/Text';
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
      <Text view="primary" size="m" lineHeight="m">
        Сюда можно перетащить только один файл
      </Text>
    </DragNDropField>
  </Example>
);

export const DragNDropFieldExampleMultiple = () => (
  <Example col={1}>
    <DragNDropField multiple onDropFiles={(files) => console.log(files)}>
      <Text view="primary" size="m" lineHeight="m">
        Сюда можно перетащить много файлов за раз
      </Text>
    </DragNDropField>
  </Example>
);

export const DragNDropFieldExampleMultipleError = () => (
  <Example col={1}>
    <img src={image.src} alt={image.alt} />
  </Example>
);

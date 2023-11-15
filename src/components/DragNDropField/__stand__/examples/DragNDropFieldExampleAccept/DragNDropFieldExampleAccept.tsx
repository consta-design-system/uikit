import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '../../../../Text/Text';
import { DragNDropField } from '../../../DragNDropField';
import imageFile from './images/wrong_file_format.png';

const image = {
  src: imageFile,
  alt: 'Ошибка: формат файла не подходит',
};

export const DragNDropFieldExampleAcceptDoc = () => (
  <Example col={1}>
    <DragNDropField
      accept={['.doc', '.docx']}
      onDropFiles={(files) => console.log(files)}
    >
      <Text view="primary" size="m" lineHeight="m">
        Сюда можно перетаскивать только DOC и DOCX
      </Text>
      <Text view="ghost" font="mono" size="m" lineHeight="m">
        .doc, .docx
      </Text>
    </DragNDropField>
  </Example>
);

export const DragNDropFieldExampleAcceptImage = () => (
  <Example col={1}>
    <DragNDropField
      accept="image/*"
      onDropFiles={(files) => console.log(files)}
    >
      <Text view="primary" size="m" lineHeight="m">
        Сюда можно перетаскивать только картинки,
      </Text>
      <Text view="primary" size="m" lineHeight="m">
        зато любые (ну почти)
      </Text>
      <Text view="ghost" font="mono" lineHeight="m">
        image/*
      </Text>
    </DragNDropField>
  </Example>
);

export const DragNDropFieldExampleAcceptError = () => (
  <Example col={1}>
    <img src={image.src} alt={image.alt} />
  </Example>
);

import { Example } from '@consta/stand';
import React from 'react';

import {
  DragNDropField,
  getErrorsList,
} from '##/components/DragNDropFieldCanary';
import { Text } from '##/components/Text';

export const DragNDropFieldExampleAcceptDoc = () => (
  <Example col={1}>
    <DragNDropField
      accept={{ 'application/msword': ['.doc', '.docx'] }}
      onDropAccepted={(files) => console.log(files)}
      onDropRejected={(reject) => {
        console.log(reject);
        alert(getErrorsList(reject).join('; '));
      }}
    >
      <Text view="primary" size="m" lineHeight="m">
        Сюда можно перетаскивать только DOC и DOCX
      </Text>
      <Text view="ghost" font="mono" size="m" lineHeight="m">
        {`{ 'application/msword': ['.doc', '.docx'] }`}
      </Text>
    </DragNDropField>
  </Example>
);

export const DragNDropFieldExampleAcceptImage = () => (
  <Example col={1}>
    <DragNDropField
      accept={{ 'image/*': [] }}
      onDropAccepted={(files) => console.log(files)}
      onDropRejected={(reject) => {
        console.log(reject);
        alert(getErrorsList(reject).join('; '));
      }}
    >
      <Text view="primary" size="m" lineHeight="m">
        Сюда можно перетаскивать только картинки,
      </Text>
      <Text view="primary" size="m" lineHeight="m">
        зато любые (ну почти)
      </Text>
      <Text view="ghost" font="mono" lineHeight="m">
        {`{ 'image/*': [] }`}
      </Text>
    </DragNDropField>
  </Example>
);

export const DragNDropFieldExampleAcceptDocAndImage = () => (
  <Example col={1}>
    <DragNDropField
      accept={{
        'application/msword': ['.doc', '.docx'],
        'image/png': ['.png'],
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/gif': ['.gif'],
      }}
      onDropAccepted={(files) => console.log(files)}
      onDropRejected={(reject) => {
        console.log(reject);
        alert(getErrorsList(reject).join('; '));
      }}
    >
      <Text view="primary" size="m" lineHeight="m">
        Сюда можно перетаскивать документы (DOC, DOCX)
      </Text>
      <Text view="primary" size="m" lineHeight="m">
        или изображения (PNG, GIF и JPEG/JPG)
      </Text>
      <Text view="ghost" font="mono" size="m" lineHeight="m">
        {`{ 'application/msword': ['.doc', '.docx'],`}
      </Text>
      <Text view="ghost" font="mono" size="m" lineHeight="m">
        {` 'image/png': ['.png'],`}
      </Text>
      <Text view="ghost" font="mono" size="m" lineHeight="m">
        {`'image/jpeg': ['.jpeg', '.jpg'],`}
      </Text>
      <Text view="ghost" font="mono" size="m" lineHeight="m">
        {` 'image/gif': ['.gif']} `}
      </Text>
    </DragNDropField>
  </Example>
);

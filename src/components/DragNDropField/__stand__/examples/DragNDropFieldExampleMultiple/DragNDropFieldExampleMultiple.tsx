import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '../../../../Text/Text';
import { DragNDropField } from '../../../DragNDropField';
import imageFile from './images/too_many_files.png';

export default {
  title: 'Ошибка: слишком много файлов',
};

const image = {
  src: imageFile,
  alt: 'Ошибка: слишком много файлов',
};

export const DragNDropFieldExampleSingle = () => (
  <Example>
    <div>
      <DragNDropField
        multiple={false}
        onDropFiles={(files) => console.log(files)}
      >
        <Text>Сюда можно перетащить только один файл</Text>
      </DragNDropField>
    </div>
  </Example>
);

export const DragNDropFieldExampleMultiple = () => (
  <Example>
    <div>
      <DragNDropField multiple onDropFiles={(files) => console.log(files)}>
        <Text>Сюда можно перетащить много файлов за раз</Text>
      </DragNDropField>
    </div>
  </Example>
);

export const DragNDropFieldExampleMultipleError = () => (
  <Example>
    <div>
      <img src={image.src} alt={image.alt} />
    </div>
  </Example>
);

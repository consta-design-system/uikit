import './DragNDropFieldExample.css';

import React from 'react';

import { cn } from '##/utils/bem';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
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

const cnDragNDropFieldExample = cn('DragNDropFieldExample');

export const DragNDropFieldExampleSingle = () => (
  <StoryBookExample
    className={cnDocsDecorator('Section', [cnDragNDropFieldExample()])}
  >
    <div>
      <DragNDropField
        multiple={false}
        onDropFiles={(files) => console.log(files)}
      >
        <Text>Сюда можно перетащить только один файл</Text>
      </DragNDropField>
    </div>
  </StoryBookExample>
);

export const DragNDropFieldExampleMultiple = () => (
  <StoryBookExample
    className={cnDocsDecorator('Section', [cnDragNDropFieldExample()])}
  >
    <div>
      <DragNDropField multiple onDropFiles={(files) => console.log(files)}>
        <Text>Сюда можно перетащить много файлов за раз</Text>
      </DragNDropField>
    </div>
  </StoryBookExample>
);

export const DragNDropFieldExampleMultipleError = () => (
  <StoryBookExample
    className={cnDocsDecorator('Section', [cnDragNDropFieldExample()])}
  >
    <div>
      <img src={image.src} alt={image.alt} />
    </div>
  </StoryBookExample>
);

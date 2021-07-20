import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Text } from '../../../../Text/Text';
import { DragNDropField } from '../../../DragNDropField';

export const DragNDropFieldExampleMultiple = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <DragNDropField multiple={false} onDropFiles={(files) => console.log(files)}>
        <Text>Сюда можно перетаскивать только один файл</Text>
      </DragNDropField>
    </div>
    <div>
      <DragNDropField multiple onDropFiles={(files) => console.log(files)}>
        <Text>Сюда можно перетаскивать много файлов за раз</Text>
      </DragNDropField>
    </div>
  </StoryBookExample>
);

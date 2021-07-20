import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Text } from '../../../../Text/Text';
import { DragNDropField } from '../../../DragNDropField';

export const DragNDropFieldExampleMaxSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <DragNDropField maxSize={1 * 1024 * 1024} onDropFiles={(files) => console.log(files)}>
        <Text>Сюда можно перетаскивать не более 1 Мб</Text>
      </DragNDropField>
    </div>
  </StoryBookExample>
);

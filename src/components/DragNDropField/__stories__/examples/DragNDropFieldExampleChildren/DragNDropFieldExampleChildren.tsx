import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Button } from '../../../../Button/Button';
import { Text } from '../../../../Text/Text';
import { DragNDropField } from '../../../DragNDropField';

export const DragNDropFieldExampleChildren = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <DragNDropField onDropFiles={(files) => console.log(files)}>
        <Text>Статичный контент</Text>
      </DragNDropField>
    </div>
    <div>
      <DragNDropField onDropFiles={(files) => console.log(files)}>
        {({ openFileDialog }) => (
          <>
            <Text>Пример с RenderProp для открытия диалога выбора файла из дочернего контента</Text>
            <br />
            <Button onClick={openFileDialog} label="Выбрать файл" />
          </>
        )}
      </DragNDropField>
    </div>
  </StoryBookExample>
);

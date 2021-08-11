import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Button } from '../../../../Button/Button';
import { Text } from '../../../../Text/Text';
import { DragNDropField } from '../../../DragNDropField';

export const DragNDropFieldExampleRenderProps = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <DragNDropField onDropFiles={(files) => console.log(files)}>
        {({ openFileDialog }) => (
          <>
            <Text>Пример с Render Props,</Text>
            <Text>открывает окно для выбора файла из дочернего контента</Text>
            <br />
            <Button onClick={openFileDialog} label="Выбрать файл" />
          </>
        )}
      </DragNDropField>
    </div>
  </StoryBookExample>
);

export const DragNDropFieldExampleChildren = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <DragNDropField onDropFiles={(files) => console.log(files)}>
        <Text>Здесь просто текст</Text>
      </DragNDropField>
    </div>
  </StoryBookExample>
);

export const DragNDropFieldExampleEmpty = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <DragNDropField onDropFiles={(files) => console.log(files)} />
    </div>
  </StoryBookExample>
);

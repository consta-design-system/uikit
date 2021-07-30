import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Text } from '../../../../Text/Text';
import { DragNDropField } from '../../../DragNDropField';

export const DragNDropFieldExampleAcceptDoc = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <DragNDropField accept={['.doc', '.docx']} onDropFiles={(files) => console.log(files)}>
        <Text>Сюда можно перетаскивать только DOC и DOCX</Text>
        <Text view="ghost" font="mono">
          .doc, .docx
        </Text>
      </DragNDropField>
    </div>
  </StoryBookExample>
);

export const DragNDropFieldExampleAcceptImage = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <div>
      <DragNDropField accept="image/*" onDropFiles={(files) => console.log(files)}>
        <Text>Сюда можно перетаскивать только картинки,</Text>
        <Text>зато любые (ну почти)</Text>
        <Text view="ghost" font="mono">
          image/*
        </Text>
      </DragNDropField>
    </div>
  </StoryBookExample>
);

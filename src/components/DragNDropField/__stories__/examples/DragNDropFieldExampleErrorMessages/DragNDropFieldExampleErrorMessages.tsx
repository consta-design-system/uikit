import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DragNDropField } from '../../../DragNDropField';

export const DragNDropFieldExampleErrorMessages = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <DragNDropField
        onDropFiles={(files) => console.log(files)}
        maxSize={10}
        locale={{
          'file-too-large': ({ file }) =>
            `Ой! Похоже ${file.name} слишком большой`,
        }}
      />
    </StoryBookExample>
  );
};

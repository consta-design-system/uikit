import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { DragNDropField } from '../../../DragNDropField';

export const DragNDropFieldExampleErrorMessages = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <div>
        <DragNDropField
          onDropFiles={(files) => console.log(files)}
          maxSize={10}
          errorMessages={{
            'file-too-large': 'Ой! Похоже этот файл слишком большой',
          }}
        />
      </div>
    </StoryBookExample>
  );
};

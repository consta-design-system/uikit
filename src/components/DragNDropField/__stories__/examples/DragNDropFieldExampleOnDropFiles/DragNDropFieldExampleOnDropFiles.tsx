import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Attach } from '../../../../Attach/Attach';
import { Text } from '../../../../Text/Text';
import { DragNDropField } from '../../../DragNDropField';

export const DragNDropFieldExampleOnDropFiles = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <div>
        <DragNDropField multiple onDropFiles={setFiles}>
          <Text>Перетяните файлы сюда</Text>
        </DragNDropField>
      </div>
      <div>
        {files.map((file) => (
          <Attach
            key={file.name}
            fileExtension={file.name.match(/\.(?!.*\.)(\w*)/)?.[1]}
            fileName={file.name}
            fileDescription={file.type}
          />
        ))}
      </div>
    </StoryBookExample>
  );
};

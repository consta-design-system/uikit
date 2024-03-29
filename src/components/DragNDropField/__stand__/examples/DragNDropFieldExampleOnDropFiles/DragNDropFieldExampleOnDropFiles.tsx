import { Example } from '@consta/stand';
import React from 'react';

import { Attachment } from '../../../../AttachmentDeprecated/AttachmentDeprecated';
import { Text } from '../../../../Text/Text';
import { DragNDropField } from '../../../DragNDropField';

export const DragNDropFieldExampleOnDropFiles = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  return (
    <Example col={1}>
      <div>
        <DragNDropField multiple onDropFiles={setFiles}>
          <Text view="primary" size="m" lineHeight="m">
            Перетяните файлы сюда
          </Text>
        </DragNDropField>
      </div>
      <div>
        {files.map((file) => (
          <Attachment
            key={file.name}
            fileExtension={file.name.match(/\.(?!.*\.)(\w*)/)?.[1]}
            fileName={file.name}
            fileDescription={file.type}
          />
        ))}
      </div>
    </Example>
  );
};

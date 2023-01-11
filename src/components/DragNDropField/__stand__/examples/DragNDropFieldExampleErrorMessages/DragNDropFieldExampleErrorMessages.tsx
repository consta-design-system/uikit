import { Example } from '@consta/stand';
import React from 'react';

import { DragNDropField } from '../../../DragNDropField';

export const DragNDropFieldExampleErrorMessages = () => {
  return (
    <Example col={1}>
      <DragNDropField
        onDropFiles={(files) => console.log(files)}
        maxSize={10}
        locale={{
          'file-too-large': ({ file }) =>
            `Ой! Похоже ${file.name} слишком большой`,
        }}
      />
    </Example>
  );
};

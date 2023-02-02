import { Example } from '@consta/stand';
import React from 'react';

import { Attachment } from '##/components/Attachment/Attachment';
import { AttachmentPropSize } from '##/components/Attachment/types';

const sizes: AttachmentPropSize[] = ['xs', 's', 'm'];

export const AttachmentExampleSize = () => {
  return (
    <Example
      items={sizes}
      getItemNode={(size: AttachmentPropSize) => (
        <Attachment
          size={size}
          fileName="Инструкция по сборке марсохода"
          fileExtension="pdf"
          onClick={() => console.log('onClick')}
        />
      )}
      getItemDescription={(size) => `size="${size}"`}
    />
  );
};

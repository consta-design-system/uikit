import { Example } from '@consta/stand';
import React from 'react';

import { Attachment } from '##/components/AttachmentCanary';

export const AttachmentExampleWithPictogram = () => {
  return (
    <Example
      items={[true, false]}
      getItemDescription={(flag) => `withPictogram={${flag}}`}
      getItemNode={(flag) => (
        <Attachment
          withPictogram={flag}
          fileName="Файл"
          fileExtension="jpg"
          fileDescription="14 Мб 01.04.2020, 07:01"
        />
      )}
    />
  );
};

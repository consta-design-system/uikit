import { Example } from '@consta/stand';
import React from 'react';

import { Attachment } from '##/components/Attachment';

export const AttachmentExampleIcon = () => {
  return (
    <Example>
      <Attachment fileName="Картинка в JPG" fileExtension="jpg" />
      <Attachment
        fileName="Картинка в непонятном формате BZZ"
        fileExtension="bzz"
      />
    </Example>
  );
};

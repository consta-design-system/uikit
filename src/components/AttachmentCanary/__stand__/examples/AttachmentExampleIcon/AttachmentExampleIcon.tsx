import { Example } from '@consta/stand';
import React from 'react';

import { Attachment } from '##/components/AttachmentCanary';

export const AttachmentExampleIcon = () => {
  return (
    <Example>
      <Attachment fileName="Картинка в JPG" fileExtension="jpg" withIcon />
      <Attachment
        fileName="Картинка в непонятном формате BZZ"
        withIcon
        fileExtension="bzz"
      />
    </Example>
  );
};

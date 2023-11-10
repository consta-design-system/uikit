import { Example } from '@consta/stand';
import React from 'react';

import { Attachment } from '##/components/AttachmentCanary';

export const AttachmentExampleIcon = () => {
  return (
    <Example>
      <Attachment fileName="Картинка в JPG" fileExtension="jpg" withPictogram />
      <Attachment
        fileName="Картинка в непонятном формате BZZ"
        withPictogram
        fileExtension="bzz"
      />
    </Example>
  );
};

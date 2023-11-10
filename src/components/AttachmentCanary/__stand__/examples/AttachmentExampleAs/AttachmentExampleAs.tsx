import { Example } from '@consta/stand';
import React from 'react';

import { Attachment } from '##/components/AttachmentCanary';

export const AttachmentExampleAs = () => {
  return (
    <Example>
      <Attachment
        as="a"
        href="https://www.youtube.com/watch?v=dAZKu_ojb14"
        fileName="Вести с марса"
        fileExtension="mov"
        withPictogram
        fileDescription="Нажми меня"
      />
    </Example>
  );
};

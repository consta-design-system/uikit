import { Example } from '@consta/stand';
import React from 'react';

import { Attachment } from '##/components/AttachmentCanary';

export const AttachmentExampleDescription = () => {
  return (
    <Example>
      <Attachment
        fileName="Фотография"
        fileExtension="jpg"
        withPictogram
        fileDescription="1,5 Mб 19.07.2020, 16:11"
      />
      <Attachment
        fileName="Скан паспорта"
        fileExtension="pdf"
        withPictogram
        fileDescription="1,5 Mб 19.07.2020, 16:12"
      />
      <Attachment
        fileName="Сопроводительное письмо"
        fileExtension="docx"
        withPictogram
        fileDescription="225 Mб 19.07.2020, 17:15"
      />
    </Example>
  );
};
